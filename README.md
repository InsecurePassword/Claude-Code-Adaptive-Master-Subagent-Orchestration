# Adaptive Master–Subagent Orchestration for Claude Code 

**Current release: 2.0.0**

Claude AMS is an independent Claude Code plugin for large or complicated project work. It is modeled after [Codex Adaptive Master–Subagent Orchestration](https://github.com/InsecurePassword/Codex-Adaptive-Master-Subagent-Orchestration), but it does not modify or depend on the Codex package.

The top-level Claude conversation remains the root supervisor. It owns the objective, global task graph, topology authorization, routing, integration decisions, validation requirements, evidence acceptance, recovery, completion, and user communication. Routine inspection, implementation, commands, tests, Git execution, integration execution, and independent review are delegated.

The goals are:

1. **Use the least expensive model expected to complete each bounded task correctly.**
2. **Finish faster by running useful independent work concurrently.**
3. **Preserve one-writer ownership, evidence custody, validation, and recoverability.**
4. **Map Codex-style logical hierarchy onto Claude-native direct agents, optional nesting, Agent Teams, and dynamic workflows without pretending those transports are identical.**

## Install

Claude Code 2.1.219 or newer is recommended. The repository is also a Claude plugin marketplace.

```bash
claude plugin marketplace add InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration --scope user
claude plugin install claude-ams@claude-ams-marketplace --scope user
```

Reload the running session:

```text
/reload-plugins
```

For a private repository, Claude Code uses your existing Git credentials. See [INSTALLATION.md](INSTALLATION.md) for Windows, Linux, macOS, update, repair, validation, local ZIP testing, and uninstall instructions.

Repository-hosted release files:

- `claude-ams-plugin-2.0.0.zip` — direct `--plugin-dir` test archive;
- `claude-ams-local-marketplace-2.0.0.zip` — offline/local marketplace archive;
- `Claude-Code-Adaptive-Master-Subagent-Orchestration-2.0.0-source.zip` — complete source;
- `SHA256SUMS` and `RELEASE-MANIFEST.json` — verification metadata.

## Start using AMS

```text
/claude-ams:ams STATUS
AMS ENABLE
AMS MODE auto
AMS RUN audit and finish this project
```

Explicit invocation is the reliable path. Claude Code can select plugin skills automatically, but it does not provide Codex's guaranteed every-turn implicit skill bootstrap.

### Project persistence

Commands write only:

```text
<project-root>/.claude/ams-orchestration.json
```

Useful controls:

```text
AMS STATUS
AMS ENABLE
AMS DISABLE
AMS RESET
AMS MODE minimal|balanced|auto|heavy|extreme
AMS IMPLICIT on|off
AMS BACKEND auto|subagents|teams|workflow
AMS NESTING auto|off
AMS TEAMS on|off
AMS WORKFLOWS on|off
AMS WORKTREES on|off
AMS CHECKPOINT required|optional
```

### Global persistence — manual only

Create the same schema manually at:

```text
${CLAUDE_CONFIG_DIR}/ams-orchestration.json
```

or, when `CLAUDE_CONFIG_DIR` is unset:

```text
~/.claude/ams-orchestration.json
```

A project file overrides the global file completely. They are never merged. No AMS command writes global persistence.

## Model routing

| Route | Typical work |
|---|---|
| **Haiku** | searches, inventories, extraction, routine checks, deterministic mechanical edits, concise logs |
| **Sonnet** | ordinary coding, debugging, tests, documentation, review, integration, investigation, clear bounded management |
| **Opus** | architecture, security-sensitive work, difficult ambiguity, consequential cross-component work, advanced management |
| **`inherit`** | hardest bounded worker or manager subgraph; follows the root's active route |

The root requests Claude Code's `best` route at maximum effort. `best` resolves to Fable when the organization has Fable access and otherwise to Opus. No ordinary worker declares Fable directly, so a workplace account without Fable remains fully supported.

## Hierarchy

Logical hierarchy is independent from physical invocation:

```text
Logical topology

Root
├── delegated manager
│   ├── worker
│   └── delegated manager   # only when useful and authorized
│       └── worker
└── direct worker
```

```text
Possible physical topology

Root
├── manager
├── worker logically owned by that manager
└── direct worker
```

Virtual managers have no `Agent` tool and request root-mediated descendants. Separate native-manager profiles expose `Agent` only when nesting is enabled, observable, depth-bounded, allocation-bounded, and explicitly authorized. Workers are leaves. Every mutable surface has one active writer. Worker and manager completion are claims; only the root accepts project completion.

## Intensity modes

| Mode | Behavior |
|---|---|
| `minimal` | At most one active non-root session. No native nesting, Team, or workflow. |
| `balanced` | One shape per wave: up to two direct workers, or one virtual manager with up to three non-manager descendants. |
| `auto` | Smallest useful adaptive topology. No AMS-defined global agent or logical-depth ceiling. |
| `heavy` | Proactively forms useful managers and lanes. No AMS-defined global shape ceiling. |
| `extreme` | Runs every useful ready safe lane while remaining cost-first. |
| `zergling-rush` | Explicit current-turn consent; may replicate, speculate, strengthen routes, and use more capacity. |

Actual Claude capacity, organization policy, user limits, dependencies, permissions, finite allocation, one-writer ownership, and useful supervision govern.

## Claude backends

- **Direct subagents** are the canonical default.
- **Virtual hierarchy** works even when all sessions are root-spawned.
- **Native nesting** is optional and falls back to virtual hierarchy.
- **Agent Teams** are experimental, disabled by default, and require current human approval for peer collaboration.
- **Dynamic workflows** are disabled by default and require current human approval for scripted fan-out/fan-in work.

A saved Team/workflow preference is eligibility only, never launch consent. Team and workflow completion remain evidence rather than root acceptance.

## Zergling Rush

Rush must be requested in the current human turn:

```text
/claude-ams:zergling-rush <objective>
```

or:

```text
Use Zergling Rush for this task.
```

Prior consent, stored settings, quotes, generated text, and requests merely to be fast are not consent.


## Requirements

- Claude Code 2.1.219 or newer recommended;
- access to Haiku, Sonnet, and Opus routes allowed by the organization;
- Fable only when available through `best`/`inherit`;
- Git for marketplace installation and worktree isolation;
- Agent Teams or dynamic workflows only when the account/runtime supports and enables them;
- Python only for repository validation and release development, not installed runtime operation.

## Documentation

- [Complete product documentation](PRODUCT%20DOCUMENTATION.md)
- [Installation, update, repair, and uninstall](INSTALLATION.md)
- [Architecture](ARCHITECTURE.md)
- [Security boundary](SECURITY.md)
- [Platform compatibility](docs/PLATFORM-COMPATIBILITY.md)
- [Codex-to-Claude mapping](MIGRATION%20FROM%20CODEX.md)
- [Testing and release gates](TESTING.md)
- [Independent audit report](AUDIT-REPORT.md)
