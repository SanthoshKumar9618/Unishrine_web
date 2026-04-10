export class AudioStreamer {
  private ws: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  async start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    this.ws = new WebSocket("ws://localhost:8000/ws/voice");
    this.ws.binaryType = "arraybuffer";

    this.audioContext = new AudioContext({ sampleRate: 16000 });

    this.source = this.audioContext.createMediaStreamSource(stream);

    // bufferSize: 4096 → stable; we'll slice manually
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

    this.source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);

    this.processor.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0);

      // 🔥 Convert Float32 → Int16 PCM
      const pcm16 = this.floatTo16BitPCM(input);

      // 🔥 Chunk slicing (20ms = 320 samples @16kHz → 640 bytes)
      const CHUNK_SAMPLES = 320;

      for (let i = 0; i < pcm16.length; i += CHUNK_SAMPLES) {
        const chunk = pcm16.slice(i, i + CHUNK_SAMPLES);

        if (chunk.length === CHUNK_SAMPLES && this.ws?.readyState === 1) {
          this.ws.send(chunk.buffer);
        }
      }
    };
  }

  stop() {
    this.processor?.disconnect();
    this.source?.disconnect();
    this.audioContext?.close();
    this.ws?.close();
  }

  private floatTo16BitPCM(input: Float32Array): Int16Array {
    const output = new Int16Array(input.length);

    for (let i = 0; i < input.length; i++) {
      let s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }

    return output;
  }
}