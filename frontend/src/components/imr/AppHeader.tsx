import React from 'react'
import { Menu, Settings2, PlusCircle } from 'lucide-react'
import { WorkflowStep } from '../../types'
import { WorkflowStepper } from './WorkflowStepper'

type AppHeaderProps = {
  currentStep: WorkflowStep
  onSelectStep: (step: WorkflowStep) => void
  onToggleSidebar: () => void
  onOpenSettings: () => void
  onQuickUpload: () => void
  keyConfigured: boolean
  hasEvaluation: boolean
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentStep,
  onSelectStep,
  onToggleSidebar,
  onOpenSettings,
  onQuickUpload,
  keyConfigured,
  hasEvaluation
}) => {
  const getBreadcrumb = () => {
    switch (currentStep) {
      case 'upload':
        return 'Dashboard / Upload Pitch Deck'
      case 'review':
        return 'Pitch Deck Evaluation / Readiness Report'
      case 'practice':
        return 'Investor Simulation / Practice Room'
      default:
        return 'Workspace'
    }
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>

        <div className="breadcrumb-wrapper">
          <span className="breadcrumb-root">ZTH</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{getBreadcrumb()}</span>
        </div>
      </div>

      <div className="header-center">
        <WorkflowStepper
          currentStep={currentStep}
          onSelectStep={onSelectStep}
          hasEvaluation={hasEvaluation}
        />
      </div>

      <div className="header-right">
        {currentStep !== 'upload' && (
          <button
            type="button"
            className="header-quick-upload glass-control"
            onClick={onQuickUpload}
            title="Upload a new pitch deck"
          >
            <PlusCircle size={15} />
            <span>Upload Deck</span>
          </button>
        )}

        <button
          type="button"
          className="header-settings-btn glass-control"
          onClick={onOpenSettings}
          title="AI Provider Settings"
        >
          <Settings2 size={15} />
          <span className="settings-btn-text">AI Provider</span>
          <span
            className="status-pill-dot"
            style={{ background: keyConfigured ? '#15803D' : '#B45309' }}
            title={keyConfigured ? 'Provider configured' : 'API key missing'}
          />
        </button>
      </div>
    </header>
  )
}
