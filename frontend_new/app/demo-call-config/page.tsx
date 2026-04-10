"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type VoiceConfig = {
  persona: string;
  prompt: string;
  language: string;
  voice: string;
};

export default function DemoCallConfigPage() {
  const router = useRouter();

  const [config, setConfig] = useState<VoiceConfig>({
    persona: "Sales Assistant",
    prompt: "Understand user requirements and suggest a solution",
    language: "en",
    voice: "female",
  });

  const [leadId, setLeadId] = useState<string | null>(null);

  // ----------------------------
  // LOAD LEAD ID (MANDATORY)
  // ----------------------------
  useEffect(() => {
    const id = localStorage.getItem("lead_id");

    if (!id) {
      alert("Please submit requirement first");
      router.push("/");
      return;
    }

    setLeadId(id);
  }, [router]);

  // ----------------------------
  // HANDLE INPUT
  // ----------------------------
  const handleChange = (key: keyof VoiceConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  // ----------------------------
  // START CALL
  // ----------------------------
  const handleStart = () => {
    const sessionId = crypto.randomUUID();

    // Save everything required for call
    localStorage.setItem("session_id", sessionId);
    localStorage.setItem("voice_config", JSON.stringify(config));

    // lead_id already exists
    router.push("/demo-call");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white p-6">

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl p-6 space-y-6">

        <h1 className="text-2xl font-semibold text-center">
          Configure Your AI Call
        </h1>

        {/* PERSONA */}
        <div>
          <label className="text-sm">Persona</label>
          <select
            value={config.persona}
            onChange={(e) => handleChange("persona", e.target.value)}
            className="w-full mt-1 p-3 rounded-lg text-black"
          >
            <option>Sales Assistant</option>
            <option>Customer Support</option>
            <option>Technical Consultant</option>
            <option>HR Recruiter</option>
          </select>
        </div>

        {/* PROMPT */}
        <div>
          <label className="text-sm">Goal / Prompt</label>
          <textarea
            value={config.prompt}
            onChange={(e) => handleChange("prompt", e.target.value)}
            rows={4}
            className="w-full mt-1 p-3 rounded-lg text-black"
          />
        </div>

        {/* LANGUAGE */}
        <div>
          <label className="text-sm">Language</label>
          <select
            value={config.language}
            onChange={(e) => handleChange("language", e.target.value)}
            className="w-full mt-1 p-3 rounded-lg text-black"
          >
            <option value="en">English</option>
          </select>
        </div>

        {/* VOICE (Edge-TTS Compatible) */}
        <div>
          <label className="text-sm">Voice</label>
          <select
              value={config.voice}
              onChange={(e) => handleChange("voice", e.target.value)}
              className="w-full mt-1 p-3 rounded-lg text-black"
            >
              <option value="female">Female (Priya)</option>
            </select>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleStart}
          className="w-full bg-white text-black py-3 rounded-full font-medium hover:opacity-90 transition"
        >
          Start Demo Call
        </button>

        {/* DEBUG INFO (optional) */}
        <div className="text-xs opacity-60 text-center">
          Lead ID: {leadId}
        </div>

      </div>
    </div>
  );
}