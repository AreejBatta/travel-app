import axios from "axios";
import { updateUI } from "./updateUI.js";
import { updateImgUI } from "./updateImgUI.js";
import { updatWeatherUI } from "./updateWeatherUI.js";

export function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted");
  return myDirection();
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
      const response = await axios.post('http://localhost:8081/myDirection', { city });
      console.log("myDirection response data:", response.data);
      const rDays = daysCountdown();     
      updateUI(city,rDays);
      console.log("Days until travel (rDays):", rDays);
      const { lat, lng } = response.data;
      if (lat && lng && rDays != null) {
        // weather.description and weather.temp exist.
        const weatherData= await travelWeather(lat, lng, rDays);
        const weatherD= weatherData
        console.log(weatherD)
        const imgSRC= await getPhoto(city);
        updatWeatherUI(weatherD, rDays);
        updateImgUI(imgSRC, city);
        return rDays;
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
  const dateError = document.getElementById('dateError'); 

  const diffTime = flightDate.getTime() - todayDate.getTime();
  const rDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (rDays < 0) {
    dateError.textContent = 'The trip date cannot be in the past.';
    dateError.style.display = 'inline';
    return null;
  }

  if (rDays > 16) {
    dateError.textContent = 'The trip date cannot be more than 16 days in the future.';
    dateError.style.display = 'inline';
    return null;
  }

  return rDays;
};

const travelWeather = async (lat, lng, rDays) => {
  const response = await axios.post('http://localhost:8081/travelWeather', { lat, lng, rDays });
  const weatherResp= response.data
  return weatherResp;
};

const getPhoto = async (city) => {
  try {
    console.log("getPhoto: Starting request for city:", city); // Debug log
    const responseIMG = await axios.post('http://localhost:8081/getPhoto', { city });
    let imgSRC = responseIMG.data;
    console.log("getPhoto: Received imgSRC:", imgSRC); // Debug log for image URL
    return imgSRC;
  } catch (error) {
    console.error("getPhoto: Error fetching photo:", error);
  }
};

