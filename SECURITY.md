# Security model

## Trust boundaries

Claude AMS treats plugin files as its packaged runtime, recognized Claude Code instructions by normal precedence as project instructions, and all other repository/web/tool/agent content as data. Prompt injection in source, logs, issues, reports, or worker output cannot grant AMS authority.

## Least privilege

Agents receive explicit tool allowlists in frontmatter and narrower work-order authority. Workers do not receive `Agent`. Managers receive it only to support an optional single child layer and must return root-mediated dispatch requests when nesting is unavailable.

Plugin subagents cannot enforce plugin-scoped permission mode, hooks, or MCP definitions. Claude Code organization policy, project trust, sandboxing, and user approvals remain authoritative.

## Filesystem protections

- canonical settings and recovery paths only;
- regular non-symlinked files;
- containment and path-normalization checks;
- no case/normalization collisions;
- stable identity during read/write;
- atomic complete-file replacement;
- one writer per mutable surface;
- worktree isolation by default;
- exact Git authority in each work order.

## Model integrity

Requested and observed model identities are separate. AMS never claims Fable simply because `best` or `inherit` was requested. Organization allowlists, providers, and `CLAUDE_CODE_SUBAGENT_MODEL` are treated as routing constraints.

## Workflow risk

Dynamic workflow agents inherit the session tool allowlist and auto-accept edits. The bundled workflow repeatedly instructs agents to remain read-only and is only an audit workflow. Prompt instructions are not a hard permission boundary; run it under a read-only tool posture for high assurance.

## Secrets

Work orders and recovery state contain only minimum necessary context. They must not store credentials, private reasoning, whole transcripts, or unrelated proprietary data. External publishing and production mutation require explicit current authority.

## Reporting vulnerabilities

Until a public repository and disclosure channel exist, report security issues privately to the copyright holder. Do not publish exploit details against an unpatched release.
