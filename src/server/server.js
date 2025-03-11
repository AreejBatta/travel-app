import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const port = 8081;
const API_KEY_G = process.env.API_KEY_G;
const API_KEY_w = process.env.API_KEY_w;
const API_KEY_P= process.env.API_KEY_P;

app.get("/", (req, res) => {
  res.sendFile(path.resolve("dist/index.html"));
});

// Travel city (GeoNames)
app.post('/myDirection', async (req, res) => {
  const city = req.body.city;

  if (!city || city.trim() === '') {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const geonamesUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${API_KEY_G}`;
    const response = await axios.get(geonamesUrl);
    const data = response.data;

    if (!data.geonames || data.geonames.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }

    const { name, lat, lng } = data.geonames[0];

    res.json({ location: name, lat, lng });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching location data' });
  }
});

// Travel weather
app.post('/travelWeather', async (req, res) => {
  const { lat, lng, rDays } = req.body;

  if (rDays === null) {
    return res.status(400).json({ error: "Invalid flight date." });
  }

  try {
    let weatherResponse;
    let travelWD;

    if (rDays > 0 && rDays < 8) {
      const weatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${API_KEY_w}`;
      weatherResponse = await axios.get(weatherUrl);
      console.log("Current Weather Response:", weatherResponse.data);

      const weatherData = weatherResponse.data.data;
      if (!weatherData || weatherData.length === 0) {
        return res.status(404).json({ error: "Weather data not found" });
      }

      const { temp, weather } = weatherData[0];
      const { description } = weather;
      travelWD = { temp, description };
    } else if (rDays > 7 && rDays < 16) {
      const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&days=${rDays}&units=M&key=${API_KEY_w}`;
      weatherResponse = await axios.get(weatherUrl);
      console.log("Forecast Weather Response:", weatherResponse.data);

      const forecastData = weatherResponse.data.data;
      if (!forecastData || forecastData.length === 0) {
        return res.status(404).json({ error: "Weather data not found" });
      }

      const lastDayWeather = forecastData[forecastData.length - 1];
      const { temp, weather, app_max_temp, app_min_temp } = lastDayWeather;
      const { description } = weather;
      travelWD = { temp, description, app_max_temp, app_min_temp };
    } else {
      return res.status(400).json({ error: "rDays must be between 1 and 15." });
    }

    res.json(travelWD);
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

// get my direction city photo
app.post('/getPhoto', async (req, res) => {
  try {
  const city = req.body.city;
  const photoURL= `https://pixabay.com/api/?key=${API_KEY_P}&q=${city}&image_type=photo&pretty=true`;
  const response= await axios.get(photoURL);
  if (response.data.hits.length === 0){
    return res.status(404).json({error:'city picture not found'})
  }
  const imgURL= response.data.hits[1].webformatURL; 
  res.json(imgURL)
}
  catch(error){
    res.status(500).json({error:"error fetching photo"})
  }})

  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  })