export function updateUI(city, rDays) {
  const cityElement = document.querySelector('.city');
  const rDaysElement = document.querySelector('.rDays');
  const dDate = document.getElementById('date').value;
  const depDate = document.getElementById('depDate');

  // Capitalize the city name
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  if (cityElement && rDaysElement && depDate) {
      cityElement.innerHTML = `My Travel to: ${capitalizedCity}`;
      depDate.innerHTML = `Departing Date: ${dDate}`;
      rDaysElement.innerHTML = `<h3> ${capitalizedCity} is ${rDays} days away! </h3>`;
  } else {
      console.error('Elements are not found');
  }
}