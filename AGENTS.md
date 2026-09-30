# Fortnite Family Tracker agent instructions

Read `docs/fortnite-home-assistant-agent-handoff.md` completely before planning or editing code.

## Working rules

- Maintain `docs/capability-matrix.md` and `docs/investigation-log.md`.
- Distinguish observed, documented, proposed and unverified behavior.
- Implement verified functionality while continuing bounded investigation of missing features.
- Never invent quest targets, reward totals, presence states, eligibility or mode mappings.
- Never print, log, copy, commit or return upstream API keys, Epic tokens, refresh tokens, device IDs or device secrets.
- Never request direct access to the protected credential file.
- For the current investigation, use only narrowly scoped local probes that read the Windows user environment variables at runtime. Keep access tokens in memory, enforce the exact account-identity gate, and save only sanitized summaries.
- Do not build or require a Fortnite Secret Broker for this investigation. Decide final Home Assistant credential handling separately.
- Do not add Epic account-changing, purchasing, privacy-changing, friend, party, messaging or cosmetic actions.
- Authenticated direct Epic operations are read-only QueryProfile calls for approved profiles. Public, unauthenticated documentation or asset-catalogue GETs may be researched in the current catalogue phase.
- Use synthetic and sanitized fixtures in tests.
- Files under `evidence/raw` are private and must never be committed.
- Avoid a gaming-PC process, memory access, injection, input automation or traffic interception.
- Run destructive commands, elevated commands, installations and deployments only when explicitly authorized.
- Work autonomously on local reversible implementation and testing.
- Deliver installable Home Assistant integration and custom card artifacts, setup instructions and truthful limitations.

## Initial order

1. Inspect the handoff and repository.
2. Create the capability matrix and investigation log.
3. Complete bounded read-only profile investigation with synthetic probe tests and sanitized live evidence.
4. Reassess credential handling before any Home Assistant implementation.
5. Implement verified Home Assistant functionality only in a separately authorized build phase.

## Current phase: bounded catalogue investigation

The paid api-fortnite.com Pro inventory and bounded personal-profile reads are
complete. The user approved a focused, read-only search for versioned English
quest definitions and a complete Battle Pass reward catalogue, following
`docs/catalogue-research-next-phase.md`. The user previously approved skipping
the broker for investigation.

Do not build the Home Assistant integration, dashboard card, database or
Windows service in this phase.

The required credentials are provided as Windows user environment variables:

- API_FORTNITE_KEY
- FORTNITE_PLAYER1_ACCOUNT_ID
- FORTNITE_PLAYER1_DEVICE_ID
- FORTNITE_PLAYER1_DEVICE_SECRET

These variables may be used in HTTP headers and request bodies. Never print,
echo, enumerate, serialize, log or include their values in an artifact,
conversation, command output, error report, fixture or source file.

Never run Get-ChildItem Env:, set, dir env:, gci env:, or commands intended to
display environment variables.

A temporary research probe may read the variables at runtime. It must contain
no secret values, keep issued tokens in memory only, confirm the returned Epic
identity against the previously validated expected account, and abort direct
Epic calls on any mismatch or missing identity. It must redact authentication
and profile responses before producing output. Direct Epic calls are limited
to `QueryProfile` for `athena` and `common_core`, which use POST for read-only
profile retrieval. Record exact HTTP status, endpoint template and timestamps;
never save a full personal profile.

Check official public Epic documentation and game-asset/catalogue surfaces
first. If they do not supply the needed definitions, assess only the single
game-asset exporter identified in the handoff as an unverified lead. Verify its
current documentation and access terms before a call; use no paid subscription,
bulk export or personal token. Limit initial exporter probing to two small
read-only requests, then stop and document what can actually be joined. Do not
expand to other alternative providers in this phase.

The two initial exporter GETs and two separately authorized representation
follow-up GETs are complete. They established candidate version strings and
an array-valued seasons output, but no quest/pass definition join. See
`docs/catalogue-source-results.md`. Do not repeat those calls without a new
bounded question and a sanitizer that captures only the needed safe shape.

The separately authorized 19 September element-shape question is also
complete. It established that the tested seasons response is a 42-entry
chapter/season localization index with no reward fields or asset paths. Raw
export remains blocked on an exact documented path; do not guess one.

The 20 September documentation and two-query INI-search check is complete.
Neither `AthenaSeasonItemDefinition` nor `FortQuestItemDefinition` search
yielded a `/Game/...` path in the sanitized projection. The permitted
exporter's documented discovery surfaces are exhausted. Do not call raw
export without a newly observed exact current path.
