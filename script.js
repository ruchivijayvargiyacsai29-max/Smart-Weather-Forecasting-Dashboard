const apiKey = "0f28a037a40e48f28e2131630251806";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=yes`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Display current weather
      document.getElementById("weatherCard").style.display = "block";
      document.getElementById("cityName").textContent = `${data.location.name}, ${data.location.country}`;
      document.getElementById("temp").textContent = data.current.temp_c;
      document.getElementById("feelsLike").textContent = data.current.feelslike_c;
      document.getElementById("condition").textContent = data.current.condition.text;
      document.getElementById("humidity").textContent = data.current.humidity;
      document.getElementById("wind").textContent = data.current.wind_kph;
      document.getElementById("aqi").textContent = data.current.air_quality.pm2_5.toFixed(1);

      // ✅ Fix: add 'https:' to icon URL
      document.getElementById("weatherIcon").src = "https:" + data.current.condition.icon;

      // Set dynamic background
      setBackgroundImage(data.current.condition.text);

      // Display forecast
      showForecast(data.forecast.forecastday);
    })
    .catch(error => {
      alert("City not found or API error");
      console.error("Error fetching weather data:", error);
    });
}

function setBackgroundImage(condition) {
  const body = document.body;
  body.classList.add('dynamic-bg');

  let imageUrl = "";

  if (condition.includes("Sunny")) imageUrl = "https://source.unsplash.com/1600x900/?sunny";
  else if (condition.includes("Rain")) imageUrl = "https://source.unsplash.com/1600x900/?rain";
  else if (condition.includes("Snow")) imageUrl = "https://source.unsplash.com/1600x900/?snow";
  else if (condition.includes("Cloud")) imageUrl = "https://source.unsplash.com/1600x900/?cloud";
  else if (condition.includes("Thunder")) imageUrl = "https://source.unsplash.com/1600x900/?thunderstorm";
  else imageUrl = "https://source.unsplash.com/1600x900/?weather";

  body.style.backgroundImage = `url(${imageUrl})`;
}

function showForecast(forecastDays) {
  const forecastDiv = document.getElementById("forecast");
  const forecastCards = document.getElementById("forecastCards");

  forecastCards.innerHTML = "";
  forecastDiv.style.display = "block";

  forecastDays.forEach(day => {
    const card = document.createElement("div");
    card.className = "forecast-card";

    card.innerHTML = `
      <p><strong>${day.date}</strong></p>
      <img src="https:${day.day.condition.icon}" alt="Icon">
      <p>${day.day.condition.text}</p>
      <p>Max: ${day.day.maxtemp_c}°C</p>
      <p>Min: ${day.day.mintemp_c}°C</p>
    `;

    forecastCards.appendChild(card);
  });
}
