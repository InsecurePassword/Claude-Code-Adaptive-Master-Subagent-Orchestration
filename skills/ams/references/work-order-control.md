# Work-order control

Every non-root session receives one compact authoritative order. Do not rely on inherited transcript noise.

## Required order

```text
WORK ORDER
Work-order ID:
Root objective ID:
Logical parent:
Role: worker | delegated-manager
Delegation authority: none | request
Backend: direct | nested | team | workflow
Requested route:
Model ceiling:
Objective:
Acceptance criteria:
Scope:
Excluded scope:
Dependencies:
Authoritative context:
Read ownership:
Write ownership:
Isolation: shared-readonly | shared-serialized | worktree
Git authority: none | inspect | commit-own-work | integrate
Allowed tools:
Maximum turns:
Descendant allocation: <manager only>
Delegable scope: <manager only>
Required actions:
Required validation:
Deviation triggers:
Return contract:
```

Use stable IDs: `OBJ-...` and `WO-...`. Record the order before physical dispatch. Work order scope, not agent capability, grants authority.

## Required result

```text
RESULT
Work-order ID:
Logical parent:
Role:
Status: complete | partial | blocked | failed
Requested route:
Observed model: <exact evidence or unverified>
Summary:
Evidence:
Files/artifacts changed:
Commit/worktree identity:
Validation performed, exit codes, relevant output:
Deviations:
Unresolved issues:
Assumptions:
Risks:
Recommended logical-parent action:
```

Manager results add the addendum defined in `hierarchy-control.md`.

## Order quality

Provide the smallest sufficient authoritative context: relevant requirements, architecture decisions, file boundaries, interfaces, known evidence, validation, and preserved user changes. Do not forward the entire root transcript or root-only AMS controls.

Success criteria must be observable. Validation must name the required checks or evidence. Deviation triggers must identify scope expansion, architecture uncertainty, ownership conflict, missing dependency, destructive/external action, model mismatch, and validation weakness where applicable.

## Idempotency and status

Record each order and result once. Exact duplicate results reuse the record. Conflicting duplicates are deviation. A `complete` result does not mean accepted. The root or logical parent may reject it, commission correction, or require independent review.
