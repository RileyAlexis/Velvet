import './style.css'
import meyda from 'meyda'

const audioContext = new AudioContext();
const source = audioContext.createMediaElementSource(audio);

source.connect(audioContext.destination);

if (typeof meyda === "undefined") {
  console.log("Meyda could not be found! Have you included it?");
} else {
  const analyzer = meyda.createMeydaAnalyzer({
    audioContext: audioContext,
    source: source,
    bufferSize: 512,
    featureExtractors: ["rms"],
    callback: (features) => {
      console.log(features);
    },
  });
  analyzer.start();
}
