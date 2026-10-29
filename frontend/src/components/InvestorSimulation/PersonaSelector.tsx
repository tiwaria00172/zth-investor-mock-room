import React from 'react'
import { BarChart3, Sparkles, Landmark } from 'lucide-react'
import { InvestorPersona } from '../../types'

type PersonaSelectorProps = {
  selectedPersona: InvestorPersona
  onSelectPersona: (persona: InvestorPersona) => void
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  selectedPersona,
  onSelectPersona
}) => {
  return (
    <div className="persona-section">
      <h3>Choose your investor lens</h3>
      <div className="persona-grid">
        <button
          type="button"
          className={`persona ${selectedPersona === 'vc' ? 'selected-persona' : ''}`}
          onClick={() => onSelectPersona('vc')}
        >
          <span className="persona-icon">
            <BarChart3 size={20} />
          </span>
          <strong>Venture capital</strong>
          <small>Power-law scale, 100x return potential, defensibility & unit economics</small>
        </button>

        <button
          type="button"
          className={`persona ${selectedPersona === 'angel' ? 'selected-persona' : ''}`}
          onClick={() => onSelectPersona('angel')}
        >
          <span className="persona-icon">
            <Sparkles size={20} />
          </span>
          <strong>Angel investor</strong>
          <small>Founder-market fit, early customer intimacy & capital efficiency</small>
        </button>

        <button
          type="button"
          className={`persona ${selectedPersona === 'family_office' ? 'selected-persona' : ''}`}
          onClick={() => onSelectPersona('family_office')}
        >
          <span className="persona-icon">
            <Landmark size={20} />
          </span>
          <strong>Family office</strong>
          <small>Capital preservation, governance, long-term cash flows & risk mitigation</small>
        </button>
      </div>
    </div>
  )
}
