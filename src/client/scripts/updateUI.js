export function updateUI(cityElement, weather, rDays, imgS) {
    const resultElement = document.getElementById('result');
    if (resultElement) {
      // Make sure that 'weather' has the expected properties.
      // For example, if travelWeather returns response.data,
      // then weather.description and weather.temp should exist.
      alert('i exist')
      resultElement.innerHTML = `
        <h2>Travel Details</h2>
        <p><strong>City:</strong> ${cityElement}</p>
        <p><strong>Days Until Travel:</strong> ${rDays}</p>
        <p><strong>Weather Forecast:</strong> ${weather.description} (Temp: ${weather.temp}°C)</p>
        <img src="${imgS}" alt="Image of ${city}" style="max-width:100%; height:auto;">
      `;
    } else {
      console.error('Result element not found. Please ensure an element with id="result" exists.');
    }
  }
  