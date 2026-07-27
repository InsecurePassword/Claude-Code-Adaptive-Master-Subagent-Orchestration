# Package maintenance

Read for explicit installation, update, validation, repair, rollback, uninstall, package-integrity suspicion, or mixed-generation recovery.

Claude AMS is a Claude Code plugin. Claude Code's plugin mechanism owns installation, enablement, update, cache, and removal. AMS does not ship or run a self-updater, PowerShell installer, Bash installer, model-profile generator, or Codex migration script.

## Quiescence

Before behavior-changing package mutation, stop new dispatch, let safe work reach useful boundaries, collect evidence, preserve exact resumption state, close or account for non-root writers, and finish atomic settings writes. Defer mutation when closure would lose mandatory work.

## Validation

Validate a candidate outside the installed plugin cache:

```text
python scripts/validate_package.py
python -m pytest
python scripts/build_release.py
claude plugin validate . --strict
claude --plugin-dir .
```

The Python tooling is development-only; the installed plugin has no Python or Node runtime dependency. The native Claude validation and smoke test require a compatible Claude Code installation.

Require exact version consistency, valid JSON/YAML/frontmatter, safe regular files, no path escapes or external symlinks, all referenced files present, valid schemas/examples, JavaScript syntax, deterministic release archive, passing tests, and no placeholder/TODO release content.

## Update and rollback

Use a new complete plugin version. Never mix files from generations. Preserve project/global settings and recovery state outside the plugin package. After component changes, reload plugins or restart Claude Code before normal use.

## Uninstall

Remove or disable only the verified `claude-ams` plugin through Claude Code. Preserve project/global settings and local recovery state unless the user separately authorizes their exact removal. Report those remaining paths. Never delete unrelated `.claude` content.
