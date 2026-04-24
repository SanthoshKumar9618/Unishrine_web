export class VoiceAPI {
  ws: WebSocket | null = null;
  mediaStream: MediaStream | null = null;
  audioCtx: AudioContext | null = null;

  connect(onMessage: (msg: any) => void) {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://unishrineweb-production.up.railway.app";

    const WS_URL = API_URL.replace("https://", "wss://").replace(
      "http://",
      "ws://"
    );

    this.ws = new WebSocket(`${WS_URL}/ws/voice`);
    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = () => {
      this.startMic();
    };

    this.ws.onmessage = async (event) => {
      if (typeof event.data === "string") {
        const msg = JSON.parse(event.data);
        onMessage(msg);
        return;
      }

      await this.playWav(event.data);
    };
  }

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

  async startMic() {
    if (!this.ws) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    this.mediaStream = stream;

    const audioContext = new AudioContext({
      sampleRate: 16000,
    });

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