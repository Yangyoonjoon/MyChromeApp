const menu = document.querySelector(".menu"),
  closeBtn = document.querySelector(".close-btn"),
  openBtn = document.querySelector(".open-btn");

const CLOSEMENU = "close";

function handleMenuBtn() {
  menu.classList.toggle(CLOSEMENU);
  setTimeout(() => {
    closeBtn.classList.toggle(NONE);
    openBtn.classList.toggle(NONE);
  }, 100);
}

function init() {
  closeBtn.addEventListener("click", handleMenuBtn);
  openBtn.addEventListener("click", handleMenuBtn);
  setTimeout(() => {
    handleMenuBtn();
  }, 2000);
}

init();
