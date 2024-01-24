import meyda from 'meyda';
import wavesurfer from 'wavesurfer.js'

export default {
    optimizeDeps: {
        inlude: ['./main.js', './visualize.js'],
        plugins: [meyda, wavesurfer],
    },
};