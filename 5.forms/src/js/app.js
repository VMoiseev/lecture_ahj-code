/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
// TODO: write code here

import { Tooltip } from './tooltip';

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

const tooltipFactory = new Tooltip();

let actualMessages = [];

const showTooltip = (message, el) => {
  actualMessages.push({
    name: el.name,
    id: tooltipFactory.showTooltip(message, el),
  });
};

const getError = (el) => {
  const errorKey = Object.keys(ValidityState.prototype).find((key) => {
    if (!el.name) return;
    if (key === 'valid') return;

    return el.validity[key];
  });

  if (!errorKey) return;

  return errors[el.name][errorKey];
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  actualMessages.forEach((message) => tooltipFactory.removeTooltip(message.id));
  actualMessages = [];

  if (form.checkValidity()) {
    console.log('valid');
  } else {
    console.log('invalid');
  }

  const { elements } = form;
  // const elements = form.elements; тоже, что и 59 строка

  [...elements].some((elem) => {
    const error = getError(elem);

    if (error) {
      showTooltip(error, elem);

      return true;
    }
  });

  console.log('submit');
});

const elementOnBlur = (e) => {
  const el = e.target;

  const error = getError(el);

  if (error) {
    showTooltip(error, el);
  } else {
    const currentErrorMessage = actualMessages.find((item) => item.name === el.name);

    if (currentErrorMessage) {
      tooltipFactory.removeTooltip(currentErrorMessage.id);
    }
  }

  el.removeEventListener('blur', elementOnBlur);
};

form.elements.forEach((el) => el.addEventListener('focus', () => {
  el.addEventListener('blur', elementOnBlur);
}));
