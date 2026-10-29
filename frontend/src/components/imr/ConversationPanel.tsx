import React, { useState, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  LoaderCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  FileText
} from 'lucide-react'
import {
  Feedback,
  InvestorPersona,
  SimulationExchange,
  Improvement
} from '../../types'

type ConversationPanelProps = {
  persona: InvestorPersona
  currentQuestion: string
  questionTopic?: string
  questionWhy?: string
  exchanges: SimulationExchange[]
  currentFeedback: Feedback | null
  weaknesses?: Improvement[]
  isGeneratingQuestion: boolean
  isCritiquingAnswer: boolean
  onGenerateQuestion: () => void
  onSubmitAnswer: (answer: string) => void
  error?: string
  onClearError?: () => void
}

export const ConversationPanel: React.FC<ConversationPanelProps> = ({
  persona,
  currentQuestion,
  questionTopic,
  questionWhy,
  exchanges,
  currentFeedback,
  weaknesses = [],
  isGeneratingQuestion,
  isCritiquingAnswer,
  onGenerateQuestion,
  onSubmitAnswer,
  error,
  onClearError
}) => {
  const [answerText, setAnswerText] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (answerText.trim() && !isCritiquingAnswer) {
        handleSubmit()
      }
    }
  }

  const handleSubmit = () => {
    if (!answerText.trim() || isCritiquingAnswer) return
    onSubmitAnswer(answerText)
  }

  const wordCount = answerText.trim() ? answerText.trim().split(/\s+/).length : 0

  const getPersonaLabel = (key: InvestorPersona) => {
    switch (key) {
      case 'vc':
        return 'Venture Capital Partner'
      case 'angel':
        return 'Angel Investor'
      case 'family_office':
        return 'Family Office Director'
    }
  }

  return (
    <div className="simulation-layout-grid">
      {/* Main Interaction Column */}
      <div className="simulation-main-col">
        {/* Current Active Question */}
        <motion.div
          className="current-question-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="question-card-topbar">
            <span className="question-pill-tag">
              <span className="question-live-dot" />
              Live question
            </span>

            {questionTopic && (
              <span className="question-topic-pill">Focus: {questionTopic}</span>
            )}
          </div>

          <div className="question-text-content">
            {currentQuestion ? (
              <motion.p
                className="question-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentQuestion}
              </motion.p>
            ) : (
              <div className="question-empty-state">
                <p>Click below to generate a tailored question based on your deck context and persona.</p>
              </div>
            )}
          </div>

          {questionWhy && (
            <div className="question-rationale-box prominent">
              <HelpCircle size={16} className="text-electric flex-shrink-0" />
              <div>
                <strong className="rationale-heading">Why this investor asks this:</strong>
                <span className="rationale-text">{questionWhy}</span>
              </div>
            </div>
          )}

          <div className="question-actions-bar">
            <motion.button
              type="button"
              className="generate-question-btn"
              onClick={onGenerateQuestion}
              disabled={isGeneratingQuestion || isCritiquingAnswer}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isGeneratingQuestion ? (
                <>
                  <LoaderCircle className="spin" size={16} />
                  <span>Formulating question…</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>{currentQuestion ? 'Generate another question' : 'Generate partner question'}</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Answer Input Section */}
        {currentQuestion && (
          <motion.div
            className="answer-input-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="answer-header">
              <label htmlFor="founder-answer-box" className="answer-title">
                Your Verbal Response
              </label>
              <div className="answer-meta">
                <span className="word-count-chip">{wordCount} words</span>
                <span className="keyboard-hint">Press Enter to send · Shift+Enter for new line</span>
              </div>
            </div>

            {!answerText.trim() && (
              <div className="answer-prompt-chips">
                <span className="prompt-chips-label">Starter angles:</span>
                <button
                  type="button"
                  className="prompt-chip"
                  onClick={() => setAnswerText('Our current metrics show ')}
                  disabled={isCritiquingAnswer}
                >
                  Lead with a metric
                </button>
                <button
                  type="button"
                  className="prompt-chip"
                  onClick={() => setAnswerText('Yes — specifically, ')}
                  disabled={isCritiquingAnswer}
                >
                  Direct answer first
                </button>
                <button
                  type="button"
                  className="prompt-chip"
                  onClick={() => setAnswerText('That risk is real. We mitigate it by ')}
                  disabled={isCritiquingAnswer}
                >
                  Acknowledge the risk
                </button>
              </div>
            )}

            <textarea
              id="founder-answer-box"
              className="answer-textarea"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="State your response as if in the partner meeting. Lead with direct metrics, address the question immediately, and avoid filler words..."
              rows={5}
              disabled={isCritiquingAnswer}
            />

            {error && (
              <div className="answer-error-row">
                <AlertCircle size={16} />
                <span>{error}</span>
                {onClearError && (
                  <button type="button" onClick={onClearError} className="error-clear-btn">
                    Dismiss
                  </button>
                )}
              </div>
            )}

            <div className="answer-actions-bar">
              <motion.button
                type="button"
                className="submit-answer-btn"
                onClick={handleSubmit}
                disabled={isCritiquingAnswer || !answerText.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isCritiquingAnswer ? (
                  <>
                    <LoaderCircle className="spin" size={17} />
                    <span>Critiquing answer…</span>
                  </>
                ) : (
                  <>
                    <span>Submit answer</span>
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Real-time Typing / Reviewing Indicator */}
        <AnimatePresence>
          {isCritiquingAnswer && (
            <motion.div
              className="ai-typing-indicator-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="typing-dots">
                <span />
                <span />
                <span />
              </div>
              <span>Evaluating clarity, evidence citation, and directness...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Critique Feedback */}
        <AnimatePresence>
          {currentFeedback && (
            <motion.div
              className="feedback-critique-card"
              role="region"
              aria-label="Answer Feedback"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="feedback-card-top">
                <div className="feedback-verdict-text">
                  <h4>Pitch coach assessment</h4>
                  <p>{currentFeedback.coaching}</p>
                </div>

                <motion.div
                  className="feedback-score-badge"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  <span className="score-badge-sub">Score</span>
                  <span className="score-badge-main">
                    {currentFeedback.score}
                    <small>/10</small>
                  </span>
                </motion.div>
              </div>

              <div className="critique-columns-grid">
                <div className="critique-column positive">
                  <div className="critique-column-header">
                    <CheckCircle2 size={16} className="text-success" />
                    <h5>What worked well</h5>
                  </div>
                  <ul>
                    {currentFeedback.strengths.map((s, idx) => (
                      <li key={idx}>+ {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="critique-column gaps">
                  <div className="critique-column-header">
                    <AlertCircle size={16} className="text-warning" />
                    <h5>Gaps to strengthen</h5>
                  </div>
                  <ul>
                    {currentFeedback.gaps.map((g, idx) => (
                      <li key={idx}>– {g}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {currentFeedback.example_answer && (
                <div className="critique-example-box">
                  <div className="example-box-header">
                    <Lightbulb size={16} className="text-electric" />
                    <span>Model high-impact answer structure:</span>
                  </div>
                  <p>{currentFeedback.example_answer}</p>
                </div>
              )}

              {currentFeedback.follow_up_question && (
                <div className="critique-followup-box">
                  <div className="followup-header">
                    <ArrowRight size={15} />
                    <span>Prepare for this follow-up</span>
                  </div>
                  <p>{currentFeedback.follow_up_question}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Past Exchanges History */}
        {exchanges.length > 0 && (
          <div className="simulation-history-section">
            <h4 className="history-title">Session practice history ({exchanges.length} rounds)</h4>
            <div className="history-cards-stream">
              {exchanges.map((ex, idx) => (
                <motion.div
                  key={ex.id || idx}
                  className="history-card"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="history-q-row">
                    <span className="history-q-tag">Q:</span>
                    <p className="history-q-text">{ex.question}</p>
                  </div>

                  <div className="history-a-row">
                    <span className="history-a-tag">Founder:</span>
                    <p className="history-a-text">{ex.answer}</p>
                  </div>

                  {ex.feedback && (
                    <div className="history-score-chip">
                      <span>Score: {ex.feedback.score}/10</span>
                      {idx < exchanges.length - 1 && exchanges[idx + 1].feedback && (
                        ex.feedback.score > exchanges[idx + 1].feedback!.score ? (
                          <span className="score-trend-up">↑ Improved</span>
                        ) : ex.feedback.score < exchanges[idx + 1].feedback!.score ? (
                          <span className="score-trend-down">↓</span>
                        ) : null
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Context & Prep Sidebar Column */}
      <aside className="simulation-context-col">
        {/* Active Persona Lens */}
        <div className="context-card persona-summary-card">
          <div className="context-card-header">
            <span className="context-label">Active investor lens</span>
          </div>
          <h4 className="context-card-title">{getPersonaLabel(persona)}</h4>
          <p className="context-card-desc">
            {persona === 'vc' &&
              'Seeking 100x return profile, venture-scale TAM, customer retention cohorts, and competitive moats.'}
            {persona === 'angel' &&
              'Evaluating founder-market obsession, fast execution speed, and customer love from early users.'}
            {persona === 'family_office' &&
              'Evaluating multi-year capital preservation, margin stability, regulatory risks, and governance.'}
          </p>
        </div>

        {/* Diligence Weaknesses Carried From Deck Evaluation */}
        {weaknesses.length > 0 ? (
          <div className="context-card deck-weaknesses-card">
            <div className="context-card-header">
              <FileText size={15} className="text-electric" />
              <span className="context-label">Deck diligence gaps</span>
            </div>
            <p className="context-help-text">
              Target questions at the weaknesses flagged during your pitch deck evaluation:
            </p>
            <div className="weakness-chips-list">
              {weaknesses.slice(0, 3).map((w, idx) => (
                <div key={idx} className="weakness-item-mini">
                  <span className={`mini-priority-dot ${w.priority.toLowerCase()}`} />
                  <span className="mini-issue">{w.issue}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="context-card deck-weaknesses-card empty">
            <div className="context-card-header">
              <FileText size={15} className="text-secondary" />
              <span className="context-label">Deck context</span>
            </div>
            <p className="context-card-desc">
              No deck evaluation loaded yet. Questions will be synthesized from your startup profile.
            </p>
          </div>
        )}

        {/* Preparation Guidelines */}
        <div className="context-card prep-tips-card">
          <div className="context-card-header">
            <TrendingUp size={15} className="text-success" />
            <span className="context-label">Pitch coaching rules</span>
          </div>
          <ul className="prep-tips-list">
            <li>
              <strong>Direct Opening:</strong> Answer "Yes", "No", or with the exact number in sentence one.
            </li>
            <li>
              <strong>Cite Hard Evidence:</strong> Back claims with cohort metrics, pilot counts, or contract values.
            </li>
            <li>
              <strong>Own the Unknowns:</strong> Never bluff an unknown figure; explain how you validate it instead.
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
