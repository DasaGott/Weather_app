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

let searchCity = document.querySelector(
  "#searching-form"
);
let searchButton = document.querySelector(
  ".searchButton"
);
searchCity.addEventListener(
  "submit",
  handleSubmit
);
searchButton.addEventListener(
  "click",
  handleSubmit
);

search("Bratislava");
// End of previous task

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
