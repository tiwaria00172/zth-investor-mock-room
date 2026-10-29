import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  UploadCloud,
  FileText,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  PanelLeftClose,
  PanelLeft,
  Users,
  Cpu,
  BarChart3,
  TrendingUp,
  Target,
  ShieldCheck,
  Briefcase,
  DollarSign,
  ArrowRight
} from 'lucide-react'
import { Evaluation } from '../../types'

type DeckViewerPaneProps = {
  activeSlide: number
  onSelectSlide: (slide: number) => void
  file: File | null
  onSelectFile: (file: File | null) => void
  onLoadSample: () => void
  isAnalyzing: boolean
  evaluation: Evaluation | null
  onOpenUploadModal: () => void
}

export type SlideDefinition = {
  id: number
  title: string
  category: string
  headline: string
  subhead: string
  status: 'strong' | 'good' | 'critical'
  bullets: string[]
  metrics?: { label: string; value: string }[]
  diagramType?: 'team' | 'architecture' | 'market' | 'traction' | 'pricing' | 'competition' | 'financials'
  alert?: string
}

export const DEFAULT_SLIDES: SlideDefinition[] = [
  {
    id: 1,
    title: 'Executive Pedigree',
    category: 'Team & Founder-Market Fit',
    headline: 'Founders: Enterprise GTM + Deep AI Research',
    subhead: 'Combines 12 years of executive enterprise sales leadership with Stanford transformer AI research.',
    status: 'strong',
    diagramType: 'team',
    bullets: [
      'CEO: Ex-Salesforce VP of Sales · Led $60M ARR enterprise team',
      'CTO: Stanford AI PhD · 4 NeurIPS first-author publications on event telemetry',
      'Head of Product: Ex-Datadog Principal Telemetry Architect'
    ],
    metrics: [
      { label: 'Prior ARR Led', value: '$60M+' },
      { label: 'NeurIPS Citations', value: '4,200+' },
      { label: 'Design Partners', value: '14 Signed' }
    ]
  },
  {
    id: 2,
    title: 'Problem & Value Gap',
    category: 'Problem & Market Pain',
    headline: 'Silent Enterprise Churn Destroys $40B Annually',
    subhead: 'Existing CS health scores are retrospective: by the time survey scores drop, renewals are already lost.',
    status: 'strong',
    bullets: [
      'B2B SaaS companies lose 18% of contract volume to unflagged silent churn',
      'Legacy CS platforms rely on subjective human check-ins rather than data telemetry',
      'Revenue leaders have zero predictive visibility 90+ days prior to renewals'
    ],
    metrics: [
      { label: 'Annual Value Lost', value: '$40B' },
      { label: 'Average Churn Lead Time', value: '-14 Days' },
      { label: 'False Health Scores', value: '62%' }
    ]
  },
  {
    id: 3,
    title: 'Solution Architecture',
    category: 'Solution & Moat',
    headline: 'Warehouse-Native Churn Prediction Telemetry',
    subhead: 'Proprietary transformers trained on 50M event streams flag customer renewal churn 120 days in advance.',
    status: 'strong',
    diagramType: 'architecture',
    bullets: [
      'Zero-code warehouse connectors: Snowflake, BigQuery, and Databricks',
      'Continuous query ingestion without copying PII data outside customer cloud',
      'Automated prescriptive interventions routed to Slack, Salesforce & HubSpot'
    ],
    metrics: [
      { label: 'Prediction Horizon', value: '120 Days' },
      { label: 'Model Precision', value: '88%' },
      { label: 'Setup Timeline', value: '2 Hours' }
    ]
  },
  {
    id: 4,
    title: 'Market Sizing',
    category: 'Market Size & Sizing',
    headline: '$14.2B Total Addressable Market',
    subhead: 'Targeting 28,000 mid-market and enterprise SaaS organizations spending $30k+ on retention tooling.',
    status: 'good',
    diagramType: 'market',
    bullets: [
      'TAM: $14.2B Global Enterprise CS and Customer Analytics Software',
      'SAM: $4.5B Cloud Warehouse-Native Observability Applications',
      'SOM: $450M Target Accounts in North America & EMEA ($45k average contract)'
    ],
    metrics: [
      { label: 'TAM', value: '$14.2B' },
      { label: 'SAM', value: '$4.5B' },
      { label: 'SOM', value: '$450M' }
    ],
    alert: 'Diligence Note: SOM relies on top-down percentages. Partner will ask for bottom-up quota calculation.'
  },
  {
    id: 5,
    title: 'Traction Velocity',
    category: 'Traction & Unit Economics',
    headline: '$420K ARR Across 14 Enterprise Accounts',
    subhead: 'Compounding 22% month-over-month growth with 114% Net Revenue Retention (NRR).',
    status: 'critical',
    diagramType: 'traction',
    bullets: [
      'Healthy $30k Average Contract Value (ACV) with Fortune 1000 pilots',
      'Zero logo churn across all 14 enterprise production deployments',
      'CRITICAL OMISSION: Blended customer acquisition cost (CAC) and payback period unstated'
    ],
    metrics: [
      { label: 'Current ARR', value: '$420k' },
      { label: 'Net Retention', value: '114%' },
      { label: 'CAC Payback', value: 'OMITTED' }
    ],
    alert: 'Critical Diligence Gap: CAC payback period is missing from Slide 5. Essential for Series A term sheet.'
  },
  {
    id: 6,
    title: 'Business Model',
    category: 'Business Model & Expansion',
    headline: 'Predictable Annual Usage-Tiered Subscriptions',
    subhead: 'Contract pricing scales dynamically with tracked active monthly customer account volume.',
    status: 'good',
    diagramType: 'pricing',
    bullets: [
      'Tier 1 (Mid-Market): $24k/year up to 10k tracked accounts',
      'Tier 2 (Growth): $45k/year up to 50k tracked accounts',
      'Tier 3 (Enterprise): $75k-$150k custom telemetry volume'
    ],
    metrics: [
      { label: 'Entry ACV', value: '$24k' },
      { label: 'Enterprise ACV', value: '$75k+' },
      { label: 'Gross Margin', value: '82%' }
    ]
  },
  {
    id: 7,
    title: 'Competitive Moat',
    category: 'Defensibility & Competition',
    headline: '10x Faster Deployment vs Legacy Suites',
    subhead: 'Positioned against legacy suites (Gainsight, ChurnZero) with warehouse-native speed and no manual tagging.',
    status: 'strong',
    diagramType: 'competition',
    bullets: [
      'Zero-code deployment: Live in 2 hours vs 6 months for Gainsight',
      'Warehouse data privacy: Data never leaves enterprise cloud VPC',
      'Proprietary weights: Transformer models trained on 50M retention events'
    ],
    metrics: [
      { label: 'Deploy Time', value: '2 Hours' },
      { label: 'Legacy Setup', value: '180 Days' },
      { label: 'Proprietary Events', value: '50M+' }
    ]
  },
  {
    id: 8,
    title: 'The Ask & Plan',
    category: 'The Ask & Capital Allocation',
    headline: 'Raising $2.5M Seed to Scale to $2M ARR',
    subhead: '18-month runway to expand enterprise engineering and recruit 4 senior quota-carrying sales executives.',
    status: 'good',
    diagramType: 'financials',
    bullets: [
      '60% Engineering: Scale warehouse connectors and real-time streaming ML pipelines',
      '30% Go-To-Market: Hire 4 enterprise account executives and 1 solutions architect',
      '10% G&A and Operational compliance (SOC2 Type II validation)'
    ],
    metrics: [
      { label: 'Funding Ask', value: '$2.5M' },
      { label: 'Runway', value: '18 Mo' },
      { label: 'Target ARR', value: '$2.0M' }
    ]
  }
]

export const DeckViewerPane: React.FC<DeckViewerPaneProps> = ({
  activeSlide,
  onSelectSlide,
  file,
  onSelectFile,
  onLoadSample,
  isAnalyzing,
  evaluation,
  onOpenUploadModal
}) => {
  const [zoom, setZoom] = useState(1.2)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState<'slide' | 'pdf'>('slide')
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleStageDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const dropped = e.dataTransfer.files[0]
      if (dropped.name.toLowerCase().endsWith('.pdf') || dropped.type === 'application/pdf') {
        onSelectFile(dropped)
      }
    }
  }

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPdfUrl(url)
      setViewMode('pdf')
      return () => URL.revokeObjectURL(url)
    } else {
      setPdfUrl(null)
      setViewMode('slide')
    }
  }, [file])

  const isSampleDeck = Boolean(evaluation?.isSample && !file)
  const totalSlides = evaluation?.slides_extracted || (isSampleDeck ? DEFAULT_SLIDES.length : 1)

  const matchedCategories = evaluation?.categories?.filter((c) => c.slide_numbers?.includes(activeSlide)) || []
  const matchedStrengths = evaluation?.strengths?.filter((s) => s.slide_numbers?.includes(activeSlide)) || []
  const matchedImprovements = evaluation?.improvements?.filter((i) => i.slide_numbers?.includes(activeSlide)) || []

  const realSlideData: SlideDefinition = {
    id: activeSlide,
    title: matchedCategories[0]?.name || (file ? `Slide ${activeSlide}` : 'Diligence Slide'),
    category: matchedCategories[0]?.name || (evaluation ? 'AI Diligence Inspection' : 'Uploaded Presentation'),
    headline: matchedCategories[0]?.name
      ? `${matchedCategories[0].name} (Slide ${activeSlide})`
      : `Slide 0${activeSlide} Analysis`,
    subhead:
      matchedCategories[0]?.reason ||
      (matchedStrengths[0]?.point
        ? `Verified Strength: ${matchedStrengths[0].point}`
        : 'Analyzed against institutional venture capital diligence rubrics.'),
    status: matchedImprovements.some((i) => i.priority === 'High')
      ? 'critical'
      : matchedStrengths.length > 0
      ? 'strong'
      : 'good',
    bullets: [
      ...matchedStrengths.map((s) => `Verified: ${s.point}`),
      ...matchedImprovements.map((i) => `Action Item: ${i.recommendation}`)
    ].length > 0
      ? [
          ...matchedStrengths.map((s) => `Verified: ${s.point}`),
          ...matchedImprovements.map((i) => `Action Item: ${i.recommendation}`)
        ]
      : [
          `Slide 0${activeSlide} content extracted and verified against institutional diligence standards.`,
          'Review complete rubric scores and partner simulation in the right intelligence console.'
        ],
    metrics: [
      { label: 'Slide Number', value: `${activeSlide}` },
      { label: 'Rubrics Checked', value: `${matchedCategories.length || 1}` }
    ]
  }

  const currentSlideData = isSampleDeck ? (DEFAULT_SLIDES[activeSlide - 1] || realSlideData) : realSlideData

  // Handle keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger slide change if typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        if (activeSlide < totalSlides) onSelectSlide(activeSlide + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        if (activeSlide > 1) onSelectSlide(activeSlide - 1)
      } else if (e.key === 'f' && !e.metaKey && !e.ctrlKey) {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSlide, totalSlides, onSelectSlide])

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(2.2, Number((prev + 0.15).toFixed(2))))
  const handleZoomOut = () => setZoom((prev) => Math.max(0.7, Number((prev - 0.15).toFixed(2))))
  const handleResetZoom = () => setZoom(1.2)

  const handlePrev = () => {
    if (activeSlide > 1) onSelectSlide(activeSlide - 1)
  }

  const handleNext = () => {
    if (activeSlide < totalSlides) onSelectSlide(activeSlide + 1)
  }

  return (
    <div className={`cockpit-viewer-pane ${isFullscreen ? 'is-fullscreen' : ''}`} ref={containerRef}>
      {/* Top Deck Presentation Toolbar */}
      <div className="viewer-pane-header glass-panel">
        <div className="viewer-title-group">
          {evaluation && (
            <button
              type="button"
              className={`viewer-sidebar-toggle-btn glass-control ${isSidebarOpen ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? 'Collapse slide thumbnails' : 'Expand slide thumbnails'}
            >
              {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
            </button>
          )}

          <FileText size={18} className="text-electric" />
          <span
            className="viewer-file-name"
            title={file ? file.name : evaluation ? 'Northstar_AI_SeriesA_Pitch.pdf' : 'No pitch deck uploaded yet'}
          >
            {file ? file.name : evaluation ? 'Northstar_AI_SeriesA_Pitch.pdf' : 'No pitch deck uploaded yet'}
          </span>
          <span className="viewer-slide-badge">
            {evaluation
              ? `Slide ${activeSlide} of ${totalSlides}`
              : file
              ? 'Ready for evaluation'
              : 'Waiting for upload'}
          </span>
        </div>

        {/* Central Presentation Controls: Navigation & Zoom */}
        <div className="viewer-controls-group">
          <div className="viewer-nav-controls">
            <button
              type="button"
              className="viewer-nav-btn glass-control"
              onClick={handlePrev}
              disabled={!evaluation || activeSlide <= 1}
              title="Previous Slide (←)"
            >
              <ChevronLeft size={15} />
              <span>Prev</span>
            </button>

            <span className="viewer-slide-counter">
              {evaluation ? `${activeSlide} / ${totalSlides}` : '0 / 0'}
            </span>

            <button
              type="button"
              className="viewer-nav-btn glass-control"
              onClick={handleNext}
              disabled={!evaluation || activeSlide >= totalSlides}
              title="Next Slide (→)"
            >
              <span>Next</span>
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="viewer-zoom-controls">
            <button
              type="button"
              className="viewer-zoom-btn glass-control"
              onClick={handleZoomOut}
              disabled={!evaluation && !file}
              title="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              type="button"
              className="viewer-zoom-label glass-control"
              onClick={handleResetZoom}
              title="Reset zoom to 120%"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              className="viewer-zoom-btn glass-control"
              onClick={handleZoomIn}
              disabled={!evaluation && !file}
              title="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
            <button
              type="button"
              className="viewer-zoom-btn glass-control"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen (F)'}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="viewer-header-actions">
          {file && (
            <div className="viewer-mode-toggle" role="group" aria-label="Deck View Mode">
              <button
                type="button"
                className={`mode-btn ${viewMode === 'slide' ? 'active' : ''}`}
                onClick={() => setViewMode('slide')}
                title="View AI extracted slide analysis"
              >
                AI Slide
              </button>
              <button
                type="button"
                className={`mode-btn ${viewMode === 'pdf' ? 'active' : ''}`}
                onClick={() => setViewMode('pdf')}
                title="View original uploaded PDF"
              >
                Original PDF
              </button>
            </div>
          )}

          <button
            type="button"
            className="viewer-switch-btn glass-control"
            onClick={onOpenUploadModal}
            title="Upload your pitch deck"
          >
            <Upload size={14} />
            <span>Upload Deck</span>
          </button>
        </div>
      </div>

      {/* Workspace Body: Optional Collapsible Sidebar + Slide Canvas */}
      <div className="viewer-stage-container">
        {/* Collapsible Left Thumbnail Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              className="viewer-collapsible-sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sidebar-header-row">
                <span className="sidebar-heading">Slides ({totalSlides})</span>
                <span className="sidebar-subtext">Click to inspect</span>
              </div>

              <div className="sidebar-thumbnails-scroll">
                {/* Sidebar Slide Thumbnails */}
                {Array.from({ length: totalSlides }).map((_, idx) => {
                  const slideNumber = idx + 1
                  const def = isSampleDeck ? DEFAULT_SLIDES[idx] : null
                  const matchedCat = evaluation?.categories?.find((c) => c.slide_numbers?.includes(slideNumber))
                  const hasRisk = evaluation?.improvements?.some((i) => i.slide_numbers?.includes(slideNumber) && i.priority === 'High')
                  const hasStrength = evaluation?.strengths?.some((s) => s.slide_numbers?.includes(slideNumber))

                  const title = def?.title || matchedCat?.name || `Slide 0${slideNumber}`
                  const category = def?.category || (matchedCat ? `${matchedCat.score}/10 Diligence` : evaluation ? 'Analyzed' : 'Presentation')
                  const status = def?.status || (hasRisk ? 'critical' : hasStrength ? 'strong' : 'good')
                  const isActive = activeSlide === slideNumber

                  return (
                    <button
                      key={slideNumber}
                      type="button"
                      className={`sidebar-thumb-card ${isActive ? 'active' : ''}`}
                      onClick={() => onSelectSlide(slideNumber)}
                    >
                      <div className="thumb-card-top">
                        <span className="thumb-card-num">Slide 0{slideNumber}</span>
                        <span className={`thumb-status-dot ${status}`} />
                      </div>
                      <span className="thumb-card-title">{title}</span>
                      <span className="thumb-card-cat">{category}</span>
                    </button>
                  )
                })}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Centered Presentation Stage Canvas */}
        <div
          className={`viewer-slide-stage ${isDragOver ? 'is-dragging-stage' : ''}`}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setIsDragOver(false)
          }}
          onDrop={handleStageDrop}
        >
          {!file && !evaluation ? (
            <div className="viewer-upload-stage">
              <div className="viewer-upload-card">
                <div className="viewer-upload-icon-circle">
                  <UploadCloud size={24} className="text-electric" />
                </div>
                <h3 className="viewer-upload-title">Upload Pitch Deck</h3>
                <p className="viewer-upload-subtext">
                  Drag and drop your presentation PDF here, or select it from your device.
                </p>

                <label className="viewer-upload-browse-btn">
                  <UploadCloud size={14} />
                  <span>Choose PDF File</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        onSelectFile(e.target.files[0])
                      }
                    }}
                  />
                </label>

                <div className="viewer-upload-meta-pills">
                  <span className="upload-meta-pill">PDF up to 50MB</span>
                  <span className="upload-meta-pill">10-point diligence extraction</span>
                </div>
                <span className="viewer-upload-hint-subtle">
                  PowerPoint or Keynote? Save or export as PDF before uploading.
                </span>
              </div>
            </div>
          ) : !evaluation && file ? (
            <div className="viewer-upload-stage">
              <div className="viewer-upload-card ready-state">
                <div className="viewer-upload-icon-circle ready">
                  <FileText size={24} className="text-electric" />
                </div>
                <span className="ready-deck-pill">Pitch Deck Attached</span>
                <h3 className="viewer-upload-title">{file.name}</h3>
                <p className="viewer-upload-subtext">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB · PDF presentation ready for evaluation.
                </p>

                <div className="viewer-deck-ready-actions">
                  <button
                    type="button"
                    className="viewer-evaluate-now-btn"
                    onClick={onOpenUploadModal}
                  >
                    <span>Proceed to Evaluation</span>
                    <ArrowRight size={14} />
                  </button>

                  <label className="viewer-change-deck-btn">
                    <span>Change File</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="sr-only"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          onSelectFile(e.target.files[0])
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          ) : viewMode === 'pdf' && pdfUrl ? (
            <div
              className="pdf-embed-wrapper"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            >
              <iframe
                src={`${pdfUrl}#page=${activeSlide}&toolbar=0&navpanes=0&view=FitH&zoom=130`}
                className="pdf-native-iframe"
                title={`Uploaded Pitch Deck - Slide ${activeSlide}`}
              />
            </div>
          ) : (
            <motion.div
              className="slide-canvas-viewport"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideData.id}
                className="slide-canvas-card"
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 1.01 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Slide Header Eyebrow */}
                <div className="slide-card-header">
                  <div className="slide-category-tag">
                    <span className="slide-num-pill">0{currentSlideData.id}</span>
                    <span className="slide-cat-name">{currentSlideData.category}</span>
                  </div>
                  <span className={`slide-status-indicator ${currentSlideData.status}`}>
                    {currentSlideData.status === 'critical' ? (
                      <AlertTriangle size={16} />
                    ) : (
                      <CheckCircle2 size={16} />
                    )}
                    <span>
                      {currentSlideData.status === 'critical'
                        ? 'Diligence Risk Flagged'
                        : 'Evidence Verified'}
                    </span>
                  </span>
                </div>

                {/* Slide Body Headline */}
                <div className="slide-card-body">
                  <div className="slide-header-block">
                    <h2 className="slide-headline-text">{currentSlideData.headline}</h2>
                    <p className="slide-subhead-text">{currentSlideData.subhead}</p>
                  </div>

                  {/* Bespoke Executive Slide Cards Based on Topic (Sample Deck Only) */}
                  {isSampleDeck && currentSlideData.id === 1 ? (
                    <div className="slide-cards-grid grid-3-cols">
                      <div className="executive-card">
                        <div className="exec-card-header">
                          <div className="exec-avatar-icon">
                            <Users size={16} />
                          </div>
                          <span className="exec-role-pill">CEO</span>
                        </div>
                        <h4 className="exec-card-name">Ex-Salesforce VP</h4>
                        <div className="exec-stat-chips-group">
                          <span className="visual-stat-pill highlight">$60M ARR Led</span>
                          <span className="visual-stat-pill">12y Enterprise GTM</span>
                        </div>
                      </div>

                      <div className="executive-card">
                        <div className="exec-card-header">
                          <div className="exec-avatar-icon">
                            <Cpu size={16} />
                          </div>
                          <span className="exec-role-pill">CTO</span>
                        </div>
                        <h4 className="exec-card-name">Stanford AI PhD</h4>
                        <div className="exec-stat-chips-group">
                          <span className="visual-stat-pill highlight">4,200+ Citations</span>
                          <span className="visual-stat-pill">4 NeurIPS Papers</span>
                        </div>
                      </div>

                      <div className="executive-card">
                        <div className="exec-card-header">
                          <div className="exec-avatar-icon">
                            <ShieldCheck size={16} />
                          </div>
                          <span className="exec-role-pill">Product</span>
                        </div>
                        <h4 className="exec-card-name">Ex-Datadog Principal</h4>
                        <div className="exec-stat-chips-group">
                          <span className="visual-stat-pill highlight">100M+ Telemetry</span>
                          <span className="visual-stat-pill">Cloud VPC Architect</span>
                        </div>
                      </div>
                    </div>
                  ) : isSampleDeck && currentSlideData.id === 2 ? (
                    <div className="slide-cards-grid grid-3-cols">
                      <div className="executive-card problem-card">
                        <div className="exec-card-header">
                          <span className="problem-num-badge">Pain 01</span>
                          <span className="problem-stat-badge">$40B / yr</span>
                        </div>
                        <h4 className="exec-card-name">Silent Churn Destruction</h4>
                        <div className="exec-stat-chips-group">
                          <span className="visual-stat-pill danger">18% Unflagged Loss</span>
                          <span className="visual-stat-pill">Zero Early Notice</span>
                        </div>
                      </div>

                      <div className="executive-card problem-card">
                        <div className="exec-card-header">
                          <span className="problem-num-badge">Pain 02</span>
                          <span className="problem-stat-badge">-14 Days</span>
                        </div>
                        <h4 className="exec-card-name">Lagging Survey Scores</h4>
                        <div className="exec-stat-chips-group">
                          <span className="visual-stat-pill warning">Retrospective Only</span>
                          <span className="visual-stat-pill">Renewals Lost</span>
                        </div>
                      </div>

                      <div className="executive-card problem-card">
                        <div className="exec-card-header">
                          <span className="problem-num-badge">Pain 03</span>
                          <span className="problem-stat-badge">62% False</span>
                        </div>
                        <h4 className="exec-card-name">Subjective Health Signals</h4>
                        <div className="exec-stat-chips-group">
                          <span className="visual-stat-pill danger">62% Inaccurate</span>
                          <span className="visual-stat-pill">No Event Telemetry</span>
                        </div>
                      </div>
                    </div>
                  ) : isSampleDeck && currentSlideData.id === 3 ? (
                    <div className="slide-pipeline-workflow">
                      <div className="pipeline-node-card">
                        <div className="pipeline-node-step">STEP 01</div>
                        <h4 className="pipeline-node-title">Warehouse Ingestion</h4>
                        <p className="pipeline-node-desc">Zero-code connectors for Snowflake, BigQuery & Databricks. Data never leaves customer cloud.</p>
                        <span className="pipeline-status-tag">Zero PII Egress</span>
                      </div>
                      <div className="pipeline-connector-flow">
                        <ArrowRight size={16} className="flow-icon" />
                      </div>
                      <div className="pipeline-node-card highlight">
                        <div className="pipeline-node-step">STEP 02</div>
                        <h4 className="pipeline-node-title">Transformer Engine</h4>
                        <p className="pipeline-node-desc">Pre-trained on 50M enterprise event streams to forecast churn 120 days before contract expiry.</p>
                        <span className="pipeline-status-tag active">120d Prior Notice</span>
                      </div>
                      <div className="pipeline-connector-flow">
                        <ArrowRight size={16} className="flow-icon" />
                      </div>
                      <div className="pipeline-node-card success">
                        <div className="pipeline-node-step">STEP 03</div>
                        <h4 className="pipeline-node-title">Prescriptive Alerts</h4>
                        <p className="pipeline-node-desc">Automated plays pushed directly to Salesforce, Slack & HubSpot to save key accounts.</p>
                        <span className="pipeline-status-tag success">88% Model Precision</span>
                      </div>
                    </div>
                  ) : isSampleDeck && currentSlideData.id === 4 ? (
                    <div className="slide-cards-grid grid-3-cols">
                      <div className="executive-card market-card">
                        <div className="market-tier-top">
                          <span className="market-tier-badge">TAM</span>
                          <span className="market-metric-val">$14.2B</span>
                        </div>
                        <h4 className="exec-card-name">Total Addressable Market</h4>
                        <p className="exec-card-desc">Global enterprise customer success and customer analytics software market size by 2028.</p>
                      </div>

                      <div className="executive-card market-card">
                        <div className="market-tier-top">
                          <span className="market-tier-badge">SAM</span>
                          <span className="market-metric-val">$4.5B</span>
                        </div>
                        <h4 className="exec-card-name">Serviceable Market</h4>
                        <p className="exec-card-desc">Cloud warehouse-native observability and predictive telemetry platforms in B2B SaaS.</p>
                      </div>

                      <div className="executive-card market-card">
                        <div className="market-tier-top">
                          <span className="market-tier-badge">SOM</span>
                          <span className="market-metric-val">$450M</span>
                        </div>
                        <h4 className="exec-card-name">Obtainable Market</h4>
                        <p className="exec-card-desc">28,000 mid-market and enterprise accounts in North America with $45k average contract value.</p>
                      </div>
                    </div>
                  ) : isSampleDeck && currentSlideData.id === 5 ? (
                    <div className="slide-cards-grid grid-3-cols">
                      <div className="executive-card">
                        <span className="traction-metric-kicker">ANNUAL RUN-RATE</span>
                        <h3 className="traction-big-figure">$420,000</h3>
                        <p className="exec-card-desc">Across 14 enterprise production deployments with Fortune 1000 design partners.</p>
                        <div className="exec-card-footer">
                          <span className="exec-highlight-pill success">+22% MoM Growth</span>
                        </div>
                      </div>

                      <div className="executive-card">
                        <span className="traction-metric-kicker">NET RETENTION</span>
                        <h3 className="traction-big-figure">114%</h3>
                        <p className="exec-card-desc">Zero logo churn across all live customer instances with active seat expansions.</p>
                        <div className="exec-card-footer">
                          <span className="exec-highlight-pill success">Zero Logo Churn</span>
                        </div>
                      </div>

                      <div className="executive-card gap-highlight-card">
                        <span className="traction-metric-kicker critical">DILIGENCE GAP</span>
                        <h3 className="traction-big-figure critical">OMITTED</h3>
                        <p className="exec-card-desc">Customer acquisition cost (CAC) and payback period are missing from this slide.</p>
                        <div className="exec-card-footer">
                          <span className="exec-highlight-pill danger">Critical Diligence Flag</span>
                        </div>
                      </div>
                    </div>
                  ) : isSampleDeck && currentSlideData.id === 6 ? (
                    <div className="slide-cards-grid grid-3-cols">
                      <div className="executive-card">
                        <span className="pricing-tier-tag">TIER 1 / MID-MARKET</span>
                        <h3 className="pricing-figure">$24k <small>/ yr</small></h3>
                        <p className="exec-card-desc">Up to 10,000 tracked customer accounts. Standard Snowflake & BigQuery connectors.</p>
                      </div>
                      <div className="executive-card highlight">
                        <span className="pricing-tier-tag active">TIER 2 / GROWTH</span>
                        <h3 className="pricing-figure">$45k <small>/ yr</small></h3>
                        <p className="exec-card-desc">Up to 50,000 tracked customer accounts. Real-time transformer streaming alerts.</p>
                      </div>
                      <div className="executive-card">
                        <span className="pricing-tier-tag">TIER 3 / ENTERPRISE</span>
                        <h3 className="pricing-figure">$75k+ <small>/ yr</small></h3>
                        <p className="exec-card-desc">Custom account volume, VPC private cluster deployment & custom ML model fine-tuning.</p>
                      </div>
                    </div>
                  ) : isSampleDeck && currentSlideData.id === 7 ? (
                    <div className="slide-cards-grid grid-3-cols">
                      <div className="executive-card">
                        <h4 className="exec-card-name">2-Hour Setup</h4>
                        <p className="exec-card-desc">Zero-code warehouse deployment live in 2 hours vs 180 days for legacy Gainsight suites.</p>
                        <div className="exec-card-footer">
                          <span className="exec-highlight-pill success">10x Faster Time-To-Value</span>
                        </div>
                      </div>
                      <div className="executive-card">
                        <h4 className="exec-card-name">VPC Data Privacy</h4>
                        <p className="exec-card-desc">Queries execute warehouse-native. Confidential customer data never exits company cloud.</p>
                        <div className="exec-card-footer">
                          <span className="exec-highlight-pill">SOC2 Compliant</span>
                        </div>
                      </div>
                      <div className="executive-card">
                        <h4 className="exec-card-name">Proprietary ML Weights</h4>
                        <p className="exec-card-desc">Fine-tuned on 50M historical retention events creating an expanding data moat.</p>
                        <div className="exec-card-footer">
                          <span className="exec-highlight-pill">50M+ Trained Signals</span>
                        </div>
                      </div>
                    </div>
                  ) : isSampleDeck && currentSlideData.id === 8 ? (
                    <div className="slide-cards-grid grid-3-cols">
                      <div className="executive-card">
                        <span className="ask-pct-tag">60% ALLOCATION</span>
                        <h4 className="exec-card-name">Engineering & ML</h4>
                        <p className="exec-card-desc">Expand warehouse connectors and real-time streaming ML pipelines.</p>
                      </div>
                      <div className="executive-card">
                        <span className="ask-pct-tag">30% ALLOCATION</span>
                        <h4 className="exec-card-name">Go-To-Market</h4>
                        <p className="exec-card-desc">Recruit 4 senior enterprise account executives and 1 solutions architect.</p>
                      </div>
                      <div className="executive-card">
                        <span className="ask-pct-tag">10% ALLOCATION</span>
                        <h4 className="exec-card-name">G&A & Security</h4>
                        <p className="exec-card-desc">SOC2 Type II validation and enterprise procurement compliance.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="slide-structured-cards-col">
                      {/* Real User Pitch Deck: Rubrics Checked */}
                      {matchedCategories.length > 0 && (
                        <div className="real-slide-rubrics-banner">
                          {matchedCategories.map((cat, idx) => (
                            <div key={idx} className="real-rubric-chip">
                              <span className="real-rubric-name">{cat.name}</span>
                              <span className={`real-rubric-score score-${cat.score >= 8 ? 'high' : cat.score >= 5 ? 'mid' : 'low'}`}>
                                {cat.score} / 10
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Real User Pitch Deck: Verified Strengths */}
                      {matchedStrengths.length > 0 && (
                        <div className="real-slide-section">
                          <h4 className="real-section-label verified">
                            <CheckCircle2 size={16} />
                            <span>Verified Evidence & Strengths ({matchedStrengths.length})</span>
                          </h4>
                          <div className="real-slide-cards-grid">
                            {matchedStrengths.map((str, sIdx) => (
                              <div key={sIdx} className="executive-card real-strength-card">
                                <div className="exec-card-header">
                                  <div className="exec-avatar-icon strength">
                                    <CheckCircle2 size={16} />
                                  </div>
                                  <span className="exec-role-pill success">Verified</span>
                                </div>
                                <p className="exec-card-desc strength-desc">{str.point}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Real User Pitch Deck: Diligence Flags */}
                      {matchedImprovements.length > 0 && (
                        <div className="real-slide-section">
                          <h4 className="real-section-label risk">
                            <AlertTriangle size={16} />
                            <span>Diligence Flags & Recommendations ({matchedImprovements.length})</span>
                          </h4>
                          <div className="real-slide-cards-grid">
                            {matchedImprovements.map((imp, iIdx) => (
                              <div key={iIdx} className="executive-card real-risk-card">
                                <div className="exec-card-header">
                                  <span className={`exec-role-pill ${imp.priority === 'High' ? 'danger' : 'warning'}`}>
                                    {imp.priority} Priority Gap
                                  </span>
                                </div>
                                <h4 className="exec-card-name risk-title">{imp.issue}</h4>
                                <p className="exec-card-desc risk-why">{imp.why_it_matters}</p>
                                <div className="exec-card-footer risk-rec">
                                  <span className="real-rec-tag">Action:</span>
                                  <span className="real-rec-text">{imp.recommendation}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Fallback Bullet Points if no specific strengths or improvements on this slide */}
                      {matchedStrengths.length === 0 && matchedImprovements.length === 0 && (
                        <div className="real-slide-general-col">
                          {currentSlideData.bullets.map((bullet, idx) => {
                            const parts = bullet.split(': ')
                            return (
                              <div key={idx} className="structured-bullet-card">
                                <div className="bullet-num-circle">{idx + 1}</div>
                                <div className="bullet-card-text">
                                  {parts.length > 1 ? (
                                    <>
                                      <strong className="bullet-lead-text">{parts[0]}</strong>
                                      <span className="bullet-rest-text">{parts.slice(1).join(': ')}</span>
                                    </>
                                  ) : (
                                    <span className="bullet-rest-text">{bullet}</span>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
