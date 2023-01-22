/* eslint-disable no-console */
// TODO: write code here

console.log('app.js bundled');

const form = document.querySelector('.form');

const errors = {
  login: {
    valueMissing: 'Представьтесь, пожалуйста!',
  },
  email: {
    valueMissing: 'Нам потребуется электропочта...',
    typeMismatch: 'А это точно электропочта?',
  },
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (form.checkValidity()) {
    console.log('valid');
  } else {
    console.log('invalid');
  }

  const { elements } = form;
  // const elements = form.elements; тоже, что и 27строка

  // eslint-disable-next-line arrow-body-style
  const invalid = [...elements].some((el) => {
    // eslint-disable-next-line array-callback-return
    return Object.keys(ValidityState.prototype).some((key) => {
      if (!el.name) return;
      if (key === 'valid') return;

      if (el.validity[key]) {
        console.log(key);
        console.log(errors[el.name][key]);

        el.setCustomValidity(errors[el.name][key]);

        // eslint-disable-next-line consistent-return
        return true;
      }
    });
  });

  if (invalid) {
    form.reportValidity();
  }

  console.log('submit');
});
