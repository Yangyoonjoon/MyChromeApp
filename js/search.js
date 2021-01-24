const googleForm = document.querySelector(".google"),
  googleInput = googleForm.querySelector("input"),
  naverForm = document.querySelector(".naver"),
  naverInput = naverForm.querySelector("input"),
  engineChange = document.querySelector("i");

const ROTATE = "rotate";

function handleSearch(searchInput) {
  const keyword = searchInput.value;
  if (searchInput === googleInput) {
    location.href = `https://www.google.com/search?q=${keyword}`;
    googleInput.value = "";
  } else {
    location.href = `https://search.naver.com/search.naver?query=${keyword}`;
    naverInput.value = "";
  }
}

function handleSearchEngine() {
  googleForm.classList.toggle(NONE);
  naverForm.classList.toggle(NONE);
  engineChange.classList.toggle(ROTATE);
}

function init() {
  googleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch(googleInput);
  });
  naverForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch(naverInput);
  });
  engineChange.onclick = handleSearchEngine;
}

init();
