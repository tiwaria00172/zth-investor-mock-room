import React from 'react'
import {
  Landmark,
  Sparkles,
  LoaderCircle,
  ArrowRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react'
import { Feedback, InvestorPersona } from '../../types'
import { PersonaSelector } from './PersonaSelector'
import { FeedbackCard } from './FeedbackCard'
import { Banner } from '../common/Banner'

type InvestorSimulationViewProps = {
  persona: InvestorPersona
  onSelectPersona: (persona: InvestorPersona) => void
  question: string
  questionMeta?: { topic: string; why: string }
  answer: string
  onChangeAnswer: (text: string) => void
  feedback: Feedback | null
  busy: boolean
  error: string
  onClearError: () => void
  onGenerateQuestion: () => void
  onAssessAnswer: () => void
}

export const InvestorSimulationView: React.FC<InvestorSimulationViewProps> = ({
  persona,
  onSelectPersona,
  question,
  questionMeta,
  answer,
  onChangeAnswer,
  feedback,
  busy,
  error,
  onClearError,
  onGenerateQuestion,
  onAssessAnswer
}) => {
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0

  return (
    <>
      <div className="panel-heading">
        <div>
          <div className="section-kicker">MODULE 02 / PRACTICE</div>
          <h2>Investor pitch simulation</h2>
          <p>Sharpen answers to the questions that define your fundraising trajectory.</p>
        </div>
        <div className="heading-icon">
          <Landmark size={24} />
        </div>
      </div>

      <PersonaSelector selectedPersona={persona} onSelectPersona={onSelectPersona} />

      <div className="question-area">
        <div className="question-label">
          <span className="question-dot" />
          <span>INVESTOR QUESTION</span>
          {questionMeta?.topic && (
            <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#1b53dc' }}>
              Focus: {questionMeta.topic}
            </span>
          )}
        </div>

        <div className="question-card">
          {question || 'Select an investor lens above and click "Generate investor question" to begin.'}
        </div>

        {questionMeta?.why && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '6px',
              fontSize: '13px',
              color: '#55637d',
              marginBottom: '14px',
              lineHeight: 1.5
            }}
          >
            <HelpCircle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{questionMeta.why}</span>
          </div>
        )}

        <button
          className="secondary-button"
          onClick={onGenerateQuestion}
          disabled={busy}
          style={{ width: '100%', marginBottom: '20px' }}
        >
          {busy ? (
            <>
              <LoaderCircle className="spin" size={16} /> Generating question…
            </>
          ) : (
            <>
              <Sparkles size={16} /> Generate investor question
            </>
          )}
        </button>

        <label className="answer-label">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Your verbal response</span>
            <span style={{ fontWeight: 400, color: '#7b8494', fontSize: '12px' }}>
              {wordCount} words
            </span>
          </div>
          <textarea
            value={answer}
            onChange={(e) => onChangeAnswer(e.target.value)}
            placeholder="Respond as if you were in the partner meeting. Lead with verified metrics and clear causality..."
            rows={6}
          />
        </label>

        {error && <Banner type="error" message={error} onClose={onClearError} />}

        <button
          className="primary-button"
          onClick={onAssessAnswer}
          disabled={busy || !question || !answer.trim()}
          style={{ marginTop: '16px' }}
        >
          {busy ? (
            <>
              <LoaderCircle className="spin" size={17} /> Critiquing response…
            </>
          ) : (
            <>
              Review my answer <ArrowRight size={17} />
            </>
          )}
        </button>
      </div>

      {feedback && <FeedbackCard feedback={feedback} />}

      <div className="privacy-note">
        <ShieldCheck size={18} />
        <span>
          Coaching prototype. Scores, critique notes, and follow-ups are model-generated assessments to support founder preparation, not formal investment advice or funding commitments.
        </span>
      </div>
    </>
  )
}
