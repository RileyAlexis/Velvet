function updateDom(levels, spectra) {
    levels = Math.floor(levels * 1000);
    spectra = Math.floor(spectra);
    
    // levelNum.textContent = levels;
    // spectralCentroid.textContent = spectra;

  }
  
function startAudioContext() {
}

  //Use one button for two functions (play/pause)
// playButton.addEventListener('click', () => {
//   if (audioContext.state === 'suspended') {
//       audioContext.resume();
//   }

//   if (playButton.dataset.playing === "false") {
//       audioElement.play();
//       playButton.dataset.playing = "true";

//   } else if (playButton.dataset.playing === "true") {
//       audioElement.pause();
//       playButton.dataset.playing = "false";
//   }

// },
//   false //Default value of event listener
// );
