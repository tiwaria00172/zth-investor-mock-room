import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  MessageSquareText,
  Settings2,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles
} from 'lucide-react'
import { WorkflowStep } from '../../types'

type AppSidebarProps = {
  currentStep: WorkflowStep
  onNavigate: (step: WorkflowStep) => void
  onOpenSettings: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  hasEvaluation: boolean
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentStep,
  onNavigate,
  onOpenSettings,
  isCollapsed,
  onToggleCollapse,
  hasEvaluation
}) => {
  return (
    <motion.aside
      className={`app-sidebar ${isCollapsed ? 'collapsed' : ''}`}
      aria-label="Application Sidebar"
      animate={{ width: isCollapsed ? 60 : 236 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <motion.div
            className="brand-logo-mark"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Z
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="brand-text"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.16 }}
              >
                <span className="brand-name">Investor Mock Room</span>
                <span className="brand-sub">Venture readiness</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          className="collapse-toggle"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </motion.button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                className="nav-group-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Workspace
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            className={`nav-item ${currentStep === 'upload' ? 'active' : ''}`}
            onClick={() => onNavigate('upload')}
            title="Dashboard & Upload"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            style={{ position: 'relative' }}
          >
            {currentStep === 'upload' && (
              <motion.span
                className="sidebar-active-pill"
                layoutId="sidebarActiveIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            )}
            <LayoutDashboard size={18} style={{ position: 'relative', zIndex: 2 }} />
            {!isCollapsed && <span style={{ position: 'relative', zIndex: 2 }}>Dashboard</span>}
          </motion.button>

          <motion.button
            type="button"
            className={`nav-item ${currentStep === 'review' ? 'active' : ''}`}
            onClick={() => onNavigate('review')}
            title="Pitch Deck Evaluation & Reports"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            style={{ position: 'relative' }}
          >
            {currentStep === 'review' && (
              <motion.span
                className="sidebar-active-pill"
                layoutId="sidebarActiveIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            )}
            <FileText size={18} style={{ position: 'relative', zIndex: 2 }} />
            {!isCollapsed && (
              <span className="nav-item-label" style={{ position: 'relative', zIndex: 2 }}>
                Deck Review
                {hasEvaluation && <span className="nav-pill">Ready</span>}
              </span>
            )}
          </motion.button>

          <motion.button
            type="button"
            className={`nav-item ${currentStep === 'practice' ? 'active' : ''}`}
            onClick={() => onNavigate('practice')}
            title="Investor Practice Simulation"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            style={{ position: 'relative' }}
          >
            {currentStep === 'practice' && (
              <motion.span
                className="sidebar-active-pill"
                layoutId="sidebarActiveIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            )}
            <MessageSquareText size={18} style={{ position: 'relative', zIndex: 2 }} />
            {!isCollapsed && <span style={{ position: 'relative', zIndex: 2 }}>Practice Room</span>}
          </motion.button>
        </div>

        <div className="nav-group">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                className="nav-group-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            className="nav-item"
            onClick={onOpenSettings}
            title="Configure Groq / OpenAI LLM Provider"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Settings2 size={18} />
            {!isCollapsed && <span>AI Provider</span>}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className="sidebar-footer-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="footer-card-header">
              <Shield size={15} className="text-electric" />
              <span>Venture Diligence</span>
            </div>
            <p>
              Simulated partner interrogation & 10-point scoring.
            </p>
            <div className="footer-tag">
              <Sparkles size={13} />
              <span>ZTH Intelligence</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}
