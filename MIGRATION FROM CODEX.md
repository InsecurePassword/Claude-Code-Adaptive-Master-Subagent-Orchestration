# Codex-to-Claude design mapping

This repository is a clean-room Claude Code adaptation of the AMS architecture. It does not install into, import, mutate, or share runtime state with the Codex package.

| Codex AMS concept | Claude AMS implementation |
|---|---|
| Sol Max root | Claude `best`: Fable when available, otherwise Opus |
| Spark mechanics | Haiku explorer/mechanic/verifier |
| Luna bounded work | Haiku for easy verification; Sonnet when judgment is material |
| Terra development | Sonnet worker/reviewer/integrator |
| Sol difficult work | Opus worker/manager route |
| strongest delegated work | `inherit` top worker/manager |
| custom TOML profile matrix | plugin-shipped named Markdown subagents |
| root-mediated virtual hierarchy | direct workers by default; optional one physical manager layer; flattening fallback |
| `.codex/ams-orchestration.toml` | `.claude/ams-orchestration.json` |
| global `$CODEX_HOME` settings | `${CLAUDE_CONFIG_DIR}` or `~/.claude` |
| Spark availability cache | no cache; Claude `best` and runtime model policy resolve availability |
| installer-managed profiles | Claude plugin discovery; no profile installer |
| Zergling Rush | explicit `zergling-rush` skill with current-turn consent |

Key intentional differences:

- Claude skill activation cannot guarantee a hard every-root-turn bootstrap.
- Claude worktrees start from the default branch, requiring explicit handling of current dirty state.
- physical nested subagents can exist but are optional and capped at one manager layer in 1.0.
- Agent Teams and dynamic workflows are separate opt-in backends rather than normal operation.
- plugin agents cannot define their own permission mode, hooks, or MCP servers.
