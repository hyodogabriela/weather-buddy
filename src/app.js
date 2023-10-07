let now = new Date();

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
    let temperature = Math.round(response.data.daily);
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