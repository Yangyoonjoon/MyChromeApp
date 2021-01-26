const googleForm = document.querySelector(".google"),
  googleInput = googleForm.querySelector("input"),
  naverForm = document.querySelector(".naver"),
  naverInput = naverForm.querySelector("input"),
  engineChange = document.querySelector("i"),
  googleRecentSearches = document.querySelector(".google-recent-searches"),
  naverRecentSearches = document.querySelector(".naver-recent-searches");

const ROTATE_CN = "rotate",
  GOOGLE_SEARCHES_LS = "google_recent_searches",
  NAVER_SEARCHES_LS = "naver_recent_searches";

let isSpreadOut = false,
  isOpen = false,
  isGoogle = true;

function handleSearch(event = 0) {
  if (event) {
    event.preventDefault();
  }

  if (isGoogle) {
    const keyword = googleInput.value;
    if (keyword) {
      saveRecentSearch(keyword, GOOGLE_SEARCHES_LS);
      location.href = `https://www.google.com/search?q=${keyword}`;
      googleInput.value = "";
    }
  } else {
    const keyword = naverInput.value;
    if (keyword) {
      saveRecentSearch(keyword, NAVER_SEARCHES_LS);
      location.href = `https://search.naver.com/search.naver?query=${keyword}`;
      naverInput.value = "";
    }
  }
}

function changeSearchEngine() {
  googleForm.classList.toggle(NONE);
  naverForm.classList.toggle(NONE);
  engineChange.classList.toggle(ROTATE_CN);
  if (isGoogle) {
    isGoogle = false;
  } else {
    isGoogle = true;
  }
}

function saveRecentSearch(keyword, LS) {
  let searches = localStorage.getItem(LS);
  if (searches) {
    searches = JSON.parse(searches);
    idx = searches.indexOf(keyword);
    if (idx !== -1) {
      searches.splice(idx, 1);
    } else if (searches.length >= 8) {
      searches.shift();
    }
    searches.push(keyword);
  } else {
    searches = [keyword];
  }
  localStorage.setItem(LS, JSON.stringify(searches));
}

function loadRecentSearches() {
  if (!isSpreadOut) {
    let searches;
    if (isGoogle) {
      searches = localStorage.getItem(GOOGLE_SEARCHES_LS);
    } else {
      searches = localStorage.getItem(NAVER_SEARCHES_LS);
    }

    if (searches) {
      searches = JSON.parse(searches);
      paintRecentSearches(searches);
    }
  }
}

function getRecentSearches() {
  let recentSearches;
  if (isGoogle) {
    recentSearches = googleRecentSearches;
  } else {
    recentSearches = naverRecentSearches;
  }
  return recentSearches;
}

function closeRecentSearches() {
  let = recentSearches = getRecentSearches();

  if (isOpen) {
    for (let i = 0; i < recentSearches.children.length; i++) {
      const child = recentSearches.children[i];
      child.classList.add("spread-out");
    }
    isSpreadOut = true;

    setTimeout(() => {
      while (recentSearches.hasChildNodes()) {
        recentSearches.removeChild(recentSearches.firstChild);
        isSpreadOut = false;
        isOpen = false;
      }
    }, 1000);
  }
}

function paintRecentSearches(searches) {
  let = recentSearches = getRecentSearches();

  if (!recentSearches.hasChildNodes()) {
    for (let i = 0; i < searches.length; i++) {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.innerText = searches[searches.length - 1 - i];
      li.appendChild(span);
      isOpen = true;
      li.addEventListener("click", (event) => {
        const keyword = event.target.innerText;
        if (isGoogle) {
          googleInput.value = keyword;
        } else {
          naverInput.value = keyword;
        }
        handleSearch();
      });
      recentSearches.appendChild(li);
    }

    const div = document.createElement("div");
    div.innerText = "Delete All Browsing History";
    div.className = "del-searches";
    div.addEventListener("click", deleteRecentSearches);
    recentSearches.appendChild(div);
  }
}

function deleteRecentSearches() {
  if (isGoogle) {
    localStorage.removeItem(GOOGLE_SEARCHES_LS);
  } else {
    localStorage.removeItem(NAVER_SEARCHES_LS);
  }
}

function init() {
  googleForm.addEventListener("submit", handleSearch);
  naverForm.addEventListener("submit", handleSearch);
  engineChange.onclick = changeSearchEngine;

  googleInput.addEventListener("click", loadRecentSearches);
  naverInput.addEventListener("click", loadRecentSearches);
  googleInput.addEventListener("focusout", closeRecentSearches);
  naverInput.addEventListener("focusout", closeRecentSearches);
}

init();
