import { handleSubmit } from "./scripts/FormHandler.js";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }
  });