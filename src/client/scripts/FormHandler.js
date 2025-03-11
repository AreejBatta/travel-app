import axios from "axios";
import { updateUI } from "./updateUI.js";
import { updateImgUI } from "./updateImgUI.js";
import { updatWeatherUI } from "./updateWeatherUI.js";

export function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted");
  // returning the remaining days number to notify the user 
  return myDirection();
}
// html element to preview the error 
const dateError = document.getElementById('dateError'); 

// getting the city entered by user end point to get the lang and lat from the api 
const myDirection = async () => {
  const cityElement = document.getElementById('city');

  if (cityElement) {
    const city = cityElement.value.trim();
    console.log("City entered:", city);
    // if the user didnt enter city the alert will appear
    if (!city) {
      alert('Please enter a city name.');
      return;
    }
    // getting data from api response 
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
    dateError.textContent = 'Your trip remaining days must not be more than 16';
    }
  } else {
    dateError.textContent = 'City element not found';
  }
};
// taking the date of trip inserted by user and the current date to calculate the remaining days 
const daysCountdown = () => {
  const flightDate = new Date(document.getElementById('date').value);
  const todayDate = new Date();
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
// depending on the previous api response the weather on trip date will be given 
const travelWeather = async (lat, lng, rDays) => {
  try {
    const response = await axios.post('http://localhost:8081/travelWeather', { lat, lng, rDays });
    console.log("Travel Weather Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching travel weather:", error.response?.data || error.message);
    dateError.textContent = 'Error fetching weather data';
    dateError.style.display = 'inline';
  }
};

// according to city entered the function will get city photo from api response 
const getPhoto = async (city) => {
  try {
    const responseIMG = await axios.post('http://localhost:8081/getPhoto', { city });
    let imgSRC = responseIMG.data;
    return imgSRC;
  } catch (error) {
    dateError.textContent = 'Error fetching photo';
    dateError.style.display = 'inline';
  }
};

