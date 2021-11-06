import { Notify } from 'notiflix/build/notiflix-notify-aio';
  
  const body = document.body;
  const startBtn = document.querySelector('button[data-start]');
  const stopBtn = document.querySelector('button[data-stop]');
  
  function getRandomHexColor() {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    Notify.info(`Color ${color}`);
    return color
  };

  startBtn.addEventListener('click', startСhangingСolor)
  stopBtn.addEventListener('click', stoptСhangingСolor)
  
  let interval = 0;

  function startСhangingСolor() {
        startBtn.disabled = true;
        interval = setInterval(() => body.style.backgroundColor = getRandomHexColor(), 1000)
        console.log('start');
    };
    
    function stoptСhangingСolor() {
        startBtn.disabled = false;
        console.log('stop');
        clearInterval(interval);
    };

