# Fortnite Family Tracker agent instructions

Read `docs/fortnite-home-assistant-agent-handoff.md` completely before planning or editing code.

## Working rules

- Maintain `docs/capability-matrix.md` and `docs/investigation-log.md`.
- Distinguish observed, documented, proposed and unverified behavior.
- Implement verified functionality while continuing bounded investigation of missing features.
- Never invent quest targets, reward totals, presence states, eligibility or mode mappings.
- Never print, log, copy, commit or return upstream API keys, Epic tokens, refresh tokens, device IDs or device secrets.
- Never request direct access to the protected credential file.
- All live credential use must go through the local Fortnite Secret Broker.
- The broker must never expose a generic URL, arbitrary headers, arbitrary request bodies or a get-secret operation.
- Do not add Epic account-changing, purchasing, privacy-changing, friend, party, messaging or cosmetic actions.
- Direct Epic operations are read-only QueryProfile calls for approved profiles.
- Use synthetic and sanitized fixtures in tests.
- Files under `evidence/raw` are private and must never be committed.
- Avoid a gaming-PC process, memory access, injection, input automation or traffic interception.
- Run destructive commands, elevated commands, installations and deployments only when explicitly authorized.
- Work autonomously on local reversible implementation and testing.
- Deliver installable Home Assistant integration and custom card artifacts, setup instructions and truthful limitations.

## Initial order

1. Inspect the handoff and repository.
2. Create the capability matrix and investigation log.
3. Build the scoped Windows secret broker in fixture mode.
4. Build and test its Windows Service package.
5. Produce the one-time administrator installation instructions.
6. Continue the Home Assistant integration against fixtures while broker installation is pending.
7. After the broker health check passes, perform bounded live probes and implement verified capabilities.

## Current phase: complete api-fortnite.com Pro investigation

The current authorized phase is a complete investigation of the paid
api-fortnite.com Pro API.

Do not build the Home Assistant integration, dashboard card, database or
Windows service yet.

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
no secret values and must redact authentication responses before producing
output.

Focus on api-fortnite.com. Other providers may only be investigated after a
specific api-fortnite.com capability has been proven missing or broken.
