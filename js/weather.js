const weather = document.querySelector(".js-weather"),
  weatherContainer = document.querySelector(".weather-container");

const API_KEY = "e1cab32d57d6df553dd0892142a80a25";
const COORS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const country = json.sys.country;
      weather.innerText = `${temperature}° @ ${place} (${country})`;

      const weatherImage = new Image();
      weatherImage.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;
      weatherContainer.insertBefore(weatherImage, weather);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
