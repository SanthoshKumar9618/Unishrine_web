"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { VoiceAPI } from "@/lib/api/voice";
import {
  ASSISTANT_PROMPTS,
  AssistantType,
} from "@/lib/config/assistant-prompts";
import styles from "./page.module.scss";

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
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div className={styles.avatar}>✦</div>

          <p className={styles.status}>{status}</p>
          <p className={styles.timer}>{formatTime(duration)}</p>

          <div className={styles.wave}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={styles.waveBar}
                style={{
                  height: `${10 + (i % 5) * 6}px`,
                }}
              />
            ))}
          </div>

          <select
            value={voice}
            onChange={(e) =>
              setVoice(e.target.value as VoiceType)
            }
            className={styles.selectBox}
          >
            <option value="male_1">Male Voice 1</option>
            <option value="female_1">Female Voice 1</option>
            <option value="female_2">Female Voice 2</option>
          </select>

          <div className={styles.callActions}>
            <button
              onClick={connect}
              className={styles.callBtn}
            >
              📞
            </button>

            <button
              onClick={handleEnd}
              className={styles.endBtn}
            >
              ✕
            </button>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.header}>
            Conversation
          </div>

          <div className={styles.content}>
            <div className={styles.promptBox}>
              {prompt}
            </div>

            <div className={styles.messageBox}>
  {messages.length === 0 ? (
    <p className={styles.emptyText}>
      Click the green call button to start conversation
    </p>
  ) : (
    messages.map((msg, i) => (
      <div
        key={i}
        className={
          msg.role === "user"
            ? styles.userRow
            : styles.assistantRow
        }
      >
        <div
          className={
            msg.role === "user"
              ? styles.userBubble
              : styles.assistantBubble
          }
        >
          <div className={styles.messageLabel}>
            {msg.role === "user"
              ? "YOU"
              : "ASSISTANT"}
          </div>

          <div>{msg.content}</div>
        </div>
      </div>
    ))
  )}

  <div ref={messagesEndRef} />
</div>

            <div className={styles.bottomControls}>
              <select
                value={assistantType}
                onChange={(e) =>
                  setAssistantType(
                    e.target.value as AssistantType
                  )
                }
                className={styles.selectBox}
              >
                <option value="clinic_receptionist">
                  Clinic Receptionist
                </option>
                <option value="insurance_advisor">
                  Insurance Advisor
                </option>
                <option value="ecommerce_support">
                  E-commerce Support
                </option>
              </select>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(
                    e.target.value as LanguageType
                  )
                }
                className={styles.selectBox}
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