# Design decisions

## No direct Fable profile

A direct `model: fable` profile would make workplace availability a failure path. `best` and `inherit` provide automatic entitlement-aware fallback while keeping Fable available for top-tier work.

## No installer scripts

Claude Code already owns plugin discovery, validation, update, enablement, and removal. Additional platform installers would duplicate authority and create mixed-generation risk.

## No mandatory hook bootstrap

A command hook would require a cross-platform runtime not guaranteed by native Claude Code. A prompt hook would add a model call to every prompt. AMS instead uses a broad skill description plus deterministic explicit invocation.

## Direct subagents first

Direct subagents provide the strongest combination of availability, model/tool control, context isolation, and predictable evidence return. Nesting, teams, and workflows fail back to this backend.

## Paired isolated/shared writers

Worktree isolation is safest, but Claude-created worktrees cannot see parent uncommitted state. Shared variants close that gap under strict serialized ownership without requiring root execution.

## Read-only bundled workflow

Workflow agents auto-accept edits. Shipping a general write workflow would create a poor default security boundary. The bundled workflow provides high-scale audit value without intentionally mutating project state.

## All rights reserved at initial build

No public license was assumed. Accidental licensing is harder to undo than deliberately selecting a license before publication.
