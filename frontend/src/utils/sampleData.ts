import { Evaluation, StartupProfile } from '../types'

export const SAMPLE_PROFILE: StartupProfile = {
  name: 'Northstar AI',
  industry: 'B2B SaaS / Enterprise AI',
  stage: 'Seed',
  description: 'Predictive churn prevention telemetry engine for enterprise SaaS.',
  targetMarket: 'Mid-Market & Enterprise SaaS companies with $10M-$250M ARR',
  fundingAmount: '$2.5M',
  businessModel: 'Annual subscription tiers based on tracked ARR volume ($24k-$75k/year)',
  tractionNotes: '$420k ARR from 14 enterprise customers; 114% Net Revenue Retention'
}

export const SAMPLE_EVALUATION: Evaluation = {
  isSample: true,
  evaluatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  startup_summary:
    'Northstar AI offers a zero-code predictive telemetry engine that connects to enterprise cloud data warehouses to detect silent customer churn 120 days before renewal with 88% precision.',
  overall_score: 78,
  score_note:
    'Compelling founder-market fit and strong early retention validation; requires explicit unit economics, CAC payback timelines, and sales channel economics to satisfy institutional Seed/Series A diligence.',
  slides_extracted: 8,
  categories: [
    {
      name: 'Problem',
      score: 8,
      reason:
        'Clearly articulates the pain of silent churn ($40B annual loss) and highlights the limitation of retrospective health surveys.',
      slide_numbers: [2]
    },
    {
      name: 'Solution & Moat',
      score: 8,
      reason:
        'Technical moat is well-delineated with warehouse-native connectors and proprietary transformer models trained on 50M events.',
      slide_numbers: [3, 7]
    },
    {
      name: 'Market Size',
      score: 7,
      reason:
        'TAM ($14.2B) and SAM ($4.5B) are sizable. However, the SOM ($450M) relies on top-down percentages rather than a granular bottom-up account calculation.',
      slide_numbers: [4]
    },
    {
      name: 'Business Model',
      score: 7,
      reason:
        'Pricing tiers based on tracked ARR align incentives, but gross margins and implementation costs are not detailed.',
      slide_numbers: [6]
    },
    {
      name: 'Traction & Metrics',
      score: 7,
      reason:
        'Healthy early traction: $420k ARR across 14 enterprise logos with 114% NRR. Customer acquisition payback is absent.',
      slide_numbers: [5]
    },
    {
      name: 'Go-to-Market Strategy',
      score: 6,
      reason:
        'Direct founder-led sales transition is noted, but partner channels and inbound marketing pipeline generation lack measurable mechanics.',
      slide_numbers: [6]
    },
    {
      name: 'Competition & Defensibility',
      score: 8,
      reason:
        'Effective positioning against legacy suites (Gainsight, ChurnZero) emphasizing 2-hour deployment vs 6-month implementations.',
      slide_numbers: [7]
    },
    {
      name: 'Financials & Unit Economics',
      score: 5,
      reason:
        'Blended CAC, LTV/CAC ratio, and historical burn rate are omitted from the slides. Critical diligence gap for institutional investors.',
      slide_numbers: [5, 8]
    },
    {
      name: 'Team & Founder-Market Fit',
      score: 9,
      reason:
        'Exceptional founder credentials: ex-Salesforce VP of Sales combined with Stanford AI PhD co-founder.',
      slide_numbers: [1]
    },
    {
      name: 'The Ask & Use of Funds',
      score: 7,
      reason:
        'Clear $2.5M ask with percentage allocations and 18-month target ($2M ARR for Series A), but hiring milestones should be specified.',
      slide_numbers: [8]
    }
  ],
  strengths: [
    {
      point: 'Top-tier founder pedigree combining enterprise sales leadership and deep NLP/ML research.',
      slide_numbers: [1]
    },
    {
      point: 'Impressive early cohort Net Revenue Retention (114%) demonstrating product stickiness and expansion.',
      slide_numbers: [5]
    },
    {
      point: 'Clear architectural advantage: warehouse-native deployment deployed in 2 hours vs legacy 6-month cycles.',
      slide_numbers: [7]
    }
  ],
  improvements: [
    {
      priority: 'High',
      issue: 'Blended CAC, payback period, and gross margin are omitted.',
      why_it_matters:
        'Institutional venture capitalists scrutinize unit economics to confirm capital will efficiently scale revenue without unsustainable cash burn.',
      recommendation:
        'Add a dedicated unit economics callout on the traction slide detailing CAC, CAC payback in months (aim for <12 months), and gross margin percentage.',
      slide_numbers: [5, 8]
    },
    {
      priority: 'High',
      issue: 'SOM calculation relies on top-down percentages rather than bottom-up account enumeration.',
      why_it_matters:
        'Sophisticated investors discount top-down TAM slides; they want to see the exact number of ICP target accounts multiplied by ACV.',
      recommendation:
        'Provide a bottom-up formula: e.g. 15,000 mid-market B2B software companies in North America × $30,000 ACV = $450M initial SOM.',
      slide_numbers: [4]
    },
    {
      priority: 'Medium',
      issue: 'Transition plan from founder-led sales to repeatable sales motion is brief.',
      why_it_matters:
        'Early sales can be driven by founder charisma; investors need to know how account executives will ramp successfully.',
      recommendation:
        'Include expected AE quota capacity, inbound vs outbound lead mix, and sales enablement milestones in the GTM section.',
      slide_numbers: [6]
    },
    {
      priority: 'Low',
      issue: 'SOC2 and enterprise security readiness is only mentioned as a future expenditure.',
      why_it_matters:
        'Enterprise customers requiring warehouse access demand strict compliance before piloting.',
      recommendation:
        'Mention current data governance architecture and SOC2 Type II audit timeline.',
      slide_numbers: [8]
    }
  ],
  missing_information: [
    'Blended CAC and CAC payback period in months',
    'Gross margin percentage (target >80% for enterprise software)',
    'Monthly net burn rate and current cash runway',
    'Customer acquisition channel breakdown (inbound vs outbound conversion)'
  ],
  limitations: [
    'Automated coaching evaluation based exclusively on extracted text content from slides.',
    'Visual aesthetics, layout hierarchy, and graphical chart representations were not inspected in this version.'
  ]
}
