import React, { useEffect, useState } from 'react'
import { LoaderCircle, FileSearch, Cpu, CheckSquare } from 'lucide-react'

type StagedLoadingIndicatorProps = {
  isAnalyzing: boolean
}

const STAGES = [
  { label: 'Transmitting deck to secure server memory...', icon: <LoaderCircle className="spin" size={18} /> },
  { label: 'Extracting slide text & structure with PyMuPDF...', icon: <FileSearch size={18} /> },
  { label: 'Evaluating investment rubrics & benchmarks via LLM...', icon: <Cpu size={18} /> },
  { label: 'Synthesizing actionable diligence improvements...', icon: <CheckSquare size={18} /> }
]

export const StagedLoadingIndicator: React.FC<StagedLoadingIndicatorProps> = ({ isAnalyzing }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0)

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStageIndex(0)
      return
    }

    // Progress through realistic time stages while the backend finishes
    const timer1 = setTimeout(() => setCurrentStageIndex(1), 1800)
    const timer2 = setTimeout(() => setCurrentStageIndex(2), 4500)
    const timer3 = setTimeout(() => setCurrentStageIndex(3), 9000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [isAnalyzing])

  if (!isAnalyzing) return null

  const currentStage = STAGES[currentStageIndex]
  const progressPercent = Math.min(92, 25 + currentStageIndex * 22)

  return (
    <div className="staged-loading-card" role="status" aria-live="polite">
      <div className="staged-loading-header">
        <div className="stage-icon-spinner">
          <LoaderCircle className="spin text-electric" size={24} />
        </div>
        <div className="stage-details">
          <span className="stage-step-tag">ANALYSIS IN PROGRESS · STAGE {currentStageIndex + 1} OF 4</span>
          <p className="stage-current-label">{currentStage.label}</p>
        </div>
      </div>

      <div className="stage-progress-bar-track">
        <div
          className="stage-progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="stage-subtext">
        <span>Evaluating 10 core investment rubrics across all extracted slides</span>
        <span>Please keep this tab open</span>
      </div>
    </div>
  )
}
