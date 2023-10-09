/* let now = new Date();

let displayDate = document.querySelector("#date-time");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
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
  "December"
];
let month = months[now.getMonth()];

displayDate.innerHTML = `${day}, ${month}, ${date}, ${year}`;

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    let cityName = searchInput.value;

if (cityName) {
    let apiKey = `f0308t4943329c9be1off0f74f2fa59a`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
} else {
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
    let temperature = response.data.city.temperature.feels_like;
    let cityName = response.data.city;
    let displayCity = document.querySelector("#city-name");
    displayCity.innerHTML = cityName;
    let displayTemperature = document.querySelector("#temperature-display");
    displayTemperature.innerHTML = `${temperature} ºC`;
  }

function showLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "f0308t4943329c9be1off0f74f2fa59a";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showLocation);
  }
  let button = document.querySelector("button");
  button.addEventListener("click", getCurrentPosition);
 */
   
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;

  }
  
function displayTemperature(response) {
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let cityName = document.querySelector("#city-name");
    let temperatureElement = document.querySelector("#temperature-display");
    let dateElement = document.querySelector("#date-time");
    let iconElement = document.querySelector("#weather-icon");
    
    celsiusTemperature = response.data.temperature.current;
    
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    cityName.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute(
    "src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    iconElement.setAttribute("alt", response.data.condition.description);
  }


function search (city) {
    let apiKey = "f0308t4943329c9be1off0f74f2fa59a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature);
}
    

    function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-text-input");
    search(cityInputElement.value);
  }

  let searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", handleSubmit);

function showLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "f0308t4943329c9be1off0f74f2fa59a";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
  }
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showLocation);
  }
  let currentButton = document.querySelector("#current-location");
  currentButton.addEventListener("click", getCurrentPosition);

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature-display");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 +32; 
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature-display");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
    let celsiusTemperature =  null;

    let form = document.querySelector("#search-form");
    form.addEventListener("submit", handleSubmit);
    
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", displayCelsiusTemperature);

    /* search("New York"); */