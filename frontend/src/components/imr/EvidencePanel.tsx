import React, { useState } from 'react'
import { FileText, EyeOff, Layers, ChevronDown, ChevronUp } from 'lucide-react'
import { Improvement, Strength } from '../../types'

type EvidencePanelProps = {
  strengths: Strength[]
  improvements: Improvement[]
  slidesCount: number
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  strengths,
  improvements,
  slidesCount
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Collect all cited evidence
  const citations: Array<{
    type: 'strength' | 'improvement'
    title: string
    slideNumbers: number[]
    recommendation?: string
  }> = [
    ...strengths.map((s) => ({
      type: 'strength' as const,
      title: s.point,
      slideNumbers: s.slide_numbers
    })),
    ...improvements.map((imp) => ({
      type: 'improvement' as const,
      title: `${imp.issue} (${imp.priority} priority)`,
      slideNumbers: imp.slide_numbers,
      recommendation: imp.recommendation
    }))
  ]

  return (
    <div className="evidence-panel-wrapper">
      <div className="evidence-panel-header">
        <div className="panel-header-left">
          <Layers size={18} className="text-electric" />
          <h3 className="evidence-title">Deck Evidence & Pipeline Sources</h3>
          <span className="evidence-count-pill">{slidesCount} slides parsed</span>
        </div>

        <button
          type="button"
          className="evidence-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Hide citations' : 'Inspect citations'}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className="source-disclaimer-row">
        <div className="source-badge badge-active">
          <FileText size={16} />
          <span>Extracted slide text (local PyMuPDF)</span>
        </div>
        <div className="source-badge badge-inactive">
          <EyeOff size={16} />
          <span>Visual slide layout: Not parsed in current pipeline</span>
        </div>
      </div>

      {isExpanded && (
        <div className="evidence-list-container">
          <div className="evidence-grid">
            {citations.map((cite, idx) => (
              <div key={idx} className={`evidence-card ${cite.type}`}>
                <div className="evidence-card-top">
                  <span className={`evidence-type-pill ${cite.type}`}>
                    {cite.type === 'strength' ? 'Positive proof' : 'Diligence gap'}
                  </span>
                  <span className="evidence-slide-pill">
                    {cite.slideNumbers && cite.slideNumbers.length > 0
                      ? `Slide ${cite.slideNumbers.join(', ')}`
                      : 'Deck-wide context'}
                  </span>
                </div>

                <p className="evidence-card-title">{cite.title}</p>
                {cite.recommendation && (
                  <p className="evidence-card-sub">
                    <strong>Action:</strong> {cite.recommendation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
