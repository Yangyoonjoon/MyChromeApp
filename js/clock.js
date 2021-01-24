const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

const search = document.querySelector(".search");

const CLOCKMODE_CN = "clock-mode",
  OPACITY0_CN = "opacity-0",
  CLOCKMODE_TITLE_CN = "clock-mode-title";

function getTime() {
  // Date() 객체를 실행하는 순간의 시간정보를 date변수에 넣음
  const date = new Date();
  // date변수에서 시, 분, 초를 각각의 변수에 넣음
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  // ternary operator (삼항 연산자), if문을 한줄로 사용
  clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }<span class="second"> ${seconds < 10 ? `0${seconds}` : seconds}</span>`;
}

function handleClockMode() {
  menu.classList.toggle(OPACITY0_CN);
  clockContainer.classList.toggle(CLOCKMODE_CN);
  clockTitle.classList.toggle(CLOCKMODE_TITLE_CN);
  search.classList.toggle(OPACITY0_CN);
  openBtn.classList.toggle(OPACITY0_CN);
  closeBtn.classList.toggle(OPACITY0_CN);
  weatherContainer.classList.toggle(NONE);
}

function init() {
  getTime();
  // 간격 설정, setInterval(함수, 시간), 단위 : 밀리cm (1000은 1초)
  setInterval(getTime, 1000);
  clockTitle.addEventListener("click", handleClockMode);
  setTimeout(() => {
    handleClockMode();
  }, 1000);
}

init();
