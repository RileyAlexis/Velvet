const canvas = document.getElementById('waveformCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 0.75;
const maxObjects = 100;
let ampCircles = [];
let rmsWaves = [];
let particles = [];

class SoundWave {
    constructor() {
        this.width = 20;
        this.height = 10;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.updateInterval = 10; //Sets interval for updating visualization - every nth function
        this.counter = 0;
        this.radius = 30;
        this.maxRadius = 50;
        this.randomColors = [Math.floor(Math.random()*255),
            Math.floor(Math.random()*120),
            Math.floor(Math.random()*120)]
        this.spectrum = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1]
        + ',' + this.randomColors[2] + ')';
    }

update(features) {
    if (this.counter === this.updateInterval) {
    this.radius = Math.floor(Math.random() * features.spectralCentroid * 3);
    this.counter = 0;
    }
        else {
        this.counter++;
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

class RMSWaves {
    constructor() {
        this.width = 15;
        this.lineHeight = 0;
        this.spread = canvas.width * 0.2;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.height = 0;
        this.randomColors = [Math.floor(Math.random()*129),
            Math.floor(Math.random()*120),
            Math.floor(Math.random()*255)]
        this.spectrum = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1]
        + ',' + this.randomColors[2] + ')';
    }
    update(features) {
        this.height = features.rms * 1000;

    }
    draw() {
        ctx.fillStyle = this.spectrum;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y + this.width, this.width, (this.height) * -1);
    }
}

export function visualize(features) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if (ampCircles.length <= maxObjects) {
        ampCircles.push(new SoundWave());
    }
    if (rmsWaves.length <= maxObjects) {
        rmsWaves.push(new RMSWaves());
    }
    [...ampCircles, ...rmsWaves].forEach(object => object.update(features));
    [...ampCircles, ...rmsWaves].forEach(object => object.draw());
    //console.log(rmsWaves.length);
}


