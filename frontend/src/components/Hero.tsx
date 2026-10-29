import React from 'react'
import { Sparkles, ShieldCheck, MessageSquareText } from 'lucide-react'

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="eyebrow">
        <Sparkles size={14} />
        INVESTOR MOCK ROOM
        <span className="eyebrow-line" />
      </div>

      <h1>
        Prepare for the room
        <br />
        before you <em>enter it.</em>
      </h1>

      <p className="hero-copy">
        Sharper decks. Harder questions. More confident founders.
      </p>

      <div className="hero-meta">
        <span>
          <ShieldCheck size={16} /> Evidence-led feedback
        </span>
        <span>
          <MessageSquareText size={16} /> Investor-style practice
        </span>
      </div>
    </section>
  )
}
