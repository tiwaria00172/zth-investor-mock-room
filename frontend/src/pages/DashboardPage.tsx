import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageSquareText,
  FileCheck2,
  BarChart3,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layers,
  ChevronRight,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react'
import { StartupProfile, Evaluation } from '../types'
import { UploadDropzone } from '../components/imr/UploadDropzone'
import { StartupContextForm } from '../components/imr/StartupContextForm'
import { StagedLoadingIndicator } from '../components/imr/StagedLoadingIndicator'
import { Floating3DDeckPreview } from '../components/imr/Floating3DDeckPreview'
import { Banner } from '../components/common/Banner'

type DashboardPageProps = {
  file: File | null
  onSelectFile: (file: File | null) => void
  profile: StartupProfile
  onChangeProfile: (profile: StartupProfile) => void
  onAnalyze: () => void
  onLoadSample: () => void
  onViewExistingReport: () => void
  existingEvaluation: Evaluation | null
  isAnalyzing: boolean
  error: string
  onError: (message: string) => void
  onClearError: () => void
}

type ShowcaseTab = 'readiness' | 'gaps' | 'simulation'

export const DashboardPage: React.FC<DashboardPageProps> = ({
  file,
  onSelectFile,
  profile,
  onChangeProfile,
  onAnalyze,
  onLoadSample,
  onViewExistingReport,
  existingEvaluation,
  isAnalyzing,
  error,
  onError,
  onClearError
}) => {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<ShowcaseTab>('readiness')
  const isSubmitDisabled = isAnalyzing || !file || !profile.stage || !profile.industry.trim()

  return (
    <motion.div
      className="dashboard-page-container"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hero Section */}
      <section className="dashboard-hero">
        <div className="hero-top-row">
          <div className="hero-tag">
            <Sparkles size={14} />
            <span>Venture diligence studio</span>
          </div>
          <span className="hero-badge-pill">Antigravity 2.0 Motion</span>
        </div>

        <h1 className="hero-title">
          Stress-test your pitch deck before meeting investors
        </h1>

        <p className="hero-subtitle">
          Benchmark your presentation against 10 institutional rubrics, uncover critical diligence gaps, and rehearse answers with simulated partners.
        </p>

        {/* Hero Interactive Demo CTA */}
        <div className="hero-cta-group">
          <motion.button
            type="button"
            className="hero-demo-pill-btn"
            onClick={onLoadSample}
            disabled={isAnalyzing}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Sparkles size={16} />
            <span>Explore Live Interactive Demo (Series A Deck)</span>
            <ArrowRight size={15} />
          </motion.button>
          <span className="hero-demo-subtext">Instant preview of 10-point scoring, slide evidence & partner simulation</span>
        </div>

        <div className="hero-pillars-row">
          <div className="pillar-chip">
            <span className="pillar-dot" />
            <span>10-point diligence rubric</span>
          </div>
          <div className="pillar-chip">
            <span className="pillar-dot" />
            <span>Slide-level evidence citations</span>
          </div>
          <div className="pillar-chip">
            <span className="pillar-dot" />
            <span>Simulated partner interrogation</span>
          </div>
        </div>
      </section>

      {/* Main Workspace Grid */}
      <div className="dashboard-workspace-grid">
        {/* Left Primary Upload Card */}
        <div className="dashboard-main-card">
          <div className="card-top-heading">
            <div>
              <h2 className="card-heading">Upload presentation & startup context</h2>
              <p className="card-subtext">
                Upload your pitch deck in PDF format. Text is extracted locally to assess market sizing, unit economics, moat defensibility, and traction velocity.
              </p>
            </div>
          </div>

          {error && <Banner type="error" message={error} onClose={onClearError} />}

          {/* Primary Upload Dropzone with Sample Deck Option */}
          <UploadDropzone
            file={file}
            onFileSelected={onSelectFile}
            onError={onError}
            onUseSample={onLoadSample}
            disabled={isAnalyzing}
          />

          {/* Startup Context Form with Expandable Optional Details */}
          <StartupContextForm
            profile={profile}
            onChange={onChangeProfile}
            disabled={isAnalyzing}
          />

          {/* Staged Loading Progress Bar */}
          <StagedLoadingIndicator isAnalyzing={isAnalyzing} />

          {/* Primary Action Button */}
          <div className="dashboard-cta-row">
            <motion.button
              type="button"
              className="primary-analyze-btn"
              onClick={onAnalyze}
              disabled={isSubmitDisabled}
              whileHover={!isSubmitDisabled ? { y: -1 } : undefined}
              whileTap={!isSubmitDisabled ? { scale: 0.99 } : undefined}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span>{isAnalyzing ? 'Evaluating pitch deck…' : 'Evaluate pitch deck'}</span>
              <ArrowRight size={17} />
            </motion.button>
          </div>
        </div>

        {/* Right Secondary Content Column */}
        <aside className="dashboard-side-col">
          {/* Recent Report / Session Card */}
          {existingEvaluation && (
            <motion.div
              className="side-widget-card recent-report-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <div className="widget-header">
                <BarChart3 size={18} className="text-electric" />
                <h4>Current assessment</h4>
              </div>

              <div className="recent-report-body">
                <div className="recent-report-meta">
                  <span className="recent-startup-name">{profile.name || 'Startup'}</span>
                  <span className="recent-score-chip">
                    {existingEvaluation.overall_score}/100
                  </span>
                </div>
                <p className="recent-report-desc">
                  {existingEvaluation.startup_summary?.slice(0, 110)}...
                </p>

                {existingEvaluation.improvements && existingEvaluation.improvements.length > 0 && (
                  <div className="open-loop-indicator">
                    <span className="open-loop-count">
                      {existingEvaluation.improvements.filter((i) => i.priority === 'High').length || existingEvaluation.improvements.length} priority gaps
                    </span>
                    <span className="open-loop-text">remain open in your diligence checklist</span>
                  </div>
                )}

                <button
                  type="button"
                  className="view-report-link-btn"
                  onClick={onViewExistingReport}
                >
                  <span>Open readiness report</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Sample Demo Report Link */}
          <div className="side-widget-card sample-demo-card">
            <div className="widget-header">
              <Sparkles size={18} className="text-electric" />
              <h4>Explore sample assessment</h4>
            </div>
            <p className="widget-text">
              Review an evaluation of an illustrative Series A enterprise software deck to inspect the rubric scoring, slide citations, and practice simulation.
            </p>
            <motion.button
              type="button"
              className="sample-report-btn"
              onClick={onLoadSample}
              disabled={isAnalyzing}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={14} />
              <span>Preview sample report</span>
            </motion.button>
          </div>

          {/* Institutional Diligence Rubrics Guide */}
          <div className="side-widget-card how-it-works-card">
            <div className="widget-header">
              <HelpCircle size={18} className="text-secondary" />
              <h4>Institutional diligence rubrics</h4>
            </div>

            <ol className="how-it-works-steps">
              <li>
                <strong>Market scale & expansion:</strong>
                <span>Calculations for TAM, SAM, SOM and credible bottom-up expansion logic.</span>
              </li>
              <li>
                <strong>Defensibility & moat:</strong>
                <span>Technical barriers, proprietary distribution, and switching costs versus incumbents.</span>
              </li>
              <li>
                <strong>Unit economics:</strong>
                <span>Customer acquisition payback, gross margin visibility, and capital efficiency.</span>
              </li>
              <li>
                <strong>Traction velocity:</strong>
                <span>Compounding month-over-month milestone proof and retention cohorts.</span>
              </li>
            </ol>
          </div>
        </aside>
      </div>

      {/* 3D Pitch Deck Intelligence Inspector */}
      <Floating3DDeckPreview onExploreFullReport={onLoadSample} />
    </motion.div>
  )
}
