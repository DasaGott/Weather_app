function displayWeather(response) {
  document.querySelector("h1").innerHTML =
    response.data.name;

  //Current temperature
  let currentTemperature = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#temperature"
  ).innerHTML = currentTemperature;

  celsiusTemp = response.data.main.temp;
  // Description of weather
  document.querySelector(
    "#weather-description"
  ).innerHTML =
    response.data.weather[0].description;

  // Humidity, Wind

  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity;

  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed);

  document.querySelector("#temp-max").innerHTML =
    Math.round(response.data.main.temp_max);

  document.querySelector("#temp-min").innerHTML =
    Math.round(response.data.main.temp_min);

  document.querySelector(
    "#feels-like"
  ).innerHTML = Math.round(
    response.data.main.feels_like
  );

  // Icon picture, alt text

  let icon = response.data.weather[0].icon;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute(
      "alt",
      response.data.weather[0].description
    );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

// When submitting form >> Change the h1
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(
    "#enter-a-city-form"
  ).value;
  // When submiting, update current temperature for the specific city
  search(city);
}

// Forecast
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecastDay = response.data.daily;

  let forecastElement =
    document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastDay.forEach(function (forecast, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-day">
                  ${formatForecastDay(
                    forecast.dt
                  )}
                </div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecast.weather[0].icon
                  }@2x.png"
                  alt="weather pice"
                  width="50px"
                />
                <div
                  class="weather-forecast-temperatures"
                >
                  <span
                    class="weather-forecast-temperature-max"
                    >${Math.round(
                      forecast.temp.max
                    )}°</span
                  >
                  <span
                    class="weather-forecast-temperature-min"
                  >
                    ${Math.round(
                      forecast.temp.min
                    )}°</span
                  >
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Display current date and time
let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

let day = days[currentTime.getDay()];
let month = months[currentTime.getMonth()];
let year = currentTime.getFullYear();
let date = currentTime.getDate();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

if (hours < 7 || hours > 19) {
  changeTheme();
}

let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector(
  "#currentDate"
);

currentDate.innerHTML = `${date}. ${month} ${year}`;

let currentDay = document.querySelector(
  "#currentDay"
);
currentDay.innerHTML = `${day} ${hours}:${minutes}`;

// End of previous task

// GEO API
let currentCity = document.querySelector(
  "#current-city"
);
currentCity.addEventListener(
  "click",
  getCurrentLocation
);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(
    showPosition
  );
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

// End of GEO API
function changeTheme() {
  let theme = document.querySelector("body");
  let classes = theme.classList;
  classes.toggle("dark");
}

let darkButton = document.querySelector("button");
darkButton.addEventListener("click", changeTheme);

let searchCity = document.querySelector(
  "#searching-form"
);

searchCity.addEventListener(
  "submit",
  handleSubmit
);

search("Bratislava");
