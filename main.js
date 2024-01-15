// import {updateDom, startAudioContext} from './public/client.js'
import { visualize } from './visualize.js';
import meyda from 'meyda'

const audioContext = new AudioContext();

let rmsLevels = 0;

// const source = audioContext.createMediaElementSource(audio);
// const audioElement = document.querySelector('audio');

recordButton.addEventListener('click', () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        //Use the stream here
        const micStream = audioContext.createMediaStreamSource(stream);

        meydaAnalyzers(micStream, 'start');
        console.log('Microphone activated');

        //micStream.connect(audioContext.destination);
        recordButton.classList.add('micButtonOn');
        recordButton.classList.remove('micButtonOff');
      }).catch((err) => {
        console.log('Microphone error');
      }); //end of navigator function
  } //End of if statement

  //Suspend mic use after user button press
  else if (audioContext.state !== 'suspended') {
    audioContext.suspend();
    console.log('Microphone suspended');
    meydaAnalyzers('', 'stop');
    recordButton.classList.remove('micButtonOn');
    recordButton.classList.add('micButtonOff');
  }

});

//source.connect(audioContext.destination);

function meydaAnalyzers(sourceStream, command) {

  if (typeof meyda === "undefined") {
    console.log("Meyda could not be found! Have you included it?");
  } else {
    const analyzer = meyda.createMeydaAnalyzer({
      audioContext: audioContext,
      source: sourceStream,
      bufferSize: 512,
      featureExtractors: ["rms", "amplitudeSpectrum", "spectralCentroid"],
      callback: (features) => {
        
        visualize(features);
        //console.log(features.amplitudeSpectrum); //float32 array
        audioLevels.innerHTML = features.rms * 1000;
        spectralCentroid.textContent = features.spectralCentroid;
      },
    });
    analyzer.start();
    
    console.log('Starting Analyzer');
  }
}
