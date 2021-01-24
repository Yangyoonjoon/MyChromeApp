// Math 모듈
// Math.random() * 5  0이상 5미만의 수 중 랜덤
// Math.floor(3.5) -> 3  소수점 뒤 버림
// Math.ceil(3.5) -> 4  소수점 뒤 올림

const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
  //   body.prepend(image);
}

// genRandom 함수는 랜덤 생성하는 함수
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
