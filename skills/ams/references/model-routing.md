# Cost-first model routing

## Route ladder

```text
haiku -> sonnet -> opus -> inherit
```

`inherit` is the top worker/manager route. Under the AMS root's `best` model, it resolves to Fable when available and otherwise to Opus. Do not create a direct Fable-only dependency: workplace accounts without Fable must remain fully functional.

Use the lowest route expected to satisfy the complete work order and validation in one competent attempt.

| Route | Normal use |
|---|---|
| `haiku` | Searches, inventory, extraction, routine commands, expected-pass checks, formatting, deterministic edits, concise logs, repetitive low-risk work that is easy to verify. |
| `sonnet` | Ordinary coding, focused debugging, tests, documentation, conventional review, moderate investigation, serialized integration. |
| `opus` | Ambiguous or difficult debugging, architecture, security-sensitive work, cross-component changes, high-failure-cost decisions, broad bounded management. |
| `inherit` | Hardest bounded tasks or subgraphs that genuinely require the strongest model available to the active root. |

## Agent selection

- Haiku read-only discovery: `claude-ams:ams-explorer`.
- Haiku exact edits in an isolated worktree: `claude-ams:ams-mechanic`.
- Haiku exact edits in the shared checkout: `claude-ams:ams-shared-mechanic`.
- Haiku validation: `claude-ams:ams-verifier`.
- Sonnet isolated implementation: `claude-ams:ams-worker`.
- Sonnet shared serialized implementation: `claude-ams:ams-shared-worker`.
- Sonnet review: `claude-ams:ams-reviewer`.
- Sonnet integration: `claude-ams:ams-integrator`.
- Opus manager: `claude-ams:ams-manager`.
- Inherited top worker: `claude-ams:ams-top-worker` or `claude-ams:ams-top-shared-worker`.
- Inherited top manager: `claude-ams:ams-top-manager`.
- Recovery inspection: `claude-ams:ams-recovery-inspector`.

## Selection signals

Evaluate ambiguity, failure cost, architecture/security impact, coupling, novelty, context volume, reversibility, verification cost, repetition, and supervisory burden. File count alone is not a strength signal.

Haiku is worker-only. Do not use it for manager roles, architecture, threat modeling, security judgment, broad ambiguous implementation, final acceptance, or difficult evidence reconciliation.

Use `inherit` sparingly. Availability alone is not justification for Fable. A Fable-enabled account should still run routine work on Haiku and ordinary development on Sonnet.

## Identity and overrides

Record requested route separately from observed model. Organization `availableModels`, provider mappings, account entitlement, and `CLAUDE_CODE_SUBAGENT_MODEL` may change or constrain resolution. When exact runtime identity is not exposed, report `unverified`; never infer Fable merely because `inherit` was requested.

An excluded or unavailable route is a routing fact, not permission to invent a model identifier. Select the next truthful compatible route within the work order's ceiling and record the substitution.

## Escalation

For weak or failed work:

1. correct missing context, scope, success criteria, permissions, or ownership first;
2. retry the same route only when the setup materially changed;
3. escalate Haiku to Sonnet when judgment or ambiguity exceeded the mechanical route;
4. escalate Sonnet to Opus for architecture, security, difficult cross-component reasoning, or high failure cost;
5. use `inherit` only when Opus is demonstrably insufficient or the task independently warrants the strongest available model.

Lower-cost output never reduces independent verification or acceptance requirements.
