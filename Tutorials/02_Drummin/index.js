const drumButtons = document.querySelectorAll(".drum");

const soundMap = {
  w: "sounds/tom-1.mp3",
  a: "sounds/tom-2.mp3",
  s: "sounds/tom-3.mp3",
  d: "sounds/tom-4.mp3",
  j: "sounds/snare.mp3",
  k: "sounds/crash.mp3",
  l: "sounds/kick-bass.mp3",
};

function playSound(key) {
  if (soundMap[key]) {
    const audio = new Audio(soundMap[key]);
    audio.play();
  }
}

function animateButton(key) {
  const activeButton = document.querySelector(`.${key}`);
  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(() => {
      activeButton.classList.remove("pressed");
    }, 100);
  }
}

function handleDrumClick(event) {
  const key = event.target.innerText;
  playSound(key);
  animateButton(key);
}

drumButtons.forEach((button) => {
  button.addEventListener("click", handleDrumClick);
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  playSound(key);
  animateButton(key);
});
