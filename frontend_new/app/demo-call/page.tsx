"use client";

import { useRef, useState,useEffect } from "react";
import { VoiceAPI } from "@/lib/api/voice";
import { useRouter } from "next/dist/client/components/navigation";

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

    api.connect((msg) => {
      if (msg.type === "assistant") {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: msg.text },
        ]);
      }

      if (msg.type === "user") {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: msg.text },
        ]);
      }
    });

    setStatus("listening");

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Hi, I'm ready. Speak..." },
    ]);
  };

  const handleEnd = () => {
  apiRef.current?.stop();
  setStatus("ended");

  // ✅ redirect to home
  setTimeout(() => {
    router.push("/");
  }, 300); // small delay for cleanup
};

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex gap-12 items-center">
        <div className="w-[260px] h-[500px] bg-[#1e293b] rounded-[40px] flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-[#334155] rounded-full flex items-center justify-center text-white">
            🤖
          </div>

          <p className="mt-6 text-gray-300">{status}</p>

          <div className="flex gap-4 mt-10">
            {status === "idle" && (
              <button
                onClick={connect}
                className="bg-green-500 p-3 rounded-full"
              >
                📞
              </button>
            )}

            <button
              onClick={handleEnd}
              className="bg-red-500 p-3 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="w-[320px] h-[500px] bg-white border rounded-[30px] flex flex-col">
          <div className="p-3 border-b text-center">Conversation</div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  <div className="px-3 py-2 bg-gray-200 rounded-lg text-sm">
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* ✅ ADD THIS */}
              <div ref={messagesEndRef} />
            </div>
        </div>
      </div>
    </div>
  );
}