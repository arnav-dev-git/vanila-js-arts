const canvas = document.getElementById("canvasParticle");
const ctx = canvas.getContext("2d");

canvas.height = window.window.innerHeight;
canvas.width = window.window.innerWidth;

let particlesArray;
const particleMultiplier = canvas.dataset.times
  ? Number(canvas.dataset.times)
  : 1;
const rebounce = canvas.dataset.speed ? Number(canvas.dataset.speed) : 5;
const particleColor = canvas.dataset.dotcolor
  ? canvas.dataset.dotcolor
  : "#000";
const lineColor = canvas.dataset.linecolor ? canvas.dataset.linecolor : "0,0,0";
const opacity = canvas.dataset.opacity ? canvas.dataset.opacity : 1;

const noLine = canvas.dataset.line ? canvas.dataset.line : "true";
const mouseCollision = canvas.dataset.collide ? canvas.dataset.collide : "true";

const ray = canvas.dataset.ray ? canvas.dataset.ray : "false";
const raycolor = canvas.dataset.raycolor
  ? canvas.dataset.raycolor
  : "rgba(200,200,0,0.5)";

ctx.globalAlpha = opacity;

const mouse = {
  x: undefined,
  y: undefined,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

// radius: (canvas.height / 80) * (canvas.width / 80),

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

//*create particles --->

class Particle {
  constructor(x, y, directionX, directionY, size) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = particleColor;
  }
  //^methode to draw individual particles
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  //^ check the mouse position, move the particle, draw the particle
  update() {
    //& check if the particle within the canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX -= this.directionX * 2;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY -= this.directionY * 2;
    }
    //& check for collision mouse position / particle position

    if (mouseCollision === "true") {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
          this.x += rebounce;
          //   this.x += 15;
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
          this.x -= rebounce;
          //   this.x -= 15;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
          this.y += rebounce;
          //   this.y += 15;
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
          this.y -= rebounce;
          //   this.y -= 15;
        }
      }
    }
    //^ move the particle
    this.x += this.directionX;
    this.y += this.directionY;
    //^ draw the particle
    this.draw();
  }
}

//* create particle array

function init() {
  particlesArray = [];
  let numOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numOfParticles * particleMultiplier; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (canvas.width - size * 2) - size * 2;
    let y = Math.random() * (canvas.height - size * 2) - size * 2;
    let directionX =
      Math.random() * (rebounce - rebounce / 10) - rebounce / 2 - rebounce / 20;
    let directionY =
      Math.random() * (rebounce - rebounce / 10) - rebounce / 2 - rebounce / 20;
    // let color = "#8c5523";
    // let color = particleColor;

    particlesArray.push(new Particle(x, y, directionX, directionY, size));
  }
}

//* animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

//* check if particles are close enough to draw the connecting lines
function connect() {
  let opacityValue = 1;
  if (noLine === "true") {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance =
          (particlesArray[a].x - particlesArray[b].x) *
            (particlesArray[a].x - particlesArray[b].x) +
          (particlesArray[a].y - particlesArray[b].y) *
            (particlesArray[a].y - particlesArray[b].y);
        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          opacityValue = 1 - distance / 20000;
          ctx.strokeStyle = `rgba(${lineColor},${opacityValue})`;
          // ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
      if (ray === "true") {
        ctx.strokeStyle = raycolor;
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

//* resize window
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.width / 80);
  init();
});

//* mouse out event
window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

init();
animate();
