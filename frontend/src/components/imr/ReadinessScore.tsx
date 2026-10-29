import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Info } from 'lucide-react'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'

type ReadinessScoreProps = {
  score: number
  isSample?: boolean
  startupName: string
  stage?: string
  industry?: string
  scoreNote?: string
}

export const ReadinessScore: React.FC<ReadinessScoreProps> = ({
  score,
  isSample = false,
  startupName,
  stage,
  industry,
  scoreNote
}) => {
  // Animated number count-up
  const animatedScore = useAnimatedCounter(score, 1100)

  // Score color tiers
  const getScoreColor = (val: number) => {
    if (val >= 80) return '#15803D' // Success green
    if (val >= 60) return '#2563EB' // Electric blue
    if (val >= 40) return '#B45309' // Warning amber
    return '#B91C1C' // Critical red
  }

  const scoreColor = getScoreColor(score)

  // SVG Circular calculation
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (Math.max(0, Math.min(100, score)) / 100) * circumference

  return (
    <motion.div
      className="readiness-score-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
    >
      <div className="score-card-left">
        <div className="score-meta-badges">
          {isSample ? (
            <motion.span
              className="badge-pill badge-sample"
              title="Demonstration report based on sample data"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              Illustrative Sample Data
            </motion.span>
          ) : (
            <motion.span
              className="badge-pill badge-live"
              title="Generated from real pitch deck text extraction"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <ShieldCheck size={16} /> Live Pitch Deck Evaluation
            </motion.span>
          )}

          {stage && <span className="badge-pill badge-stage">{stage}</span>}
          {industry && <span className="badge-pill badge-industry">{industry}</span>}
        </div>

        <h2 className="readiness-startup-title">{startupName || 'Startup'} Readiness Assessment</h2>

        {scoreNote && <p className="readiness-score-note">{scoreNote}</p>}

        <div className="score-disclaimer">
          <Info size={16} className="disclaimer-icon" />
          <span>
            Coaching readiness score based on text evidence in uploaded slides. This is an advisory rubric score, not a guaranteed investment rating or probability of funding.
          </span>
        </div>
      </div>

      <div className="score-card-right">
        <div className="circular-meter" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
          <svg width="128" height="128" viewBox="0 0 128 128" className="meter-svg">
            <circle
              className="meter-bg"
              cx="64"
              cy="64"
              r={radius}
              strokeWidth="9"
            />
            <motion.circle
              className="meter-fill"
              cx="64"
              cy="64"
              r={radius}
              strokeWidth="9"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: strokeDashoffset }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                stroke: scoreColor,
                strokeDasharray: circumference
              }}
            />
          </svg>

          <div className="meter-label">
            <span className="meter-number" style={{ color: scoreColor }}>
              {animatedScore}
            </span>
            <span className="meter-sub">/ 100</span>
          </div>
        </div>

        <span className="meter-caption">Readiness Index</span>
      </div>
    </motion.div>
  )
}
