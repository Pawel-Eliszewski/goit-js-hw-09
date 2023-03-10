import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Date OK, Please press "Start" button');
      startBtn.disabled = false;

      startBtn.addEventListener('click', () => {
        dateInput.disabled = true;
        startBtn.disabled = true;

        setInterval(() => {
          const ms = selectedDates[0] - new Date();
          let timeLeft = convertMs(ms);
          const addLeadingZero = value => {
            return value.toString().padStart(2, '0');
          };

          for (const values in timeLeft) {
            let values =
              timeLeft.days +
              timeLeft.hours +
              timeLeft.minutes +
              timeLeft.seconds;
            {
              if (values >= 0) {
                days.textContent = addLeadingZero(timeLeft.days);
                hours.textContent = addLeadingZero(timeLeft.hours);
                minutes.textContent = addLeadingZero(timeLeft.minutes);
                seconds.textContent = addLeadingZero(timeLeft.seconds);
              } else {
                dateInput.disabled = false;
              }
            }
          }
        }, 1000);
      });
    }
  },
};

flatpickr('#datetime-picker', options);

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
