import axios from "axios";

export function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted");

  myDirection();
  // daysCountdown();
  // travelWeather();
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
      // Update the UI with the data received
      updateUI(response.data);
      console.log(response.data);
      const rDays = daysCountdown();     
      console.log(rDays) 
      const { lat, lng } = response.data;
      if (lat && lng && rDays != null) {
        travelWeather(lat, lng, rDays);
        
    } }
    catch (error) {
      console.error('Error during POST request:', error);
      alert('An error occurred while fetching data. Please try again.');
    }
  } else {
    console.error('City input element not found. Please ensure an input with id="city" exists.');
  }
};
// function to calculate remaining dates till the flight date
const daysCountdown = () => {
  const flightDate = new Date(document.getElementById('date').value);
  const todayDate = new Date();

  // Calculate the difference in milliseconds
  const diffTime = flightDate.getTime() - todayDate.getTime();

  // Convert milliseconds to days, rounding up to the next integer
  const rDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return rDays;
};

// function for weather
const travelWeather= async (lat,lng, rDays)=>{
  const response = await axios.post('http://localhost:8000/travelWeather', { lat,lng, rDays });
  console.log(response)
  return response;
}
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
