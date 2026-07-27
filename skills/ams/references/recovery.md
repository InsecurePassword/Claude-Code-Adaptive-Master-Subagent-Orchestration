# Recovery and continuity

Prefer an existing authoritative project task system, issue tracker, journal, or checkpoint. Do not create a competing ledger. When none can preserve required AMS continuity, use:

```text
<project-root>/.claude/ams-recovery.local.json
```

This file is local control state and should normally remain ignored by Git. Validate it against the packaged recovery schema. The root alone writes it.

Record only:

- objective and mandatory acceptance criteria;
- settings source, intensity, backend, and relevant capability state;
- work-order IDs, immutable lineage, roles, status, requested routes, and physical identity when observable;
- ownership and worktree/branch/commit identity;
- accepted, rejected, superseded, outstanding, and pending-integration evidence;
- validation state;
- blockers, exact next action, and resumption condition.

Never store private chain-of-thought, entire transcripts, secrets, or noisy logs.

## Recovery procedure

1. Treat prior reports and ledger entries as claims, not proof.
2. Resolve current settings and package identity.
3. Commission `ams-recovery-inspector` orders to inspect live repositories, branches, worktrees, commits, artifacts, tests, and user changes.
4. Classify each item as verified, awaiting integration, unverified, partial, ready, blocked, failed, or superseded.
5. Reclaim ownership only after evidence proves no live writer remains.
6. Preserve historical lineage. Replacements and reparented work use new IDs.
7. Rebuild the smallest useful current topology rather than recreating an old roster.
8. Resume from the earliest unfinished or unverified dependency and continue independent safe lanes.

Ordinary subagents and dynamic workflows may not be resumable across a new Claude Code session. Reconstruct and reassign; never pretend inaccessible sessions are live.
