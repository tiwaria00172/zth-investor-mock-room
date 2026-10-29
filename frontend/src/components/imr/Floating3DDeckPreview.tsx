import React, { useState, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  Cpu,
  Users,
  DollarSign,
  Layers,
  ChevronRight,
  Eye,
  CheckCircle2
} from 'lucide-react'

type SlidePreview = {
  id: number
  title: string
  category: string
  score: number
  scoreMax: number
  status: 'strong' | 'good' | 'critical'
  headline: string
  subhead: string
  bulletPoints: string[]
  citation: string
  diligenceNote: string
}

const PREVIEW_SLIDES: SlidePreview[] = [
  {
    id: 1,
    title: 'Executive Pedigree',
    category: 'Team & Founder-Market Fit',
    score: 9,
    scoreMax: 10,
    status: 'strong',
    headline: 'Salesforce VP Sales + Stanford AI PhD',
    subhead: 'Decisive execution advantage in enterprise SaaS GTM and NLP architectures.',
    bulletPoints: [
      'Led $60M ARR enterprise team at Salesforce',
      'First-author NeurIPS transformer research (Stanford)',
      '14 enterprise design partner commitments secured pre-seed'
    ],
    citation: 'Slide 1 · Executive Team',
    diligenceNote: 'Institutional Grade: Exceptional founder-market fit reduces execution and recruiting risk for Series A lead investors.'
  },
  {
    id: 2,
    title: 'Predictive Engine',
    category: 'Solution & Technical Moat',
    score: 8,
    scoreMax: 10,
    status: 'strong',
    headline: 'Zero-Code Warehouse Telemetry Engine',
    subhead: 'Detects silent customer churn 120 days before renewal with 88% precision.',
    bulletPoints: [
      'Warehouse-native connectors (Snowflake / BigQuery)',
      'Proprietary transformer model trained on 50M event streams',
      '2-hour deployment vs 6-month legacy implementation'
    ],
    citation: 'Slide 3 & 7 · Architecture & Moat',
    diligenceNote: 'High Defensibility: Proprietary data embeddings and warehouse integration create durable technical switching costs.'
  },
  {
    id: 3,
    title: 'Traction Velocity',
    category: 'Traction & Business Proof',
    score: 7,
    scoreMax: 10,
    status: 'good',
    headline: '$420K ARR · 14 Enterprise Accounts',
    subhead: '114% Net Revenue Retention across Fortune 1000 pilots.',
    bulletPoints: [
      '$30k Average Contract Value (ACV)',
      '0% logo churn over 12 rolling months',
      '8 enterprise expansions pending Q4 deployment'
    ],
    citation: 'Slide 5 · Milestone Proof',
    diligenceNote: 'Solid Proof: Retention validation is strong, but quarterly cohort breakdown should be added to prove compounding growth.'
  },
  {
    id: 4,
    title: 'Unit Economics Diligence',
    category: 'Financials & Unit Economics',
    score: 5,
    scoreMax: 10,
    status: 'critical',
    headline: 'Critical Diligence Gap: Missing CAC Payback',
    subhead: 'Blended CAC, sales ramp timeline, and burn multiple omitted from slides.',
    bulletPoints: [
      'Omission: Customer acquisition cost payback period unstated',
      'Omission: Blended vs paid channel CAC differentiation',
      'Risk: Partner will scrutinize capital efficiency in committee'
    ],
    citation: 'Slide 5 & 8 · Capital Efficiency',
    diligenceNote: 'Diligence Red Flag: Institutional VCs will pause term sheet issuance until gross-margin-adjusted CAC payback is proven.'
  }
]

type Floating3DDeckPreviewProps = {
  onExploreFullReport: () => void
}

export const Floating3DDeckPreview: React.FC<Floating3DDeckPreviewProps> = ({
  onExploreFullReport
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const activeSlide = PREVIEW_SLIDES[activeSlideIndex]

  // Spring 3D tilt tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = (e.clientX - rect.left) / width - 0.5
    const mouseYPos = (e.clientY - rect.top) / height - 0.5
    mouseX.set(mouseXPos)
    mouseY.set(mouseYPos)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="editorial-deck-showcase">
      {/* Editorial Header */}
      <div className="editorial-showcase-header">
        <div className="editorial-meta-line">
          <span className="editorial-mono-kicker">3D PRESENTATION INSPECTOR</span>
          <span className="editorial-divider-dot" />
          <span className="editorial-badge">Live Slide Evidence</span>
        </div>
        <h2 className="editorial-title">
          Interactive Pitch Deck Intelligence
        </h2>
        <p className="editorial-description">
          Hover over the 3D presentation deck to inspect slide-level evidence extraction, institutional rubric scoring, and diligence flags.
        </p>
      </div>

      {/* Main Split Grid: 3D Perspective Card on Left, Live Telemetry Inspector on Right */}
      <div className="editorial-showcase-grid">
        {/* Left Column: Floating 3D Tilt Deck */}
        <div
          className="deck-3d-stage"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Ambient Spotlight Cone behind deck */}
          <div className="deck-ambient-glow" />

          <motion.div
            className="deck-3d-card"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }}
            whileHover={{ scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            {/* Top Deck Chrome Bar */}
            <div className="deck-card-topbar">
              <div className="deck-card-dots">
                <span className="window-dot red" />
                <span className="window-dot yellow" />
                <span className="window-dot green" />
              </div>
              <div className="deck-card-title-pill">
                <span>Northstar_AI_SeriesA_Pitch.pdf</span>
                <span className="deck-page-badge">Slide {activeSlide.id} of 8</span>
              </div>
              <div className="deck-card-status">
                <span className="pulse-live-dot" />
                <span>AI Scanned</span>
              </div>
            </div>

            {/* Slide Visual Content Canvas */}
            <div className="deck-card-canvas">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  className="slide-canvas-content"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="slide-content-top">
                    <span className="slide-category-eyebrow">{activeSlide.category}</span>
                    <span className={`slide-status-pill ${activeSlide.status}`}>
                      {activeSlide.status === 'critical' ? (
                        <AlertTriangle size={16} />
                      ) : (
                        <CheckCircle2 size={16} />
                      )}
                      <span>
                        {activeSlide.status === 'critical'
                          ? 'Diligence Flag'
                          : 'Institutional Evidence'}
                      </span>
                    </span>
                  </div>

                  <h3 className="slide-main-headline">{activeSlide.headline}</h3>
                  <p className="slide-main-subhead">{activeSlide.subhead}</p>

                  {/* Slide Key Bullets */}
                  <div className="slide-bullet-list">
                    {activeSlide.bulletPoints.map((point, i) => (
                      <div key={i} className="slide-bullet-item">
                        <span className="slide-bullet-bullet" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Slide Mock Chart / Diagram */}
                  <div className="slide-mock-visualization">
                    {activeSlide.id === 1 && (
                      <div className="mock-team-layout">
                        <div className="team-pill-chip">
                          <Users size={16} className="text-electric" />
                          <span>Salesforce VP · 12y Enterprise SaaS</span>
                        </div>
                        <div className="team-pill-chip">
                          <Cpu size={16} className="text-electric" />
                          <span>Stanford AI PhD · NLP Transformers</span>
                        </div>
                      </div>
                    )}

                    {activeSlide.id === 2 && (
                      <div className="mock-tech-graph">
                        <div className="tech-node source">Snowflake / DW</div>
                        <div className="tech-arrow">→</div>
                        <div className="tech-node engine">Telemetry Model</div>
                        <div className="tech-arrow">→</div>
                        <div className="tech-node output">120d Alert</div>
                      </div>
                    )}

                    {activeSlide.id === 3 && (
                      <div className="mock-traction-bars">
                        <div className="bar-col">
                          <div className="bar-fill" style={{ height: '35%' }} />
                          <span>Q1</span>
                        </div>
                        <div className="bar-col">
                          <div className="bar-fill" style={{ height: '52%' }} />
                          <span>Q2</span>
                        </div>
                        <div className="bar-col">
                          <div className="bar-fill" style={{ height: '78%' }} />
                          <span>Q3</span>
                        </div>
                        <div className="bar-col active">
                          <div className="bar-fill" style={{ height: '100%' }} />
                          <span>$420k</span>
                        </div>
                      </div>
                    )}

                    {activeSlide.id === 4 && (
                      <div className="mock-alert-strip">
                        <AlertTriangle size={15} className="text-critical" />
                        <span>
                          <strong>Missing Metric:</strong> Institutional partners require CAC payback months.
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Navigation Strip */}
            <div className="deck-slide-strip">
              {PREVIEW_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`slide-thumbnail-btn ${activeSlideIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveSlideIndex(index)}
                >
                  <span className="thumb-num">0{slide.id}</span>
                  <span className="thumb-title">{slide.title}</span>
                  <span className={`thumb-score-pill ${slide.status}`}>
                    {slide.score}/10
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Live Telemetry Inspector Card */}
        <div className="deck-telemetry-inspector">
          <div className="inspector-card">
            {/* Inspector Topbar */}
            <div className="inspector-topbar">
              <div className="inspector-tag">
                <ShieldCheck size={18} className="text-electric" />
                <span>RUBRIC SCORING & DILIGENCE RADAR</span>
              </div>
              <span className="citation-tag">{activeSlide.citation}</span>
            </div>

            {/* Score Highlight Box */}
            <div className="inspector-score-row">
              <div className="score-radial-minimal">
                <span className="score-val">{activeSlide.score}</span>
                <span className="score-max">/{activeSlide.scoreMax}</span>
              </div>
              <div className="score-meta-block">
                <span className="score-category-name">{activeSlide.category}</span>
                <span className={`score-benchmark-label ${activeSlide.status}`}>
                  {activeSlide.status === 'strong'
                    ? 'Exceeds Series A Benchmark'
                    : activeSlide.status === 'good'
                    ? 'Meets Series A Benchmark'
                    : 'Critical Diligence Deficit'}
                </span>
              </div>
            </div>

            {/* Diligence Analysis Note */}
            <div className="inspector-analysis-section">
              <h4 className="analysis-heading">Institutional Investor Scrutiny</h4>
              <p className="analysis-body-text">{activeSlide.diligenceNote}</p>
            </div>

            {/* Partner Question Scaffolding */}
            <div className="inspector-partner-box">
              <div className="partner-box-header">
                <span className="partner-dot" />
                <span>Simulated Partner Interrogation Question</span>
              </div>
              <p className="partner-question-quote">
                {activeSlide.id === 1 &&
                  '"How did your team secure the initial 14 enterprise design contracts, and how repeatable is this process once founder-led sales ends?"'}
                {activeSlide.id === 2 &&
                  '"What prevents Snowflake or Databricks from releasing a native churn telemetry feature and eliminating your integration moat?"'}
                {activeSlide.id === 3 &&
                  '"Your 114% NRR is strong, but how much of that is driven by usage expansion versus price increases on renewals?"'}
                {activeSlide.id === 4 &&
                  '"What is your gross-margin-adjusted customer acquisition cost payback period, and how will it scale as you hire 4 new quota-carrying reps?"'}
              </p>
            </div>

            {/* Bottom Primary CTA Button */}
            <div className="inspector-cta-box">
              <motion.button
                type="button"
                className="inspector-explore-btn"
                onClick={onExploreFullReport}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles size={16} />
                <span>Launch Full 10-Rubric Evaluation</span>
                <ArrowRight size={15} />
              </motion.button>
              <span className="inspector-subtext">
                Explore the complete diligence report, 10 rubric scores & partner simulation.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
