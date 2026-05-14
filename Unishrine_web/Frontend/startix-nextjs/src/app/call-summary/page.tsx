"use client";

import { useEffect, useState } from "react";
import "./CallSummary.scss";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function CallSummaryPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [duration, setDuration] = useState("0");

  useEffect(() => {
    const savedMessages = localStorage.getItem("call_transcript");
    const savedDuration = localStorage.getItem("call_duration");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    if (savedDuration) {
      setDuration(savedDuration);
    }
  }, []);

  const handleContactTeam = () => {
    window.location.href = "/contact";
  };

  const handleHomepageRedirect = () => {
    window.location.href = "/";
  };

 return (
  <section className="call-summary-page">
    <div className="call-summary-container">
      <div className="summary-header">
        <h1>Call Summary</h1>
        <p className="duration">
          Total Duration: <span>{duration} sec</span>
        </p>
      </div>

      {/* moved here */}
      <div className="action-section">
        <h3>Next Step</h3>
        <p>
          Our team can help you continue from here. You can
          contact us directly or return to the homepage.
        </p>

        <div className="action-buttons">
          <button
            className="primary-btn"
            onClick={handleContactTeam}
          >
            Contact Team
          </button>

          <button
            className="secondary-btn"
            onClick={handleHomepageRedirect}
          >
            Back to Homepage
          </button>
        </div>
      </div>

      <div className="transcript-card">
        <h2>Conversation Transcript</h2>

        <div className="transcript-list">
          {messages.length === 0 ? (
            <p className="empty-state">
              No transcript available for this call.
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`message-bubble ${msg.role}`}
              >
                <div className="message-role">
                  {msg.role === "user" ? "You" : "Assistant"}
                </div>

                <div className="message-content">
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </section>
);
}