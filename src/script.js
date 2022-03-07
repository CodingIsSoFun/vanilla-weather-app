let now = new Date();
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let h1 = document.querySelector("h1");
let date = now.getDate();
let hours = now.getHours();
let minutes = checkTime(now.getMinutes());
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = checkTime(days[now.getDay()]);
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h1.innerHTML = `Last updated: ${day} | ${date} ${month} ${year} | ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  let apiKey = "5c0aefa925435060c9aa64ae53efe973";
  let cityName = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let apiKey = "5c0aefa925435060c9aa64ae53efe973";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemperature);
  }
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function showTemperature(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let degreeNumber = document.querySelector("#degree-number");
  celsiusTemperature = response.data.main.temp;
  degreeNumber.innerHTML = Math.round(celsiusTemperature);
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let minElement = document.querySelector("#min-temp");
  minElement.innerHTML = Math.round(response.data.main.temp_min);
  let maxElement = document.querySelector("#max-temp");
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let windSpeed = document.querySelector("#windy");
  windSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} m/s`;
  getForecast(response.data.coord);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitNumber = document.querySelector("#degree-number");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  fahrenheitNumber.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusNumber = document.querySelector("#degree-number");
  celsiusNumber.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-4">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col">
  <div class="card border-dark text-center">
  <div class="card-header">${formatDay(forecastDay.dt)}</div>
  <p class="card-text">
   <img src="http://openweathermap.org/img/wn/${
     forecastDay.weather[0].icon
   }@2x.png" alt="" />
   </br>
   <span class="weather-temp-max">${Math.round(forecastDay.temp.max)}°</span>
  <span class="weather-temp-min">/${Math.round(forecastDay.temp.min)}° </span>
  </p>
  </div>
  </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5c0aefa925435060c9aa64ae53efe973";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
