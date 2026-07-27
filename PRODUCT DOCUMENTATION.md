# Product documentation

**Product:** Adaptive Master–Subagent Orchestration for Claude Code  
**Plugin:** `claude-ams`  
**Release:** 1.0.1

## 1. Purpose

Claude AMS turns the top-level Claude Code session into a cost-aware supervisor. It decomposes an objective, assigns bounded work to specialized subagents, protects write ownership, reconciles evidence, commissions integration and validation, and decides completion.

The plugin does not replace Claude Code permissions or project instructions. It does not require Fable, Agent Teams, dynamic workflows, physical nesting, Python, Node, or a custom LLM gateway during normal operation.

## 2. Root and model fallback

The normal root skill uses:

```yaml
model: best
effort: high
```

`best` means Fable when the organization has access and otherwise Opus. The explicit Zergling skill uses the same model route at maximum effort.

The root does not execute routine project work. It owns:

- objective interpretation and acceptance criteria;
- global task graph, dependencies, and critical path;
- direct and logical topology;
- model, role, effort, tool, backend, and isolation selection;
- writer ownership and integration decisions;
- validation and review requirements;
- evidence acceptance, interruption, recovery, completion, and user communication.

## 3. Model ladder

| Route | Agent profiles | Work |
|---|---|---|
| Haiku | explorer, mechanic, shared mechanic, verifier | bounded mechanics and inexpensive verification |
| Sonnet | worker, shared worker, reviewer, integrator, recovery inspector | normal development and review |
| Opus | manager or per-dispatch stronger worker | difficult, architectural, security-sensitive, high-cost failure |
| inherit | top worker/shared worker/top manager | strongest available root-equivalent task: Fable or Opus |

The root chooses the lowest route expected to complete the full work order reliably. A cheap result is not automatically accepted; validation remains proportional to risk.

## 4. Agent catalog

### `ams-explorer`

Read-only Haiku discovery: files, symbols, dependencies, history, inventories, and evidence maps.

### `ams-mechanic`

Haiku isolated-worktree writer for deterministic exact-scope changes.

### `ams-shared-mechanic`

Haiku serialized shared-checkout writer when the task depends on current uncommitted state that a worktree cannot see.

### `ams-verifier`

Read-only Haiku commands and objective checks. It cannot change source or baselines.

### `ams-worker`

Sonnet isolated-worktree implementation, debugging, tests, and documentation.

### `ams-shared-worker`

Sonnet serialized shared-checkout implementation for an unavoidable current-checkout dependency.

### `ams-top-worker`

Inherited strongest-route isolated worker. Fable when available through `best`; otherwise Opus.

### `ams-top-shared-worker`

Inherited strongest-route shared serialized worker.

### `ams-reviewer`

Independent read-only Sonnet correctness, regression, architecture, and security review.

### `ams-integrator`

Serialized Sonnet integration in the authoritative checkout. It applies accepted worker commits and validates combined state.

### `ams-manager`

Opus bounded manager. It may spawn workers only when physical nesting is available; otherwise it returns dispatch requests for root-mediated flattening.

### `ams-top-manager`

Inherited strongest-route bounded manager for a hardest subgraph.

### `ams-recovery-inspector`

Read-only Sonnet reconstruction of live Git, worktree, artifact, and validation state.

## 5. Settings

Project:

```text
<project-root>/.claude/ams-orchestration.json
```

Global manual default:

```text
${CLAUDE_CONFIG_DIR}/ams-orchestration.json
```

Fallback:

```text
~/.claude/ams-orchestration.json
```

Precedence is project, then global, then disabled in-memory default. Files are never merged.

```json
{
  "schemaVersion": 1,
  "enabled": false,
  "allowImplicitInvocation": true,
  "intensity": "auto",
  "backend": "auto",
  "features": {
    "nestedSubagents": "auto",
    "agentTeams": false,
    "dynamicWorkflows": false
  },
  "limits": {
    "maxConcurrentSubagents": 6,
    "maxSubagentsPerObjective": 40,
    "maxLogicalDepth": 2,
    "maxWorkflowAgents": 12
  },
  "isolation": {
    "worktrees": true,
    "requireCheckpointForUncommittedDependencies": true
  }
}
```

Unknown keys, coercion, duplicate keys, extra objects, unsupported schemas, unsafe paths, or out-of-range values are rejected.

## 6. Command reference

### `AMS STATUS`

Read-only inspection of project/global paths, validity, effective source, settings, platform capabilities, and activation blockers.

### `AMS ENABLE`

Creates or updates project settings with `enabled: true`.

### `AMS DISABLE`

Stops new dispatch, drains safe work, collects evidence, closes/reconciles ownership, records exact recovery information, then persists `enabled: false`.

### `AMS RESET`

Replaces project settings with the exact disabled default. It does not touch global settings or recovery state.

### `AMS MODE minimal|balanced|auto|heavy|extreme`

Enables AMS and stores the selected mode with its canonical concurrency and depth limits.

### `AMS IMPLICIT on|off`

Controls description-driven implicit activation eligibility. It does not disable explicit invocation.

### `AMS BACKEND auto|subagents|teams|workflow`

Selects the preferred backend. Optional backends must also be enabled and appropriate.

### `AMS NESTING auto|off`

Allows one physical manager layer when Claude Code exposes nesting. `off` forces depth one.

### `AMS TEAMS on|off`

Controls Agent Teams eligibility. Teams remain task-conditional.

### `AMS WORKFLOWS on|off`

Controls dynamic-workflow eligibility. Every workflow run still needs current-turn authorization.

### Limits

```text
AMS LIMIT CONCURRENCY <1..20>
AMS LIMIT TOTAL <1..200>
AMS LIMIT DEPTH 1|2
AMS LIMIT WORKFLOW <1..16>
```

Mode ceilings still apply.

### Isolation

```text
AMS WORKTREES on|off
AMS CHECKPOINT required|optional
```

Turning worktrees off does not allow overlapping shared writers. `optional` never permits a worker to assume unavailable uncommitted state.

### `AMS RUN <objective>`

Explicit current-objective activation without persistent enablement.

## 7. Intensity

`minimal` is root plus one serial worker. `balanced` uses up to three direct workers. `auto` chooses the smallest useful topology up to six. `heavy` proactively uses up to ten useful lanes. `extreme` uses up to sixteen useful safe lanes but remains cost-first.

Zergling Rush is a separate explicit economic override. Its skill and stored mode token are `zergling-rush`. It can use duplicate investigations, stronger models, speculative preparation, teams, or the read-only workflow when justified. Safety, ownership, and acceptance never weaken.

## 8. Backends

### Direct subagents

Default and preferred. Best for independent bounded tasks and worktree isolation.

### Nested subagents

One manager layer only. The manager receives finite allocation and cannot create another manager. When nesting is unavailable, the root physically spawns requested workers while preserving logical parentage.

### Agent Teams

Use only when peers need direct communication. Teams are off by default, consume more usage, and do not provide automatic worktree isolation.

### Dynamic workflows

Use only for explicit repetitive fan-out/fan-in. Workflow scripts cannot directly access files or shells, but their agents inherit session tools and auto-accept edits. The bundled workflow is therefore read-only.

## 9. Work orders and results

Every subagent receives a stable `WO-...` order with root objective, logical parent, exact role/authority, backend, route and ceiling, scope, ownership, isolation, tools, validation, deviation triggers, and return contract.

Workers are leaves. Managers may request or spawn workers only within finite scope and allocation. Results report requested route and observed model separately. `unverified` is mandatory when exact identity is not exposed.

Normative machine-readable contracts are under `schemas/`.

## 10. Ownership and worktrees

Only one active writer may own a file or ancestor/descendant path surface. Read-only agents may overlap.

Claude subagent worktrees branch from the repository default branch, not automatically from the parent session's current `HEAD`, and do not inherit uncommitted changes. Isolated writers are preferred. Shared writers exist only to handle a required current-checkout dependency under exclusive serialized ownership.

The integrator is the sole authoritative integration writer. It combines accepted worker commits and runs integrated validation.

## 11. Validation and acceptance

The root selects syntax, schema, lint, type, unit, regression, build, runtime, artifact, security, architecture, and documentation checks proportional to failure cost. Non-root agents execute them.

High-risk implementation receives independent review. Review findings are triaged rather than recursively reviewed without new evidence. Only the root accepts and declares completion.

## 12. Recovery

Use project-native state when available. Otherwise the root may create:

```text
<project-root>/.claude/ams-recovery.local.json
```

The ledger stores objective, settings source, work-order lineage, routes, ownership, Git/worktree identity, evidence, validation, blockers, and exact next action. It never stores private reasoning or entire transcripts.

Recovery re-verifies live state through read-only inspectors, preserves historical lineage, reclaims ownership only after writer closure is proven, and resumes from the earliest unfinished dependency.

## 13. Installation and package maintenance

Claude Code owns plugin installation and removal. Claude AMS has no self-updater or model-profile installer. The release provides three deterministic archives: a direct plugin ZIP, a self-contained local marketplace ZIP, and a complete source ZIP. `SHA256SUMS` and `RELEASE-MANIFEST.json` authenticate the archive set. Updates replace a fully validated generation and preserve settings/recovery outside the plugin cache.

The release builder refuses a dirty Git tree by default, normalizes archive timestamps and permissions, and records source identity, file-inventory hashes, byte lengths, entry counts, and artifact SHA-256 values. The verifier independently reopens every archive and rejects traversal, duplicate names, case collisions, links, nonregular members, identity drift, broken packaged Markdown links, nested-marketplace divergence, and checksum mismatch.

## 14. Known platform limits

- implicit skill activation is description-driven rather than a guaranteed every-turn bootstrap;
- organization model policies and `CLAUDE_CODE_SUBAGENT_MODEL` may alter requested routing;
- plugin subagents cannot enforce per-agent hooks, MCP servers, or permission mode;
- physical nesting must be enabled before the session;
- Agent Teams and workflows have independent lifecycle and permission constraints;
- workflow agents auto-accept edits, so write workflows require exceptional explicit authorization.

These limitations fail back to direct bounded subagents rather than blocking ordinary AMS operation.

