# Release checklist

## Source

- [ ] `VERSION`, plugin manifest, `package.json`, `pyproject.toml`, and documentation agree.
- [ ] Every runtime file was read end-to-end from the candidate generation.
- [ ] No Codex installation path or profile dependency exists in the Claude runtime.
- [ ] All references resolve beneath the plugin.
- [ ] No unsupported frontmatter or manifest fields remain.
- [ ] No TODO, FIXME, TBD, placeholder URL, external symlink, CRLF, BOM, NUL, or path collision remains.

## Behavior

- [ ] No-Fable account resolves root/top routes to Opus.
- [ ] Fable account uses Fable only through `best`/`inherit` and still routes routine work lower.
- [ ] Organization model allowlists and overrides produce truthful reporting.
- [ ] Direct subagents work with nesting, teams, and workflows disabled.
- [ ] Nesting flattens safely when unavailable.
- [ ] One-writer ownership blocks overlapping paths.
- [ ] Dirty-checkout dependencies use a shared serialized writer or an authorized checkpoint.
- [ ] Integrated-state validation and independent high-risk review run.
- [ ] Rush requires current-turn consent and expires with the objective.

## Automated validation

- [ ] `python scripts/validate_package.py`
- [ ] `python -m pytest`
- [ ] `python scripts/build_release.py`
- [ ] `python scripts/verify_release.py`
- [ ] deterministic rebuild produces identical archives
- [ ] CI passes on Windows, Linux, and macOS

## Native Claude Code validation

- [ ] `claude plugin validate . --strict`
- [ ] `claude --plugin-dir .`
- [ ] skills appear with the `claude-ams` namespace
- [ ] all named agents appear and reject missing work orders
- [ ] read-only workflow parses and runs with bounded input
- [ ] restart/reload behavior verified

## Publication

- [ ] repository URL and homepage added only after the separate repository exists
- [ ] distribution license selected deliberately
- [ ] release notes and checksums published
- [ ] no temporary branch, worktree, archive, or build residue remains
