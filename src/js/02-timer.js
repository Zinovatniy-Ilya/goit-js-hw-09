// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';


import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]')
const days = document.querySelector('span[data-days]')
const hours = document.querySelector('span[data-hours]')
const minutes = document.querySelector('span[data-minutes]')
const seconds = document.querySelector('span[data-seconds]')

let userDate;

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onStartBtnClick)

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userDate = selectedDates[0];
        if (userDate > Date.now()) {
            startBtn.removeAttribute('disabled');
        } else {
          Notify.failure("Please choose a date in the future");
          startBtn.setAttribute('disabled', true);
        } 
    },
  };

  flatpickr("input#datetime-picker", options)

  function onStartBtnClick () {
    setInterval(() => {
        if (userDate <= Date.now()) return;
        const leftTime = convertMs(userDate - Date.now());
        seconds.textContent = addZeroStart(leftTime.seconds);
        minutes.textContent = addZeroStart(leftTime.minutes);
        hours.textContent = addZeroStart(leftTime.hours);
        days.textContent = addZeroStart(leftTime.days);
        
    }, 1000)
}


  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
function addZeroStart(value) {
    return value.toString().padStart(2, '0');
}