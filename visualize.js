const canvas = document.getElementById('waveformCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 0.75;
const maxObjects = 100;
let ampCircles = [];
let particles = [];

class SoundWave {
    constructor() {
        this.width = 20;
        this.height = 10;
        this.x = canvas.width / 2;
        this.y = canvas.height - this.height;
        this.levels = 0;
        this.spectralCentroid = 0;
        this.amplitudeSpectrum = 0;
        this.interval = 0;
        this.lifetime = 10;
        this.radius = 30;
        this.maxRadius = 50;
        this.randomColors = [Math.floor(Math.random()*255),
            Math.floor(Math.random()*120),
            Math.floor(Math.random()*120)]
        this.spectrum = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1]
        + ',' + this.randomColors[2] + ')';
    }

update(features) {
    if (this.interval >= this.lifetime) {
    this.y = Math.floor(Math.random() * features.spectralCentroid * canvas.width);
    this.x = Math.floor(Math.random() * features.spectralCentroid * canvas.height);
    }
        else {
        this.interval++;
        }
    }

draw() {
    //ctx.save();
    //ctx.globalAlpha = 1 - this.radius/this.maxRadius;
    ctx.beginPath();
    ctx.fillStyle = this.spectrum;
    ctx.arc((this.x), (this.y), this.radius, 0, Math.PI *2);
    ctx.fill();
    //ctx.restore();
}
}

export function visualize(features) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if (ampCircles.length <= maxObjects) {
        ampCircles.push(new SoundWave());
    }
    [...ampCircles].forEach(object => object.update(features));
    [...ampCircles].forEach(object => object.draw());
}


