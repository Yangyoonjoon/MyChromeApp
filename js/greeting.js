const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

// LS는 Local storage
// CN은 Class Name
// 로컬 스토리지에 저장할 Key 값들
const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  // 인자로 Key와 Value를 전달
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  // event를 막는 행위
  // 여기서는 enter를 눌러도 submit되지 않음
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  // 로컬 스토리지에서 USER_LS의 Value의 값을 가져옴
  const currentUser = localStorage.getItem(USER_LS);
  // 로컬 스토리지에 유저가 없으면
  if (currentUser === null) {
    askForName();
  }
  // 로컬 스토리지에 유저가 있으면
  else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
