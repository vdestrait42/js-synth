const MIN_AUDIO_RANGE = 27; // in Hz => A0 (27.5)
const MAX_AUDIO_RANGE = 4186; // in Hz => C8
const MIN_DETUNE_RANGE = -1200; // in cents
const MAX_DETUNE_RANGE = 1200; // in cents
const NOTE_A = 440; // in Hz

const playStopButton = new Nexus.TextButton("#playStopButton");
document
  .querySelector("#playStopButton")
  ?.addEventListener("click", async () => {
    await Tone.start();
  });

const oscillatorRack = new Nexus.Rack("#oscillator");

oscillatorRack.oscWaveFormSelect.options = [
  "sine",
  "square",
  "sawtooth",
  "triangle",
];
oscillatorRack.oscWaveFormSelect.value = "sine";

oscillatorRack.oscFreqDial.min = MIN_AUDIO_RANGE;
oscillatorRack.oscFreqDial.max = MAX_AUDIO_RANGE;
oscillatorRack.oscFreqDial.value = NOTE_A;
oscillatorRack.oscFreqDial.step = 1;
oscillatorRack.oscFreqNumber.link(oscillatorRack.oscFreqDial);
oscillatorRack.oscFreqNumber.link(oscillatorRack.oscFreqDial);

oscillatorRack.oscDetuneDial.min = MIN_DETUNE_RANGE;
oscillatorRack.oscDetuneDial.max = MAX_DETUNE_RANGE;
oscillatorRack.oscDetuneDial.value = 0;
oscillatorRack.oscDetuneDial.step = 1;
oscillatorRack.oscDetuneNumber.link(oscillatorRack.oscDetuneDial);

oscillatorRack.oscMuteButton.mode = "toggle";
oscillatorRack.oscMuteButton.state = "true";

const oscillator = new Tone.Oscillator({
  frequency: oscillatorRack.oscFreqDial.value,
  type: oscillatorRack.oscWaveFormSelect.value,
  mute: oscillatorRack.oscMuteButton.state,
})
  .toDestination()
  .start();

oscillatorRack.oscMuteButton.on("change", (state) => {
  if (state) {
    oscillator.mute = true;
  } else {
    oscillator.mute = false;
  }
});

const oscilloscope = new Nexus.Oscilloscope("#oscilloscope");
oscilloscope.connect(oscillator);
