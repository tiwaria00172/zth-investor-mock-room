import React, { useState, DragEvent } from 'react'
import { UploadCloud, CheckCircle2, X } from 'lucide-react'

type UploadBoxProps = {
  file: File | null
  onSelectFile: (file: File | null) => void
}

export const UploadBox: React.FC<UploadBoxProps> = ({ file, onSelectFile }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.name.toLowerCase().endsWith('.pdf')) {
        onSelectFile(droppedFile)
      }
    }
  }

  return (
    <div
      className="upload-box"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        borderColor: isDragging ? '#1b53dc' : undefined,
        backgroundColor: isDragging ? '#f0f5ff' : undefined,
        transition: 'all 0.15s ease'
      }}
    >
      <div className="upload-icon">
        {file ? <CheckCircle2 size={24} color="#1b53dc" /> : <UploadCloud size={24} />}
      </div>

      <div className="upload-copy">
        <strong>{file ? file.name : 'Upload your pitch deck (PDF)'}</strong>
        <span>
          {file
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB · Ready for evaluation`
            : 'Drag & drop your presentation or click Browse · Up to 15 MB · Text-based PDF'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto', alignItems: 'center' }}>
        {file && (
          <button
            type="button"
            onClick={() => onSelectFile(null)}
            style={{
              background: 'none',
              border: '1px solid #d6dce7',
              borderRadius: '6px',
              color: '#657083',
              padding: '8px 10px',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Remove selected PDF"
          >
            <X size={16} /> Clear
          </button>
        )}

        <label className="choose-file">
          Browse PDF
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => onSelectFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>
    </div>
  )
}
