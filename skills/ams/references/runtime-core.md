# Claude AMS runtime core

Read completely for active orchestration. Apply higher-priority instructions, normal Claude Code policy and permissions, recognized repository instructions, and project-native workflows first.

## Goals

In order:

1. complete the user objective correctly;
2. minimize avoidable usage by selecting the lowest model expected to complete each bounded task reliably;
3. reduce wall-clock time with useful independent concurrency;
4. preserve user work, one-writer ownership, evidence quality, and recoverability.

Normal modes never spend stronger models merely to fill capacity. Zergling Rush may relax economic restraint only under its separate current-turn consent contract.

## Root execution boundary

The current main conversation is the sole root. It owns objective interpretation, acceptance criteria, task graph, dependencies, topology, routing, dispatch, ownership, integration decisions, validation, recovery, completion, and user communication.

The root does not perform routine project execution. Delegate repository inspection, research, source edits, documentation edits, command execution, testing, builds, linting, type checks, reproductions, artifact generation, Git/history operations, deployment, integration execution, and independent review. A task being small, urgent, difficult, on the critical path, or failed once does not justify root takeover. Correct the order, change the route, reassign, decompose, or report a genuine block.

The root may read and write only AMS control state, invoke packaged references, maintain task records, evaluate evidence, and communicate decisions.

## Required references

Before first dispatch, read:

- `project-control.md` for the effective project/global settings source and current steering;
- `model-routing.md`;
- `backend-selection.md`;
- `intensity-control.md`;
- `work-order-control.md`;
- `ownership-and-integration.md`;
- `security-boundary.md`;
- `validation-and-completion.md`.

Read `hierarchy-control.md` before any manager order, descendant spawn/request, evidence relay, or custody change. Read `recovery.md` for resumption or durable state. Read `zergling-rush.md` only for a current Rush candidate.

## Orchestration loop

Until terminal:

1. Establish the objective, mandatory deliverables, acceptance criteria, exclusions, constraints, and user authority.
2. Resolve effective settings and current-turn steering. Record source, intensity, backend, enabled optional features, and applicable limits.
3. Commission bounded inspection of live project state rather than assuming old reports are current.
4. Build a dependency-aware task graph with ready, active, blocked, completed, accepted, rejected, and superseded states.
5. Partition meaningful independently verifiable lanes. Merge fragments whose coordination cost exceeds their value.
6. Select the smallest useful topology, backend, role, model route, effort, tools, isolation, and validation for each lane.
7. Assign immutable work-order IDs and non-overlapping write ownership before dispatch.
8. Monitor progress, requested versus observed identity, permissions, ownership, dependencies, deviations, and evidence.
9. Route worker results through their logical parent. Reconcile conflicts and commission proportional independent checks.
10. Commission serialized integration in dependency order. Validate the integrated state, not only isolated worker state.
11. Perform a final gap analysis against the original objective and acceptance criteria. Dispatch any missing work.
12. Close or account for all relevant sessions and ownership before reporting completion.

## Adaptation

Split, merge, flatten, deepen by one permitted manager layer, cancel, replace, resequence, or escalate when evidence warrants it. A parent change closes or supersedes the old order and creates a new ID; never rewrite lineage in place. Do not repeat an unchanged failed setup.

Classify failures before retrying:

- missing or noisy context;
- defective decomposition or success criteria;
- unavailable model, tool, permission, or backend;
- ownership conflict;
- implementation defect;
- validation defect;
- transient capacity or transport problem;
- local policy refusal;
- genuine operator decision.

A local failure does not automatically block independent lanes. Continue authorized safe work while preserving the blocked chain and exact next action.

## Acceptance

A worker result is a leaf claim. A manager result is a subgraph claim. A passing command is evidence about the tested state. Only the root accepts deliverables and declares the project complete.

Never claim success from an empty worker set, a clean tree, one passing test, a commit, a handoff, or a local completion statement while mandatory work remains. Never claim a check passed when it was skipped, ambiguous, stale, or run against the wrong state.
