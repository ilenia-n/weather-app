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
  let apiKey = "dc51080b02acff683dbe8e4cbf69dccc";
  let apiUrl = `${baseUrl}?q=${requestObject}&appid=${apiKey}&units=metric`;
  if (typeof(requestObject) == "object") {
    apiUrl = `${baseUrl}?lat=${requestObject.latitude}&lon=${requestObject.longitude}&appid=${apiKey}&units=metric`;
  }
  axios.get(apiUrl).then(updateWeatherData);
}

let citySearch = document.querySelector("#cityForm");
citySearch.addEventListener("submit", onFormSubmit);

function processCurrentLocation(geoLocation)
{
  requestDataFromAPI(geoLocation.coords);
}

function onCurrentLocationClick() {
  navigator.geolocation.getCurrentPosition(processCurrentLocation);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", onCurrentLocationClick);

function updateWeatherData(response) {
  let cityTitle = document.querySelector("#cityTitle");
  cityTitle.innerHTML = `${response.data.name}`;
  celsiusTemp = response.data.main.temp;

  let currentTemperature = Math.round(celsiusTemp);
  let changeTemp = document.querySelector("#temp");
  changeTemp.innerHTML = `${currentTemperature}°`;
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
}


function convertF(event) {
  let fahrenheit = celsiusTemp * 1.8 + 32;
  let fTemp = Math.round(fahrenheit);
  let unit = document.querySelector("#temp");
  unit.innerHTML = `${fTemp}°`;
}

let celsiusTemp = null;

let fButton = document.querySelector("#fUnit");
fButton.addEventListener("click", convertF);

function convertC(event) {
  let cTemp = Math.round(celsiusTemp);
  let unit = document.querySelector("#temp");
  unit.innerHTML = `${cTemp}°`;
}

let cButton = document.querySelector("#cUnit");
cButton.addEventListener("click", convertC);

requestDataFromAPI("Edinburgh");