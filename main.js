// import {updateDom, startAudioContext} from './public/client.js'
import { visualize, showMic} from './visualize.js';
import meyda from 'meyda'

const audioContext = new AudioContext();
let micActive = false;
// const source = audioContext.createMediaElementSource(audio);
// const audioElement = document.querySelector('audio');

recordButton.addEventListener('click', () => {
  if (audioContext.state === 'suspended') {
      audioContext.resume();
      callMic('on');
  }
  else if (micActive) callMic('off');
  console.log('Mic Off');

},
  false //Default value of event listener
);



function callMic(micSwitch) {
  

      navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        //Use the stream here
        const micStream = audioContext.createMediaStreamSource(stream);

        //Connects mic to speakers and repeats whatever is said
        meydaAnalyzers(micStream, 'start');
        micActive = true;
        console.log('Microphone activated');


        //micStream.connect(audioContext.destination);
      }).catch((err) => {
        console.log('Microphone error')
      });
};


//source.connect(audioContext.destination);

function meydaAnalyzers(sourceStream, command) {

  if (typeof meyda === "undefined") {
    console.log("Meyda could not be found! Have you included it?");
  } else if (command === 'start') {
    const analyzer = meyda.createMeydaAnalyzer({
      audioContext: audioContext,
      source: sourceStream,
      bufferSize: 512,
      featureExtractors: ["rms", "spectralCentroid"],
      callback: (features) => {
        //console.log(features);
        // updateDom(features.rms, features.spectralCentroid);
        audioLevels.textContext = features.rms;
        spectralCentroid.textContent = features.spectralCentroid;
      },
    });
    analyzer.start();
    console.log('Starting Analyzer');
  }
  else if (command === 'stop');
  analyzer.pause();
  console.log('Pausing Analyzer');
}
