# Fortnite Family Tracker agent instructions

Read `README.md` for what the project does today, then the relevant docs. `docs/fortnite-home-assistant-agent-handoff.md` is the original September 2026 brief and is kept for background.

## Working rules

- Maintain `docs/capability-matrix.md` and `docs/investigation-log.md`.
- Distinguish observed, documented, proposed and unverified behavior.
- Implement verified functionality while continuing bounded investigation of missing features.
- Never invent quest targets, reward totals, presence states, eligibility or mode mappings.
- Never print, log, copy, commit or return upstream API keys, Epic tokens, refresh tokens, device IDs or device secrets.
- Never request direct access to the protected credential file.
- For the current investigation, use only narrowly scoped local probes that read the Windows user environment variables at runtime. Keep access tokens in memory, enforce the exact account-identity gate, and save only sanitized summaries.
- No Fortnite Secret Broker is used. In Home Assistant, only each player's Epic device ID and secret are stored, and every token refresh is gated on the stored account ID.
- Do not add Epic account-changing, purchasing, privacy-changing, friend, party, messaging or cosmetic actions.
- Authenticated direct Epic operations are read-only QueryProfile calls for approved profiles. Public, unauthenticated documentation or asset-catalogue GETs may be researched in the current catalogue phase.
- Use synthetic and sanitized fixtures in tests.
- Files under `evidence/raw` are private and must never be committed.
- Avoid a gaming-PC process, memory access, injection, input automation or traffic interception.
- Run destructive commands, elevated commands, installations and deployments only when explicitly authorized.
- Work autonomously on local, reversible implementation and testing.
- Keep the README, setup guide and limitations truthful whenever behaviour changes.

## Current state (October 2026)

The investigation phases are complete, and the Home Assistant integration and its cards are built and released through HACS. The README describes what exists today. `docs/investigation-log.md` records each release and every observed provider or Epic behaviour.

- Integration: `custom_components/fortnite_activity` (Python).
- Fortnite Activity Card, family panel and editor: TypeScript in `frontend/src`. Build it with `npm run build` in `frontend/` and copy `frontend/dist/fortnite-activity-card.js` into `custom_components/fortnite_activity/frontend/`. Never edit the built file by hand.
- Fortnite Family page: plain JavaScript, edited directly in `custom_components/fortnite_activity/frontend/fortnite-family-page.js`. Player names never appear in code; they come from the card config.
- Tests: `python -m pytest -q tests`. Add a test with every behaviour change; fixtures stay synthetic or sanitized.
- Release: bump `manifest.json`, push `master`, add an investigation-log entry, then the owner publishes a GitHub release tagged `v<version>` for HACS.

## Investigation rules (still in force for any new probe)

The required credentials are Windows user environment variables:

- API_FORTNITE_KEY
- FORTNITE_PLAYER1_ACCOUNT_ID
- FORTNITE_PLAYER1_DEVICE_ID
- FORTNITE_PLAYER1_DEVICE_SECRET

These variables may be used in HTTP headers and request bodies. Never print, echo, enumerate, serialize, log or include their values in an artifact, conversation, command output, error report, fixture or source file. Never run Get-ChildItem Env:, set, dir env:, gci env:, or commands intended to display environment variables.

A research probe may read the variables at runtime. It must contain no secret values, keep issued tokens in memory only, confirm the returned Epic identity against the expected account, abort direct Epic calls on any mismatch or missing identity, and redact authentication and profile responses before output. Direct Epic calls stay limited to read-only `QueryProfile` for `athena` and `common_core`. Record the HTTP status, endpoint template and timestamps; never save a full personal profile.

The catalogue investigation is closed. The permitted exporter's discovery surfaces are exhausted without a quest or Battle Pass definition path (see `docs/catalogue-source-results.md`); don't repeat those calls without a new, bounded question.
