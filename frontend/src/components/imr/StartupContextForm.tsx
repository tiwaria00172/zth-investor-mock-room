import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Sparkles, Building, Briefcase, DollarSign, Users, Target } from 'lucide-react'
import { StartupProfile } from '../../types'

type StartupContextFormProps = {
  profile: StartupProfile
  onChange: (profile: StartupProfile) => void
  disabled?: boolean
}

export const StartupContextForm: React.FC<StartupContextFormProps> = ({
  profile,
  onChange,
  disabled = false
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleField = (field: keyof StartupProfile, value: string) => {
    onChange({
      ...profile,
      [field]: value
    })
  }

  return (
    <div className="startup-context-form">
      <div className="form-primary-grid">
        <div className="form-field">
          <label htmlFor="startup-stage">
            Fundraising stage <span className="required-star">*</span>
          </label>
          <div className="stage-pill-selector">
            {['Pre-seed', 'Seed', 'Series A', 'Series B+'].map((s) => (
              <button
                key={s}
                type="button"
                className={`stage-pill-btn glass-control ${profile.stage === s ? 'active' : ''}`}
                onClick={() => handleField('stage', s)}
                disabled={disabled}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="startup-industry">
            Industry / Sector <span className="required-star">*</span>
          </label>
          <input
            id="startup-industry"
            type="text"
            value={profile.industry}
            onChange={(e) => handleField('industry', e.target.value)}
            placeholder="e.g. Fintech, Enterprise AI, HealthTech"
            disabled={disabled}
          />
          <div className="industry-quick-chips">
            {['Enterprise AI', 'Fintech', 'B2B SaaS', 'HealthTech', 'Developer Tools'].map((ind) => (
              <button
                key={ind}
                type="button"
                className={`industry-chip-btn ${profile.industry === ind ? 'active' : ''}`}
                onClick={() => handleField('industry', ind)}
                disabled={disabled}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="expandable-details-section">
        <button
          type="button"
          className="details-toggle-btn glass-control"
          onClick={() => setDetailsOpen(!detailsOpen)}
          aria-expanded={detailsOpen}
          aria-controls="optional-startup-details"
        >
          <div className="toggle-btn-left">
            <Sparkles size={14} className="text-electric" />
            <span>{detailsOpen ? 'Hide startup details' : 'Add startup details (optional)'}</span>
            <span className="optional-badge">Enriches AI practice</span>
          </div>
          {detailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {detailsOpen && (
          <div id="optional-startup-details" className="optional-details-panel">
            <p className="details-help-text">
              Providing extra context helps the AI investor simulate sharper, stage-specific interrogation questions.
            </p>

            <div className="details-grid">
              <div className="form-field">
                <label htmlFor="startup-name">
                  <Building size={14} /> Startup name
                </label>
                <input
                  id="startup-name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleField('name', e.target.value)}
                  placeholder="e.g. Northstar AI"
                  disabled={disabled}
                />
              </div>

              <div className="form-field">
                <label htmlFor="startup-funding-amount">
                  <DollarSign size={14} /> Target funding amount
                </label>
                <input
                  id="startup-funding-amount"
                  type="text"
                  value={profile.fundingAmount || ''}
                  onChange={(e) => handleField('fundingAmount', e.target.value)}
                  placeholder="e.g. $2.5M Seed"
                  disabled={disabled}
                />
              </div>

              <div className="form-field full-width">
                <label htmlFor="startup-desc">
                  <Briefcase size={14} /> One-line company elevator pitch
                </label>
                <input
                  id="startup-desc"
                  type="text"
                  value={profile.description || ''}
                  onChange={(e) => handleField('description', e.target.value)}
                  placeholder="e.g. Predictive customer churn telemetry engine for mid-market SaaS"
                  disabled={disabled}
                />
              </div>

              <div className="form-field">
                <label htmlFor="startup-target-market">
                  <Target size={14} /> Target customer or market
                </label>
                <input
                  id="startup-target-market"
                  type="text"
                  value={profile.targetMarket || ''}
                  onChange={(e) => handleField('targetMarket', e.target.value)}
                  placeholder="e.g. B2B software vendors ($10M-$250M ARR)"
                  disabled={disabled}
                />
              </div>

              <div className="form-field">
                <label htmlFor="startup-biz-model">
                  <Building size={14} /> Business model / Pricing
                </label>
                <input
                  id="startup-biz-model"
                  type="text"
                  value={profile.businessModel || ''}
                  onChange={(e) => handleField('businessModel', e.target.value)}
                  placeholder="e.g. Annual tiered SaaS subscription + volume tiers"
                  disabled={disabled}
                />
              </div>

              <div className="form-field full-width">
                <label htmlFor="startup-traction">
                  <Users size={14} /> Current traction & milestones
                </label>
                <input
                  id="startup-traction"
                  type="text"
                  value={profile.tractionNotes || ''}
                  onChange={(e) => handleField('tractionNotes', e.target.value)}
                  placeholder="e.g. $420k ARR, 14 enterprise pilot contracts, 114% NRR"
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
