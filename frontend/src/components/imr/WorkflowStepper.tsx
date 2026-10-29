import React from 'react'
import { motion } from 'framer-motion'
import { Check, UploadCloud, FileBarChart, MessageSquare } from 'lucide-react'
import { WorkflowStep } from '../../types'

type WorkflowStepperProps = {
  currentStep: WorkflowStep
  onSelectStep: (step: WorkflowStep) => void
  hasEvaluation: boolean
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  currentStep,
  onSelectStep,
  hasEvaluation
}) => {
  const steps: { key: WorkflowStep; label: string; icon: React.ReactNode; accessible: boolean }[] = [
    {
      key: 'upload',
      label: 'Upload',
      icon: <UploadCloud size={14} />,
      accessible: true
    },
    {
      key: 'review',
      label: 'Review',
      icon: <FileBarChart size={14} />,
      accessible: hasEvaluation
    },
    {
      key: 'practice',
      label: 'Practice',
      icon: <MessageSquare size={14} />,
      accessible: true
    }
  ]

  return (
    <nav className="workflow-stepper glass-panel" aria-label="Workflow progress">
      {steps.map((step, index) => {
        const isCurrent = currentStep === step.key
        const isPast =
          (currentStep === 'review' && step.key === 'upload') ||
          (currentStep === 'practice' && (step.key === 'upload' || (step.key === 'review' && hasEvaluation)))

        return (
          <React.Fragment key={step.key}>
            <motion.button
              type="button"
              className={`stepper-item ${isCurrent ? 'current' : ''} ${isPast ? 'completed' : ''} ${
                !step.accessible ? 'disabled' : ''
              }`}
              onClick={() => step.accessible && onSelectStep(step.key)}
              disabled={!step.accessible}
              aria-current={isCurrent ? 'step' : undefined}
              whileHover={step.accessible ? { scale: 1.02 } : undefined}
              whileTap={step.accessible ? { scale: 0.98 } : undefined}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {/* Fluid gliding background indicator */}
              {isCurrent && (
                <motion.span
                  className="stepper-active-glider"
                  layoutId="activeStepperIndicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <span className="stepper-bubble">
                {isPast ? <Check size={12} strokeWidth={2.5} /> : step.icon}
              </span>
              <span className="stepper-label">{step.label}</span>
            </motion.button>

            {index < steps.length - 1 && (
              <span className={`stepper-connector ${isPast || isCurrent ? 'active' : ''}`} />
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
