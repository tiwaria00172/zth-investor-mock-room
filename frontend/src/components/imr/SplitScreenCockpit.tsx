import React, { useState, useEffect } from 'react'
import {
  StartupProfile,
  Evaluation,
  Feedback,
  InvestorPersona,
  SimulationExchange,
  WorkflowStep
} from '../../types'
import { DeckViewerPane } from './DeckViewerPane'
import { ConsolePane, ConsoleTab } from './ConsolePane'

type SplitScreenCockpitProps = {
  currentStep: WorkflowStep
  onSelectStep: (step: WorkflowStep) => void
  file: File | null
  onSelectFile: (file: File | null) => void
  profile: StartupProfile
  onChangeProfile: (profile: StartupProfile) => void
  evaluation: Evaluation | null
  onAnalyze: () => void
  onLoadSample: () => void
  isAnalyzing: boolean
  error: string
  onClearError: () => void
  persona: InvestorPersona
  onSelectPersona: (persona: InvestorPersona) => void
  currentQuestion: string
  questionTopic?: string
  questionWhy?: string
  currentFeedback: Feedback | null
  exchanges: SimulationExchange[]
  isGeneratingQuestion: boolean
  isCritiquingAnswer: boolean
  onGenerateQuestion: () => void
  onSubmitAnswer: (answer: string) => void
  onResetPracticeSession: () => void
}

export const SplitScreenCockpit: React.FC<SplitScreenCockpitProps> = ({
  currentStep,
  onSelectStep,
  file,
  onSelectFile,
  profile,
  onChangeProfile,
  evaluation,
  onAnalyze,
  onLoadSample,
  isAnalyzing,
  error,
  onClearError,
  persona,
  onSelectPersona,
  currentQuestion,
  questionTopic,
  questionWhy,
  currentFeedback,
  exchanges,
  isGeneratingQuestion,
  isCritiquingAnswer,
  onGenerateQuestion,
  onSubmitAnswer,
  onResetPracticeSession
}) => {
  const [activeSlide, setActiveSlide] = useState(1)

  // Map WorkflowStep to Console tab ('insights' | 'evidence' | 'risks' | 'questions' | 'setup')
  const getInitialConsoleTab = (): ConsoleTab => {
    if (currentStep === 'upload') return 'setup'
    if (currentStep === 'practice') return 'questions'
    return 'insights'
  }

  const [activeConsoleTab, setActiveConsoleTab] = useState<ConsoleTab>(getInitialConsoleTab())

  // Sync console tab with header stepper
  useEffect(() => {
    if (currentStep === 'upload') setActiveConsoleTab('setup')
    else if (currentStep === 'practice') setActiveConsoleTab('questions')
    else if (currentStep === 'review' && (activeConsoleTab === 'setup' || activeConsoleTab === 'questions')) {
      setActiveConsoleTab('insights')
    }
  }, [currentStep])

  const handleConsoleTabChange = (tab: ConsoleTab) => {
    setActiveConsoleTab(tab)
    if (tab === 'setup') onSelectStep('upload')
    else if (tab === 'questions') onSelectStep('practice')
    else onSelectStep('review')
  }

  return (
    <div className="cockpit-studio-layout">
      {/* Left Pane: Immersive Pitch Deck Presentation Viewer (58% width) */}
      <div className="cockpit-viewer-wrapper">
        <DeckViewerPane
          activeSlide={activeSlide}
          onSelectSlide={setActiveSlide}
          file={file}
          onSelectFile={onSelectFile}
          onLoadSample={onLoadSample}
          isAnalyzing={isAnalyzing}
          evaluation={evaluation}
          onOpenUploadModal={() => handleConsoleTabChange('setup')}
        />
      </div>

      {/* Right Pane: Contextual AI Intelligence Console (42% width) */}
      <div className="cockpit-console-wrapper">
        <ConsolePane
          activeTab={activeConsoleTab}
          onChangeTab={handleConsoleTabChange}
          activeSlide={activeSlide}
          onSelectSlide={setActiveSlide}
          profile={profile}
          onChangeProfile={onChangeProfile}
          evaluation={evaluation}
          file={file}
          onSelectFile={onSelectFile}
          onAnalyze={onAnalyze}
          onLoadSample={onLoadSample}
          isAnalyzing={isAnalyzing}
          error={error}
          onClearError={onClearError}
          persona={persona}
          onSelectPersona={onSelectPersona}
          currentQuestion={currentQuestion}
          questionTopic={questionTopic}
          questionWhy={questionWhy}
          currentFeedback={currentFeedback}
          exchanges={exchanges}
          isGeneratingQuestion={isGeneratingQuestion}
          isCritiquingAnswer={isCritiquingAnswer}
          onGenerateQuestion={onGenerateQuestion}
          onSubmitAnswer={onSubmitAnswer}
          onResetPracticeSession={onResetPracticeSession}
        />
      </div>
    </div>
  )
}
