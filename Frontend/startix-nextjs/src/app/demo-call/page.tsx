"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { VoiceAPI } from "@/lib/api/voice";
import {
  ASSISTANT_PROMPTS,
  AssistantType,
} from "@/lib/config/assistant-prompts";
import styles from "./page.module.scss";
<<<<<<< HEAD
import Image from "next/image";
=======
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df

type Status =
  | "idle"
  | "connecting"
  | "listening"
  | "speaking"
  | "ended"
  | "error";

<<<<<<< HEAD
=======
type Message = {
  role: "user" | "assistant";
  content: string;
};

>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
type VoiceType = "male_1" | "female_1" | "female_2";
type LanguageType = "English" | "Telugu" | "Hindi" | "Kannada";

function formatTime(seconds: number) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function DemoCallPage() {
  const apiRef = useRef<VoiceAPI | null>(null);
<<<<<<< HEAD

  const [status, setStatus] = useState<Status>("idle");
  const [duration, setDuration] = useState(0);

  const [voice, setVoice] = useState<VoiceType>("female_1");
  const [language, setLanguage] =
    useState<LanguageType>("English");

=======
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [duration, setDuration] = useState(0);

  const [voice, setVoice] = useState<VoiceType>("female_1");
  const [language, setLanguage] = useState<LanguageType>("English");
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
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

<<<<<<< HEAD
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [status]);

  const connect = () => {
    if (status !== "idle" && status !== "ended") {
      return;
    }

    const api = new VoiceAPI();

=======
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
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
    apiRef.current = api;

    setStatus("connecting");
    setDuration(0);
<<<<<<< HEAD
=======
    setMessages([]);
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df

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

<<<<<<< HEAD
=======
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: msg.text,
            },
          ]);

>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
          setTimeout(() => {
            setStatus("listening");
          }, 800);
        }
<<<<<<< HEAD
=======

        if (msg.type === "user") {
          setMessages((prev) => [
            ...prev,
            {
              role: "user",
              content: msg.text,
            },
          ]);
        }
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
      }
    );
  };

  const handleEnd = () => {
    apiRef.current?.stop();
<<<<<<< HEAD

    setStatus("ended");

    localStorage.setItem(
=======
    setStatus("ended");

    localStorage.setItem(
      "call_transcript",
      JSON.stringify(messages)
    );

    localStorage.setItem(
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
      "call_duration",
      String(duration)
    );

    window.location.href = "/call-summary";
  };

  return (
<<<<<<< HEAD
  <section className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.rightPanel}>
        <div className={styles.header}>
          Assistant Configuration
        </div>

        <div className={styles.content}>
          <div className={styles.promptBox}>
            <h2>Assistant Prompt</h2>
            <p>{prompt}</p>
          </div>

          <div className={styles.controls}>
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
              <option value="English">
                English
              </option>

              <option value="Telugu">
                Telugu
              </option>

              <option value="Hindi">
                Hindi
              </option>

              <option value="Kannada">
                Kannada
              </option>
            </select>

            <select
              value={voice}
              onChange={(e) =>
                setVoice(
                  e.target.value as VoiceType
                )
              }
              className={styles.selectBox}
            >
              <option value="male_1">
                Male Voice 1
              </option>

              <option value="female_1">
                Female Voice 1
              </option>

              <option value="female_2">
                Female Voice 2
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.agentPanel}>
  <div className={styles.neuralWrapper}>
    <div
      className={`${styles.bigAura} ${
        styles[`aura_${status}`]
      }`}
    />

    <div className={styles.orbit}>
      <div
        className={`${styles.node} ${
          styles[`node_${status}`]
        }`}
      />
    </div>

    <div className={styles.orbitReverse}>
      <div
        className={`${styles.node} ${
          styles[`node_${status}`]
        }`}
      />
    </div>

   <div className={styles.orbContainer}>
  <div
    className={`${styles.orbGlow} ${
      styles[`orbGlow_${status}`]
    }`}
  />

  <div className={styles.ring1} />
  <div className={styles.ring2} />
  <div className={styles.ring3} />

  <div
    className={`${styles.orb} ${
      styles[`orb_${status}`]
    }`}
  >
    <Image
      src="/assets/img/core-img/logo.svg"
      alt="Unishrine"
      width={70}
      height={70}
      className={styles.logo}
    />
  </div>
</div>
  </div>

  <div className={styles.status}>
    {status.toUpperCase()}
  </div>

  <div className={styles.timer}>
    {formatTime(duration)}
  </div>

  <div className={styles.actionButtons}>
    {(status === "idle" ||
      status === "ended") && (
      <button
        onClick={connect}
        className={styles.startButton}
      >
        🎙 Start Speaking
      </button>
    )}

    {status !== "idle" &&
      status !== "ended" && (
        <button
          onClick={handleEnd}
          className={styles.endButton}
        >
          End Call
        </button>
      )}
  </div>
</div>
    </div>
    
  </section>
);

=======
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
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
}