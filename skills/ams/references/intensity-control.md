# Intensity control

Intensity changes useful concurrency and topology, not correctness, safety, model fitness, ownership, or validation.

| Mode | Posture | Canonical concurrency |
|---|---|---:|
| `minimal` | One active non-root session. Serial direct worker only. No manager, team, workflow, or duplicate investigation. | 1 |
| `balanced` | Small direct team with at most three active subagents. No physical manager layer. | 3 |
| `auto` | Smallest beneficial adaptive topology. May use one manager layer when available. | 6 |
| `heavy` | Proactively forms useful independent lanes and one bounded manager layer. | 10 |
| `extreme` | Runs every useful ready safe lane, including high-value independent validation. Remains cost-first. | 16 |

Configured limits may lower these ceilings but never raise them. `maxConcurrentSubagents` cannot exceed 20 or the selected mode ceiling. `maxSubagentsPerObjective` bounds total direct and nested Agent-tool dispatch for the objective. `maxWorkflowAgents` cannot exceed 16.

Do not manufacture work, managers, duplicate investigations, or reviews to fill capacity. Respect dependencies and one-writer ownership before concurrency.

A mode change stops incompatible new dispatch, lets safe atomic work reach a useful boundary, collects evidence, releases ownership only after closure is proven, and continues under the new posture. Parent changes require new work-order IDs.

Zergling Rush is not a normal intensity. It requires current-turn consent and follows `zergling-rush.md`.
