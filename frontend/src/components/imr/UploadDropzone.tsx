import React, { useState, DragEvent, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, FileText, CheckCircle2, RefreshCw, Trash2, Sparkles } from 'lucide-react'

type UploadDropzoneProps = {
  file: File | null
  onFileSelected: (file: File | null) => void
  onError: (message: string) => void
  onUseSample?: () => void
  maxMb?: number
  disabled?: boolean
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  file,
  onFileSelected,
  onError,
  onUseSample,
  maxMb = 15,
  disabled = false
}) => {
  const [isDragging, setIsDragging] = useState(false)

  const validateAndSetFile = (candidate: File) => {
    // 1. File format check
    if (!candidate.name.toLowerCase().endsWith('.pdf') && candidate.type !== 'application/pdf') {
      onError('We need a PDF. Try exporting your slides as a PDF from PowerPoint, Keynote, Canva, or Google Slides.')
      return
    }

    // 2. File size check
    const sizeMb = candidate.size / (1024 * 1024)
    if (sizeMb > maxMb) {
      onError(`File is too large (${sizeMb.toFixed(1)} MB). The maximum allowed size is ${maxMb} MB.`)
      return
    }

    // 3. Empty file check
    if (candidate.size === 0) {
      onError('The selected PDF file is empty (0 bytes). Please select a valid pitch deck.')
      return
    }

    onFileSelected(candidate)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }

  return (
    <div className="upload-dropzone-container">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone-empty"
            className={`dropzone-box compact glass-panel ${isDragging ? 'is-dragging' : ''} ${disabled ? 'disabled' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            animate={{ scale: isDragging ? 1.01 : 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            <div className="dropzone-compact-main">
              <div className="dropzone-compact-icon-wrap">
                <UploadCloud size={20} className="text-electric" />
              </div>
              <div className="dropzone-compact-text">
                <span className="dropzone-compact-title">Attach Pitch Deck PDF</span>
                <span className="dropzone-compact-meta">Up to {maxMb}MB · or drop on left viewer</span>
              </div>
            </div>

            <motion.label
              className="dropzone-compact-btn glass-control"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Browse PDF</span>
              <input
                type="file"
                accept=".pdf,application/pdf"
                className="sr-only"
                onChange={handleInputChange}
                disabled={disabled}
              />
            </motion.label>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone-file-selected"
            className="file-selected-card"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="file-selected-main">
              <div className="file-icon-box">
                <FileText size={20} className="text-electric" />
              </div>

              <div className="file-info">
                <div className="file-name-row">
                  <span className="file-name" title={file.name}>
                    {file.name}
                  </span>
                  <motion.span
                    className="file-status-badge"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  >
                    <CheckCircle2 size={12} />
                    Attached
                  </motion.span>
                </div>
                <span className="file-size">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB · PDF
                </span>
              </div>
            </div>

            <div className="file-actions">
              <motion.label
                className="file-action-btn glass-control"
                title="Replace selected PDF"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <RefreshCw size={13} />
                <span>Change</span>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="sr-only"
                  onChange={handleInputChange}
                  disabled={disabled}
                />
              </motion.label>

              <motion.button
                type="button"
                className="file-action-btn text-danger glass-control"
                onClick={() => onFileSelected(null)}
                disabled={disabled}
                title="Remove file"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Trash2 size={13} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
