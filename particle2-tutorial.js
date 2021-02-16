const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;

let hue = 0;

//responsive
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = true;
  //   rect();
  //   shapeArray.map((item) => item.shape(item.x, item.y));
});

//draw function
// const rect = () => {
//   ctx.fillStyle = "yellow";
//   ctx.fillRect(20, 20, 400, 200);
// };

// rect();

//mouse properties
const mouse = {
  x: -100,
  y: -100,
};

const particleArray = [];

canvas.addEventListener("click", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particleArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particleArray.push(new Particle());
  }
});

//circle
const circle = (x = mouse.x, y = mouse.y) => {
  ctx.fillStyle = "#FFEBCD";
  ctx.strokeStyle = "#A98B70";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x, y, 40, 0, Math.PI * 2);
  ctx.fill();
  //   ctx.stroke();
  //   shapeArray.push({ shape: circle, x, y });
};

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Number(Math.random() * canvas.width);
    // this.y = Number(Math.random() * canvas.height);
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.05;
  }
  draw() {
    // ctx.fillStyle = "#FFEBCD";
    ctx.fillStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// function init() {
//   for (let i = 0; i < 500; i++) {
//     particleArray.push(new Particle());
//   }
// }

function handleParticle() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();

    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

// init();

const animate = () => {
  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  hue += 1.5;
  requestAnimationFrame(animate);
};

animate();
