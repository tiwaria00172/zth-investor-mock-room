import React from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Info } from 'lucide-react'
import {
  InvestorPersona,
  Feedback,
  SimulationExchange,
  Improvement,
  StartupProfile
} from '../types'
import { InvestorPersonaPicker } from '../components/imr/InvestorPersonaPicker'
import { ConversationPanel } from '../components/imr/ConversationPanel'
import { Banner } from '../components/common/Banner'

type InvestorPracticePageProps = {
  persona: InvestorPersona
  onSelectPersona: (persona: InvestorPersona) => void
  currentQuestion: string
  questionTopic?: string
  questionWhy?: string
  exchanges: SimulationExchange[]
  currentFeedback: Feedback | null
  weaknesses?: Improvement[]
  profile: StartupProfile
  isGeneratingQuestion: boolean
  isCritiquingAnswer: boolean
  onGenerateQuestion: () => void
  onSubmitAnswer: (answer: string) => void
  onResetPracticeSession: () => void
  error?: string
  onClearError?: () => void
}

export const InvestorPracticePage: React.FC<InvestorPracticePageProps> = ({
  persona,
  onSelectPersona,
  currentQuestion,
  questionTopic,
  questionWhy,
  exchanges,
  currentFeedback,
  weaknesses = [],
  profile,
  isGeneratingQuestion,
  isCritiquingAnswer,
  onGenerateQuestion,
  onSubmitAnswer,
  onResetPracticeSession,
  error,
  onClearError
}) => {
  return (
    <motion.div
      className="practice-page-container"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top Page Header */}
      <div className="practice-page-header">
        <div className="header-titles">
          <h1 className="practice-page-title">Partner Interrogation Room</h1>
          <p className="practice-subtitle">
            Practise answering high-stakes diligence questions under the specific investment lens of your target investor.
          </p>
        </div>

        <div className="header-right-actions">
          {exchanges.length > 0 && (
            <motion.button
              type="button"
              className="reset-practice-btn"
              onClick={onResetPracticeSession}
              title="Clear practice conversation history"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw size={15} />
              <span>Reset practice session</span>
            </motion.button>
          )}
        </div>
      </div>

      {error && <Banner type="error" message={error} onClose={onClearError} />}

      {/* Persona Selection Bar */}
      <InvestorPersonaPicker
        selectedPersona={persona}
        onSelectPersona={onSelectPersona}
        disabled={isGeneratingQuestion || isCritiquingAnswer}
      />

      {/* Main Two-Column Conversation Workspace */}
      <ConversationPanel
        persona={persona}
        currentQuestion={currentQuestion}
        questionTopic={questionTopic}
        questionWhy={questionWhy}
        exchanges={exchanges}
        currentFeedback={currentFeedback}
        weaknesses={weaknesses}
        isGeneratingQuestion={isGeneratingQuestion}
        isCritiquingAnswer={isCritiquingAnswer}
        onGenerateQuestion={onGenerateQuestion}
        onSubmitAnswer={onSubmitAnswer}
        error={error}
        onClearError={onClearError}
      />

      {/* Bottom Practice Disclaimer */}
      <div className="practice-footer-disclaimer">
        <Info size={16} className="text-secondary flex-shrink-0" />
        <span>
          Coaching simulation only. Questions and critique scores are model-generated to help founders rehearse pitch delivery and pressure-test evidence. Not an offer, term sheet, or funding guarantee.
        </span>
      </div>
    </motion.div>
  )
}
