export class VoiceAPI {
  ws: WebSocket | null = null;
  mediaStream: MediaStream | null = null;
  audioCtx: AudioContext | null = null;

  // =========================
  // CONNECT WEBSOCKET
  // =========================
  connect(onMessage: (msg: any) => void) {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://unishrineweb-production.up.railway.app";

    const WS_URL = API_URL
      .replace("https://", "wss://")
      .replace("http://", "ws://");

    this.ws = new WebSocket(`${WS_URL}/ws/voice`);
    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = () => {
      console.log("✅ WebSocket connected");
      this.startMic();
    };

    this.ws.onmessage = async (event) => {
      try {
        // =========================
        // TEXT MESSAGE
        // =========================
        if (typeof event.data === "string") {
          const msg = JSON.parse(event.data);
          onMessage(msg);
          return;
        }

        // =========================
        // AUDIO MESSAGE (TTS)
        // =========================
        await this.playWav(event.data);
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("🔌 WebSocket closed");
    };
  }

  // =========================
  // PLAY WAV AUDIO FROM BACKEND
  // =========================
  async playWav(arrayBuffer: ArrayBuffer) {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }

      // Resume if suspended (browser autoplay policy)
      if (this.audioCtx.state === "suspended") {
        await this.audioCtx.resume();
      }

      const decodedBuffer =
        await this.audioCtx.decodeAudioData(arrayBuffer);

      const source =
        this.audioCtx.createBufferSource();

      source.buffer = decodedBuffer;
      source.connect(this.audioCtx.destination);
      source.start();

      console.log("🔊 Audio played");
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  }

  // =========================
  // START MICROPHONE STREAM
  // =========================
  async startMic() {
    if (!this.ws) return;

    try {
      console.log("🎤 Requesting microphone access...");

      // =========================
      // GET USER MIC
      // =========================
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

      this.mediaStream = stream;

      console.log("✅ Microphone permission granted");

      // =========================
      // AUDIO CONTEXT (16kHz)
      // =========================
      const audioContext = new AudioContext({
        sampleRate: 16000,
      });

      this.audioCtx = audioContext;

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      // =========================
      // LOAD AUDIO WORKLET
      // =========================
      await audioContext.audioWorklet.addModule(
        "/audio-processor.js"
      );

      console.log("✅ Audio worklet loaded");

      // =========================
      // CREATE AUDIO GRAPH
      // =========================
      const source =
        audioContext.createMediaStreamSource(stream);

      const worklet =
        new AudioWorkletNode(
          audioContext,
          "pcm-processor"
        );

      // source → processor
      source.connect(worklet);

      // VERY IMPORTANT:
      // keeps worklet alive in Chrome
      worklet.connect(audioContext.destination);

      console.log("✅ Audio graph connected");

      // =========================
      // SEND PCM16 TO BACKEND
      // =========================
      worklet.port.onmessage = (event) => {
        if (
          this.ws &&
          this.ws.readyState === WebSocket.OPEN
        ) {
          try {
            // audio-processor.js already converts
            // Float32 → Int16 PCM
            const pcm16 =
              event.data as Int16Array;

            const buffer = pcm16.buffer.slice(
              pcm16.byteOffset,
              pcm16.byteOffset + pcm16.byteLength
            ) as ArrayBuffer;

            this.ws.send(buffer);

            console.log(
              "📤 Audio chunk sent:",
              pcm16.length
            );
          } catch (error) {
            console.error(
              "Failed to send audio chunk:",
              error
            );
          }
        }
      };

      console.log("🚀 Mic streaming started");
    } catch (error) {
      console.error("Microphone error:", error);
      alert(
        "Please allow microphone access to continue."
      );
    }
  }

  // =========================
  // STOP EVERYTHING
  // =========================
  stop() {
    console.log("🛑 Stopping VoiceAPI");

    // Close websocket
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    // Stop mic stream
    if (this.mediaStream) {
      this.mediaStream
        .getTracks()
        .forEach((track) => track.stop());

      this.mediaStream = null;
    }

    // Close audio context
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }

    console.log("✅ VoiceAPI stopped");
  }
}