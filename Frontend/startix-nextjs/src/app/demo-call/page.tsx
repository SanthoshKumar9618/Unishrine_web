"use client";

import { useRef, useState, useEffect } from "react";
import { VoiceAPI } from "@/lib/api/voice";
import { useRouter } from "next/navigation";

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

export default function DemoCallPage() {
  const apiRef = useRef<VoiceAPI | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [messages, setMessages] = useState<Message[]>([]);

  const router = useRouter();

  const connect = () => {
    const api = new VoiceAPI();
    apiRef.current = api;

    setStatus("connecting");

    api.connect((msg) => {
      if (msg.type === "assistant") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: msg.text,
          },
        ]);
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
    });

    setStatus("listening");

    setMessages([
      {
        role: "assistant",
        content: "Hi, I'm ready. Speak...",
      },
    ]);
  };

  const handleEnd = () => {
    apiRef.current?.stop();
    setStatus("ended");

    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

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
          display: "flex",
          gap: "48px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* LEFT SIDE - BOT CARD */}
        <div
          style={{
            width: "260px",
            height: "500px",
            background: "#17253d",
            borderRadius: "42px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          {/* Bot Avatar */}
          <div
            style={{
              width: "82px",
              height: "82px",
              borderRadius: "50%",
              background: "#2c3d5a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            🤖
          </div>

          {/* Status */}
          <p
            style={{
              marginTop: "28px",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 500,
              marginBottom: 0,
            }}
          >
            {status}
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "18px",
              marginTop: "40px",
            }}
          >
            {status === "idle" && (
              <button
                onClick={connect}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#22c55e",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                📞
              </button>
            )}

            <button
              onClick={handleEnd}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                border: "none",
                background: "#ef4444",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - CONVERSATION */}
        <div
          style={{
            width: "320px",
            height: "500px",
            background: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "30px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "18px",
              textAlign: "center",
              borderBottom: "1px solid #d1d5db",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Conversation
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "18px",
              overflowY: "auto",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    background:
                      msg.role === "user" ? "#dbeafe" : "#f3f4f6",
                    fontSize: "14px",
                    lineHeight: 1.5,
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
}