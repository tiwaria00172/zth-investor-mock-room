import React from 'react'
import { FileText, MessageSquareText, ChevronRight, CircleHelp, RotateCcw } from 'lucide-react'
import { StartupProfile } from '../types'

type SidebarProps = {
  activeTab: 'evaluate' | 'practice'
  onSelectTab: (tab: 'evaluate' | 'practice') => void
  profile: StartupProfile
  onChangeProfile: (profile: StartupProfile) => void
  onResetSession: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  onChangeProfile,
  onResetSession
}) => {
  return (
    <aside className="sidebar">
      <div className="side-label">WORKSPACE</div>

      <button
        className={`side-link ${activeTab === 'evaluate' ? 'selected' : ''}`}
        onClick={() => onSelectTab('evaluate')}
      >
        <FileText size={18} />
        <span>Pitch deck review</span>
        <ChevronRight size={15} />
      </button>

      <button
        className={`side-link ${activeTab === 'practice' ? 'selected' : ''}`}
        onClick={() => onSelectTab('practice')}
      >
        <MessageSquareText size={18} />
        <span>Investor simulation</span>
        <ChevronRight size={15} />
      </button>

      <div className="side-divider" />

      <div className="side-label">STARTUP PROFILE</div>

      <label>
        Startup name
        <input
          value={profile.name}
          onChange={(e) => onChangeProfile({ ...profile, name: e.target.value })}
          placeholder="e.g. Northstar AI"
        />
      </label>

      <label>
        Industry
        <input
          value={profile.industry}
          onChange={(e) => onChangeProfile({ ...profile, industry: e.target.value })}
          placeholder="e.g. B2B SaaS / Fintech"
        />
      </label>

      <label>
        Fundraising stage
        <select
          value={profile.stage}
          onChange={(e) => onChangeProfile({ ...profile, stage: e.target.value })}
        >
          <option value="Pre-seed">Pre-seed</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
          <option value="Series B+">Series B+</option>
          <option value="Bootstrapped">Bootstrapped</option>
        </select>
      </label>

      <button
        type="button"
        onClick={onResetSession}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          background: 'none',
          border: '1px dashed #d6dce7',
          borderRadius: '6px',
          color: '#5d687a',
          fontSize: '12px',
          fontWeight: 600,
          padding: '8px 10px',
          width: '100%',
          marginTop: '16px',
          cursor: 'pointer'
        }}
        title="Reset profile, deck report, and practice session"
      >
        <RotateCcw size={14} />
        <span>Reset session</span>
      </button>

      <div className="profile-note">
        <CircleHelp size={16} />
        <span>
          Use a sample or non-confidential deck for this prototype. Do not upload confidential investor decks without prior authorization.
        </span>
      </div>
    </aside>
  )
}
