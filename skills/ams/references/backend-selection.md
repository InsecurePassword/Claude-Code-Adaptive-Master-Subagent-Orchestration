# Backend selection

## Default: direct subagents

Use root-spawned direct subagents for ordinary AMS work. They provide bounded context, named role contracts, tool restrictions, model selection, background execution, and worktree isolation without requiring peer communication.

`backend = "auto"` begins with direct subagents and selects another backend only when its feature is enabled, current authority permits it, and it adds material value.

## Physical nesting

Nested subagents are optional. Use one physical manager layer only when:

- `features.nestedSubagents = "auto"`;
- `limits.maxLogicalDepth = 2`;
- Claude Code exposes the `Agent` tool to the manager;
- a manager materially improves context isolation, decomposition, or evidence consolidation;
- the manager has finite descendant allocation and explicit delegable scope.

Claude AMS 1.0 permits `root -> manager -> worker`, never a physical manager below a manager. If nesting is off, unavailable, or fails, preserve the logical manager relationship and flatten requested workers into direct root dispatch. Do not block the objective solely because physical nesting is unavailable.

## Agent Teams

Agent Teams are off by default and require both `features.agentTeams = true` and a task whose agents need direct lateral communication, shared hypothesis testing, or coordinated planning. Do not use teams merely for parallel independent work.

Before creating a team, define teammate model, role, file ownership, task boundary, communication need, and shutdown condition. Teammates do not provide automatic worktree isolation; never assign overlapping writers. Team lifecycle limitations require root-owned recovery records and replacement work rather than pretending terminated teammates remain resumable.

## Dynamic workflows

Dynamic workflows are off by default. They require:

- `features.dynamicWorkflows = true`;
- current-turn user authorization for workflow use;
- a repetitive fan-out/fan-in shape that benefits from scripted orchestration;
- no unresolved need for mid-run user decisions;
- bounded agent count at or below `limits.maxWorkflowAgents` and the platform limit.

Workflow agents run with inherited permissions and auto-accepted edits. Therefore the bundled `zergling-audit-readonly` workflow is analysis-only. Do not use a write-capable workflow unless the user explicitly authorizes that risk and ownership can be isolated.

## Backend precedence

1. Direct subagents for independent ordinary work.
2. One manager layer when supervision materially reduces complexity.
3. Agent Teams only for genuine peer communication.
4. Dynamic workflows only for explicit, bounded high-scale fan-out.

When a selected optional backend is unavailable, fall back to the safest direct topology without weakening model, ownership, or validation requirements.
