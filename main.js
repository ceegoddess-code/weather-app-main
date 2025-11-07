// API 
const apiKey = '7787b8e7629243a5af412146250711';
const form = document.querySelector('form');
const input = document.querySelector('input.form-control');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    currentCity.textContent = data.name;
    currentDate.textContent = new Date().toDateString();
    currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
    currentIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } catch (error) {
    alert('City not found!');
  }
});

const response = await fetch(url);
    const data = await response.json();

  const dropdown = document.querySelector('.dropdown');
let unit = 'metric';

dropdown.addEventListener('change', () => {
  unit = dropdown.value === 'Fahrenheit(°F)' ? 'imperial' : 'metric';
});

function updateWeatherUI(data) {
  document.querySelector('.current-city').textContent = data.name;
  document.querySelector('.current-date').textContent = new Date().toDateString();
  document.querySelector('.current-temp').textContent = `${Math.round(data.main.temp)}°C`;
  document.querySelector('.current-info img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.querySelector('.card-feel p').textContent = `${Math.round(data.main.feels_like)}°C`;
  document.querySelector('.card-humidity p').textContent = `${data.main.humidity}%`;
  document.querySelector('.card-wind p').textContent = `${data.wind.speed} km/h`;
  document.querySelector('.card-precipitation p').textContent = `${data.rain?.['1h'] || 0} mm`;
}

function renderForecast(forecastData) {
  const dailyContainer = document.querySelector('.daily');
  dailyContainer.innerHTML = ''; // Clear previous

  forecastData.forEach(day => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-forcast">
        <p>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="forcast-img">
        <div><p>${Math.round(day.temp.day)}°C</p><p>${Math.round(day.temp.day * 9/5 + 32)}°F</p></div>
      </div>
    `;
    dailyContainer.appendChild(card);
  });
}

function renderForecast(forecastData) {
  const hourlyContainer = document.querySelector('.hourly');
  hourlyContainer.innerHTML = ''; 

  forecastData.forEach(day => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-forcast">
        <p>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="forcast-img">
        <div><p>${Math.round(day.temp.day)}°C</p><p>${Math.round(day.temp.day * 9/5 + 32)}°F</p></div>
      </div>
    `;
    hourlyContainer.appendChild(card);
  });
}
