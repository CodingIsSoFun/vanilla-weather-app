let now = new Date();
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let h2 = document.querySelector("h2");
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
h2.innerHTML = `${day} | ${date} ${month} ${year} | ${hours}:${minutes}`;

let form = document.querySelector("#search-form");
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureMessage = `${temperature}°C`;
    let degreeNumber = document.querySelector("#degree-number");
    degreeNumber.innerHTML = temperatureMessage;
  }
  let apiKey = "5c0aefa925435060c9aa64ae53efe973";
  let cityName = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
form.addEventListener("submit", search);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let apiKey = "5c0aefa925435060c9aa64ae53efe973";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
    function showWeather(response) {
      let temperature = Math.round(response.data.main.temp);
      let temperatureMessage = `${temperature}°C`;
      let degreeNumber = document.querySelector("#degree-number");
      degreeNumber.innerHTML = temperatureMessage;
      let h1 = document.querySelector("h1");
      h1.innerHTML = response.data.name;
    }
  }
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
