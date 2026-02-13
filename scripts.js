// Loader logic
const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");

const phrases = [
  "Getting things ready",
  "Cutting the grass with a nailcutter",
  "Watering the plants",
  "Counting to ten in French",
  "Fetching spells"
];

let phraseIndex = 0;
let pageLoaded = false;
let minimumTimePassed = false;

// Change text with fade
function cycleText() {
  loaderText.style.opacity = "0";

  setTimeout(() => {
    loaderText.textContent = phrases[phraseIndex];
    loaderText.style.opacity = "1";
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }, 600);
}

// Start cycling every 2.5 seconds
const textInterval = setInterval(cycleText, 2500);
loaderText.style.opacity = "1";

// Detect page load
window.addEventListener("load", () => {
  pageLoaded = true;
  attemptToHideLoader();
});

// Minimum 10 seconds timer
setTimeout(() => {
  minimumTimePassed = true;
  attemptToHideLoader();
}, 10000);

// Only hide when BOTH conditions are met
function attemptToHideLoader() {
  if (pageLoaded && minimumTimePassed) {
    clearInterval(textInterval);
    loader.style.opacity = "0";
    document.getElementById("page-content").style.opacity = "1";

    setTimeout(() => {
      loader.style.display = "none";

      // 🌸 FIX: Initialize lastTime right before the first frame
      flowerAnimationStarted = true;
      requestAnimationFrame((timestamp) => {
        lastTime = timestamp; // Sync the start time
        animateFlowers(timestamp);
      });
    }, 1000);
  }
}


// // Flower arrangement
// const container = document.querySelector(".flower-container");
// const MAX_FLOWERS = 25;

// function createFlower() {
//   if (container.children.length >= MAX_FLOWERS) return;

//   const flower = document.createElement("div");
//   flower.classList.add("flower");
//   flower.innerText = "🌸";

//   // Random size (soft + subtle)
//   const size = Math.random() * 15 + 15;
//   flower.style.fontSize = size + "px";

//   // Random horizontal position
//   flower.style.left = Math.random() * 100 + "vw";

//   // Random animation duration
//   const duration = Math.random() * 5 + 7;
//   flower.style.animationDuration = duration + "s";

//   container.appendChild(flower);

//   setTimeout(() => {
//     flower.remove();
//   }, duration * 1000);
// }

// 🌸 Elegant Flower Engine

const flowerContainer = document.querySelector(".flower-container");
const flowers = [];
const MAX_FLOWERS = 25;
let lastSpawn = 0;
let flowerAnimationStarted = false;

class Flower {
  constructor() {
    this.el = document.createElement("div");
    this.el.classList.add("flower");
    this.el.innerText = "🌸";

    this.size = Math.random() * 15 + 15;
    this.x = Math.random() * window.innerWidth;
    this.y = -50;
    this.speedY = Math.random() * 30 + 40; // vertical speed
    this.drift = Math.random() * 40 - 20;  // horizontal drift
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 60 - 30;

    this.el.style.fontSize = this.size + "px";
    flowerContainer.appendChild(this.el);
  }

  update(delta) {
    this.y += this.speedY * delta;
    this.x += this.drift * delta;
    this.rotation += this.rotationSpeed * delta;

    this.el.style.transform = `
      translate(${this.x}px, ${this.y}px)
      rotate(${this.rotation}deg)
    `;

    if (this.y > window.innerHeight + 50) {
      this.el.remove();
      return false;
    }

    return true;
  }
}

let lastTime = 0;

function animateFlowers(timestamp) {
  if (!flowerAnimationStarted) return;

  const delta = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  // Spawn new flowers every 0.7 seconds
  if (timestamp - lastSpawn > 700 && flowers.length < MAX_FLOWERS) {
    flowers.push(new Flower());
    lastSpawn = timestamp;
  }

  // Update existing flowers
  for (let i = flowers.length - 1; i >= 0; i--) {
    const alive = flowers[i].update(delta);
    if (!alive) {
      flowers.splice(i, 1);
    }
  }

  requestAnimationFrame(animateFlowers);
}


// Spawn gently
// setInterval(createFlower, 700);

const button = document.getElementById("celebrate-btn");
const overlay = document.getElementById("celebration-overlay");
const popup = document.getElementById("popup");
const sound = document.getElementById("celebration-sound");
const confettiContainer = document.getElementById("confetti-container");
const fireworksContainer = document.getElementById("fireworks-container");

button.addEventListener("click", () => {
  launchConfetti();
  launchFireworks();
  showPopup();
  playSound();
});

function showPopup() {
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";

  popup.style.transform = "scale(1)";
  popup.classList.add("active");

  // Auto close after 5 seconds
  setTimeout(closeCelebration, 5000);
}

function closeCelebration() {
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";

  popup.classList.remove("active");
  popup.style.transform = "scale(0.8)";

  // Stop sound if still playing
  sound.pause();
  sound.currentTime = 0;

  // Clean up particles
  confettiContainer.innerHTML = "";
  fireworksContainer.innerHTML = "";
}

function playSound() {
  sound.currentTime = 0;
  sound.play();
}

function launchConfetti() {
  for (let i = 0; i < 120; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti");

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-10px";
    piece.style.backgroundColor = randomColor();

    const duration = Math.random() * 3 + 2;
    piece.style.animationDuration = duration + "s";

    confettiContainer.appendChild(piece);

    setTimeout(() => piece.remove(), duration * 1000);
  }
}

function launchFireworks() {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      createExplosion(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight * 0.6
      );
    }, i * 400);
  }
}

function createExplosion(x, y) {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.classList.add("firework");

    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 120 + 40;

    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.backgroundColor = randomColor();
    particle.style.setProperty("--x", Math.cos(angle) * radius + "px");
    particle.style.setProperty("--y", Math.sin(angle) * radius + "px");

    fireworksContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
  }
}

function randomColor() {
  const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#f72585"];
  return colors[Math.floor(Math.random() * colors.length)];
}
