import './style/griding.scss';
import './style/base.scss';
import './style/form.scss';
import { handleSubmit } from './scripts/FormHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  const btn = document.getElementById('addTrip');
  const container = document.getElementById('formContainer'); // Assuming this is correct

  if (btn && container && form) {
    btn.addEventListener('click', () => {
      // Add a class to show the form or style it as needed.
      container.classList.remove('formRemove');
      container.classList.add('formContainer');
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      handleSubmit(event);    // Now we're calling the handleSubmit function
      container.classList.remove('formContainer');
      container.classList.add('formRemove');
    });
  } else {
    console.error('One or more elements were not found in the document.');
  }
});
