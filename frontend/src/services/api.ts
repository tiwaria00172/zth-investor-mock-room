import {
  Evaluation,
  Feedback,
  InvestorPersona,
  ProviderSettings,
  StartupProfile,
  DeckAdvisorResponse
} from '../types'

export const API_BASE = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.port !== '5173' ? '' : 'http://127.0.0.1:8000')

export class ApiError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

async function handleResponse<T>(res: Response, fallbackMessage: string): Promise<T> {
  let data: any
  try {
    data = await res.json()
  } catch {
    throw new ApiError(fallbackMessage, res.status)
  }

  if (!res.ok) {
    const message = data?.detail || fallbackMessage
    throw new ApiError(message, res.status)
  }

  return data as T
}

export const api = {
  async getHealth(): Promise<{ status: string; version: string; llm_configured: boolean; model: string }> {
    const res = await fetch(`${API_BASE}/api/health`)
    return handleResponse(res, 'Failed to fetch API health status.')
  },

  async getProviderSettings(): Promise<ProviderSettings> {
    const res = await fetch(`${API_BASE}/api/settings/provider`)
    return handleResponse(res, 'Failed to load provider settings.')
  },

  async saveProviderSettings(payload: {
    provider: string
    api_key: string
    base_url: string
    model: string
  }): Promise<ProviderSettings> {
    const res = await fetch(`${API_BASE}/api/settings/provider`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    return handleResponse(res, 'Could not save provider settings.')
  },

  async testProviderConnection(payload?: {
    provider?: string
    api_key?: string
    base_url?: string
    model?: string
  }): Promise<{ ok: boolean; message: string; model: string }> {
    const res = await fetch(`${API_BASE}/api/settings/provider/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload ? JSON.stringify(payload) : undefined
    })
    return handleResponse(res, 'Provider connection test failed.')
  },

  async evaluateDeck(file: File, profile: StartupProfile): Promise<Evaluation> {
    const form = new FormData()
    form.append('file', file)
    form.append('startup_name', profile.name || 'Startup')
    form.append('industry', profile.industry || 'Not specified')
    form.append('stage', profile.stage || 'Not specified')

    const res = await fetch(`${API_BASE}/api/evaluate`, {
      method: 'POST',
      body: form
    })
    return handleResponse<Evaluation>(res, 'Failed to evaluate pitch deck.')
  },

  async getSimulationQuestion(
    profile: StartupProfile,
    persona: InvestorPersona,
    deckContext: string
  ): Promise<{ question: string; why_this_persona_asks: string; topic: string }> {
    const form = new FormData()
    form.append('startup_name', profile.name || 'Startup')
    form.append('industry', profile.industry || 'Not specified')
    form.append('stage', profile.stage || 'Not specified')
    form.append('persona', persona)
    form.append(
      'deck_context',
      deckContext || 'No deck evaluation yet. Ask a general but useful question based on the startup profile.'
    )

    const res = await fetch(`${API_BASE}/api/simulation/question`, {
      method: 'POST',
      body: form
    })
    return handleResponse(res, 'Could not generate an investor question.')
  },

  async assessAnswer(
    question: string,
    answer: string,
    persona: InvestorPersona,
    deckContext: string
  ): Promise<Feedback> {
    const form = new FormData()
    form.append('question', question)
    form.append('answer', answer)
    form.append('persona', persona)
    form.append('deck_context', deckContext || '')

    const res = await fetch(`${API_BASE}/api/simulation/answer`, {
      method: 'POST',
      body: form
    })
    return handleResponse<Feedback>(res, 'Could not evaluate your answer.')
  },

  async askDeckAdvisor(payload: {
    message: string
    history?: { role: string; content: string }[]
    deck_context?: string
    startup_profile?: StartupProfile
    evaluation_summary?: any
  }): Promise<DeckAdvisorResponse> {
    const res = await fetch(`${API_BASE}/api/chat/advisor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    return handleResponse<DeckAdvisorResponse>(res, 'Failed to query AI Deck Advisor.')
  }
}
