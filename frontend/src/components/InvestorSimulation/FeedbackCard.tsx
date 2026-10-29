import React from 'react'
import { Feedback } from '../../types'

type FeedbackCardProps = {
  feedback: Feedback
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <div className="feedback-card">
      <div className="feedback-score">
        <span>ANSWER READINESS SCORE</span>
        <strong>
          {feedback.score}
          <small>/10</small>
        </strong>
      </div>

      <div className="feedback-content">
        <h3>Coaching critique</h3>
        <p>{feedback.coaching}</p>

        <div className="feedback-columns">
          <div>
            <strong>What worked effectively</strong>
            {(feedback.strengths || []).map((s, idx) => (
              <p key={idx}>+ {s}</p>
            ))}
          </div>

          <div>
            <strong>Strengthen for the room</strong>
            {(feedback.gaps || []).map((g, idx) => (
              <p key={idx}>– {g}</p>
            ))}
          </div>
        </div>

        <h4>Model response structure</h4>
        <p>{feedback.example_answer}</p>

        {feedback.follow_up_question && (
          <div className="followup">
            <span>LIKELY INVESTOR FOLLOW-UP</span>
            <p>{feedback.follow_up_question}</p>
          </div>
        )}
      </div>
    </div>
  )
}
