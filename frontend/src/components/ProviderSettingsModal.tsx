import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import {

  ShieldCheck,

  Save,

  Wifi,

  ArrowRight,

  LoaderCircle,

  X,

  Sparkles,

  AlertTriangle

} from 'lucide-react'

import { api } from '../services/api'

import { Banner } from './common/Banner'



type ProviderSettingsModalProps = {

  onClose: () => void

  keyConfigured: boolean

  onSettingsSaved: () => void

}



const PRESETS = [

  {

    name: 'Groq: Llama 3.3 70B',

    desc: 'Recommended · High Intelligence',

    baseUrl: 'https://api.groq.com/openai/v1',

    model: 'llama-3.3-70b-versatile',

    badge: 'Groq'

  },

  {

    name: 'Groq: Llama 3.1 8B',

    desc: 'Ultra Fast · Low Latency',

    baseUrl: 'https://api.groq.com/openai/v1',

    model: 'llama-3.1-8b-instant',

    badge: 'Groq'

  },

  {

    name: 'OpenAI: GPT-4o mini',

    desc: 'Fast & Cost Efficient',

    baseUrl: 'https://api.openai.com/v1',

    model: 'gpt-4o-mini',

    badge: 'OpenAI'

  },

  {

    name: 'OpenAI: GPT-4o',

    desc: 'Flagship Multimodal',

    baseUrl: 'https://api.openai.com/v1',

    model: 'gpt-4o',

    badge: 'OpenAI'

  }

]



export const ProviderSettingsModal: React.FC<ProviderSettingsModalProps> = ({

  onClose,

  keyConfigured,

  onSettingsSaved

}) => {

  const [provider, setProvider] = useState('OpenAI-Compatible')

  const [apiKey, setApiKey] = useState('')

  const [baseUrl, setBaseUrl] = useState('https://api.groq.com/openai/v1')

  const [model, setModel] = useState('llama-3.3-70b-versatile')

  const [busy, setBusy] = useState(false)

  const [message, setMessage] = useState('')

  const [error, setError] = useState('')



  // Load current provider configuration from backend on mount

  useEffect(() => {

    async function loadCurrentSettings() {

      try {

        const current = await api.getProviderSettings()

        if (current.base_url) setBaseUrl(current.base_url)

        if (current.model) setModel(current.model)

        if (current.provider) setProvider(current.provider)

      } catch (err) {

        // Fall back to default state

      }

    }

    loadCurrentSettings()

  }, [])



  function applyPreset(preset: typeof PRESETS[0]) {

    setBaseUrl(preset.baseUrl)

    setModel(preset.model)

    setMessage(`Applied preset: ${preset.name}`)

    setError('')

  }



  // Detect mismatched provider base URL and model names

  const isGroqMismatch =

    baseUrl.toLowerCase().includes('groq.com') &&

    (model.toLowerCase().includes('gpt') || model.toLowerCase().includes('openai/'))



  const isOpenAIMismatch =

    baseUrl.toLowerCase().includes('openai.com') &&

    (model.toLowerCase().includes('llama') || model.toLowerCase().includes('mixtral'))



  async function handleSave() {

    setBusy(true)

    setMessage('')

    setError('')

    try {

      await api.saveProviderSettings({

        provider,

        api_key: apiKey,

        base_url: baseUrl,

        model

      })

      setApiKey('')

      setMessage(`Provider settings saved for ${model}! Live AI evaluation and mock interviews are now ready.`)

      onSettingsSaved()

    } catch (err: any) {

      setError(err?.message || 'Could not save provider settings.')

    } finally {

      setBusy(false)

    }

  }



  async function handleTest() {

    setBusy(true)

    setMessage('')

    setError('')

    try {

      const res = await api.testProviderConnection({

        provider,

        api_key: apiKey.trim(),

        base_url: baseUrl.trim(),

        model: model.trim()

      })

      setMessage(`Connection verified successfully! Model "${res.model}" is responsive.`)

    } catch (err: any) {

      setError(err?.message || 'Connection test failed. Please verify your API key and base URL.')

    } finally {

      setBusy(false)

    }

  }



  return (

    <motion.div

      className="modal-overlay"

      onClick={onClose}

      role="dialog"

      aria-modal="true"

      aria-labelledby="modal-provider-title"

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      exit={{ opacity: 0 }}

      transition={{ duration: 0.2 }}

    >

      <motion.div

        className="modal-content"

        onClick={(e) => e.stopPropagation()}

        initial={{ scale: 0.94, opacity: 0, y: 15 }}

        animate={{ scale: 1, opacity: 1, y: 0 }}

        exit={{ scale: 0.94, opacity: 0, y: 15 }}

        transition={{ type: 'spring', stiffness: 380, damping: 28 }}

      >

        <div className="modal-header">

          <div className="modal-header-titles">

            <h2 id="modal-provider-title" className="modal-title">Connect your LLM provider</h2>

            <p className="modal-subtitle">

              Configure Groq (recommended) or any OpenAI-compatible API endpoint for pitch deck diligence and simulation.

            </p>

          </div>

          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">

            <X size={18} />

          </button>

        </div>



        <div className="settings-callout">

          <ShieldCheck size={18} className="text-electric flex-shrink-0" />

          <span>

            Your API key is transmitted over TLS directly to this local backend and retained strictly in process memory. It is never logged, never persisted to disk, and never sent back to the browser.

          </span>

        </div>



        <div className="modal-body-form">

          {/* Quick 1-Click Presets */}

          <div className="preset-pills-container">

            <div className="preset-pills-label">

              <Sparkles size={13} className="text-electric" />

              <span>Quick Presets (click to auto-fill Base URL & Model)</span>

            </div>

            <div className="preset-pills-group">

              {PRESETS.map((p, idx) => {

                const isActive = baseUrl === p.baseUrl && model === p.model

                return (

                  <button

                    key={idx}

                    type="button"

                    className={`preset-pill-btn ${isActive ? 'active' : ''}`}

                    onClick={() => applyPreset(p)}

                  >

                    <span className="preset-pill-tag">{p.badge}</span>

                    <span className="preset-pill-title">{p.name.split(': ')[1]}</span>

                  </button>

                )

              })}

            </div>

          </div>



          <label className="provider-field">

            Provider architecture

            <select value={provider} onChange={(e) => setProvider(e.target.value)}>

              <option value="OpenAI-Compatible">OpenAI-Compatible (Groq, Together, Ollama, OpenAI)</option>

            </select>

            <small>Groq provides ultra-fast inference using the standard OpenAI-compatible completions protocol.</small>

          </label>



          <label className="provider-field">

            API Key

            <input

              type="password"

              value={apiKey}

              onChange={(e) => setApiKey(e.target.value)}

              placeholder={

                keyConfigured

                  ? '•••••••••••••••••••••••• (Key configured · enter new to replace)'

                  : 'Paste your API key (e.g. gsk_... for Groq or sk-... for OpenAI)'

              }

              autoComplete="new-password"

            />

            <small>Get a key from your provider console (e.g. console.groq.com or platform.openai.com).</small>

          </label>



          <label className="provider-field">

            Base URL

            <input

              value={baseUrl}

              onChange={(e) => setBaseUrl(e.target.value)}

              placeholder="https://api.groq.com/openai/v1"

            />

            <small>For Groq: <code>https://api.groq.com/openai/v1</code> | For OpenAI: <code>https://api.openai.com/v1</code></small>

          </label>



          <label className="provider-field">

            Model Identifier

            <input

              value={model}

              onChange={(e) => setModel(e.target.value)}

              placeholder="llama-3.3-70b-versatile"

            />

            <small>For Groq: <code>llama-3.3-70b-versatile</code>, <code>llama-3.1-8b-instant</code> | For OpenAI: <code>gpt-4o-mini</code>, <code>gpt-4o</code></small>

          </label>



          {/* Contextual warning if provider base URL and model mismatch */}

          {isGroqMismatch && (

            <div className="provider-warning-box">

              <AlertTriangle size={15} className="flex-shrink-0" />

              <span>

                <strong>Groq Model Mismatch:</strong> Groq does not host OpenAI models ({model}). Use <code>llama-3.3-70b-versatile</code> on Groq, or switch the Base URL to <code>https://api.openai.com/v1</code> if using an OpenAI key.

              </span>

            </div>

          )}



          {isOpenAIMismatch && (

            <div className="provider-warning-box">

              <AlertTriangle size={15} className="flex-shrink-0" />

              <span>

                <strong>OpenAI Model Mismatch:</strong> The OpenAI endpoint expects models like <code>gpt-4o-mini</code> or <code>gpt-4o</code>.

              </span>

            </div>

          )}



          {error && <Banner type="error" message={error} onClose={() => setError('')} />}

          {message && <Banner type="success" message={message} onClose={() => setMessage('')} />}



          <div className="provider-actions">

            <button

              className="primary-button"

              onClick={handleSave}

              disabled={busy || (!apiKey.trim() && !keyConfigured)}

            >

              {busy ? (

                <>

                  <LoaderCircle className="spin" size={15} /> Saving…

                </>

              ) : (

                <>

                  <Save size={15} /> Save provider settings

                </>

              )}

            </button>



            <button

              type="button"

              className="secondary-button"

              onClick={handleTest}

              disabled={busy || (!apiKey.trim() && !keyConfigured)}

            >

              {busy ? (

                <>

                  <LoaderCircle className="spin" size={15} /> Testing…

                </>

              ) : (

                <>

                  <Wifi size={15} /> Test connection

                </>

              )}

            </button>

          </div>

        </div>



        <div className="modal-footer">

          <button className="secondary-button" onClick={onClose}>

            Back to workspace <ArrowRight size={14} />

          </button>

        </div>

      </motion.div>

    </motion.div>

  )

}

