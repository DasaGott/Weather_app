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

function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement =
    document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = [
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-day">
                  ${day}
                </div>
                <img
                  src="https://openweathermap.org/img/wn/01d@2x.png"
                  alt="weather pice"
                  width="50px"
                />
                <div
                  class="weather-forecast-temperatures"
                >
                  <span
                    class="weather-forecast-temperature-max"
                    >18°</span
                  >
                  <span
                    class="weather-forecast-temperature-min"
                  >
                    12°</span
                  >
                </div>
              </div>`;
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

// Unit conversion
function displayFarenheitTemp(event) {
  event.preventDefault();
  fahrenheitTemperature.classList.add("active");
  celsiusTemperature.classList.remove("active");

  let currentTemperature = document.querySelector(
    "#temperature"
  );
  let fahrenheitTemp = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );
  currentTemperature.innerHTML = fahrenheitTemp;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusTemperature.classList.add("active");
  fahrenheitTemperature.classList.remove(
    "active"
  );

  let currentTemperature = document.querySelector(
    "#temperature"
  );
  currentTemperature.innerHTML =
    Math.round(celsiusTemp);
}

let searchCity = document.querySelector(
  "#searching-form"
);

searchCity.addEventListener(
  "submit",
  handleSubmit
);

let celsiusTemp = null;

let fahrenheitTemperature =
  document.querySelector("#fahrenheit-temp");
fahrenheitTemperature.addEventListener(
  "click",
  displayFarenheitTemp
);

let celsiusTemperature = document.querySelector(
  "#celsius-temp"
);
celsiusTemperature.addEventListener(
  "click",
  displayCelsiusTemp
);

search("Bratislava");
