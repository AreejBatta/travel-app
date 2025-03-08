import axios from "axios";
import { updateUI } from "./updateUI.js";

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
    console.log("City entered:", city);

    if (!city) {
      alert('Please enter a city name.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/myDirection', { city });
      console.log("myDirection response data:", response.data);
      const rDays = daysCountdown();     
      console.log("Days until travel (rDays):", rDays);
      const { lat, lng } = response.data;
      if (lat && lng && rDays != null) {
        // Make sure travelWeather returns data in a structure where
        // weather.description and weather.temp exist.
        travelWeather(lat, lng, rDays);
        // Use await with getPhoto so that we wait for it to resolve:
        getPhoto(city);
        // updateUI(city, weather, rDays, imgS);
      }
    }
    catch (error) {
      console.error('Error during POST request:', error);
      alert('An error occurred while fetching data. Please try again.');
    }
  } else {
    console.error('City input element not found. Please ensure an input with id="city" exists.');
  }
};

const daysCountdown = () => {
  const flightDate = new Date(document.getElementById('date').value);
  const todayDate = new Date();
  const diffTime = flightDate.getTime() - todayDate.getTime();
  const rDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return rDays;
};

const travelWeather = async (lat, lng, rDays) => {
  const response = await axios.post('http://localhost:8000/travelWeather', { lat, lng, rDays });
  console.log("travelWeather response:", response);
  // If your server sends weather details in response.data,
  // return that (or adjust updateUI accordingly).
  return response.data;
};

const getPhoto = async (city) => {
  try {
    console.log("getPhoto: Starting request for city:", city); // Debug log
    const responseIMG = await axios.post('http://localhost:8000/getPhoto', { city });
    let imgSRC = responseIMG.data;
    console.log("getPhoto: Received imgSRC:", imgSRC); // Debug log for image URL
    return imgSRC;
  } catch (error) {
    console.error("getPhoto: Error fetching photo:", error);
  }
};

