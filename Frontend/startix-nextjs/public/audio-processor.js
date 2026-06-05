class PCMProcessor extends AudioWorkletProcessor {
<<<<<<< HEAD

  process(inputs) {

    const input = inputs[0];

    if (!input || !input[0]) {
      return true;
    }

    const channelData = input[0];

    const pcm16 = new Int16Array(
      channelData.length
    );

    for (let i = 0; i < channelData.length; i++) {

      let s = Math.max(
        -1,
        Math.min(1, channelData[i])
      );

      pcm16[i] =
        s < 0
          ? s * 0x8000
          : s * 0x7fff;
    }

    this.port.postMessage(
      pcm16
    );

=======
  process(inputs) {
    const input = inputs[0];
    if (!input || !input[0]) return true;

    const channel = input[0];

    const pcm16 = new Int16Array(channel.length);
    for (let i = 0; i < channel.length; i++) {
      let s = Math.max(-1, Math.min(1, channel[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }

    this.port.postMessage(pcm16);
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
    return true;
  }
}

<<<<<<< HEAD
registerProcessor(
  "pcm-processor",
  PCMProcessor
);
=======
registerProcessor("pcm-processor", PCMProcessor);
>>>>>>> 871c0995c71836bcd33a127bfa87d7a6428d88df
