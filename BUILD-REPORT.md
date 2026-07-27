# Claude AMS 1.0.1 build report

**Build date:** 2026-07-27  
**Product:** Adaptive Master–Subagent Orchestration for Claude Code  
**Plugin identity:** `claude-ams`  
**Marketplace identity:** `claude-ams-marketplace`  
**Repository:** `InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration`  
**Codex AMS impact:** none

## Release boundary

Release 1.0.1 repairs repository distribution. It contains a complete Claude Code plugin and the root `.claude-plugin/marketplace.json` required for GitHub-hosted custom-marketplace installation. It is not an Anthropic-official marketplace listing; the public GitHub repository is the marketplace source.

The package has no runtime import, installer, profile, configuration, or repository dependency on the Codex AMS implementation.

## Local verification environment

| Component | Verified value |
|---|---|
| Operating system | Linux 6.12.13 x86-64 |
| Python | 3.13.5 |
| Node.js | 22.16.0 |
| Git | 2.47.3 |
| Claude Code CLI | Not installed in the local build container |

## Verification gates

The local gate includes strict source-package validation, repository-marketplace validation, JSON Schema checks, executable behavioral tests, branch-aware coverage, deterministic archive construction, independent archive verification, clean-Git provenance, and byte-for-byte rebuild comparison.

Native Claude Code validation is enforced by GitHub Actions rather than claimed as a local result. The CI workflow installs the current Claude Code package and runs strict validation against both the source plugin and the extracted local marketplace. The one local skip is the PowerShell documentation parser because PowerShell is absent from this Linux container; the same test runs on the Windows CI matrix, while every Bash block parsed locally.

## Local results

| Gate | Result |
|---|---|
| Source validator | Passed; no findings |
| Repository custom-marketplace contract | Passed |
| Behavioral and release tests | Passed; 314 passed, 1 skipped locally |
| Combined branch-aware coverage | Passed; 95.43% combined statement-and-branch coverage (95% threshold) |
| Plugin archive build | Passed |
| Local-marketplace archive build | Passed |
| Source archive build | Passed |
| Independent release verifier | Passed |
| Deterministic rebuild | Passed |
| Native Claude Code strict validation | CI-enforced; not locally observed because the CLI is absent |

## Distribution correction

The earlier README advertised:

```text
claude plugin marketplace add InsecurePassword/Claude-Code-Adaptive-Master-Subagent-Orchestration
```

before the repository contained `.claude-plugin/marketplace.json`. Release 1.0.1 adds the required catalog, validates the declared `claude-ams-marketplace` identity, and tests that the README install command matches the catalog. The repository now functions as a GitHub-hosted custom marketplace under Claude Code's documented marketplace model.

## Security and integrity coverage

The verifier rejects archive path traversal, duplicate members, case-insensitive collisions, symbolic links, nonregular members, unexpected files, identity mismatches, broken packaged Markdown links, marketplace/plugin byte divergence, checksum drift, inventory drift, invalid source provenance, and dirty-Git publication builds.

The runtime design additionally enforces current-turn-only Rush consent, project-over-global settings replacement, fail-closed invalid project settings, one writer per mutable surface, finite manager allocation, worker non-delegation, route ceilings, explicit requested-versus-observed model reporting, serialized integration, and proportional independent validation.

## Release artifacts

The release artifact names are:

```text
claude-ams-plugin-1.0.1.zip
claude-ams-local-marketplace-1.0.1.zip
Claude-Code-Adaptive-Master-Subagent-Orchestration-1.0.1-source.zip
SHA256SUMS
RELEASE-MANIFEST.json
```

Exact source commit identity, archive entry counts, byte lengths, inventory digests, and artifact SHA-256 values are recorded in `RELEASE-MANIFEST.json` and `SHA256SUMS` generated from the frozen clean source tree.
