# Adaptive Master–Subagent Orchestration for Claude Code

**Current release: 1.0.1**

Claude AMS is an independent Claude Code plugin for cost-first, evidence-driven multi-agent project work. It is modeled after [Codex Adaptive Master–Subagent Orchestration](https://github.com/InsecurePassword/Codex-Adaptive-Master-Subagent-Orchestration), but it does not modify or depend on the Codex package.

The top-level Claude conversation remains the root supervisor. It owns the objective, task graph, topology, routing, integration decisions, validation requirements, evidence acceptance, recovery, completion, and user communication. Routine inspection, implementation, commands, tests, Git execution, integration execution, and independent review are delegated.

The principal goals are:

1. **Use the least expensive model expected to complete each bounded task correctly.**
2. **Finish faster by running useful independent work concurrently.**
3. **Preserve one-writer ownership, evidence custody, validation, and recoverability.**
4. **Map Codex-style logical hierarchy onto Claude-native subagents without pretending Claude transports are identical to Codex sessions.**

## Install

Claude Code 2.1.219 or newer is required.

> **Distribution status:** Claude AMS is **not listed in Anthropic's official plugin marketplace**. This GitHub repository is a **repository-hosted custom marketplace**. The first command below registers this repository as a marketplace source; it does not install from Anthropic's catalog.

### Recommended persistent installation from GitHub

Run these commands in a terminal:

```bash
claude plugin marketplace add InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration --scope user
claude plugin install claude-ams@claude-ams-marketplace --scope user
```

Then start a new Claude Code session, or reload plugins in an existing session:

```text
/reload-plugins
```

Verify registration and installation:

```bash
claude plugin marketplace list --json
claude plugin list
```

The GitHub installation works because this repository contains both:

```text
.claude-plugin/marketplace.json
.claude-plugin/plugin.json
```

Anthropic documents GitHub-hosted custom marketplaces as repositories containing `.claude-plugin/marketplace.json`; users add them with `claude plugin marketplace add owner/repo` and then install a named plugin from that marketplace.

### Repair an earlier failed registration

The previous README advertised the GitHub command before the required marketplace catalog existed. After updating Claude Code to the required version, remove any stale registration and add the corrected repository again:

```bash
claude plugin marketplace remove claude-ams-marketplace --scope user
claude plugin marketplace add InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration --scope user
claude plugin marketplace update claude-ams-marketplace
claude plugin install claude-ams@claude-ams-marketplace --scope user
```

If the remove command reports that the marketplace is not registered, continue with the add command.

### Temporary source-checkout test

A temporary test does not install the plugin persistently:

```bash
git clone https://github.com/InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration.git
cd Claude-Code-Adaptive-Master-Subagent-Orchestration
claude plugin validate . --strict
claude --plugin-dir .
```

### Persistent installation from a local clone

A local clone can also be registered as the custom marketplace source:

```bash
git clone https://github.com/InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration.git
cd Claude-Code-Adaptive-Master-Subagent-Orchestration
claude plugin validate . --strict
claude plugin marketplace add "$PWD" --scope user
claude plugin install claude-ams@claude-ams-marketplace --scope user
```

Windows PowerShell equivalents, managed-workplace restrictions, update, repair, offline/local archive installation, and uninstall procedures are in [INSTALLATION.md](INSTALLATION.md).

For the offline/local-marketplace archive, retain the stable registered source path:

```text
<claude-config-root>/local-marketplaces/claude-ams/current
```

Do not register a new version-specific path during updates.

## Start using AMS

```text
/claude-ams:ams STATUS
AMS ENABLE
AMS MODE auto
AMS RUN audit and finish this project
```

Explicit namespaced invocation is the reliable path. Claude Code can select plugin skills automatically, but it does not provide Codex's guaranteed every-root-turn implicit skill bootstrap.

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
| **Haiku** | Searches, inventories, extraction, routine checks, deterministic mechanical edits, concise logs |
| **Sonnet** | Ordinary coding, debugging, tests, documentation, review, integration, investigation, clear bounded management |
| **Opus** | Architecture, security-sensitive work, difficult ambiguity, consequential cross-component work, advanced management |
| **`inherit`** | Hardest bounded worker or manager subgraph; follows the root's active route |

The root requests Claude Code's `best` route. `best` uses Fable when the organization has Fable access and otherwise uses the supported Opus route. Ordinary workers do not declare Fable directly, so workplace accounts without Fable remain supported.

## Hierarchy

Logical hierarchy is independent from physical invocation:

```text
Logical topology

Root
├── delegated manager
│   ├── worker
│   └── worker
└── direct worker
```

```text
Possible physical topology

Root
├── manager
├── worker logically owned by that manager
└── direct worker
```

Workers are leaves. Managers receive only bounded authority. Every mutable surface has one active writer. Worker and manager completion are evidence claims; only the root accepts project completion.

## Intensity modes

| Mode | Behavior |
|---|---|
| `minimal` | At most one active non-root session |
| `balanced` | Small direct team |
| `auto` | Smallest useful adaptive topology |
| `heavy` | Proactive useful parallelism and optional management |
| `extreme` | Every useful ready safe lane while remaining cost-first |
| `zergling-rush` | Explicit current-turn consent; may replicate, speculate, strengthen routes, and use more capacity |

Actual Claude capacity, organization policy, dependencies, permissions, finite allocation, one-writer ownership, and useful supervision govern.

## Claude backends

- **Direct subagents** are the canonical default.
- **Logical hierarchy** works even when all sessions are root-spawned.
- **Native nesting** is optional and capability-gated.
- **Agent Teams** are experimental, disabled by default, and intended for peer collaboration.
- **Dynamic workflows** are disabled by default and require explicit authorization.

A stored Team or workflow preference is eligibility only, never launch consent. Team and workflow completion remain evidence rather than root acceptance.

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

- Claude Code 2.1.219 or newer;
- access to Haiku, Sonnet, and Opus routes allowed by the organization;
- Fable only when available through `best` or `inherit`;
- Git for GitHub marketplace installation and worktree isolation;
- Agent Teams or dynamic workflows only when the account and runtime support and enable them;
- Python only for source validation and release development, not installed runtime operation.

## Documentation

- [Complete product documentation](PRODUCT%20DOCUMENTATION.md)
- [Installation, update, repair, and uninstall](INSTALLATION.md)
- [Architecture](ARCHITECTURE.md)
- [Security boundary](SECURITY.md)
- [Platform compatibility](docs/PLATFORM-COMPATIBILITY.md)
- [Codex-to-Claude mapping](MIGRATION%20FROM%20CODEX.md)
- [Testing and release gates](TESTING.md)
- [Design decisions](docs/DESIGN-DECISIONS.md)
