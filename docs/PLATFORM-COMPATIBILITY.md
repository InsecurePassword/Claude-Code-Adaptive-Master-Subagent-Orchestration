# Claude Code platform compatibility

This document records the external Claude Code contracts used by Claude AMS 1.0.1. It is reference material, not runtime instruction.

## Minimum supported version

Claude AMS requires **Claude Code 2.1.219 or newer**.

The baseline is deliberate. Claude AMS depends on the current `best` model alias, Opus 5 routing, strict plugin and marketplace validation, plugin skills, plugin-shipped subagents, model allowlists, worktree isolation protections, optional nested subagents, and dynamic workflows. Later Claude Code releases remain supported when they preserve those contracts.

## Model contracts

- `best` resolves to Fable for an organization with Fable access and otherwise resolves to the latest permitted Opus model.
- Fable can be unavailable because of account entitlement, organization policy, provider support, or zero-data-retention configuration.
- subagent model frontmatter accepts `haiku`, `sonnet`, `opus`, `fable`, and `inherit`.
- Claude AMS intentionally declares Fable only through `best` and `inherit`; ordinary agents request Haiku, Sonnet, or Opus directly.
- organization `availableModels` policy applies to main sessions, skills, and subagents. A blocked skill or subagent override can fall back to the inherited or default model.
- `CLAUDE_CODE_SUBAGENT_MODEL` can override requested subagent routes. AMS therefore distinguishes requested identity from observed identity and reports `unverified` when the runtime exposes no trustworthy observation.
- skill and subagent effort accepts `low`, `medium`, `high`, `xhigh`, and `max`, subject to model support.

## Plugin and skill contracts

- only `.claude-plugin/plugin.json` belongs inside `.claude-plugin/`; `skills/`, `agents/`, and `workflows/` belong at the plugin root.
- plugin skills are namespaced as `/plugin-name:skill-name`.
- plugin ZIPs are accepted by `--plugin-dir` on Claude Code 2.1.128 and newer; the higher AMS minimum still governs this package.
- strict validation treats warnings as release failures.
- plugin agents support model, effort, max turns, tool allowlists, disallowed tools, memory, background execution, and `worktree` isolation.
- plugin-scoped agent hooks, MCP servers, and permission mode are not honored; AMS does not pretend those fields can enforce policy.

## Subagent and worktree contracts

- direct subagents are the normal backend.
- physical nested subagents are disabled by default and can be enabled before session start through `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`.
- Claude AMS 1.0 uses at most one physical manager layer: root, manager, workers.
- isolated subagent worktrees branch from the repository default branch by default, not automatically from the parent session's current `HEAD`.
- isolated worktrees do not inherit uncommitted parent-checkout changes.
- Claude Code's platform defaults permit substantially more sessions than AMS normal modes. AMS intentionally applies lower cost and coordination ceilings.
- `PowerShell` is a real Claude Code tool when enabled. On Windows Claude Code can fall back to PowerShell when Git Bash is unavailable; Bash remains available when the environment supports it.

## Optional backend contracts

### Agent Teams

Agent Teams are experimental and disabled by default. They are appropriate only when peers require direct communication, competing hypotheses, or coordinated planning. Current limitations include one team per session, no nested teams, fixed leadership, and no in-process resumption of terminated teammates. Teams do not provide automatic worktree isolation.

### Dynamic workflows

Dynamic workflows are plugin-distributable and support top-level `await`, `agent()`, `pipeline()`, structured arguments, and per-stage model selection. A workflow can run at most sixteen agents concurrently. Workflow scripts cannot directly perform arbitrary filesystem or shell operations, but workflow agents inherit the session tool allowlist and accept file edits automatically. Claude AMS therefore ships only a read-only audit workflow.

## Configuration paths

Claude Code resolves `~/.claude` to `%USERPROFILE%\.claude` on Windows. When `CLAUDE_CONFIG_DIR` is set, that directory replaces the normal user Claude configuration root. Claude AMS uses the same rule for its manual global settings file.

## Official references

- https://code.claude.com/docs/en/model-config
- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/plugins-reference
- https://code.claude.com/docs/en/plugin-marketplaces
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/agent-teams
- https://code.claude.com/docs/en/workflows
- https://code.claude.com/docs/en/tools-reference
- https://code.claude.com/docs/en/claude-directory
- https://code.claude.com/docs/en/settings
