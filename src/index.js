const MIN_AUDIO_RANGE = 55; // in Hz => A1
const MAX_AUDIO_RANGE = 1760; // in Hz => A6
const MIN_DETUNE_RANGE = -100; // in cents
const MAX_DETUNE_RANGE = 100; // in cents
const NOTE_A = 440; // in Hz

const playStopButton = new Nexus.TextButton("#playStopButton");
document
  .querySelector("#playStopButton")
  ?.addEventListener("click", async () => {
    await Tone.start();
  });

const oscillatorRack = new Nexus.Rack("#oscillator");

oscillatorRack.oscWaveFormSelect.defineOptions([
  "sine",
  "square",
  "sawtooth",
  "triangle",
]);
oscillatorRack.oscWaveFormSelect.value = "sine";
oscillatorRack.oscWaveFormSelect.colorize("fill", "#d4d4d4");

oscillatorRack.oscFreqDial.min = MIN_AUDIO_RANGE;
oscillatorRack.oscFreqDial.max = MAX_AUDIO_RANGE;
oscillatorRack.oscFreqDial.value = NOTE_A;
oscillatorRack.oscFreqDial.step = 1;
oscillatorRack.oscFreqNumber.link(oscillatorRack.oscFreqDial);
oscillatorRack.oscFreqNumber.link(oscillatorRack.oscFreqDial);
oscillatorRack.oscFreqDial.colorize("fill", "#d4d4d4");
oscillatorRack.oscFreqNumber.colorize("fill", "#d4d4d4");

oscillatorRack.oscDetuneDial.min = MIN_DETUNE_RANGE;
oscillatorRack.oscDetuneDial.max = MAX_DETUNE_RANGE;
oscillatorRack.oscDetuneDial.value = 0;
oscillatorRack.oscDetuneDial.step = 1;
oscillatorRack.oscDetuneNumber.link(oscillatorRack.oscDetuneDial);
oscillatorRack.oscDetuneDial.colorize("fill", "#d4d4d4");
oscillatorRack.oscDetuneNumber.colorize("fill", "#d4d4d4");

oscillatorRack.oscMuteButton.mode = "toggle";
oscillatorRack.oscMuteButton.state = "true";
oscillatorRack.oscMuteButton.colorize("fill", "#d4d4d4");

const oscillator = new Tone.Oscillator({
  frequency: oscillatorRack.oscFreqDial.value,
  type: oscillatorRack.oscWaveFormSelect.value,
  mute: oscillatorRack.oscMuteButton.state,
})
  .toDestination()
  .start();

oscillatorRack.oscWaveFormSelect.on("change", (option) => {
  oscillator.type = option.value;
});

oscillatorRack.oscFreqDial.on("change", (value) => {
  oscillator.frequency.exponentialRampToValueAtTime(
    value,
    Tone.getContext().currentTime + 0.05
  );
});

oscillatorRack.oscDetuneDial.on("change", (value) => {
  oscillator.detune.exponentialRampToValueAtTime(
    value,
    Tone.getContext().currentTime + 0.05
  );
});

oscillatorRack.oscMuteButton.on("change", (state) => {
  if (state) {
    oscillator.mute = true;
  } else {
    oscillator.mute = false;
  }
});
