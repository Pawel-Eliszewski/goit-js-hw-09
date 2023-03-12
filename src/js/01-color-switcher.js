function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyBg = document.querySelector('body');
let timer = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  timer = setInterval(() => {
    bodyBg.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
