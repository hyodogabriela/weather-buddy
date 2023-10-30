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
function formatDay(timestamp) {
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    return days[day];


}

  function displayForecast (response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
        forecastHTML =
        forecastHTML + `
        <div class="col-2">
        <div class="weather-forecast-date">
            ${formatDay(forecastDay.time)}
        </div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
        alt=""
        width="42">
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temperature.maximum)}º </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temperature.minimum)}º </span>
          </div>
    </div>
`;
}
    }); 
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
  }

function getForrecast(coordinates) {
    let apiKey = "f0308t4943329c9be1off0f74f2fa59a";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let cityName = document.querySelector("#city-name");
    let temperatureElement = document.querySelector("#temperature-display");
    let dateElement = document.querySelector("#date-time");
    let iconElement = document.querySelector("#weather-icon");

    let celsiusTemperature = response.data.temperature.current;
    
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

   getForrecast(response.data.coordinates);

  }

function search (city) {
    let apiKey = "f0308t4943329c9be1off0f74f2fa59a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then((response) => {
        displayTemperature(response);
    });
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input");
  let city = cityInputElement.value;

  if (city.trim() === "") {
    alert("Please enter a city.");
  } else if (!/^[a-zA-Z\u00C0-\u017F\s'´]+$/u.test(city)) {
    alert("Invalid city name. Please enter a valid city.");
  } else {
    search(city);
  }
}
  const searchInput = document.getElementById('search-text-input');
searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    handleSubmit(event);
  }
});

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

 search("São Paulo");

