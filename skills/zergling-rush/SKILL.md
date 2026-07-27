---
name: zergling-rush
description: Explicit current-turn Zergling Rush for Claude AMS. Use only when the user directly invokes this skill or unambiguously requests Zergling Rush for the present objective; never invoke from stored settings, prior consent, or a generic request to be fast.
argument-hint: "<objective>"
user-invocable: true
disable-model-invocation: true
model: best
effort: max
---

# Claude AMS Zergling Rush

This skill requires unambiguous current-turn user consent. Prior-session consent, configuration, old handoffs, an `extreme` mode, urgency, or a generic request for speed is insufficient.

Before dispatch:

1. state briefly that Rush may use substantially more agents and model usage;
2. read `../ams/references/runtime-core.md` completely;
3. read `../ams/references/zergling-rush.md` completely;
4. treat `$ARGUMENTS` as the current root objective;
5. preserve every normal safety, ownership, validation, and root-acceptance rule.

Rush consent expires when this objective ends or the user changes mode. It never persists as activation authority.
