# Contributing

The repository is currently all-rights-reserved. Contributions require explicit permission from the copyright holder.

## Engineering requirements

- preserve root supervision and delegation of routine execution;
- preserve cost-first model selection;
- do not introduce a hard Fable dependency;
- keep workers non-delegating;
- keep physical manager depth at one for the 1.x line unless a reviewed architecture change says otherwise;
- preserve project-over-global replacement semantics and global manual-only control;
- preserve one-writer ownership and integrated-state validation;
- update schemas, executable specification, tests, documentation, and release artifacts together;
- add no runtime dependency without evidence that Claude Code itself guarantees it on all supported platforms.

Run the complete suite in `TESTING.md` before proposing a change. No TODO, placeholder, knowingly broken example, or mixed-version artifact is accepted.
