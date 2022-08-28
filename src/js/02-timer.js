import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('#datetime-picker');
const startTimerBtn = document.querySelector('button[data-start]');

const daysText = document.querySelector('span[data-days]');
const hoursText = document.querySelector('span[data-hours]');
const minutesText = document.querySelector('span[data-minutes]');
const secondsText = document.querySelector('span[data-seconds]');

let isActive = false;
let intervalID = null;
startTimerBtn.disabled = true;
let deltaTime = null;

startTimerBtn.addEventListener('click', onStartTimerBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = selectedDates[0];
    const currentTime = Date.now();
    deltaTime = startTime - currentTime;

    if (deltaTime <= 0) {
      Notify.failure('Please choose a date in the future');
    } else startTimerBtn.disabled = false;
  },
};
const fp = flatpickr(inputDate, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function onStartTimerBtn() {
  if (isActive) return;
  isActive = true;

  intervalID = setInterval(() => {
    deltaTime -= 1000;
    const time = convertMs(deltaTime);
    updateTimer(time);
  }, 1000);
}

function updateTimer(time) {
  if (deltaTime <= 0) {
    clearInterval(intervalID);
    daysText.textContent = `00`;
    hoursText.textContent = `00`;
    minutesText.textContent = `00`;
    secondsText.textContent = `00`;
    return;
  }
  const { days, hours, minutes, seconds } = time;
  daysText.textContent = `${days}`;
  hoursText.textContent = `${hours}`;
  minutesText.textContent = `${minutes}`;
  secondsText.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
