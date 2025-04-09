const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const questionText = document.getElementById("question-text");
const gifContainer = document.getElementById("gif-container");
const container = document.getElementById("main-container");
const body = document.body;

// Move the "No" button when hovered
noBtn.addEventListener("mouseover", function () {
  const containerRect = container.getBoundingClientRect();
  const buttonWidth = noBtn.offsetWidth;
  const buttonHeight = noBtn.offsetHeight;

  const maxX = containerRect.width - buttonWidth - 20;
  const maxY = containerRect.height - buttonHeight - 20;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
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

// Create a single heart
function createHeart() {
  const heart = document.createElement("div");

  const heartTypes = ["heart1", "heart2", "heart3"];
  const randomType = heartTypes[Math.floor(Math.random() * heartTypes.length)];
  heart.className = `heart ${randomType}`;

  const startX = Math.random() * window.innerWidth;
  heart.style.left = `${startX}px`;
  heart.style.bottom = "-20px";

  const size = Math.random() * 40 + 15;
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

// Play romantic sound
function playRomanticSound() {
  try {
    const audio = new Audio("assets/sound.mp3");
    audio.volume = 1;

    audio.addEventListener("loadedmetadata", () => {
      audio.currentTime = 4;
      audio.play();

      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 13000); // Play for 13 seconds after starting at 4s
    });
  } catch (e) {
    console.log("Audio couldn't be played", e);
  }
}
