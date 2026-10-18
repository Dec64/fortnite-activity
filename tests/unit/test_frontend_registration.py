"""Both dashboard cards ship with the integration and are served and auto-loaded."""

from __future__ import annotations

import asyncio
import unittest
from unittest import mock

import custom_components.fortnite_activity as integration


class _Http:
    def __init__(self) -> None:
        self.paths: list[tuple[str, str]] = []

    def register_static_path(self, url: str, path: str, cache_headers: bool = True) -> None:
        self.paths.append((url, path))

    def register_view(self, view) -> None:  # thumbnail proxy
        pass


class FrontendRegistrationTest(unittest.TestCase):
    def test_both_cards_are_shipped(self) -> None:
        self.assertTrue(integration.CARD_PATH.exists())
        self.assertTrue(integration.FAMILY_CARD_PATH.exists())
        text = integration.FAMILY_CARD_PATH.read_text(encoding="utf-8")
        self.assertIn("customElements.get('household-fortnite-page-card')", text)
        # Player names come from the card config, never from the code
        for name in ("arlo", "declan"):
            self.assertNotIn(name, text.lower())

    def test_both_cards_are_served_and_loaded(self) -> None:
        hass = mock.Mock()
        hass.data = {}
        hass.http = _Http()
        loaded: list[str] = []
        with mock.patch.object(integration, "StaticPathConfig", None), \
             mock.patch.object(integration, "add_extra_js_url", lambda _hass, url: loaded.append(url)):
            asyncio.run(integration._async_register_frontend_card(hass))
            asyncio.run(integration._async_register_frontend_card(hass))  # second entry: no duplicates
        self.assertEqual([u for u, _ in hass.http.paths], [integration.CARD_URL, integration.FAMILY_CARD_URL])
        self.assertEqual([u.split("?")[0] for u in loaded], [integration.CARD_URL, integration.FAMILY_CARD_URL])


if __name__ == "__main__":
    unittest.main()
