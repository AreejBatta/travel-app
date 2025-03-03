import axios from "axios";

export function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted");

  myDirection();
}

const myDirection = async () => {
  const cityElement = document.getElementById('city');

  if (cityElement) {
    const city = cityElement.value.trim();
    console.log(city);

    if (!city) {
      alert('Please enter a city name.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/myDirection', { city });
      console.log('Server Response:', response.data);
      // Update the UI with the data received
      updateUI(response.data);
    } catch (error) {
      console.error('Error during POST request:', error);
      alert('An error occurred while fetching data. Please try again.');
    }
  } else {
    console.error('City input element not found. Please ensure an input with id="city" exists.');
  }
};

// Function to update the UI with the data received
function updateUI(data) {
  // Assuming you have elements to display the data
  const resultElement = document.getElementById('result');
  if (resultElement) {
    resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } else {
    console.error('Result element not found. Please ensure an element with id="result" exists.');
  }
}
