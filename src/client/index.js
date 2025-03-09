import './style/griding.scss';
import './style/base.scss';
import './style/form.scss';
import { handleSubmit } from './scripts/FormHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const btn = document.getElementById('addTrip');
    const container = document.getElementById('formContainer');
    const travelInfoSection = document.querySelector('.travelInfo'); // Get the travelInfo section

    if (btn && container && form && travelInfoSection) {
        btn.addEventListener('click', () => {
            // Show the form
            container.classList.remove('formRemove');
            container.classList.add('formContainer');
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission behavior
            handleSubmit(event);    // Call the handleSubmit function

            // Hide the form and show the travelInfo section
            container.classList.remove('formContainer');
            container.classList.add('formRemove');
            travelInfoSection.classList.remove('hidden'); 
            travelInfoSection.classList.add('travelInfo'); 
        });
    } else {
        console.error('One or more elements were not found in the document.');
    }
});