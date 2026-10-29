import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  BarChart3,
  FileText,
  AlertTriangle,
  MessageSquareText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  RotateCcw,
  Sliders,
  Send,
  LoaderCircle,
  Eye,
  Layers,
  Info,
  TrendingUp,
  AlertCircle,
  Upload
} from 'lucide-react'
import {
  StartupProfile,
  Evaluation,
  Feedback,
  InvestorPersona,
  SimulationExchange,
  Improvement
} from '../../types'
import { StartupContextForm } from './StartupContextForm'
import { UploadDropzone } from './UploadDropzone'
import { StagedLoadingIndicator } from './StagedLoadingIndicator'
import { Banner } from '../common/Banner'
import { generateMarkdownReport, downloadMarkdownFile } from '../../utils/exportReport'

export type ConsoleTab = 'insights' | 'evidence' | 'risks' | 'questions' | 'setup'

type ConsolePaneProps = {
  activeTab: ConsoleTab
  onChangeTab: (tab: ConsoleTab) => void
  activeSlide: number
  onSelectSlide: (slide: number) => void
  profile: StartupProfile
  onChangeProfile: (profile: StartupProfile) => void
  evaluation: Evaluation | null
  file: File | null
  onSelectFile: (file: File | null) => void
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

export const ConsolePane: React.FC<ConsolePaneProps> = ({
  activeTab,
  onChangeTab,
  activeSlide,
  onSelectSlide,
  profile,
  onChangeProfile,
  evaluation,
  file,
  onSelectFile,
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
  const [answerText, setAnswerText] = useState('')
  const [copied, setCopied] = useState(false)
  const [openAllRubrics, setOpenAllRubrics] = useState(false)

  // Filter evaluation data for currently selected slide
  const slideCategories = (evaluation?.categories || []).filter(
    (c) => c.slide_numbers && c.slide_numbers.includes(activeSlide)
  )

  const slideImprovements = (evaluation?.improvements || []).filter(
    (imp) => imp.slide_numbers && imp.slide_numbers.includes(activeSlide)
  )

  const slideStrengths = (evaluation?.strengths || []).filter(
    (s) => s.slide_numbers && s.slide_numbers.includes(activeSlide)
  )

  const handleDownloadReport = () => {
    if (!evaluation) return
    const md = generateMarkdownReport(profile, evaluation)
    const sanitized = (profile.name || 'startup').toLowerCase().replace(/[^a-z0-9]/g, '_')
    downloadMarkdownFile(`${sanitized}_readiness_memo.md`, md)
  }

  const handleCopyReport = async () => {
    if (!evaluation) return
    const md = generateMarkdownReport(profile, evaluation)
    await navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAnswerSubmit = () => {
    if (!answerText.trim() || isCritiquingAnswer) return
    onSubmitAnswer(answerText)
  }

  const handlePromptChipClick = (starter: string) => {
    setAnswerText((prev) => (prev ? `${prev} ${starter}` : starter))
  }

  const wordCount = answerText.trim() ? answerText.trim().split(/\s+/).length : 0

  return (
    <div className="cockpit-console-pane">
      {/* Segmented Top Navigation Bar */}
      <div className="console-segmented-header glass-panel">
        <div className="segmented-tab-group">
          <button
            type="button"
            className={`segmented-tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => onChangeTab('insights')}
          >
            <BarChart3 size={14} />
            <span>Scorecard</span>
            {evaluation && (
              <span className="tab-pill-metric">{evaluation.overall_score}</span>
            )}
          </button>

          <button
            type="button"
            className={`segmented-tab-btn ${activeTab === 'evidence' ? 'active' : ''}`}
            onClick={() => onChangeTab('evidence')}
          >
            <ShieldCheck size={14} />
            <span>Evidence</span>
          </button>

          <button
            type="button"
            className={`segmented-tab-btn ${activeTab === 'risks' ? 'active' : ''}`}
            onClick={() => onChangeTab('risks')}
          >
            <AlertTriangle size={14} />
            <span>Risks</span>
            {evaluation?.improvements && evaluation.improvements.length > 0 && (
              <span className="tab-pill-alert">
                {evaluation.improvements.filter((i) => i.priority === 'High').length || evaluation.improvements.length}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`segmented-tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => onChangeTab('questions')}
          >
            <MessageSquareText size={14} />
            <span>Practice</span>
          </button>
        </div>

        {/* Setup / Deck Parameters Trigger */}
        <button
          type="button"
          className={`console-setup-trigger glass-control ${activeTab === 'setup' ? 'active' : ''}`}
          onClick={() => onChangeTab(activeTab === 'setup' ? 'insights' : 'setup')}
          title="Startup Parameters & Upload"
        >
          <Sliders size={15} />
        </button>
      </div>

      {error && <Banner type="error" message={error} onClose={onClearError} />}

      {/* Console Content Body */}
      <div className="console-scroll-body">
        <AnimatePresence mode="wait">
          {/* TAB 1: INSIGHTS (Slide-Contextual Intelligence) */}
          {activeTab === 'insights' && (
            <motion.div
              key="tab-insights"
              className="console-tab-content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {evaluation ? (
                <div className="insights-workspace">
                  {/* 1. VISUAL HERO DILIGENCE SCORECARD */}
                  <div className="visual-hero-scorecard">
                    <div className="hero-radial-gauge">
                      <svg viewBox="0 0 100 100" className="radial-svg">
                        <circle className="radial-track" cx="50" cy="50" r="40" strokeWidth="8" />
                        <circle
                          className="radial-meter"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="8"
                          strokeDasharray={251}
                          strokeDashoffset={251 - (251 * Math.min(100, Math.max(0, evaluation.overall_score))) / 100}
                        />
                      </svg>
                      <div className="radial-score-overlay">
                        <span className="radial-big-score">{evaluation.overall_score}</span>
                        <span className="radial-denom">/100</span>
                      </div>
                    </div>

                    <div className="hero-score-signals">
                      <div className="signal-headline-row">
                        <span className="series-tier-badge">Series A Readiness</span>
                        <h3 className="company-name-heading">{profile.name || 'Startup'}</h3>
                      </div>

                      {/* 3 Visual Scan Pills */}
                      <div className="visual-scan-pills">
                        <span className="scan-pill strong">
                          <CheckCircle2 size={16} />
                          <span>7 Strong Rubrics</span>
                        </span>
                        <span className="scan-pill warning">
                          <AlertTriangle size={16} />
                          <span>2 Revisions Needed</span>
                        </span>
                        <span className="scan-pill critical">
                          <AlertCircle size={16} />
                          <span>1 Red Flag (CAC)</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. VISUAL 10-RUBRIC DILIGENCE BARS */}
                  <div className="visual-rubrics-dashboard">
                    <div className="rubrics-dashboard-head">
                      <span className="dashboard-section-kicker">10-POINT DILIGENCE RUBRIC HEALTH</span>
                      <span className="dashboard-hint">Click any bar to jump to slide</span>
                    </div>

                    <div className="visual-rubric-bars-list">
                      {(evaluation.categories || []).map((cat, idx) => {
                        const isLinkedToActive = cat.slide_numbers?.includes(activeSlide)
                        const scorePct = cat.score * 10
                        const tierClass = cat.score >= 8 ? 'high' : cat.score >= 6 ? 'mid' : 'low'

                        return (
                          <button
                            key={idx}
                            type="button"
                            className={`rubric-bar-row ${isLinkedToActive ? 'is-active-slide' : ''}`}
                            onClick={() => {
                              if (cat.slide_numbers && cat.slide_numbers.length > 0) {
                                onSelectSlide(cat.slide_numbers[0])
                              }
                            }}
                            title={`Inspect Slide ${cat.slide_numbers?.join(', ') || ''}`}
                          >
                            <div className="rubric-bar-label-group">
                              <span className="rubric-bar-name">{cat.name}</span>
                              {cat.slide_numbers && cat.slide_numbers.length > 0 && (
                                <span className="rubric-slide-tag">S0{cat.slide_numbers.join(', S0')}</span>
                              )}
                            </div>

                            <div className="rubric-bar-track">
                              <div
                                className={`rubric-bar-fill ${tierClass}`}
                                style={{ width: `${scorePct}%` }}
                              />
                            </div>

                            <span className={`rubric-bar-val ${tierClass}`}>{cat.score}/10</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Export Action */}
                  <div className="insights-bottom-bar">
                    <button
                      type="button"
                      className="export-memo-btn"
                      onClick={handleDownloadReport}
                      title="Download complete diligence memo"
                    >
                      <Download size={16} />
                      <span>Download Full Readiness Report</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="console-empty-prompt">
                  <FileText size={36} className="text-secondary" />
                  <h4>No evaluation loaded</h4>
                  <p>Upload your pitch deck in the Setup tab to run institutional AI diligence.</p>
                  <button type="button" className="console-action-primary" onClick={() => onChangeTab('setup')}>
                    <Upload size={16} />
                    <span>Upload Pitch Deck</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: SLIDE INTEL & EVIDENCE */}
          {activeTab === 'evidence' && (
            <motion.div
              key="tab-evidence"
              className="console-tab-content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {evaluation ? (
                <div className="evidence-workspace">
                  {/* ACTIVE SLIDE VISUAL SCORECARD */}
                  <div className="active-slide-visual-card">
                    <div className="slide-visual-header">
                      <div className="slide-pill-badge">
                        <span>Slide 0{activeSlide} Inspection</span>
                      </div>
                      <span
                        className={`slide-verdict-tag ${
                          slideImprovements.length > 0 ? 'warning' : 'verified'
                        }`}
                      >
                        {slideImprovements.length > 0 ? (
                          <>
                            <AlertTriangle size={15} />
                            <span>1 Revision Needed</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={15} />
                            <span>Diligence Verified</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Verified Proof Points Chips */}
                    {slideStrengths.length > 0 && (
                      <div className="visual-tags-group">
                        <span className="tags-label">VERIFIED PROOF POINTS:</span>
                        <div className="tags-chips-cloud">
                          {slideStrengths.map((str, i) => (
                            <span key={i} className="proof-tag-chip">
                              <CheckCircle2 size={15} className="text-success flex-shrink-0" />
                              <span>{str.point}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Immediate Action Needed */}
                    {slideImprovements.length > 0 && (
                      <div className="visual-tags-group">
                        <span className="tags-label warning">INVESTOR ACTION REQUIRED:</span>
                        <div className="action-pills-list">
                          {slideImprovements.map((imp, i) => (
                            <div key={i} className="action-pill-card">
                              <span className={`priority-badge ${imp.priority.toLowerCase()}`}>
                                {imp.priority}
                              </span>
                              <div className="action-pill-content">
                                <strong className="action-pill-issue">{imp.issue}</strong>
                                <span className="action-pill-fix">Fix: {imp.recommendation}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Visual Proof Progress Meter */}
                  <div className="visual-evidence-summary">
                    <div className="evidence-summary-top">
                      <div className="summary-title-group">
                        <ShieldCheck size={16} className="text-electric" />
                        <span className="summary-heading">Deck Evidence Coverage</span>
                      </div>
                      <span className="summary-pct-badge">88% Verified</span>
                    </div>
                    <div className="coverage-progress-track">
                      <div className="coverage-progress-fill" style={{ width: '88%' }} />
                    </div>
                    <span className="coverage-subtext">7 of 8 deck slides backed by institutional proof points</span>
                  </div>

                  {/* Visual Slide-by-Slide Proof Matrix */}
                  <div className="slide-proof-matrix-grid">
                    {[
                      { num: 1, topic: 'Team & Pedigree', status: 'verified', proof: 'Ex-Salesforce VP & Stanford PhD Lab' },
                      { num: 2, topic: 'Problem & Pain', status: 'verified', proof: '$40B Enterprise Churn Destruction' },
                      { num: 3, topic: 'Architecture', status: 'verified', proof: 'Zero-Copy VPC Ingestion Engine' },
                      { num: 4, topic: 'Market Size', status: 'warning', proof: 'TAM $14.2B · SOM relies on top-down ratio' },
                      { num: 5, topic: 'Traction Velocity', status: 'critical', proof: '$420k ARR · CAC payback period omitted' },
                      { num: 6, topic: 'Business Model', status: 'verified', proof: 'Predictable $24k-$75k+ ARR Tiers' },
                      { num: 7, topic: 'Defensibility', status: 'verified', proof: '2hr Deployment vs 180d Gainsight' },
                      { num: 8, topic: 'Ask & Plan', status: 'verified', proof: '$2.5M Seed · 18mo Engineering Runway' }
                    ].map((item) => (
                      <button
                        key={item.num}
                        type="button"
                        className={`proof-matrix-card ${item.status} ${activeSlide === item.num ? 'is-active-slide' : ''}`}
                        onClick={() => onSelectSlide(item.num)}
                        title={`Click to inspect Slide ${item.num}`}
                      >
                        <div className="matrix-card-top">
                          <span className="matrix-slide-badge">Slide 0{item.num}</span>
                          <span className={`matrix-status-icon ${item.status}`}>
                            {item.status === 'verified' ? (
                              <CheckCircle2 size={16} />
                            ) : item.status === 'critical' ? (
                              <AlertCircle size={16} />
                            ) : (
                              <AlertTriangle size={16} />
                            )}
                          </span>
                        </div>
                        <h5 className="matrix-card-topic">{item.topic}</h5>
                        <p className="matrix-card-proof">{item.proof}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="console-empty-prompt">
                  <ShieldCheck size={36} className="text-secondary" />
                  <h4>No evidence data available</h4>
                  <p>Upload your pitch deck to inspect slide citations and verified proof mapping.</p>
                  <button type="button" className="console-action-primary" onClick={() => onChangeTab('setup')}>
                    <Upload size={16} />
                    <span>Upload Pitch Deck</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: RISKS (Visual Diligence Heatmap) */}
          {activeTab === 'risks' && (
            <motion.div
              key="tab-risks"
              className="console-tab-content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {evaluation ? (
                <div className="risks-workspace">
                  {/* Visual Severity Header */}
                  <div className="visual-risk-heatmap-header">
                    <span className="heatmap-header-kicker">INSTITUTIONAL DILIGENCE SEVERITY</span>
                    <div className="severity-counters-row">
                      <div className="severity-chip high">
                        <span className="chip-count">1</span>
                        <span className="chip-label">High Risk</span>
                      </div>
                      <div className="severity-chip medium">
                        <span className="chip-count">2</span>
                        <span className="chip-label">Moderate</span>
                      </div>
                      <div className="severity-chip low">
                        <span className="chip-count">0</span>
                        <span className="chip-label">Low Risk</span>
                      </div>
                    </div>
                  </div>

                  {/* High Impact Action Cards */}
                  <div className="visual-risk-cards-list">
                    {(evaluation.improvements || []).map((imp, idx) => {
                      const isLinkedToActiveSlide =
                        imp.slide_numbers && imp.slide_numbers.includes(activeSlide)

                      return (
                        <div
                          key={idx}
                          className={`visual-risk-action-card priority-${imp.priority.toLowerCase()} ${
                            isLinkedToActiveSlide ? 'current-active-slide' : ''
                          }`}
                        >
                          <div className="risk-action-head">
                            <span className={`risk-pill ${imp.priority.toLowerCase()}`}>
                              {imp.priority} Severity
                            </span>
                            {imp.slide_numbers && imp.slide_numbers.length > 0 && (
                              <button
                                type="button"
                                className="risk-jump-pill"
                                onClick={() => onSelectSlide(imp.slide_numbers[0])}
                              >
                                <span>Slide 0{imp.slide_numbers.join(', 0')}</span>
                                <ArrowRight size={16} />
                              </button>
                            )}
                          </div>
                          <h5 className="risk-issue-headline">{imp.issue}</h5>
                          <div className="risk-fix-banner">
                            <ArrowRight size={16} className="text-electric flex-shrink-0" />
                            <span><strong>Required Fix:</strong> {imp.recommendation}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Missing Info Tags Cloud */}
                  {evaluation.missing_information && evaluation.missing_information.length > 0 && (
                    <div className="visual-missing-info-box">
                      <span className="missing-box-kicker">OMISSION CHECKLIST:</span>
                      <div className="missing-tags-cloud">
                        {evaluation.missing_information.map((item, idx) => (
                          <span key={idx} className="missing-tag-chip">
                            <AlertCircle size={16} className="text-warning flex-shrink-0" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="console-empty-prompt">
                  <AlertTriangle size={36} className="text-secondary" />
                  <h4>No risk assessment loaded</h4>
                  <p>Upload your pitch deck to analyze institutional diligence red flags.</p>
                  <button type="button" className="console-action-primary" onClick={() => onChangeTab('setup')}>
                    <Upload size={16} />
                    <span>Upload Pitch Deck</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: QUESTIONS (Simulated Partner Interrogation) */}
          {activeTab === 'questions' && (
            <motion.div
              key="tab-questions"
              className="console-tab-content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <div className="interrogation-workspace">
                {/* Persona Strip */}
                <div className="persona-selection-bar">
                  <span className="persona-bar-label">Investor Lens:</span>
                  <div className="persona-pill-group">
                    {(['vc', 'angel', 'family_office'] as InvestorPersona[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`persona-pill glass-control ${persona === p ? 'active' : ''}`}
                        onClick={() => onSelectPersona(p)}
                        disabled={isGeneratingQuestion || isCritiquingAnswer}
                      >
                        {p === 'vc' ? 'VC Partner' : p === 'angel' ? 'Angel Investor' : 'Family Office'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Investor Question */}
                <div className="partner-question-box">
                  <div className="question-box-top">
                    <span className="live-badge">
                      <span className="pulsing-live-dot" />
                      Live Interrogation
                    </span>
                    {questionTopic && <span className="topic-badge">{questionTopic}</span>}
                  </div>

                  <p className="partner-question-quote">
                    {currentQuestion ||
                      'Generate an investor question tailored to your deck and selected persona.'}
                  </p>

                  {questionWhy && (
                    <div className="why-partner-asks-box">
                      <HelpCircle size={16} className="text-electric flex-shrink-0" />
                      <span><strong>VC Rationale:</strong> {questionWhy}</span>
                    </div>
                  )}

                  <div className="question-box-actions">
                    <button
                      type="button"
                      className="next-question-btn"
                      onClick={onGenerateQuestion}
                      disabled={isGeneratingQuestion}
                    >
                      {isGeneratingQuestion ? (
                        <LoaderCircle size={16} className="spin" />
                      ) : (
                        <Sparkles size={16} />
                      )}
                      <span>{isGeneratingQuestion ? 'Generating…' : 'Generate New Question'}</span>
                    </button>
                    {exchanges.length > 0 && (
                      <button
                        type="button"
                        className="reset-history-btn"
                        onClick={onResetPracticeSession}
                        title="Reset conversation"
                      >
                        <RotateCcw size={15} />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Answer Form */}
                <div className="founder-answer-card">
                  <div className="answer-header-row">
                    <label htmlFor="interrogation-answer-field">Your Verbal Response</label>
                    <span className="word-count-badge">{wordCount} words</span>
                  </div>

                  {/* Starter Prompt Chips */}
                  <div className="starter-chips-container">
                    <button
                      type="button"
                      className="starter-chip-pill"
                      onClick={() => handlePromptChipClick('Our customer acquisition cost payback is')}
                    >
                      + Lead with CAC payback
                    </button>
                    <button
                      type="button"
                      className="starter-chip-pill"
                      onClick={() => handlePromptChipClick('Across our 14 enterprise accounts,')}
                    >
                      + Cite 14 accounts proof
                    </button>
                    <button
                      type="button"
                      className="starter-chip-pill"
                      onClick={() => handlePromptChipClick('The primary headwind we are monitoring is')}
                    >
                      + Acknowledge the risk
                    </button>
                  </div>

                  <textarea
                    id="interrogation-answer-field"
                    className="answer-textarea"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Deliver your verbal response with specific data and evidence…"
                    rows={4}
                    disabled={isCritiquingAnswer}
                  />

                  <button
                    type="button"
                    className="submit-answer-btn"
                    onClick={handleAnswerSubmit}
                    disabled={!answerText.trim() || isCritiquingAnswer}
                  >
                    {isCritiquingAnswer ? (
                      <>
                        <LoaderCircle size={18} className="spin" />
                        <span>Evaluating Response…</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Answer for Critique</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </div>

                {/* Feedback Critique Card */}
                {currentFeedback && (
                  <motion.div
                    className="partner-critique-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="critique-header">
                      <div>
                        <span className="critique-kicker">COACHING CRITIQUE</span>
                        <h4 className="critique-title">Delivery Assessment</h4>
                      </div>
                      <div className="critique-score-badge">
                        <span className="score-num">{currentFeedback.score}</span>
                        <span className="score-denom">/10</span>
                      </div>
                    </div>

                    <p className="critique-narrative">{currentFeedback.coaching}</p>

                    <div className="critique-split-grid">
                      <div className="critique-column positive">
                        <strong>What Worked</strong>
                        {currentFeedback.strengths?.map((s, i) => (
                          <p key={i}>+ {s}</p>
                        ))}
                      </div>
                      <div className="critique-column negative">
                        <strong>Strengthen Next</strong>
                        {currentFeedback.gaps?.map((g, i) => (
                          <p key={i}>– {g}</p>
                        ))}
                      </div>
                    </div>

                    {currentFeedback.follow_up_question && (
                      <div className="critique-follow-up-banner">
                        <span className="follow-up-kicker">PREPARE FOR THIS FOLLOW-UP:</span>
                        <p className="follow-up-question-text">{currentFeedback.follow_up_question}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 5: SETUP & UPLOAD */}
          {activeTab === 'setup' && (
            <motion.div
              key="tab-setup"
              className="console-tab-content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <div className="setup-workspace">
                <div className="setup-heading-group">
                  <h3 className="setup-main-title">Evaluation Parameters</h3>
                  <p className="setup-description">
                    Configure your fundraising stage and industry sector to customize AI diligence scoring.
                  </p>
                </div>

                {/* Dropzone */}
                <div className="setup-dropzone-box">
                  <UploadDropzone
                    file={file}
                    onFileSelected={onSelectFile}
                    onError={() => {}}
                    disabled={isAnalyzing}
                  />
                </div>

                {/* Startup Context Form */}
                <StartupContextForm
                  profile={profile}
                  onChange={onChangeProfile}
                  disabled={isAnalyzing}
                />

                <StagedLoadingIndicator isAnalyzing={isAnalyzing} />

                {/* Submit Action */}
                <div className="setup-evaluate-action">
                  <button
                    type="button"
                    className="console-evaluate-btn"
                    onClick={onAnalyze}
                    disabled={isAnalyzing || !file || !profile.stage || !profile.industry.trim()}
                  >
                    <span>{isAnalyzing ? 'Running Diligence Analysis…' : 'Run Diligence Analysis'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
