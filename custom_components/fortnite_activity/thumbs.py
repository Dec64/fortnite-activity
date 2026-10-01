"""Small cached thumbnails of public Fortnite artwork for the card.

The image CDNs serve full-size art (often 2048 px PNGs of several MB) and cannot resize, which makes
grids of shop / locker / sprite tiles slow. This view fetches an image once from an allow-listed host,
shrinks it to the requested width and keeps a WebP copy on disk.
"""

from __future__ import annotations

import asyncio
import hashlib
import io
import logging
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

from aiohttp import ClientTimeout, web

try:
    from homeassistant.components.http import HomeAssistantView
    from homeassistant.helpers.aiohttp_client import async_get_clientsession
except ImportError:  # pragma: no cover - unit tests without Home Assistant
    HomeAssistantView = object  # type: ignore
    async_get_clientsession = None  # type: ignore

_LOGGER = logging.getLogger(__name__)

THUMB_URL = "/api/fortnite_activity/thumb"
# Only public artwork hosts used by the integration's data sources
ALLOWED_HOSTS = frozenset({
    "cdn.api-fortnite.com",
    "cdn-live.prm.ol.epicgames.com",
    "raw.githubusercontent.com",
})
ALLOWED_WIDTHS = (64, 128, 160, 256, 384, 512, 720)
MAX_SOURCE_BYTES = 20 * 1024 * 1024


def thumb_allowed(url: str) -> bool:
    try:
        parsed = urlparse(url)
    except ValueError:
        return False
    return parsed.scheme == "https" and parsed.hostname in ALLOWED_HOSTS and not parsed.username and not parsed.port


def snap_width(width: Any) -> int:
    """Nearest allowed width (bounded set keeps the cache small)."""
    try:
        w = int(width)
    except (TypeError, ValueError):
        w = 256
    return min(ALLOWED_WIDTHS, key=lambda a: abs(a - w))


def _resize(data: bytes, width: int) -> bytes:
    from PIL import Image  # Home Assistant ships Pillow

    with Image.open(io.BytesIO(data)) as img:
        img.load()
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA")
        if img.width > width:
            img.thumbnail((width, width * 4), Image.LANCZOS)
        out = io.BytesIO()
        img.save(out, format="WEBP", quality=82, method=4)
        return out.getvalue()


class FortniteThumbView(HomeAssistantView):  # type: ignore[misc]
    """GET /api/fortnite_activity/thumb?u=<https url>&w=<width> -> cached WebP thumbnail."""

    url = THUMB_URL
    name = "api:fortnite_activity:thumb"
    # <img> requests carry no bearer token; only allow-listed public artwork is ever proxied
    requires_auth = False

    def __init__(self, hass: Any) -> None:
        self.hass = hass
        self.cache_dir = Path(hass.config.path(".storage", "fortnite_activity_thumbs"))
        self._sem = asyncio.Semaphore(4)
        self._inflight: dict[str, asyncio.Future] = {}

    async def get(self, request: web.Request) -> web.StreamResponse:
        url = request.query.get("u", "")
        if not thumb_allowed(url):
            return web.Response(status=400, text="Unsupported image")
        width = snap_width(request.query.get("w"))
        key = hashlib.sha1(f"{url}|{width}".encode()).hexdigest()
        path = self.cache_dir / f"{key}.webp"
        headers = {"Cache-Control": "public, max-age=604800, immutable"}
        if path.exists():
            return web.FileResponse(path, headers=headers)
        try:
            data = await self._make(url, width, path, key)
        except Exception as err:  # noqa: BLE001 - fall back to the original image
            _LOGGER.debug("Thumbnail for %s failed: %s", url, err)
            raise web.HTTPFound(url) from None
        return web.Response(body=data, content_type="image/webp", headers=headers)

    async def _make(self, url: str, width: int, path: Path, key: str) -> bytes:
        if key in self._inflight:
            return await self._inflight[key]
        fut: asyncio.Future = asyncio.get_running_loop().create_future()
        self._inflight[key] = fut
        try:
            async with self._sem:
                session = async_get_clientsession(self.hass)
                chunks: list[bytes] = []
                total = 0
                async with session.get(url, timeout=ClientTimeout(total=30)) as resp:
                    resp.raise_for_status()
                    # Read the whole body (a single read() may return only what is buffered)
                    async for chunk in resp.content.iter_chunked(64 * 1024):
                        total += len(chunk)
                        if total > MAX_SOURCE_BYTES:
                            raise ValueError("source image too large")
                        chunks.append(chunk)
                data = b"".join(chunks)
                out = await self.hass.async_add_executor_job(_resize, data, width)
                await self.hass.async_add_executor_job(self._write, path, out)
            fut.set_result(out)
            return out
        except Exception as err:
            fut.set_exception(err)
            fut.exception()  # mark retrieved
            raise
        finally:
            self._inflight.pop(key, None)

    def _write(self, path: Path, data: bytes) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        tmp = path.with_suffix(".tmp")
        tmp.write_bytes(data)
        tmp.replace(path)
