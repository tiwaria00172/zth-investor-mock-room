import React from 'react'
import { Gauge, ArrowRight, LoaderCircle, FileText, Sparkles } from 'lucide-react'
import { Evaluation, StartupProfile } from '../../types'
import { UploadBox } from './UploadBox'
import { EvaluationResults } from './EvaluationResults'
import { Banner } from '../common/Banner'

type DeckEvaluationViewProps = {
  file: File | null
  onSelectFile: (file: File | null) => void
  profile: StartupProfile
  evaluation: Evaluation | null
  busy: boolean
  error: string
  onClearError: () => void
  onEvaluate: () => void
  onGoToPractice: () => void
}

export const DeckEvaluationView: React.FC<DeckEvaluationViewProps> = ({
  file,
  onSelectFile,
  profile,
  evaluation,
  busy,
  error,
  onClearError,
  onEvaluate,
  onGoToPractice
}) => {
  return (
    <>
      <div className="panel-heading">
        <div>
          <div className="section-kicker">MODULE 01 / READINESS</div>
          <h2>Pitch deck evaluation</h2>
          <p>Objective rubric analysis to uncover diligence gaps before investors do.</p>
        </div>
        <div className="heading-icon">
          <Gauge size={24} />
        </div>
      </div>

      <UploadBox file={file} onSelectFile={onSelectFile} />

      <div className="rubric-row">
        <div>
          <span className="rubric-number">01</span>
          <span>Problem & Solution</span>
        </div>
        <div>
          <span className="rubric-number">02</span>
          <span>Market & Model</span>
        </div>
        <div>
          <span className="rubric-number">03</span>
          <span>Traction & Team</span>
        </div>
        <div>
          <span className="rubric-number">04</span>
          <span>Ask & Financials</span>
        </div>
      </div>

      {error && <Banner type="error" message={error} onClose={onClearError} />}

      <button
        className="primary-button"
        onClick={onEvaluate}
        disabled={busy || !file}
      >
        {busy ? (
          <>
            <LoaderCircle className="spin" size={18} />
            Analyzing pitch deck…
          </>
        ) : (
          <>
            Evaluate pitch deck <ArrowRight size={17} />
          </>
        )}
      </button>

      {evaluation ? (
        <EvaluationResults
          evaluation={evaluation}
          profile={profile}
          onGoToPractice={onGoToPractice}
        />
      ) : (
        <div className="empty-state">
          <div className="empty-illustration">
            <FileText size={28} />
            <Sparkles size={16} />
          </div>
          <strong>Your deck evaluation will appear here</strong>
          <span>
            Upload a text-based PDF presentation to generate rubric scores, slide-by-slide citations, and prioritized diligence fixes.
          </span>
        </div>
      )}
    </>
  )
}
