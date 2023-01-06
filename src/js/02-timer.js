import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

const timer = {
  countdown: 0,
  startTime: null,
  start() {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      this.countdown = this.startTime - currentTime;
      this.updateHTML();
      if (this.countdown < 1000) {
        clearInterval(intervalId);
      }
    }, 1000);
  },
  updateHTML() {
    const dateObject = convertMs(this.countdown);
    days.textContent = addLeadingZero(dateObject.days);
    hours.textContent = addLeadingZero(dateObject.hours);
    minutes.textContent = addLeadingZero(dateObject.minutes);
    seconds.textContent = addLeadingZero(dateObject.seconds);
  },
};

function addLeadingZero(number) {
  return number.toString().padStart(2, '0');
}

flatpickr(calendar, options);

startBtn.disabled = true;

startBtn.addEventListener('click', onStart);

function onStart() {
  startBtn.disabled = true;
  calendar.disabled = true;
  timer.start();
}

function onClose(selectedDates) {
  timer.startTime = selectedDates[0];

  if (selectedDates[0].getTime() - Date.now() < 0) {
    window.alert('Please choose a date in the future');
  } else {
    startBtn.disabled = false;
    calendar.disabled = false;
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
