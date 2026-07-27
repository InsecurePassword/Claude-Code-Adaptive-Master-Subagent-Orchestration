# Validation and completion

Read this file completely before accepting project changes, declaring a subgraph complete, reporting a block, or issuing the final response.

## 1. Validation plan

Each task has validation proportional to failure cost. Possible layers:

- syntax or schema checks;
- formatter/linter/type checks;
- focused unit tests;
- broader regression tests;
- build/package verification;
- runtime reproduction;
- artifact inspection;
- independent code review;
- architecture/security review;
- documentation and behavior consistency checks;
- clean-state or installation tests.

The root chooses requirements; non-root agents execute them. Prefer a separate verifier for objective commands and a separate reviewer for judgment-heavy changes.

## 2. Evidence acceptance

Accept evidence only when it establishes:

- correct work-order and lineage;
- in-scope behavior;
- preserved user work;
- model route and tool posture sufficient for the task;
- no ownership violation;
- required commands actually ran against the relevant state;
- outputs and exit codes support the claim;
- documentation, schemas, tests, and behavior agree;
- unresolved risks are disclosed;
- integrated state, not only an isolated branch, satisfies criteria.

A green command outside the required scope is not proof. A worker's confidence is not proof. A manager's consolidated claim does not replace root acceptance.

## 3. Independent review

Commission independent review for:

- security-sensitive work;
- architecture or public interfaces;
- authentication, authorization, data handling, or permissions;
- broad refactors and migrations;
- difficult ambiguous defects;
- generated control/configuration changes;
- manager-integrated subgraphs;
- any change whose failure is expensive or hard to detect.

Review remains read-only unless a separate correction order grants ownership. Findings must be triaged as valid, invalid, duplicate, accepted risk, or requiring follow-up. Do not recursively commission review without new evidence.

## 4. Correction loop

When validation or review fails:

1. identify the exact failing state and owner;
2. classify implementation, integration, order, model, environment, or test defect;
3. dispatch the smallest bounded correction;
4. preserve unrelated passing work;
5. rerun affected checks and warranted regressions;
6. re-review only materially changed risk surfaces;
7. update task and recovery state.

Never weaken tests or acceptance criteria merely to obtain a pass unless the user explicitly changes the requirement for a justified reason.

## 5. Completion criteria

The root may declare completion only when:

- every mandatory deliverable is present;
- every acceptance criterion is evidenced;
- required integration is complete;
- all required validation passed or is explicitly not applicable;
- blocking review findings are resolved;
- active writers are closed or intentionally preserved with no outstanding mandatory work;
- user changes remain preserved;
- configuration/recovery state is consistent;
- documentation and artifacts are complete;
- no known unresolved issue contradicts the requested result.

Close redundant agents and cancel valueless speculative work before final reporting.

## 6. Block classification

A project is genuinely blocked only when no authorized compliant route can advance mandatory work, or a material user decision is required. Report:

- affected requirement;
- evidence and exact failure;
- routes attempted;
- why alternatives are insufficient or unauthorized;
- preserved state and ownership;
- exact next action;
- resumption condition or decision required.

Continue independent safe lanes before reporting a localized block as project-wide.

## 7. Final response

The root alone communicates completion. Report:

- what was delivered;
- important implementation decisions;
- validation performed and results;
- remaining non-blocking caveats, if any;
- exact artifacts/commits/paths relevant to the user.

Do not expose private chain-of-thought, noisy agent transcripts, or unsupported model identity claims.
