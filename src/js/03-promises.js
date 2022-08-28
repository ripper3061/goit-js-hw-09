import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  let delay = Number(form.delay.value);
  const step = Number(form.step.value);
  let amount = Number(form.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
// -----------Вариант через map---------------
//   const promises = new Array(amount).fill(1);
//   promises.map((_, position) => {
//     console.log(position);
//     createPromise(position + 1, delay)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     delay += step;
//   });
// }

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
