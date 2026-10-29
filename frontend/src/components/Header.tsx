import React from 'react'
import { Settings2 } from 'lucide-react'

type HeaderProps = {
  activeTab: 'evaluate' | 'practice'
  onSelectTab: (tab: 'evaluate' | 'practice') => void
  onToggleSettings: () => void
  keyConfigured: boolean
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onToggleSettings,
  keyConfigured
}) => {
  return (
    <header className="topbar">
      <a className="brand" href="#home">
        <span className="brand-mark">Z</span>
        <span>
          ZTH <small>VENTURE READINESS</small>
        </span>
      </a>

      <nav aria-label="Main Navigation">
        <button
          className={activeTab === 'evaluate' ? 'nav-active' : ''}
          onClick={() => onSelectTab('evaluate')}
          aria-current={activeTab === 'evaluate' ? 'page' : undefined}
        >
          Deck Evaluation
        </button>
        <button
          className={activeTab === 'practice' ? 'nav-active' : ''}
          onClick={() => onSelectTab('practice')}
          aria-current={activeTab === 'practice' ? 'page' : undefined}
        >
          Investor Practice
        </button>
      </nav>

      <div className="top-right">
        <button
          className="settings-trigger"
          onClick={onToggleSettings}
          title="Configure Groq / OpenAI LLM Provider"
        >
          <Settings2 size={16} />
          <span>AI Provider</span>
        </button>

        <span
          className="status-dot"
          style={{ background: keyConfigured ? '#2e9b68' : '#e06a3b' }}
          title={keyConfigured ? 'AI Provider Connected' : 'AI Key Missing'}
        />
        <span>{keyConfigured ? 'Ready' : 'Setup Key'}</span>
        <span className="avatar">AT</span>
      </div>
    </header>
  )
}
