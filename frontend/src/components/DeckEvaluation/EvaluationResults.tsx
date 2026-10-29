import React, { useState } from 'react'
import {
  BarChart3,
  CheckCircle2,
  ArrowUpRight,
  Download,
  Copy,
  Check
} from 'lucide-react'
import { Evaluation, StartupProfile } from '../../types'
import { generateMarkdownReport, downloadMarkdownFile } from '../../utils/exportReport'

type EvaluationResultsProps = {
  evaluation: Evaluation
  profile: StartupProfile
  onGoToPractice: () => void
}

export const EvaluationResults: React.FC<EvaluationResultsProps> = ({
  evaluation,
  profile,
  onGoToPractice
}) => {
  const [copied, setCopied] = useState(false)

  const handleExportMarkdown = () => {
    const md = generateMarkdownReport(profile, evaluation)
    const sanitizedName = (profile.name || 'startup').toLowerCase().replace(/[^a-z0-9]/g, '_')
    downloadMarkdownFile(`${sanitizedName}_investor_readiness.md`, md)
  }

  const handleCopyClipboard = async () => {
    const md = generateMarkdownReport(profile, evaluation)
    await navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="results">
      <div className="result-top">
        <div>
          <div className="section-kicker">YOUR READINESS SNAPSHOT</div>
          <h3>
            {profile.name || 'Startup'}{' '}
            <span className="score-chip">{evaluation.overall_score ?? '—'}/100</span>
          </h3>
          <p>{evaluation.startup_summary}</p>
        </div>
        <div className="result-icon">
          <BarChart3 size={24} />
        </div>
      </div>

      <p className="score-note">
        {evaluation.score_note} · {evaluation.slides_extracted} slides analyzed
      </p>

      {/* Action bar for report export */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '16px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}
      >
        <button
          type="button"
          onClick={handleExportMarkdown}
          className="secondary-button"
          style={{ margin: 0, padding: '10px 14px', fontSize: '13px' }}
        >
          <Download size={15} /> Export Markdown Report
        </button>

        <button
          type="button"
          onClick={handleCopyClipboard}
          className="secondary-button"
          style={{ margin: 0, padding: '10px 14px', fontSize: '13px' }}
        >
          {copied ? <Check size={15} color="#2e9b68" /> : <Copy size={15} />}
          {copied ? 'Copied to clipboard' : 'Copy summary'}
        </button>
      </div>

      <h4>Rubric breakdown</h4>
      <div className="score-grid">
        {(evaluation.categories || []).map((cat, idx) => (
          <div className="score-card" key={cat.name + idx}>
            <div className="score-card-head">
              <span>{cat.name}</span>
              <b>{cat.score}/10</b>
            </div>
            <div className="bar">
              <span style={{ width: `${Math.max(0, Math.min(10, cat.score)) * 10}%` }} />
            </div>
            <p>{cat.reason}</p>
            {cat.slide_numbers?.length > 0 && (
              <small>Evidence: slide {cat.slide_numbers.join(', ')}</small>
            )}
          </div>
        ))}
      </div>

      {evaluation.strengths?.length > 0 && (
        <>
          <h4>Key strengths identified</h4>
          <ul className="plain-list">
            {evaluation.strengths.map((s, idx) => (
              <li key={idx}>
                <strong>{s.point}</strong>
                {s.slide_numbers?.length > 0 && ` (Slide ${s.slide_numbers.join(', ')})`}
              </li>
            ))}
          </ul>
        </>
      )}

      <h4>Priority improvements</h4>
      <div className="improvement-list">
        {(evaluation.improvements || []).map((item, idx) => (
          <article className="improvement" key={idx}>
            <div className="improvement-head">
              <span className={`priority priority-${item.priority.toLowerCase()}`}>
                {item.priority} priority
              </span>
              <span className="slide-ref">
                {item.slide_numbers?.length
                  ? `Slide ${item.slide_numbers.join(', ')}`
                  : 'Deck-wide gap'}
              </span>
            </div>
            <strong>{item.issue}</strong>
            <p>{item.why_it_matters}</p>
            <div className="recommendation">
              <CheckCircle2 size={16} />
              <span>{item.recommendation}</span>
            </div>
          </article>
        ))}
      </div>

      {(evaluation.missing_information || []).length > 0 && (
        <>
          <h4>Information to add or verify</h4>
          <ul className="plain-list">
            {evaluation.missing_information.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {(evaluation.limitations || []).length > 0 && (
        <p className="limitations">
          Limitations: {evaluation.limitations.join(' · ')}
        </p>
      )}

      <button className="secondary-button" onClick={onGoToPractice}>
        Practice with an investor <ArrowUpRight size={16} />
      </button>
    </div>
  )
}
