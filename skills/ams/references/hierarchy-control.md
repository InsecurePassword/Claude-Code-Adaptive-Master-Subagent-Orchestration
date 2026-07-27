# Hierarchy control

Read before any delegated-manager order, descendant request or spawn, evidence relay, or manager custody change.

## Roles

Valid role/authority pairs are exact:

```text
worker / none
delegated-manager / request
```

Workers are leaves. Managers are bounded supervisors. The root remains the only user communicator, global router, integration decision-maker, acceptance authority, and completion authority.

## Version 1 physical shape

Claude AMS 1.0 supports at most:

```text
root
`-- delegated manager
    `-- workers
```

A manager never spawns another manager. Logical topology may still be root-mediated and physically flat when nesting is unavailable.

## Manager order additions

Every manager order adds:

```text
Effective intensity and allowed descendant shape:
Delegable scope:
Descendant allocation:
Model ceiling:
Escalation and evidence target:
```

Allocation is finite. Each accepted child consumes one unit exactly once. A failed spawn releases the unit only after evidence proves no child started. Authority, scope, permissions, ownership, route ceiling, and allocation may narrow but never expand down the chain.

## Dispatch requests

When the manager cannot or should not physically spawn, it returns:

```text
DISPATCH REQUEST
Root objective ID:
Request ID:
Parent work-order ID:
Requested role and proposed lineage:
Objective, scope, exclusions, dependencies:
Suggested AMS agent and requested route:
Model ceiling:
Permissions, isolation, ownership:
Success criteria and validation:
Allocation consumed:
Delegation value:
```

The root validates uniqueness, lineage, scope, dependencies, allocation, model ceiling, ownership, capacity, permissions, safety, and value. It accepts, narrows, reroutes, delays, flattens, or rejects. Exact request replay returns the recorded decision; conflicting ID reuse is deviation.

## Custody

Every work order has one immutable logical parent. Replacements use new IDs. A late result from a closed or superseded order is evidence only; it cannot restore ownership or acceptance without reconciliation.

The root records a descendant result and relays it to the logical manager. The manager consolidates and evaluates the assigned subgraph before returning its own result. Uncollected, conflicting, orphaned, or inaccessible evidence cannot support manager completion.

If a manager becomes unavailable, preserve evidence and issue a new superseding manager order or flatten remaining work. Never rewrite historical lineage.
