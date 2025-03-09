import './style/form.scss';
import './style/griding.scss';
import './style/base.scss';
import { handleSubmit } from './scripts/FormHandler.js';


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const btn = document.getElementById('addTrip');
    const container = document.getElementById('formContainer');
    const backgroundContainer = document.getElementById('backgroundContainer'); // Container for the background image
    const travelInfo= document.querySelector('.travelInfo')

    if (btn && container && form && backgroundContainer) {
        btn.addEventListener('click', () => {

            // Show the form
            container.classList.remove('formRemove');
            container.classList.add('formContainer');
        });

        form.addEventListener('submit', async(event) => {
            event.preventDefault(); // Prevent the default form submission behavior
            handleSubmit(event);    // Call the handleSubmit function

            backgroundContainer.classList.add('hidden');
            container.classList.remove('formContainer');
            container.classList.add('formRemove');
            const rDays= await handleSubmit(event);
            if (rDays >0 && rDays<17){
                travelInfo.classList.remove('hidden')
            }
        });
    } else {
        console.error('One or more elements were not found in the document.');
    }
});