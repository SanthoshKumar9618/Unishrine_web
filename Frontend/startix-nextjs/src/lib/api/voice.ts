const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-real-railway-domain.up.railway.app";

const WS_URL = API_URL
  .replace("https://", "wss://")
  .replace("http://", "ws://");

export class VoiceAPI {
  ws: WebSocket | null = null;
  mediaStream: MediaStream | null = null;
  audioCtx: AudioContext | null = null;

  // Used for interruption handling (barge-in)
  private currentSource: AudioBufferSourceNode | null = null;

  // =====================================
  // CONNECT WEBSOCKET + SEND SESSION CONFIG
  // =====================================
  connect(
    config: {
      language: string;
      voice: string;
      assistant_type: string;
      prompt: string;
    },
    onMessage: (msg: any) => void
  ) {
    this.ws = new WebSocket(`${WS_URL}/ws/voice`);
    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = async () => {
      console.log("✅ WebSocket connected");

      try {
        // STEP 1: Send session configuration first
        this.ws?.send(
          JSON.stringify({
            type: "session_config",
            language: config.language,
            voice: config.voice,
            assistant_type: config.assistant_type,
            prompt: config.prompt,
          })
        );

        console.log("📤 Session config sent:", config);

        // STEP 2: Start microphone after config is sent
        await this.startMic();
      } catch (error) {
        console.error("WebSocket onopen error:", error);
      }
    };

    this.ws.onmessage = async (event) => {
      try {
        // JSON EVENTS FROM BACKEND
        if (typeof event.data === "string") {
          const msg = JSON.parse(event.data);

          // HARD INTERRUPT
          if (msg.type === "interrupt") {
            console.log("🛑 Interrupt received → stopping audio");
            this.stopCurrentAudio();
            return;
          }

          onMessage(msg);
          return;
        }

        // AUDIO BYTES FROM BACKEND (TTS)
        await this.playWav(event.data);
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    this.ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("🔌 WebSocket closed");
    };
  }

  // =====================================
  // STOP CURRENT PLAYING AUDIO
  // =====================================
  stopCurrentAudio() {
    try {
      if (this.currentSource) {
        this.currentSource.stop();
        this.currentSource.disconnect();
        this.currentSource = null;
      }
    } catch {
      console.log("Audio stop ignored");
    }
  }

  // =====================================
  // PLAY WAV AUDIO FROM BACKEND
  // =====================================
  async playWav(arrayBuffer: ArrayBuffer) {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }

      if (this.audioCtx.state === "suspended") {
        await this.audioCtx.resume();
      }

      // stop previous audio before playing new one
      this.stopCurrentAudio();

      const decodedBuffer = await this.audioCtx.decodeAudioData(
        arrayBuffer.slice(0)
      );

      const source = this.audioCtx.createBufferSource();
      source.buffer = decodedBuffer;
      source.connect(this.audioCtx.destination);

      // track currently playing source
      this.currentSource = source;

      source.onended = () => {
        if (this.currentSource === source) {
          this.currentSource = null;
        }
      };

      source.start();

      console.log("🔊 Audio played");
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  }

  // =====================================
  // START MICROPHONE STREAM
  // =====================================
  async startMic() {
    if (!this.ws) return;

    try {
      console.log("🎤 Requesting microphone access...");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.mediaStream = stream;

      console.log("✅ Microphone permission granted");

      const audioContext = new AudioContext({
        sampleRate: 16000,
      });

      this.audioCtx = audioContext;

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      await audioContext.audioWorklet.addModule(
        "/audio-processor.js"
      );

      console.log("✅ Audio worklet loaded");

      const source = audioContext.createMediaStreamSource(stream);

      const worklet = new AudioWorkletNode(
        audioContext,
        "pcm-processor"
      );

      source.connect(worklet);

      // Chrome stability
      worklet.connect(audioContext.destination);

      console.log("✅ Audio graph connected");

      worklet.port.onmessage = (event) => {
        if (
          this.ws &&
          this.ws.readyState === WebSocket.OPEN
        ) {
          try {
            const pcm16 = event.data as Int16Array;

            const buffer = pcm16.buffer.slice(
              pcm16.byteOffset,
              pcm16.byteOffset + pcm16.byteLength
            ) as ArrayBuffer;

            this.ws.send(buffer);
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
      alert("Please allow microphone access to continue.");
    }
  }

  // =====================================
  // STOP EVERYTHING
  // =====================================
  stop() {
    console.log("🛑 Stopping VoiceAPI");

    this.stopCurrentAudio();

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    if (this.mediaStream) {
      this.mediaStream
        .getTracks()
        .forEach((track) => track.stop());

      this.mediaStream = null;
    }

    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }

    console.log("✅ VoiceAPI stopped");
  }
}