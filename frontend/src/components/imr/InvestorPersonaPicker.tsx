import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Sparkles, Landmark, Check } from 'lucide-react'
import { InvestorPersona } from '../../types'

type InvestorPersonaPickerProps = {
  selectedPersona: InvestorPersona
  onSelectPersona: (persona: InvestorPersona) => void
  disabled?: boolean
}

export const InvestorPersonaPicker: React.FC<InvestorPersonaPickerProps> = ({
  selectedPersona,
  onSelectPersona,
  disabled = false
}) => {
  const personas: {
    key: InvestorPersona
    title: string
    sub: string
    focus: string
    icon: React.ReactNode
  }[] = [
    {
      key: 'vc',
      title: 'Venture Capital Partner',
      sub: 'Seed / Series A Institutional VC',
      focus: 'Emphasizes power-law returns, unit economics, TAM scalability, and defensive moat against incumbents.',
      icon: <BarChart3 size={20} />
    },
    {
      key: 'angel',
      title: 'Angel Investor',
      sub: 'Former Founder / Operator',
      focus: 'Emphasizes founder-market fit, early customer intimacy, speed of iteration, and capital efficiency.',
      icon: <Sparkles size={20} />
    },
    {
      key: 'family_office',
      title: 'Family Office Director',
      sub: 'Private Wealth & Asset Allocation',
      focus: 'Emphasizes downside preservation, sustainable compounding, cash flow visibility, and corporate governance.',
      icon: <Landmark size={20} />
    }
  ]

  return (
    <div className="persona-picker-section">
      <div className="picker-header">
        <h3 className="picker-title">Select investor lens</h3>
        <p className="picker-sub">
          Choose the investment lens to simulate realistic questions and pressure-test your pitch.
        </p>
      </div>

      <div className="persona-cards-grid" role="radiogroup" aria-label="Investor Personas">
        {personas.map((p) => {
          const isSelected = selectedPersona === p.key

          return (
            <motion.button
              key={p.key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`persona-card ${isSelected ? 'is-selected glass-panel' : ''}`}
              onClick={() => onSelectPersona(p.key)}
              disabled={disabled}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              style={{ position: 'relative' }}
            >
              {isSelected && (
                <motion.span
                  className="persona-card-active-outline"
                  layoutId="activePersonaOutline"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}

              <div className="persona-card-top" style={{ position: 'relative', zIndex: 2 }}>
                <div className="persona-icon-box">{p.icon}</div>
                {isSelected && (
                  <motion.span
                    className="persona-selected-badge"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <Check size={16} strokeWidth={3} />
                    Active lens
                  </motion.span>
                )}
              </div>

              <div className="persona-card-titles" style={{ position: 'relative', zIndex: 2 }}>
                <h4 className="persona-title">{p.title}</h4>
                <span className="persona-sub">{p.sub}</span>
              </div>

              <p className="persona-focus" style={{ position: 'relative', zIndex: 2 }}>{p.focus}</p>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
