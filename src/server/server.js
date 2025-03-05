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

const port = 8000;
const API_KEY_G = process.env.API_KEY_G;
const API_KEY_w = process.env.API_KEY_w;

app.get("/", (req, res) => {
  res.sendFile(path.resolve("dist/index.html"));
});

// Travel city (GeoNames)
app.post('/myDirection', async (req, res) => {
  const city = req.body.city;
  console.log('Received city:', city);

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
    console.log('GeoNames result:', name, lat, lng);

    res.send({ location: name, lat, lng });
  } catch (error) {
    console.error('Error fetching data from GeoNames API:', error);
    res.status(500).json({ error: 'Error fetching location data' });
  }
});

// Travel weather
app.post('/travelWeather', async (req, res) => {
  const { lat, lng, rDays } = req.body;
  console.log("Weather Request:", { lat, lng, rDays });

  if (rDays === null) {
    return res.status(400).json({ error: "Invalid flight date." });
  }

  try {
    let weatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${API_KEY_w}`;
    const weatherResponse= await axios.get(weatherUrl)

    // Use the forecast API for future dates
    if (rDays > 0 && rDays < 16) {
      weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&days=${rDays}&units=M&key=${API_KEY_w}`;
    }

    console.log("Weather API Response:", weatherResponse.data);
    
    res.json(weatherResponse.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});


app.listen(port, () => console.log(`Server is running on port ${port}`));
