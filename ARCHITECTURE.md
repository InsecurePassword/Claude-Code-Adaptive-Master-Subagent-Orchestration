# Architecture

## Logical topology

```text
Claude Code main session (`best`)
|-- root objective and task graph
|-- model/backend/ownership router
|-- evidence and acceptance controller
|-- direct workers
|-- optional delegated manager
|   `-- workers
|-- optional Agent Team
`-- explicit read-only workflow
```

The logical tree is recorded by immutable work-order lineage. Physical nesting is optional. When a manager cannot spawn, it returns dispatch requests and the root starts the workers directly.

## Control plane and execution plane

### Root control plane

- settings and capability resolution;
- objective and acceptance criteria;
- task graph, dependencies, routes, topology, and allocation;
- ownership registry;
- result reconciliation;
- integration decisions;
- validation plan;
- recovery and final response.

### Delegated execution plane

- repository inspection and research;
- implementation and documentation;
- commands, tests, builds, and reproductions;
- Git operations authorized by work order;
- integration execution;
- independent review.

The root never takes over execution merely because a lane is difficult or failed.

## Route architecture

The model ladder is monotonic:

```text
haiku < sonnet < opus < inherit(best)
```

Work orders carry both requested route and model ceiling. A manager can narrow but not raise the ceiling. `inherit` agents provide the only Fable-capable subagent route, avoiding a hard Fable dependency on workplace accounts.

## Isolation architecture

Editing roles have paired isolated/shared variants. Worktree roles are the default. Shared roles require explicit exclusive ownership and exist because Claude worktrees do not automatically inherit the parent session's dirty/current-HEAD state.

Integration is a separate serialized role. This prevents parallel workers from racing on the authoritative checkout.

## State architecture

Configuration is strict JSON with project-over-global replacement semantics. Recovery state is local, root-owned, optional, compact, and schema-validated. Neither is embedded in the plugin cache.

## Failure architecture

Failures are classified before retry. The root changes context, order, route, ownership, backend, or topology; it does not repeat an unchanged setup. Optional backend failure flattens to direct subagents. Local blocks do not stop independent safe lanes.

## Acceptance architecture

Evidence flows from worker to logical parent to root. Integration and validation run against the combined state. A separate reviewer is used where failure cost warrants it. Only the root can accept completion.
