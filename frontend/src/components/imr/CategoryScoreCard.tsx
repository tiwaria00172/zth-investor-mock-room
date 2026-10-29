import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertCircle,
  HelpCircle,
  Zap,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Briefcase,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react'
import { RubricCategory } from '../../types'

type CategoryScoreCardProps = {
  category: RubricCategory
  isOpen: boolean
  onToggle: () => void
}

export const CategoryScoreCard: React.FC<CategoryScoreCardProps> = ({
  category,
  isOpen,
  onToggle
}) => {
  // Select icon based on category name
  const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase()
    if (lower.includes('problem')) return <AlertCircle size={18} />
    if (lower.includes('solution') || lower.includes('moat')) return <Zap size={18} />
    if (lower.includes('market')) return <Target size={18} />
    if (lower.includes('model') || lower.includes('pricing')) return <Briefcase size={18} />
    if (lower.includes('traction') || lower.includes('metric')) return <TrendingUp size={18} />
    if (lower.includes('team') || lower.includes('founder')) return <Users size={18} />
    if (lower.includes('financial') || lower.includes('ask') || lower.includes('fund')) return <DollarSign size={18} />
    return <HelpCircle size={18} />
  }

  const getScoreBadgeClass = (score: number) => {
    if (score >= 8) return 'score-pill-high'
    if (score >= 6) return 'score-pill-med'
    return 'score-pill-low'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Strong'
    if (score >= 6) return 'Adequate'
    return 'Needs attention'
  }

  return (
    <motion.div
      className={`category-card ${isOpen ? 'is-open' : ''}`}
      layout
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
    >
      <button
        type="button"
        className="category-card-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="cat-header-left">
          <div className="cat-icon-box">{getCategoryIcon(category.name)}</div>
          <span className="cat-name">{category.name}</span>
        </div>

        <div className="cat-header-right">
          <span className={`cat-score-badge ${getScoreBadgeClass(category.score)}`}>
            {category.score}/10 · {getScoreLabel(category.score)}
          </span>
          <motion.span
            className="cat-expand-arrow"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} />
          </motion.span>
        </div>
      </button>

      {/* Visual progress bar with animated entry */}
      <div className="cat-bar-track">
        <motion.div
          className={`cat-bar-fill ${getScoreBadgeClass(category.score)}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(5, Math.min(10, category.score)) * 10}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="category-card-body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cat-body-section">
              <span className="cat-section-label">Analysis and diligence notes</span>
              <p className="cat-reason-text">
                {category.reason || 'No detailed analysis found in the provided deck.'}
              </p>
            </div>

            {category.slide_numbers && category.slide_numbers.length > 0 ? (
              <div className="cat-evidence-tag">
                <FileText size={16} />
                <span>Evidence cited on slide {category.slide_numbers.join(', ')}</span>
              </div>
            ) : (
              <div className="cat-evidence-tag muted">
                <span>No direct slide evidence cited for this category</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
