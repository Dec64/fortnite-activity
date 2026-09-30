"""Epic player-token handling via api-fortnite.com device auth.

Security rules (see AGENTS.md):
- Only the device credential (device_id + secret) is persisted, in the config entry.
- Access tokens stay in memory; refresh tokens are discarded.
- Every issued token must belong to exactly the configured account (identity gate).
- A rejected refresh (400/401/403) is never retried: the credential is marked invalid
  and the user is asked to re-link. Nothing secret is ever logged or raised.
"""

from __future__ import annotations

import asyncio
from datetime import datetime, timedelta, timezone
import logging
import re
from typing import Any, Callable

from .api.api_fortnite import ApiFortniteClient, FortniteApiError

_LOGGER = logging.getLogger(__name__)

TOKEN_REFRESH_MARGIN = timedelta(minutes=5)
DEFAULT_TOKEN_LIFETIME = 7200  # seconds, observed in sanitized evidence

_ACCOUNT_KEY = re.compile(r"^(account_?id|epic_?account_?id)$", re.IGNORECASE)
_TOKEN_KEY = re.compile(r"^access_?token$", re.IGNORECASE)
_DEVICE_KEY = re.compile(r"^device_?id$", re.IGNORECASE)
_SECRET_KEY = re.compile(r"^secret$", re.IGNORECASE)
_EXPIRES_KEY = re.compile(r"^expires_?in$", re.IGNORECASE)
_FLOW_KEY = re.compile(r"^flow_?id$", re.IGNORECASE)
_URL_KEY = re.compile(r"(url|uri)(_?complete)?$", re.IGNORECASE)


class EpicAuthError(Exception):
    """Base error; messages never contain credentials or response bodies."""


class EpicReauthRequired(EpicAuthError):
    """The stored device credential was rejected; the user must link Epic again."""


class EpicIdentityMismatch(EpicAuthError):
    """A token was issued for a different Epic account than the configured one."""


def find_values(data: Any, pattern: re.Pattern[str]) -> list[Any]:
    """Recursively collect values whose key matches pattern (dicts and lists)."""
    found: list[Any] = []
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(key, str) and pattern.search(key) and not isinstance(value, (dict, list)):
                found.append(value)
            found.extend(find_values(value, pattern))
    elif isinstance(data, list):
        for item in data:
            found.extend(find_values(item, pattern))
    return found


def _single(data: Any, pattern: re.Pattern[str]) -> Any | None:
    values = {v for v in find_values(data, pattern) if isinstance(v, (str, int, float)) and v != ""}
    return next(iter(values)) if len(values) == 1 else None


def identity_matches(data: Any, expected_account_id: str) -> bool:
    """True only if the response names exactly one account id and it equals the expected one."""
    ids = {v for v in find_values(data, _ACCOUNT_KEY) if isinstance(v, str)}
    return len(ids) == 1 and next(iter(ids)) == expected_account_id


def parse_flow_start(data: Any) -> tuple[str, str] | None:
    """Return (flow_id, https sign-in url on an Epic/api-fortnite host) from get-token."""
    flow_id = _single(data, _FLOW_KEY)
    urls = [
        u for u in find_values(data, _URL_KEY)
        if isinstance(u, str)
        and re.match(r"^https://([a-z0-9-]+\.)*(epicgames\.com|api-fortnite\.com)(/|$)", u, re.IGNORECASE)
    ]
    if not isinstance(flow_id, str) or len(set(urls)) != 1:
        return None
    return flow_id, urls[0]


def parse_device_credential(data: Any) -> tuple[str, str] | None:
    """Return (device_id, secret) from a completed flow, if exactly one set is present."""
    device_id = _single(data, _DEVICE_KEY)
    secret = _single(data, _SECRET_KEY)
    if isinstance(device_id, str) and isinstance(secret, str) and device_id and secret:
        return device_id, secret
    return None


class EpicTokenManager:
    """Keeps one player's access token fresh using stored device credentials."""

    def __init__(
        self,
        client: ApiFortniteClient,
        account_id: str,
        device_id: str,
        secret: str,
        on_reauth_required: Callable[[], None] | None = None,
    ) -> None:
        self._client = client
        self._account_id = account_id
        self._device_id = device_id
        self._secret = secret
        self._on_reauth_required = on_reauth_required
        self._token: str | None = None
        self._expires_at: datetime | None = None
        self._lock = asyncio.Lock()
        self.invalid = False

    def __repr__(self) -> str:  # never expose credentials in logs/tracebacks
        return f"EpicTokenManager(account=…{self._account_id[-4:]}, invalid={self.invalid})"

    async def async_get_token(self) -> str:
        """Return a valid access token, refreshing via device auth when needed."""
        if self.invalid:
            raise EpicReauthRequired("Epic link needs to be renewed")
        async with self._lock:
            now = datetime.now(timezone.utc)
            if self._token and self._expires_at and now < self._expires_at - TOKEN_REFRESH_MARGIN:
                return self._token
            try:
                data = await self._client.oauth_refresh_device(self._account_id, self._device_id, self._secret)
            except FortniteApiError as err:
                status = getattr(err, "status", None)
                if status in (400, 401, 403):
                    self._mark_invalid()
                    raise EpicReauthRequired("Epic rejected the stored device credential") from None
                raise EpicAuthError(f"Epic token refresh failed (HTTP {status or 'error'})") from None
            if not identity_matches(data, self._account_id):
                self._mark_invalid()
                raise EpicIdentityMismatch("Token was issued for a different Epic account")
            token = _single(data, _TOKEN_KEY)
            if not isinstance(token, str):
                raise EpicAuthError("Token refresh response had no access token")
            lifetime = _single(data, _EXPIRES_KEY)
            seconds = int(lifetime) if isinstance(lifetime, (int, float)) and lifetime > 0 else DEFAULT_TOKEN_LIFETIME
            self._token = token
            self._expires_at = now + timedelta(seconds=seconds)
            return token

    def _mark_invalid(self) -> None:
        self.invalid = True
        self._token = None
        self._expires_at = None
        if self._on_reauth_required:
            self._on_reauth_required()
