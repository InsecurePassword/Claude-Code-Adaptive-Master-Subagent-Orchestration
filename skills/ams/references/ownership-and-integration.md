# Ownership and integration

## One writer per surface

Before dispatch, assign one active writer to every mutable file, directory subtree, generated artifact set, database migration, schema, manifest, lockfile, branch, or other shared surface. Path ownership overlaps when one path is equal to or an ancestor of another.

Read-only agents may overlap. Writers may not. Serialize shared manifests, dependency locks, schemas, migrations, indexes, release metadata, integration branches, and authoritative project state.

Non-root sessions never own AMS settings, this plugin, root task records, acceptance records, or the recovery ledger.

## Isolation choices

- `worktree`: default for isolated editing agents. Use `ams-mechanic`, `ams-worker`, or `ams-top-worker`.
- `shared-serialized`: only when required current-checkout or uncommitted state is absent from Claude's isolated worktree. Use the corresponding shared agent and prove exclusive ownership first.
- `shared-readonly`: exploration, review, verification, management, or recovery inspection.

Claude-created subagent worktrees branch by default from the repository default branch, not automatically from the parent session's current `HEAD`, and never inherit uncommitted changes. The work order must identify all required base state. If a worker cannot see a dependency, stop and re-route rather than reimplementing or silently ignoring it.

## Git safety

Explicitly grant `none`, `inspect`, `commit-own-work`, or `integrate`. Preserve user changes. Never clean, reset, stash, switch branches, rewrite history, force push, stage unrelated paths, or delete worktrees without exact authority.

Worker commits must contain only owned changes. Return commit SHA, parent/base evidence, changed paths, worktree identity, and validation. Uncommitted worker changes are not durable evidence.

## Integration

The root decides what to integrate; `ams-integrator` performs integration under exclusive serialized ownership. It verifies repository, branch, dirty boundary, worker commit identity, dependencies, accepted evidence, and conflict policy before mutation.

Integrate in dependency order. Re-run checks against the integrated state. Isolated worker validation does not prove combined correctness. High-risk integrated changes receive independent read-only review before acceptance.

Release ownership only after the session is closed or otherwise proven unable to write and its durable changes/evidence are collected. Cancellation alone is not proof that a writer stopped.
