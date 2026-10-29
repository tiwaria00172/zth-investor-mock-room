import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Download,
  Copy,
  Check,
  AlertOctagon,
  MessageSquareText,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Evaluation, StartupProfile } from '../types'
import { ReadinessScore } from '../components/imr/ReadinessScore'
import { CategoryScoreCard } from '../components/imr/CategoryScoreCard'
import { EvidencePanel } from '../components/imr/EvidencePanel'
import { PriorityActionList } from '../components/imr/PriorityActionList'
import { generateMarkdownReport, downloadMarkdownFile } from '../utils/exportReport'

type EvaluationReportPageProps = {
  evaluation: Evaluation
  profile: StartupProfile
  onNavigateToPractice: () => void
  onUploadNewDeck: () => void
}

export const EvaluationReportPage: React.FC<EvaluationReportPageProps> = ({
  evaluation,
  profile,
  onNavigateToPractice,
  onUploadNewDeck
}) => {
  const [copied, setCopied] = useState(false)
  const [metaExpanded, setMetaExpanded] = useState(false)
  // Track open category cards by name
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    // Open the lowest-scoring category by default
    const lowestCategory = [...(evaluation.categories || [])].sort((a, b) => a.score - b.score)[0]
    return lowestCategory ? { [lowestCategory.name]: true } : {}
  })

  const toggleCategory = (name: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const handleDownloadMarkdown = () => {
    const md = generateMarkdownReport(profile, evaluation)
    const sanitized = (profile.name || 'startup').toLowerCase().replace(/[^a-z0-9]/g, '_')
    downloadMarkdownFile(`${sanitized}_investor_readiness.md`, md)
  }

  const handleCopySummary = async () => {
    const md = generateMarkdownReport(profile, evaluation)
    await navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // Find the highest priority improvement to feature in the spotlight card
  const highestPriorityWeakness =
    (evaluation.improvements || []).find((i) => i.priority === 'High') ||
    evaluation.improvements?.[0]

  return (
    <motion.div
      className="evaluation-page-container"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Action Bar Header */}
      <div className="report-action-topbar">
        <div className="report-topbar-left">
          <h1 className="report-page-title">Pitch Deck Readiness Assessment</h1>
        </div>

        <div className="report-topbar-actions">
          <motion.button
            type="button"
            className="report-export-btn"
            onClick={handleDownloadMarkdown}
            title="Download full evaluation report as Markdown"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={15} />
            <span>Download markdown</span>
          </motion.button>

          <motion.button
            type="button"
            className="report-export-btn"
            onClick={handleCopySummary}
            title="Copy summary to clipboard"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {copied ? <Check size={15} className="text-success" /> : <Copy size={15} />}
            <span>{copied ? 'Copied' : 'Copy summary'}</span>
          </motion.button>

          <motion.button
            type="button"
            className="report-practice-cta-btn"
            onClick={onNavigateToPractice}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start partner simulation</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>

      {/* A. Readiness Overview & Scorecard */}
      <ReadinessScore
        score={evaluation.overall_score}
        isSample={evaluation.isSample}
        startupName={profile.name || 'Startup'}
        stage={profile.stage}
        industry={profile.industry}
        scoreNote={evaluation.score_note}
      />

      {/* B. Highest-Priority Weakness Spotlight */}
      {highestPriorityWeakness && (
        <motion.section
          className="highest-weakness-spotlight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="spotlight-header">
            <div className="spotlight-title-group">
              <span className="spotlight-badge">
                <AlertOctagon size={14} /> Top diligence priority
              </span>
              <h3 className="spotlight-issue-title">{highestPriorityWeakness.issue}</h3>
            </div>

            {highestPriorityWeakness.slide_numbers && highestPriorityWeakness.slide_numbers.length > 0 && (
              <span className="spotlight-slide-tag">
                Slide {highestPriorityWeakness.slide_numbers.join(', ')}
              </span>
            )}
          </div>

          <div className="spotlight-grid">
            <div className="spotlight-col">
              <span className="spotlight-label">Why partners challenge this:</span>
              <p>{highestPriorityWeakness.why_it_matters}</p>
            </div>

            <div className="spotlight-col recommendation-col">
              <span className="spotlight-label text-electric">Recommended correction:</span>
              <p>{highestPriorityWeakness.recommendation}</p>
            </div>
          </div>
        </motion.section>
      )}

      {/* C. 10 Category Rubric Cards — Grouped by Investment Theme */}
      <section className="report-section categories-section">
        <div className="section-header-row">
          <div>
            <h3 className="section-title">Institutional Rubric Breakdown</h3>
            <p className="section-subtitle">
              Click any rubric card to inspect detailed findings, strengths, and slide citations.
            </p>
          </div>
          <span className="section-count-tag">{evaluation.categories?.length || 0} pillars scored</span>
        </div>

        {(() => {
          const categories = evaluation.categories || []

          const groups: { title: string; match: (name: string) => boolean }[] = [
            {
              title: 'Story & market opportunity',
              match: (n) => {
                const l = n.toLowerCase()
                return l.includes('problem') || l.includes('solution') || l.includes('market') || l.includes('tam')
              }
            },
            {
              title: 'Traction & business proof',
              match: (n) => {
                const l = n.toLowerCase()
                return (
                  l.includes('traction') ||
                  l.includes('model') ||
                  l.includes('pricing') ||
                  l.includes('financial') ||
                  l.includes('metric') ||
                  l.includes('unit')
                )
              }
            },
            {
              title: 'Team & competitive position',
              match: (n) => {
                const l = n.toLowerCase()
                return (
                  l.includes('team') ||
                  l.includes('founder') ||
                  l.includes('moat') ||
                  l.includes('go-to') ||
                  l.includes('gtm') ||
                  l.includes('ask') ||
                  l.includes('fund') ||
                  l.includes('compet')
                )
              }
            }
          ]

          const grouped = groups.map((g) => ({
            title: g.title,
            items: categories.filter((c) => g.match(c.name))
          }))
          const assigned = new Set(grouped.flatMap((g) => g.items.map((i) => i.name)))
          const unassigned = categories.filter((c) => !assigned.has(c.name))
          if (unassigned.length > 0) {
            grouped[grouped.length - 1].items.push(...unassigned)
          }

          return grouped
            .filter((g) => g.items.length > 0)
            .map((group, gIdx) => (
              <div key={gIdx} className="rubric-group">
                <h4 className="rubric-group-title">{group.title}</h4>
                <div className="category-cards-grid">
                  {group.items.map((cat, idx) => (
                    <CategoryScoreCard
                      key={cat.name + idx}
                      category={cat}
                      isOpen={!!openCategories[cat.name]}
                      onToggle={() => toggleCategory(cat.name)}
                    />
                  ))}
                </div>
              </div>
            ))
        })()}
      </section>

      {/* D. Evidence Panel & Pipeline Sources */}
      <section className="report-section evidence-section">
        <EvidencePanel
          strengths={evaluation.strengths || []}
          improvements={evaluation.improvements || []}
          slidesCount={evaluation.slides_extracted || 0}
        />
      </section>

      {/* E. Priority Action Checklist */}
      {evaluation.improvements && evaluation.improvements.length > 0 && (
        <section className="report-section checklist-section">
          <PriorityActionList improvements={evaluation.improvements} />
        </section>
      )}

      {/* Missing Information & Limitations — Collapsible to reduce cognitive load */}
      {((evaluation.missing_information && evaluation.missing_information.length > 0) ||
        (evaluation.limitations && evaluation.limitations.length > 0)) && (
        <section className="report-section missing-info-section">
          <button
            type="button"
            className="meta-toggle-btn"
            onClick={() => setMetaExpanded(!metaExpanded)}
            aria-expanded={metaExpanded}
          >
            <span>
              Analysis notes & limitations (
              {(evaluation.missing_information?.length || 0) + (evaluation.limitations?.length || 0)} items)
            </span>
            {metaExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {metaExpanded && (
            <div className="missing-info-grid">
              {evaluation.missing_information && evaluation.missing_information.length > 0 && (
                <div className="info-block">
                  <h4>Information to add or verify</h4>
                  <ul className="info-bullets">
                    {evaluation.missing_information.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.limitations && evaluation.limitations.length > 0 && (
                <div className="info-block limitations-block">
                  <h4>Pipeline analysis limitations</h4>
                  <ul className="info-bullets">
                    {evaluation.limitations.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Bottom Floating Navigation to Practice */}
      <motion.div
        className="report-bottom-cta-banner"
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        <div className="cta-banner-text">
          <MessageSquareText size={22} className="text-electric" />
          <div>
            <h4>Ready to test your narrative in the room?</h4>
            <p>
              Simulate pitch questions targeted at the exact gaps identified in this report with our AI Investor personas.
            </p>
          </div>
        </div>

        <motion.button
          type="button"
          className="report-practice-cta-btn large"
          onClick={onNavigateToPractice}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Start partner simulation</span>
          <ArrowRight size={17} />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
