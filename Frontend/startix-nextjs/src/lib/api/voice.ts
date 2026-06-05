const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
<<<<<<< HEAD
  "http://localhost:8000";
=======
  "https://your-real-railway-domain.up.railway.app";
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df

const WS_URL = API_URL
  .replace("https://", "wss://")
  .replace("http://", "ws://");

export class VoiceAPI {
<<<<<<< HEAD

  ws: WebSocket | null = null;

  mediaStream: MediaStream | null = null;

  // assistant playback
  audioCtx: AudioContext | null = null;

  // microphone
  micAudioCtx: AudioContext | null = null;

  currentSource: AudioBufferSourceNode | null = null;

  nextPlayTime = 0;

  isAssistantSpeaking = false;

  // =====================================
  // CONNECT
  // =====================================

  connect(

=======
  ws: WebSocket | null = null;
  mediaStream: MediaStream | null = null;
  audioCtx: AudioContext | null = null;

  // Used for interruption handling (barge-in)
  private currentSource: AudioBufferSourceNode | null = null;

  // =====================================
  // CONNECT WEBSOCKET + SEND SESSION CONFIG
  // =====================================
  connect(
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
    config: {
      language: string;
      voice: string;
      assistant_type: string;
      prompt: string;
    },
<<<<<<< HEAD

    onMessage: (msg: any) => void
  ) {

    this.ws = new WebSocket(
      `${WS_URL}/ws/voice`
    );

    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = async () => {

      console.log(
        "✅ WebSocket connected"
      );

      try {

        // session config
        this.ws?.send(

          JSON.stringify({

            type: "session_config",

            language: config.language,

            voice: config.voice,

            assistant_type:
              config.assistant_type,

=======
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
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
            prompt: config.prompt,
          })
        );

<<<<<<< HEAD
        console.log(
          "📤 Session config sent"
        );

        // start microphone
        await this.startMic();

      } catch (error) {

        console.error(
          "WebSocket onopen error:",
          error
        );
      }
    };

    // =====================================
    // RECEIVE EVENTS
    // =====================================

    this.ws.onmessage = async (
      event
    ) => {

      try {

        // JSON messages
        if (
          typeof event.data === "string"
        ) {

          const msg = JSON.parse(
            event.data
          );

          console.log(
            "📩 JSON:",
            msg
          );

          // interruption event
          if (
            msg.type === "interrupt"
          ) {

            this.stopCurrentAudio();

=======
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
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
            return;
          }

          onMessage(msg);
<<<<<<< HEAD

          return;
        }

        // binary PCM audio
        await this.playPCM16(
          event.data
        );

      } catch (error) {

        console.error(
          "WebSocket message error:",
          error
        );
=======
          return;
        }

        // AUDIO BYTES FROM BACKEND (TTS)
        await this.playWav(event.data);
      } catch (error) {
        console.error("WebSocket message error:", error);
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
      }
    };

    this.ws.onerror = (error) => {
<<<<<<< HEAD

      console.error(
        "❌ WebSocket error:",
        error
      );
    };

    this.ws.onclose = () => {

      console.log(
        "🔌 WebSocket closed"
      );
=======
      console.error("❌ WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("🔌 WebSocket closed");
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
    };
  }

  // =====================================
<<<<<<< HEAD
  // PLAY PCM16 AUDIO
  // =====================================

  async playPCM16(
    arrayBuffer: ArrayBuffer
  ) {

    try {

      if (!this.audioCtx) {

        this.audioCtx =
          new AudioContext({

            sampleRate: 24000,
          });
      }

      if (
        this.audioCtx.state ===
        "suspended"
      ) {

        await this.audioCtx.resume();
      }

      this.isAssistantSpeaking = true;

      // PCM16 → Int16
      const pcmData =
        new Int16Array(
          arrayBuffer
        );

      // Int16 → Float32
      const float32 =
        new Float32Array(
          pcmData.length
        );

      for (
        let i = 0;
        i < pcmData.length;
        i++
      ) {

        float32[i] =
          pcmData[i] / 32768;
      }

      // create audio buffer
      const audioBuffer =
        this.audioCtx.createBuffer(

          1,

          float32.length,

          24000
        );

      audioBuffer
        .getChannelData(0)
        .set(float32);

      // create source
      const source =
        this.audioCtx
          .createBufferSource();

      source.buffer = audioBuffer;

      source.connect(
        this.audioCtx.destination
      );

      this.currentSource = source;

      source.onended = () => {

        if (
          this.currentSource ===
          source
        ) {

          this.currentSource = null;
        }

        this.isAssistantSpeaking = false;
      };

      // smooth queue
      const now =
        this.audioCtx.currentTime;

      if (
        this.nextPlayTime < now
      ) {

        this.nextPlayTime = now;
      }

      source.start(
        this.nextPlayTime
      );

      this.nextPlayTime +=
        audioBuffer.duration;

    } catch (error) {

      console.error(
        "PCM playback error:",
        error
      );
=======
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
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
    }
  }

  // =====================================
<<<<<<< HEAD
  // STOP CURRENT AUDIO
  // =====================================

  stopCurrentAudio() {

    try {

      if (this.currentSource) {

        this.currentSource.stop();

        this.currentSource.disconnect();

        this.currentSource = null;
      }

      this.isAssistantSpeaking = false;

    } catch (error) {

      console.log(
        "Audio stop ignored"
      );
    }
  }

  // =====================================
  // START MICROPHONE
  // =====================================

  async startMic() {

    if (!this.ws) return;

    try {

      console.log(
        "🎤 Requesting microphone..."
      );

      const stream =
        await navigator.mediaDevices
          .getUserMedia({

            audio: {

              echoCancellation: true,

              noiseSuppression: true,

              autoGainControl: true,

              channelCount: 1,
            },
          });

      this.mediaStream = stream;

      console.log(
        "✅ Mic granted"
      );

      // IMPORTANT
      // Use 24kHz
      const audioContext =
        new AudioContext({

          sampleRate: 24000,
        });

      this.micAudioCtx =
        audioContext;

      if (
        audioContext.state ===
        "suspended"
      ) {

        await audioContext.resume();
      }

      console.log(
        "🎤 Actual sample rate:",
        audioContext.sampleRate
      );

      // load worklet
      await audioContext
        .audioWorklet
        .addModule(
          "/audio-processor.js"
        );

      console.log(
        "✅ Worklet loaded"
      );

      const source =
        audioContext
          .createMediaStreamSource(
            stream
          );

      const worklet =
        new AudioWorkletNode(

          audioContext,

          "pcm-processor"
        );

      source.connect(worklet);

      console.log(
        "✅ Audio graph connected"
      );

      // =====================================
      // MIC AUDIO STREAM
      // =====================================

      worklet.port.onmessage = (
        event
      ) => {

        if (this.isAssistantSpeaking) {
              return;
          }

        if (
          !this.ws ||

          this.ws.readyState !==
            WebSocket.OPEN
        ) {

          return;
        }

        try {

          const pcm16 =
              event.data as Int16Array;

            if (
              !pcm16 ||
              pcm16.byteLength === 0
            ) {
              return;
            }

            // force real ArrayBuffer
            const arrayBuffer =
              new ArrayBuffer(
                pcm16.byteLength
              );

            const view =
              new Uint8Array(
                arrayBuffer
              );

            view.set(

              new Uint8Array(

                pcm16.buffer,

                pcm16.byteOffset,

                pcm16.byteLength
              )
            );

            console.log(

              "🎤 MIC_PACKET",

              pcm16.byteLength,

              this.ws.readyState
            );

            this.ws.send(
              arrayBuffer
            );

        } catch (error) {

          console.error(
            "Send audio failed:",
            error
          );
        }
      };

      console.log(
        "🚀 Mic streaming started"
      );

    } catch (error) {

      console.error(
        "Mic error:",
        error
      );

      alert(
        "Please allow microphone access."
      );
=======
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
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
    }
  }

  // =====================================
  // STOP EVERYTHING
  // =====================================
<<<<<<< HEAD

  stop() {

    console.log(
      "🛑 Stopping VoiceAPI"
    );
=======
  stop() {
    console.log("🛑 Stopping VoiceAPI");
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df

    this.stopCurrentAudio();

    if (this.ws) {
<<<<<<< HEAD

      this.ws.close();

=======
      this.ws.close();
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
      this.ws = null;
    }

    if (this.mediaStream) {
<<<<<<< HEAD

      this.mediaStream
        .getTracks()
        .forEach(

          (track) =>
            track.stop()
        );
=======
      this.mediaStream
        .getTracks()
        .forEach((track) => track.stop());
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df

      this.mediaStream = null;
    }

    if (this.audioCtx) {
<<<<<<< HEAD

      this.audioCtx.close();

      this.audioCtx = null;
    }

    if (this.micAudioCtx) {

      this.micAudioCtx.close();

      this.micAudioCtx = null;
    }

    console.log(
      "✅ VoiceAPI stopped"
    );
=======
      this.audioCtx.close();
      this.audioCtx = null;
    }

    console.log("✅ VoiceAPI stopped");
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
  }
}