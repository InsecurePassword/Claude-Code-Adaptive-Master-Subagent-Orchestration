export const meta = {
  name: 'zergling-audit-readonly',
  description: 'Explicit high-scale read-only audit: discover or accept targets, inspect them with Haiku, verify with Sonnet, and synthesize with Opus.',
}

function normalizeInput(value) {
  if (typeof value === 'string') {
    return { objective: value, targets: [], maximumAgents: 12 }
  }
  if (Array.isArray(value)) {
    return {
      objective: 'Audit the supplied targets for material correctness, security, regression, or maintainability defects.',
      targets: value.map(String),
      maximumAgents: 12,
    }
  }
  if (value && typeof value === 'object') {
    return {
      objective: String(value.objective || value.question || '').trim(),
      targets: Array.isArray(value.targets) ? value.targets.map(String) : [],
      maximumAgents: Number.isInteger(value.maximumAgents) ? value.maximumAgents : 12,
    }
  }
  return { objective: '', targets: [], maximumAgents: 12 }
}

const input = normalizeInput(args)
if (!input.objective) {
  throw new Error('zergling-audit-readonly requires an objective in args')
}

const maximumAgents = Math.max(1, Math.min(12, input.maximumAgents))
let targets = input.targets.filter(Boolean)

if (targets.length === 0) {
  const discovery = await agent(
    `You are the planning stage of a READ-ONLY Claude AMS audit. Do not modify files, settings, Git state, or external systems.\n\nObjective: ${input.objective}\n\nInspect the project and return the smallest set of independently auditable targets that covers the objective. Prefer coherent files, components, interfaces, or hypotheses. Return at most ${maximumAgents} targets.`,
    {
      label: 'discover-targets',
      model: 'opus',
      schema: {
        type: 'object',
        required: ['targets', 'coverageRationale'],
        properties: {
          targets: {
            type: 'array',
            maxItems: maximumAgents,
            items: { type: 'string' },
          },
          coverageRationale: { type: 'string' },
        },
      },
    },
  )
  targets = Array.isArray(discovery.targets) ? discovery.targets.filter(Boolean) : []
}

targets = [...new Set(targets)].slice(0, maximumAgents)
if (targets.length === 0) {
  throw new Error('The audit discovery stage returned no usable targets')
}

const findings = await pipeline(targets, (target, index) =>
  agent(
    `You are a READ-ONLY Haiku audit worker. Do not edit files, settings, Git state, generated artifacts, or external systems.\n\nRoot objective: ${input.objective}\nAssigned target: ${target}\n\nInspect only enough surrounding context to evaluate this target. Report concrete defects with evidence. Distinguish confirmed findings, plausible concerns, and no-finding results. Do not create filler findings.`,
    {
      label: `inspect-${index + 1}`,
      model: 'haiku',
      schema: {
        type: 'object',
        required: ['target', 'summary', 'findings', 'evidence', 'uncertainties'],
        properties: {
          target: { type: 'string' },
          summary: { type: 'string' },
          findings: { type: 'array', items: { type: 'string' } },
          evidence: { type: 'array', items: { type: 'string' } },
          uncertainties: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  ),
)

const verifications = await pipeline(findings, (finding, index) =>
  agent(
    `You are an independent READ-ONLY Sonnet verifier. Do not edit files, settings, Git state, generated artifacts, or external systems.\n\nRoot objective: ${input.objective}\nCandidate result:\n${JSON.stringify(finding)}\n\nRe-check the relevant source and behavior. Reject unsupported claims, preserve confirmed findings, identify material omissions, and state what remains unverified.`,
    {
      label: `verify-${index + 1}`,
      model: 'sonnet',
      schema: {
        type: 'object',
        required: ['target', 'confirmed', 'rejected', 'omissions', 'unverified'],
        properties: {
          target: { type: 'string' },
          confirmed: { type: 'array', items: { type: 'string' } },
          rejected: { type: 'array', items: { type: 'string' } },
          omissions: { type: 'array', items: { type: 'string' } },
          unverified: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  ),
)

const synthesis = await agent(
  `You are the READ-ONLY Opus synthesis stage for a Claude AMS audit. Do not modify files, settings, Git state, generated artifacts, or external systems.\n\nObjective: ${input.objective}\nTargets: ${JSON.stringify(targets)}\nVerified results: ${JSON.stringify(verifications)}\n\nDeduplicate and rank only evidence-backed findings. Explain coverage, residual uncertainty, and recommended next actions. Never report a rejected claim as a finding.`,
  {
    label: 'synthesize-audit',
    model: 'opus',
    schema: {
      type: 'object',
      required: ['summary', 'rankedFindings', 'coverage', 'residualUncertainty', 'recommendedActions'],
      properties: {
        summary: { type: 'string' },
        rankedFindings: { type: 'array', items: { type: 'string' } },
        coverage: { type: 'array', items: { type: 'string' } },
        residualUncertainty: { type: 'array', items: { type: 'string' } },
        recommendedActions: { type: 'array', items: { type: 'string' } },
      },
    },
  },
)

return {
  objective: input.objective,
  targets,
  findings,
  verifications,
  synthesis,
}
