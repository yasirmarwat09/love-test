const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const questionText = document.getElementById("question-text");
const gifContainer = document.getElementById("gif-container");
const container = document.getElementById("main-container");
const body = document.body;

// Move the "No" button when hovered - Fixed for mobile
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", function (e) {
  e.preventDefault(); // Prevent default touch behavior
  moveNoButton();
});

// Separate function to move the "No" button
function moveNoButton() {
  // Get current viewport dimensions instead of container dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const buttonWidth = noBtn.offsetWidth;
  const buttonHeight = noBtn.offsetHeight;

  // Calculate maximum positions with some padding
  const maxX = viewportWidth - buttonWidth - 20;
  const maxY = viewportHeight - buttonHeight - 20;

  // Generate random position within visible viewport
  const randomX = Math.max(20, Math.floor(Math.random() * maxX));
  const randomY = Math.max(20, Math.floor(Math.random() * maxY));

  // Use fixed positioning relative to viewport
  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

// Prevent No button from triggering Yes behavior
noBtn.addEventListener("click", function (e) {
  e.stopPropagation(); // Stop event propagation
  moveNoButton(); // Move the button again on click
});

// Handle "Yes" button click
yesBtn.addEventListener("click", function () {
  questionText.textContent = "Aww, I Love You Too!";
  questionText.classList.add("love-question");

  gifContainer.innerHTML =
    '<iframe src="https://giphy.com/embed/byLGLI5h3jwRaqd2qU" frameborder="0" class="giphy-embed" allowfullscreen></iframe>';

  body.classList.add("love-bg");
  container.classList.add("success-container");

  noBtn.style.display = "none";
  yesBtn.style.display = "none";

  createHearts();
  playRomanticSound();
});

// Create floating hearts
function createHearts() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      createHeart();
    }, i * 50);
  }

  setInterval(() => {
    createHeart();
  }, 200);
}

// Create a single heart - adjusted for viewport size
function createHeart() {
  const heart = document.createElement("div");

  const heartTypes = ["heart1", "heart2", "heart3"];
  const randomType = heartTypes[Math.floor(Math.random() * heartTypes.length)];
  heart.className = `heart ${randomType}`;

  const startX = Math.random() * window.innerWidth;
  heart.style.left = `${startX}px`;
  heart.style.bottom = "-20px";

  // Adjust heart size based on screen size
  const baseSize = window.innerWidth < 768 ? 15 : 25; // Smaller on mobile
  const variation = window.innerWidth < 768 ? 20 : 30;
  const size = Math.random() * variation + baseSize;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;

  const duration = Math.random() * 4 + 3;
  const animations = ["float-left", "float-right", "float-center"];
  const randomAnimation =
    animations[Math.floor(Math.random() * animations.length)];
  heart.style.animation = `${randomAnimation} ${duration}s linear`;

  document.body.appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode === document.body) {
      document.body.removeChild(heart);
    }
  }, duration * 1000);
}

// Play romantic sound - with error handling
function playRomanticSound() {
  const audio = new Audio("assets/sound.mp3");
  audio.volume = 1;

  // Play once metadata is ready and we can jump to time
  audio.addEventListener("loadedmetadata", () => {
    audio.currentTime = 4;
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 13000); // Play for 13 seconds
  });

  // Fallback in case metadata isn't triggered
  setTimeout(() => {
    try {
      audio.play();
    } catch (e) {
      console.log("Playback failed:", e);
    }
  }, 100);
}

// Initialize - set initial positions for mobile
document.addEventListener("DOMContentLoaded", function () {
  // Set initial positions for buttons to ensure they're visible
  if (window.innerWidth < 768) {
    // Mobile check
    noBtn.style.position = "relative";
    yesBtn.style.position = "relative";
  }
});
