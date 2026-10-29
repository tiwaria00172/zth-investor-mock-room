import React from 'react'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'

type BannerProps = {
  type: 'error' | 'success'
  message: string
  onClose?: () => void
}

export const Banner: React.FC<BannerProps> = ({ type, message, onClose }) => {
  if (!message) return null

  const isError = type === 'error'
  return (
    <div className={isError ? 'error-banner' : 'success-banner'}>
      {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
      <span style={{ flex: 1 }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: 'inherit' }}
          aria-label="Dismiss alert"
        >
          <X size={15} />
        </button>
      )}
    </div>
  )
}
