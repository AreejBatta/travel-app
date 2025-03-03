// src/server/server.js
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

app.get("/", (req, res) => {
  res.sendFile(path.resolve("dist/index.html"));
});

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
    const {name, lat, lng}= data.geonames[0]; 
    const location=data.geonames[0].name;
    console.log(name,lat, lng);

    if (data.totalResultsCount === 0) {
      return res.status(404).json({ error: 'City not found' });
    }

    // res.json(data);
    res.send(location)
  } catch (error) {
    console.error('Error fetching data from Geonames API:', error);
    res.status(500).json({ error: 'Error fetching location data' });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
