const startCS = document.querySelector('button[data-start]');
const stopCS = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

startCS.addEventListener('click', onStartCS);

stopCS.addEventListener('click', onStopCS);

function onStartCS() {
  startCS.disabled = true;
  intervalId = setInterval(setBcgColor, 1000);
}

function onStopCS() {
  startCS.disabled = false;
  clearInterval(intervalId);
}

function setBcgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
