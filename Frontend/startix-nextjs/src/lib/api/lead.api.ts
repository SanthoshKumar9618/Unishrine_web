const BASE_URL = "http://localhost:8000";

export async function createLead(payload: {
  name: string;
  company: string;
  phone: string;
  email: string;
  requirement: string;
}) {
  const res = await fetch(`${BASE_URL}/api/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // 🔴 IMPORTANT: handle non-JSON safely
  const text = await res.text();

  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("Invalid response:", text);
    throw new Error("Backend did not return JSON");
  }

  if (!res.ok) {
    throw new Error(data?.detail || "Request failed");
  }

  // ✅ Normalize response HERE (single place fix)
  return {
    success: data?.success ?? true,
    id: data?.data?.id || data?.lead_id || data?.id,
  };
}

export class VoiceAPI {
  ws: WebSocket | null = null;
  mediaStream: MediaStream | null = null;

  audioCtx: AudioContext | null = null;

  // =========================
  // CONNECT
  // =========================
  connect(onMessage: (msg: any) => void) {
    this.ws = new WebSocket("ws://localhost:8000/ws/voice");
    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = () => {
      this.startMic();
    };

    this.ws.onmessage = async (event) => {
      // TEXT
      if (typeof event.data === "string") {
        const msg = JSON.parse(event.data);
        onMessage(msg);
        return;
      }

      // 🔥 AUDIO (WAV from backend)
      await this.playWav(event.data);
    };
  }

  // =========================
  // 🔊 PLAY WAV (ADD HERE)
  // =========================
  async playWav(arrayBuffer: ArrayBuffer) {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }

      const buffer = await this.audioCtx.decodeAudioData(arrayBuffer);

      const source = this.audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioCtx.destination);
      source.start();
    } catch (e) {
      console.error("Audio error:", e);
    }
  }

  // =========================
  // 🎤 MIC STREAM (FIXED)
  // =========================
  async startMic() {
    if (!this.ws) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaStream = stream;

    const audioContext = new AudioContext({ sampleRate: 16000 });

    await audioContext.audioWorklet.addModule("/audio-processor.js");

    const source = audioContext.createMediaStreamSource(stream);
    const worklet = new AudioWorkletNode(audioContext, "pcm-processor");

    source.connect(worklet);

    worklet.port.onmessage = (e) => {
      if (this.ws?.readyState === 1) {
        this.ws.send(e.data.buffer);
      }
    };
  }

  stop() {
    this.ws?.close();
    this.mediaStream?.getTracks().forEach((t) => t.stop());
    this.audioCtx?.close();
  }
}
