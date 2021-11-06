import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener("submit", onSubmitClick);
  
function onSubmitClick (e) {
  e.preventDefault();
  let { delay, step, amount } = e.currentTarget;
   
  delay = Number(delay.value);
  step = Number(step.value)

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, delay).then(onFulfilled).catch(onRejected);
    delay += step;
  };
};

function createPromise(position, delay) {

return new Promise((resolve, reject) => {
  const shouldResolve  = Math.random() > 0.3;

  setTimeout(() => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }

    reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }, delay);
});
  
}

function onFulfilled(result) {
  Notify.success(result);
 }
 
 function onRejected(error) {
  Notify.failure(error);
 }