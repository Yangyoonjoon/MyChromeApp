/* 
Javascript는 웹사이트로 Request를 보내고 응답을 통해서 데이터를 얻을 수 있다
가져온 데이터를 refresh(새로고침) 없이도 나의 웹사이트에 적용시킬 수 있다
ex) 이메일을 확인할 때 웹사이트를 새로고침하지 않아도 실시간으로 메일이 오는 것을 확인할 수 있는 이유이다
왜냐하면 Javascript가 보이지 않는 곳에서 계속 데이터를 가져오고 있지 때문이다
*/

const weather = document.querySelector(".js-weather"),
  weatherContainer = document.querySelector(".weather-container");

const API_KEY = "e1cab32d57d6df553dd0892142a80a25";
// coords는 좌표, 위치라는 뜻
const COORS = "coords";

function getWeather(lat, lon) {
  // fetch() 함수는 url에 request를 보내는 함수
  // then() 함수는 데이터가 완전히 들어온 다음 함수를 호출함
  // response에는 network 정보만 보이기 때문에 json() 함수를 사용
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
  // 여기서 인자 position은 위치정보
  // latitude는 위도 longitude는 경도라는 뜻
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // 객체와 변수의 이름과 key의 이름이 같을때 2가지 방법 가능
  //   const coordsObj = {
  //     latitude: latitude,
  //     longitude: longitude,
  //   };
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
  // 위치정보를 가져오는 방법!
  // navigator api가 가지고 있는 geolocation 객체가 가지고 있는 getCurrentPosition() 함수
  // 사용자가 수락했을때 handleGeoSucces() 함수가 실행됨
  // 사용자가 거절했을때 handleGeoErorr() 함수가 실행됨
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
