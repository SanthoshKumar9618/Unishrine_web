"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { VoiceAPI } from "@/lib/api/voice";
import {
  ASSISTANT_PROMPTS,
  AssistantType,
} from "@/lib/config/assistant-prompts";

type Status =
  | "idle"
  | "connecting"
  | "listening"
  | "speaking"
  | "ended"
  | "error";

type Message = {
  role: "user" | "assistant";
  content: string;
};



type VoiceType = "male_1" | "female_1" | "female_2";
type LanguageType = "English" | "Telugu" | "Hindi" | "Kannada";


function formatTime(seconds: number) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function DemoCallPage() {
  const apiRef = useRef<VoiceAPI | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [duration, setDuration] = useState(0);

  const [voice, setVoice] = useState<VoiceType>("female_1");
  const [language, setLanguage] = useState<LanguageType>("English");
  const [assistantType, setAssistantType] =
    useState<AssistantType>("insurance_advisor");

  const prompt = useMemo(
  () => ASSISTANT_PROMPTS[assistantType],
  [assistantType]
);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (
      status === "connecting" ||
      status === "listening" ||
      status === "speaking"
    ) {
      timer = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const connect = () => {
    if (status !== "idle" && status !== "ended") return;

    const api = new VoiceAPI();
    apiRef.current = api;

    setStatus("connecting");
    setDuration(0);
    setMessages([]);

    api.connect(
      {
        language,
        voice,
        assistant_type: assistantType,
        prompt,
      },
      (msg: any) => {
        if (msg.type === "assistant") {
          setStatus("speaking");

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: msg.text,
            },
          ]);

          setTimeout(() => {
            setStatus("listening");
          }, 800);
        }

        if (msg.type === "user") {
          setMessages((prev) => [
            ...prev,
            {
              role: "user",
              content: msg.text,
            },
          ]);
        }
      }
    );
  };

  const handleEnd = () => {
  apiRef.current?.stop();
  setStatus("ended");

  localStorage.setItem(
    "call_transcript",
    JSON.stringify(messages)
  );

  localStorage.setItem(
    "call_duration",
    String(duration)
  );

  window.location.href = "/call-summary";
};

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1320px",
          display: "flex",
          gap: "36px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            width: "380px",
            minHeight: "700px",
            background: "#17253d",
            borderRadius: "36px",
            padding: "40px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #f8d7ff 0%, #f8b86d 55%, #f97316 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "54px",
              color: "black",
              fontWeight: 700,
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            }}
          >
            ✦
          </div>

          <p
            style={{
              marginTop: "32px",
              marginBottom: "10px",
              color: "#ffffff",
              fontSize: "30px",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {status}
          </p>

          <p
            style={{
              marginTop: 0,
              color: "#d1d5db",
              fontSize: "24px",
            }}
          >
            {formatTime(duration)}
          </p>

          <div
            style={{
              display: "flex",
              gap: "6px",
              marginTop: "10px",
              marginBottom: "32px",
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "4px",
                  height: `${10 + (i % 5) * 8}px`,
                  borderRadius: "999px",
                  background: "#ffffff",
                }}
              />
            ))}
          </div>

          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value as VoiceType)}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "black",
              fontSize: "15px",
              outline: "none",
            }}
          >
            <option value="male_1">Male Voice 1</option>
            <option value="female_1">Female Voice 1</option>
            <option value="female_2">Female Voice 2</option>
          </select>

          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "42px",
            }}
          >
            <button
              onClick={connect}
              style={{
                width: "74px",
                height: "74px",
                borderRadius: "50%",
                border: "none",
                background: "#22c55e",
                color: "white",
                fontSize: "28px",
                cursor: "pointer",
              }}
            >
              📞
            </button>

            <button
              onClick={handleEnd}
              style={{
                width: "74px",
                height: "74px",
                borderRadius: "50%",
                border: "none",
                background: "#ef4444",
                color: "white",
                fontSize: "28px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            flex: 1,
            minWidth: "700px",
            minHeight: "700px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "32px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              padding: "28px 32px",
              borderBottom: "1px solid #e5e7eb",
              fontSize: "24px",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            Conversation
          </div>

          <div style={{ padding: "32px" }}>
            <div
              style={{
                background: "#f9fafb",
                borderRadius: "24px",
                padding: "28px",
                lineHeight: 1.8,
                color: "#374151",
                fontSize: "15px",
                marginBottom: "28px",
              }}
            >
              {prompt}
            </div>

            <div
              style={{
                height: "320px",
                overflowY: "auto",
                border: "1px solid #eef2f7",
                borderRadius: "24px",
                padding: "24px",
                marginBottom: "28px",
              }}
            >
              {messages.length === 0 ? (
                <p style={{ color: "#9ca3af" }}>
                  Click the green call button to start conversation
                </p>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.role === "user" ? "flex-end" : "flex-start",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "12px 16px",
                        borderRadius: "16px",
                        background:
                          msg.role === "user" ? "#dbeafe" : "#f3f4f6",
                        fontSize: "14px",
                        lineHeight: 1.7,
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}

              <div ref={messagesEndRef} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <select
                value={assistantType}
                onChange={(e) =>
                  setAssistantType(e.target.value as AssistantType)
                }
                style={{
                  padding: "16px",
                  borderRadius: "18px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                  outline: "none",
                }}
              >
                <option value="clinic_receptionist">Clinic Receptionist</option>
                <option value="insurance_advisor">Insurance Advisor</option>
                <option value="ecommerce_support">E-commerce Support</option>
              </select>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value as LanguageType)
                }
                style={{
                  padding: "16px",
                  borderRadius: "18px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                  outline: "none",
                }}
              >
                <option value="English">English</option>
                <option value="Telugu">Telugu</option>
                <option value="Hindi">Hindi</option>
                <option value="Kannada">Kannada</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
