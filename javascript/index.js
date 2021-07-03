//In your project, display the current date and time using JavaScript: Tuesday 16:00
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

//Add a search engine, when searching for a city (i.e. Paris),
//display the city name on the page after the user submits the form.
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
  let currentTemperature = Math.round(response.data.main.temp);
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
}

//Display a fake temperature (i.e 17) in Celsius and add a link to convert
//it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to Celsius.

function convertF(event) {
  let fahrenheit = 11 * 1.8 + 32;
  let fTemp = Math.round(fahrenheit);
  let unit = document.querySelector("#temp");
  unit.innerHTML = `${fTemp}°`;
}

let fButton = document.querySelector("#fUnit");
fButton.addEventListener("click", convertF);

function convertC(event) {
  let unit = document.querySelector("#temp");
  unit.innerHTML = `11°`;
}

let cButton = document.querySelector("#cUnit");
cButton.addEventListener("click", convertC);
