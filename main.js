// API
const apiKey = "7787b8e7629243a5af412146250711";
const form = document.querySelector("form");
const input = document.querySelector("input.form-control");
const currentCity = document.querySelector(".current-city");
const currentDate = document.querySelector(".current-date");
const currentTemp = document.querySelector(".current-temp");
const currentIcon = document.querySelector(".current-icon");
const dropdown = document.querySelector(".dropdown");
const dailyContainer = document.querySelector(".daily");
const hourlyContainer = document.querySelector(".hourly-container");
let unit = "metric";
const feelsLikeEl = document.querySelector("#feelsLike");
const humidityEl = document.querySelector("#humidity");
const windEl = document.querySelector("#wind");
const precipitationEl = document.querySelector("#precipitation");

//Fetch weather data
async function fetchWeatherData(city) {
  try {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      alert("City not found!");
      return;
    }

    console.log(data);
    updateWeatherUI(data);
    renderDailyForecast(data.forecast.forecastday);
    renderHourlyForecast(data.forecast.forecastday[0].hour);
  } catch (error) {
    console.error ("fetch error:", error);
    alert("Unable to fetch weather data. Please try again later.");
  }
}

// Current weather display
function updateWeatherUI(data) {
  currentCity.textContent = data.location.name;
  currentDate.textContent = new Date().toDateString();

  //Check for unit select and apply selected unit
  const temp =
    unit === "imperial"
      ? Math.round(data.current.temp_f) + "°F"
      : Math.round(data.current.temp_c) + "°C";

  const feelsLike =
    unit === "imperial"
      ? Math.round(data.current.feelslike_f) + "°F"
      : Math.round(data.current.feelslike_c) + "°C";

  const wind =
    unit === "imperial"
      ? Math.round(data.current.wind_mph) + " mph"
      : Math.round(data.current.wind_kph) + " km/h";

  const precipitation =
    unit === "imperial"
      ? data.current.precip_in + " in"
      : data.current.precip_mm + " mm";

  currentTemp.textContent = temp;
  currentIcon.src = `${data.current.condition.icon}`;
  currentIcon.alt = data.current.condition.text;
  feelsLikeEl.textContent = feelsLike;
  windEl.textContent = wind;
  precipitationEl.textContent = precipitation;
  humidityEl.textContent = `${data.current.humidity}%`;
}

//Render 7 day forecast
function renderDailyForecast(days) {
  dailyContainer.innerHTML = ""; // Clear previous

  days.forEach((day) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Get max and min temp for the day
    const maxTemp =
      unit === "imperial"
        ? Math.round(day.day.maxtemp_f) + "°F"
        : Math.round(day.day.maxtemp_c) + "°C";

    const minTemp =
      unit === "imperial"
        ? Math.round(day.day.mintemp_f) + "°F"
        : Math.round(day.day.mintemp_c) + "°C";

    const date = new Date(day.date).toLocaleDateString("en-US", {
      weekday: "short",
    });

    card.innerHTML = `
      <div class="card-forcast">
        <p>${date}</p>
        <img src="https://${day.day.condition.icon}" alt="${day.day.condition.text}" class="forcast-img">
        <div>
          <p>${maxTemp}</p>
          <p>${minTemp}</p>
        </div>
      </div>
    `;
    dailyContainer.appendChild(card);
  });
}
//Render Hourly forecast
function renderHourlyForecast(hours) {
  hourlyContainer.innerHTML = "";

  hours.forEach((hourData) => {
    const time = new Date(hourData.time).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

    const temp =
      unit === "imperial"
        ? Math.round(hourData.temp_f) + "°F"
        : Math.round(hourData.temp_c) + "°C";

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-hourly">
        <p>${time}</p>
        <img src="https:${hourData.condition.icon}" 
             alt="${hourData.condition.text}" 
             class="forecast-img">
        <p>${temp}</p>
      </div>
    `;
    hourlyContainer.appendChild(card);
  });
}

//Event listeners
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let city = input.value.trim();
  if (!city) return;
  await fetchWeatherData(city);
});

//Handle Unit dropdown
dropdown.addEventListener("change", async () => {
  unit = dropdown.value;
  console.log("Selected unit:", unit);

  const city = currentCity.textContent || input.value.trim() || "New Orleans";

  await fetchWeatherData(city);
});
window.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData("New Orleans");
});