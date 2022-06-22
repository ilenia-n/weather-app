let currentTime = new Date();

let weekday = currentTime.toLocaleString("default", { weekday: "long" });
let hour = currentTime.getHours();

if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = currentTime.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let showTime = document.querySelector("#date");
showTime.innerHTML = `${weekday} ${hour}:${minutes}`;


function onFormSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput");
  requestDataFromAPI(city.value);
}

function requestDataFromAPI(requestObject) {
  let baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = key;
  let apiUrl = `${baseUrl}?q=${requestObject}&appid=${apiKey}&units=metric`;
  if (typeof(requestObject) == "object") {
    apiUrl = `${baseUrl}?lat=${requestObject.latitude}&lon=${requestObject.longitude}&appid=${apiKey}&units=metric`;
  }
  axios.get(apiUrl).then(updateWeatherData);
}

let citySearch = document.querySelector("#cityForm");
citySearch.addEventListener("submit", onFormSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayFiveDaysForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#fiveDaysForecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index <6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
      <div class="card">
        <div class="days-forecast">${formatDay(forecastDay.dt)}</div>
        <img class="week-image"
          src="images/${forecastDay.weather[0].icon}.png"
          alt=""
          width="42"
        />
          <span class="days-forecast"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <div class="min"> ${Math.round(
            forecastDay.temp.min
          )}° 
          </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecastOneCall(coordinates) {
  let apiKey = key;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayFiveDaysForecast);
}

function updateWeatherData(response) {
  let cityTitle = document.querySelector("#cityTitle");
  cityTitle.innerHTML = `${response.data.name}`;
  celsiusTemp = response.data.main.temp;

  let currentTemperature = Math.round(celsiusTemp);
  let changeTemp = document.querySelector("#temp");
  changeTemp.innerHTML = `${currentTemperature}`;
  let changeUnit = document.querySelector("#unit");
  changeUnit.innerHTML =`°C`;
  let currentHumidity = response.data.main.humidity;
  let changeHumidity = document.querySelector("#humidity");
  changeHumidity.innerHTML = `${currentHumidity}`;
  let currentFeelLike = Math.round(response.data.main.feels_like);
  let changeFeelsLike = document.querySelector("#feelsLike");
  changeFeelsLike.innerHTML = `${currentFeelLike}`;
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let changeWindSpeed = document.querySelector("#windSpeed");
  changeWindSpeed.innerHTML = `${currentWindSpeed}`;
  let currentWeatherDescription = response.data.weather[0].description;
  let changeWeatherDescription = document.querySelector("#weatherDescription");
  changeWeatherDescription.innerHTML = `${currentWeatherDescription}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecastOneCall(response.data.coord);
}


requestDataFromAPI("Edinburgh");