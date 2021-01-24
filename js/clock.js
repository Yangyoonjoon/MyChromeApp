const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

const search = document.querySelector(".search");

const CLOCKMODE_CN = "clock-mode",
  OPACITY0_CN = "opacity-0",
  CLOCKMODE_TITLE_CN = "clock-mode-title";

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

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

  setInterval(getTime, 1000);
  clockTitle.addEventListener("click", handleClockMode);
  setTimeout(() => {
    handleClockMode();
  }, 1000);
}

init();
