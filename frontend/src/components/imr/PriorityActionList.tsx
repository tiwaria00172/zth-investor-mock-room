import React, { useState } from 'react'
import { CheckCircle2, AlertOctagon, AlertTriangle, Info, CheckSquare, Square } from 'lucide-react'
import { Improvement } from '../../types'

type PriorityActionListProps = {
  improvements: Improvement[]
}

export const PriorityActionList: React.FC<PriorityActionListProps> = ({ improvements }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }

  // Priority badge styling
  const getPriorityBadge = (priority: string) => {
    const p = priority.toLowerCase()
    if (p === 'high') {
      return (
        <span className="priority-pill priority-high">
          <AlertOctagon size={16} />
          High priority
        </span>
      )
    }
    if (p === 'medium') {
      return (
        <span className="priority-pill priority-med">
          <AlertTriangle size={16} />
          Medium priority
        </span>
      )
    }
    return (
      <span className="priority-pill priority-low">
        <Info size={16} />
        Lower priority
      </span>
    )
  }

  const completedCount = Object.values(checkedItems).filter(Boolean).length

  return (
    <div className="priority-action-section">
      <div className="action-section-header">
        <div>
          <h3 className="section-title">Priority Diligence Fixes</h3>
          <p className="section-subtitle">
            Concrete actions to resolve weaknesses before prospective investors begin diligence.
          </p>
        </div>

        {improvements.length > 0 && (
          <div className="action-progress-chip">
            <span>
              Session checklist: {completedCount} / {improvements.length} addressed
            </span>
          </div>
        )}
      </div>

      <div className="actions-list">
        {improvements.map((item, idx) => {
          const isChecked = !!checkedItems[idx]

          return (
            <article
              key={idx}
              className={`action-card ${item.priority.toLowerCase()} ${isChecked ? 'is-completed' : ''}`}
            >
              <div className="action-card-header">
                <div className="action-header-left">
                  <button
                    type="button"
                    className="action-checkbox"
                    onClick={() => toggleCheck(idx)}
                    aria-label={`Mark "${item.issue}" as addressed`}
                  >
                    {isChecked ? (
                      <CheckSquare size={20} className="text-success" />
                    ) : (
                      <Square size={20} className="text-secondary" />
                    )}
                  </button>

                  <div className="action-titles">
                    {getPriorityBadge(item.priority)}
                    <strong className="action-issue-text">{item.issue}</strong>
                  </div>
                </div>

                {item.slide_numbers && item.slide_numbers.length > 0 && (
                  <span className="action-slide-tag">
                    Slide {item.slide_numbers.join(', ')}
                  </span>
                )}
              </div>

              <div className="action-card-body">
                <div className="action-why-box">
                  <span className="action-label">WHY INVESTORS CARE:</span>
                  <p>{item.why_it_matters}</p>
                </div>

                <div className="action-rec-box">
                  <CheckCircle2 size={16} className="text-electric flex-shrink-0" />
                  <div className="rec-content">
                    <span className="action-label text-electric">RECOMMENDED NEXT STEP:</span>
                    <p>{item.recommendation}</p>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
