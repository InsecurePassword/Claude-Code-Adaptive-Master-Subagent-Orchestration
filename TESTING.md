# Testing and release validation

## Development dependencies

```bash
python -m pip install -r requirements-dev.txt
```

The installed Claude AMS plugin has no Python or Node runtime dependency. Python and Node are release-development tools only.

## Complete portable suite

```bash
python scripts/validate_package.py
python -m pytest -q
coverage run --branch -m pytest -q
coverage report --show-missing --fail-under=95
python scripts/build_release.py
python scripts/verify_release.py
```

The source validator independently checks package structure even when the Claude CLI is unavailable. It validates the CI workflow itself, including the operating-system/Python matrix, coverage threshold, current Claude Code installation, strict native validation, local-marketplace validation, and complete artifact upload inventory.

## What is tested

- plugin manifest identity, schema URL, version, licensing, and strict-field inventory;
- skill and agent frontmatter parsing and allowed fields;
- exact role, route, effort, tool, isolation, and non-delegation invariants;
- Fable only through `best` and `inherit`;
- settings schema, exact-key validation, project-over-global precedence, and fail-closed invalid project settings;
- route selection, route ceilings, escalation, intensity ceilings, and backend gates;
- current-turn-only Rush consent and workflow authorization;
- worker/manager role-authority pairs, immutable lineage, and finite descendant allocation;
- path normalization and one-writer collision detection;
- work-order, result, recovery, and configuration schemas plus canonical fixtures;
- source and archive Markdown links, reference inventory, and runtime separation from Codex;
- workflow JavaScript syntax, concurrency bounds, model tiers, and read-only safeguards;
- UTF-8/LF/no-link package hygiene and case-insensitive collision detection;
- deterministic plugin, local-marketplace, and source ZIP construction;
- archive traversal, duplicate, collision, symlink, nonregular-file, identity, inventory, size, and checksum rejection;
- byte equality between the direct plugin and the plugin nested in the local marketplace;
- clean-Git release identity and dirty-tree refusal;
- negative-path behavior for every major validator, builder, verifier, and executable-specification branch.

## Native Claude Code validation

A publishable release must pass strict native validation on a compatible Claude Code installation:

```bash
claude plugin validate . --strict
claude --plugin-dir .
```

The generated local marketplace must also pass:

```bash
claude plugin validate /absolute/path/to/claude-ams-local-marketplace-1.0.1 --strict
```

Smoke-test the namespace, controls, role inventory, and lowest-model routing:

```text
/claude-ams:ams STATUS
AMS ENABLE
AMS MODE minimal
AMS RUN inspect this repository without modifying it
AMS MODE auto
/agents
/claude-ams:zergling-rush inspect this repository and validate the package
```

A Fable-enabled account should resolve `best` and inherited top routes to Fable. An account without Fable must continue through Opus without package modification. Organization model allowlists and `CLAUDE_CODE_SUBAGENT_MODEL` overrides must be reported truthfully.

## Cross-platform CI

GitHub Actions runs the portable suite on:

```text
Ubuntu latest   Python 3.11 and 3.13
Windows latest  Python 3.11 and 3.13
macOS latest    Python 3.11 and 3.13
```

A separate native-validation job installs the current `@anthropic-ai/claude-code` package, runs strict validation against the source plugin and extracted local marketplace, rebuilds and verifies all three archives, and uploads the verified release set. Branch-aware coverage must remain at or above 95%.

## Determinism check

Build twice into separate empty directories with the same `SOURCE_DATE_EPOCH`, then compare every output byte-for-byte. `SHA256SUMS` and `RELEASE-MANIFEST.json` must also match exactly. Release builds from a Git checkout refuse a dirty working tree unless the development-only `--allow-dirty` override is supplied; that override is never acceptable for publication.
