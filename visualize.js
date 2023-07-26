

const canvas = document.getElementById('waveformCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 0.75;


class SoundWave {
    constructor() {
        this.width = 20;
        this.height = 10;
    }
update() {

}
draw() {

}
}



export function visualize(source) {
}

export function showMic() {
    let micIcon = new Image();
    micIcon.src = './assets/micRed.png';

    // ctx.fillStyle = 'white';
    // ctx.fillRect(0,0, 200, 200);
//Source, sprite X, sprite Y, spriteWidth, spriteHeight, canvas X, canvas Y, imageWidth, imageHeight
ctx.drawImage(micIcon, 10, 10);
}