# Installation and maintenance

## Requirements

Claude AMS 1.0.1 requires:

- Claude Code 2.1.219 or newer;
- Git when installing from GitHub;
- access to the Haiku, Sonnet, and Opus routes permitted by the organization;
- Fable only when available through Claude Code's `best` or `inherit` routing.

Fable is optional. A workplace account without Fable requires no package changes: the root's `best` route resolves to the permitted Opus route.

## Distribution model

Claude AMS is **not listed in Anthropic's official plugin marketplace**. This repository is a **GitHub-hosted custom marketplace**.

Claude Code supports custom marketplaces declared by:

```text
.claude-plugin/marketplace.json
```

The catalog in this repository exposes the plugin as:

```text
claude-ams@claude-ams-marketplace
```

## Recommended GitHub installation

Run:

```bash
claude plugin marketplace add InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration --scope user
claude plugin install claude-ams@claude-ams-marketplace --scope user
```

Start a new Claude Code session or reload plugins:

```text
/reload-plugins
```

Verify the marketplace and plugin:

```bash
claude plugin marketplace list --json
claude plugin list
```

Inside Claude Code, verify the skill:

```text
/claude-ams:ams STATUS
```

## Repair the previously broken registration

Earlier repository instructions advertised the GitHub command before the required marketplace catalog and runtime files existed. Remove a stale registration, then add the corrected source:

```bash
claude plugin marketplace remove claude-ams-marketplace --scope user
claude plugin marketplace add InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration --scope user
claude plugin marketplace update claude-ams-marketplace
claude plugin install claude-ams@claude-ams-marketplace --scope user
```

A message saying the marketplace was not registered is harmless; continue with the add command.

## Install from a local clone

This is useful when a managed environment permits a local approved checkout but blocks direct GitHub marketplace retrieval.

### Linux or macOS

```bash
git clone https://github.com/InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration.git
cd Claude-Code-Adaptive-Master-Subagent-Orchestration
claude plugin validate . --strict
claude plugin marketplace add "$PWD" --scope user
claude plugin install claude-ams@claude-ams-marketplace --scope user
```

### Windows PowerShell

```powershell
git clone https://github.com/InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration.git
Set-Location .\Claude-Code-Adaptive-Master-Subagent-Orchestration
claude plugin validate . --strict
$Source = (Get-Location).Path
claude plugin marketplace add $Source --scope user
claude plugin install claude-ams@claude-ams-marketplace --scope user
```

## Temporary test without installation

From a clone of the repository:

```bash
claude plugin validate . --strict
claude --plugin-dir .
```

`--plugin-dir` loads the plugin only for that Claude Code process. There is no persistent plugin record to uninstall afterward.

## Initial activation

From a trusted project:

```text
/claude-ams:ams STATUS
AMS ENABLE
AMS MODE auto
```

Project settings are written only to:

```text
<project-root>/.claude/ams-orchestration.json
```

Explicit one-objective use does not require persistent enablement:

```text
AMS RUN <objective>
```

## Manual global persistence

AMS commands never write global configuration. To provide defaults for projects without a project file, manually copy a valid example to:

```text
${CLAUDE_CONFIG_DIR}/ams-orchestration.json
```

When `CLAUDE_CONFIG_DIR` is unset, use:

```text
~/.claude/ams-orchestration.json
```

On Windows, `~/.claude` resolves beneath `%USERPROFILE%`.

A project file replaces the global file completely. They are never merged. An invalid project file blocks implicit activation instead of falling back to the global file.

A conservative workplace configuration is provided at:

```text
examples/global-work.json
```

It disables native nesting, Agent Teams, and dynamic workflows while retaining direct cost-first subagents.

## Optional physical nesting

Logical manager-worker hierarchy works without native nesting. To permit one physical manager-to-worker layer, configure Claude Code before session start:

```json
{
  "env": {
    "CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH": "2"
  }
}
```

AMS additionally requires `nestedSubagents: "auto"` and `maxLogicalDepth: 2`. When native nesting is unavailable, AMS flattens physical dispatch through the root while preserving logical parentage.

## Agent Teams and workflows

These backends are disabled by default:

```text
AMS TEAMS on
AMS WORKFLOWS on
```

Enabling a backend establishes eligibility only. Agent Teams are for genuine peer communication. Dynamic workflows require explicit current-turn authorization. The bundled workflow is read-only:

```text
/claude-ams:zergling-audit-readonly
```

## Update

Refresh the registered custom marketplace, then update the plugin:

```bash
claude plugin marketplace update claude-ams-marketplace
claude plugin update claude-ams@claude-ams-marketplace --scope user
```

Reload plugins afterward:

```text
/reload-plugins
```

Verify:

```text
/claude-ams:ams STATUS
```

If an update remains stale, remove and re-add the marketplace using the repair procedure above. Claude Code caches plugins by version, so every published package revision must update `.claude-plugin/plugin.json` and the marketplace version.

## Uninstall

```bash
claude plugin uninstall claude-ams@claude-ams-marketplace --scope user
claude plugin marketplace remove claude-ams-marketplace --scope user
```

Removing the marketplace is optional when other plugins from the same source are installed.

Uninstalling the plugin does not remove project or global AMS state. Preserve these unless their exact removal is separately authorized:

```text
<project-root>/.claude/ams-orchestration.json
<project-root>/.claude/ams-recovery.local.json
${CLAUDE_CONFIG_DIR}/ams-orchestration.json
~/.claude/ams-orchestration.json
```

## Managed workplace restrictions

Administrators can restrict custom marketplaces with Claude Code managed settings such as known-marketplace policies. Claude AMS does not bypass those controls. When the GitHub repository is blocked, an administrator must allow the exact source or provide an approved internal mirror.

## Troubleshooting

### Marketplace add fails

Confirm:

1. Claude Code is at least 2.1.219;
2. Git can access the repository;
3. the organization permits this custom marketplace source;
4. no stale registration is masking the corrected catalog;
5. `.claude-plugin/marketplace.json` exists in the repository default branch.

Then run the repair sequence.

### Plugin installs but the skill is missing

Run:

```text
/reload-plugins
```

Then verify:

```text
/claude-ams:ams STATUS
```

Also inspect:

```bash
claude plugin list
```

### Fable is unavailable

This is expected on accounts or organizations without Fable entitlement. The AMS root falls back through `best`; top delegated routes use `inherit`; routine work remains on Haiku and Sonnet.

### Native nesting is unavailable

AMS continues with a physically flat, root-mediated logical hierarchy. Native nesting is optional and must not block ordinary operation.
