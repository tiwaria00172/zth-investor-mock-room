export type RubricCategory = {
  name: string
  score: number
  reason: string
  solution?: string
  slide_numbers: number[]
}

export type Strength = {
  point: string
  slide_numbers: number[]
}

export type PriorityLevel = 'High' | 'Medium' | 'Low'

export type Improvement = {
  priority: PriorityLevel
  issue: string
  why_it_matters: string
  recommendation: string
  slide_numbers: number[]
}

export type Evaluation = {
  startup_summary: string
  overall_score: number
  score_note: string
  categories: RubricCategory[]
  strengths: Strength[]
  improvements: Improvement[]
  missing_information: string[]
  limitations: string[]
  slides_extracted: number
  isSample?: boolean
  evaluatedAt?: string
}

export type Feedback = {
  score: number
  strengths: string[]
  gaps: string[]
  coaching: string
  example_answer: string
  follow_up_question: string
  critique?: string
}

export type InvestorPersona = 'vc' | 'angel' | 'family_office'

export type StartupProfile = {
  name: string
  industry: string
  stage: string
  description?: string
  targetMarket?: string
  fundingAmount?: string
  businessModel?: string
  tractionNotes?: string
}

export type ProviderSettings = {
  provider: string
  base_url: string
  model: string
  api_key_configured: boolean
}

export type SimulationExchange = {
  id: string
  timestamp: number
  persona: InvestorPersona
  question: string
  topic?: string
  whyThisPersonaAsks?: string
  answer: string
  feedback?: Feedback
}

export type WorkflowStep = 'upload' | 'review' | 'practice'

export type DeckAdvisorMessage = {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  what_to_change?: string[]
  what_to_keep?: string[]
  how_to_strengthen?: string[]
  suggested_followups?: string[]
}

export type DeckAdvisorResponse = {
  answer: string
  what_to_change: string[]
  what_to_keep: string[]
  how_to_strengthen: string[]
  suggested_followups: string[]
}
