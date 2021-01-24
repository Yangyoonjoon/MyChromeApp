// // JSON은 JavaScript Object Notation (자바스크립트 객체 표기법)
// // 데이터를 전달할 때, 자바스크립트가 데이터를 다룰 수 있도록 object로 바꿔줌

// // filter와 forEach는 array에 있는 모든 item을 위한 함수를 실행하는 것

// const toDoForm = document.querySelector(".js-toDoForm"),
//   toDoInput = toDoForm.querySelector("input"),
//   toDoList = document.querySelector(".js-toDoList");

// const TODOS_LS = "toDos";

// let toDos = [];

// function deleteToDo(event) {
//   // 어느 버튼이 클릭되었는지 확인하기 위한 과정
//   // console.dir(event.target);
//   // console.log(event.target.parentNode);
//   const btn = event.target;
//   const li = btn.parentNode;
//   toDoList.removeChild(li);

//   // array의 모든 item을 통해 함수를 실행하고
//   // true인 item들만 가지고 새로운 array를 만든다
//   const cleanToDos = toDos.filter(function (toDo) {
//     return toDo.id !== parseInt(li.id);
//   });
//   toDos = cleanToDos;
//   saveToDos();
// }

// function saveToDos() {
//   // 로컬 스토리지에는 자바스크립트의 data를 저장할 수 없다
//   // 오직 string만
//   // 따라서 JSON.stringify()를 사용하여 string 형태로 변환
//   localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
// }

// function paintToDo(text) {
//   // html에 태그를 만들기
//   const li = document.createElement("li");
//   const delBtn = document.createElement("button");
//   const span = document.createElement("span");
//   const newId = toDos.length + 1;
//   delBtn.innerText = "❌";
//   delBtn.className = "toDo__button";
//   delBtn.addEventListener("click", deleteToDo);
//   span.innerText = text;
//   // delBtn을 li안에 넣음 (자식 태그로 추가)
//   li.appendChild(delBtn);
//   li.appendChild(span);
//   // li 태그에 id 추가
//   li.id = newId;
//   toDoList.appendChild(li);
//   // toDoObj 객체로 만들어서 toDos 배열에 넣음
//   const toDoObj = {
//     text: text,
//     id: newId,
//   };
//   toDos.push(toDoObj);
//   saveToDos();
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   const currentValue = toDoInput.value;
//   paintToDo(currentValue);
//   toDoInput.value = "";
// }

// function loadToDos() {
//   const loadedToDos = localStorage.getItem(TODOS_LS);
//   if (loadedToDos !== null) {
//     // JSON.parse()를 사용하여 string을 object로 변환
//     const parsedToDos = JSON.parse(loadedToDos);
//     // array에 담겨있는 것들 각각에 한번씩 함수를 실행시킴
//     parsedToDos.forEach(function (toDo) {
//       // toDo는 parsedToDos에 담겨있는 각각의 값
//       // object의 key 값을 통해 text의 값을 가져옴
//       paintToDo(toDo.text);
//     });
//   }
// }

// function init() {
//   loadToDos();
//   toDoForm.addEventListener("submit", handleSubmit);
// }

// init();

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".pending-list"),
  finishedList = document.querySelector(".finished-list"),
  removeBtn = document.querySelector(".remove-btn");

const PENDING = "PENDING",
  FINISHED = "FINISHED";

const DEL_BTN = "del__button",
  PENDING_BTN = "pending__button",
  FINISHED_BTN = "finished__button";

const NONE = "none";

let pendingTasks = [],
  finishedTasks = [];

function changeToDoState(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const currentState = li.className;

  let state;
  let isDelBtn = false;

  if (btn.className === DEL_BTN) {
    isDelBtn = true;
  }

  if (currentState === PENDING) {
    pendingList.removeChild(li);
    const cleanTasks = pendingTasks.filter((toDo) => {
      return toDo.id !== parseInt(li.id);
    });
    pendingTasks = cleanTasks;
    state = FINISHED;
  } else if (currentState === FINISHED) {
    finishedList.removeChild(li);
    const cleanTasks = finishedTasks.filter((toDo) => {
      return toDo.id !== parseInt(li.id);
    });
    finishedTasks = cleanTasks;
    state = PENDING;
  }

  if (!isDelBtn) {
    paintToDos(li.childNodes[2].innerText, state);
  }
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function paintToDos(text, state) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const stateBtn = document.createElement("button");
  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.className = DEL_BTN;
  delBtn.classList.add(NONE);
  delBtn.addEventListener("click", changeToDoState);
  stateBtn.addEventListener("click", changeToDoState);

  if (state === PENDING) {
    const newId = pendingTasks.length + 1;
    li.id = newId;
    li.className = PENDING;
    stateBtn.innerText = "✅";
    stateBtn.className = FINISHED_BTN;
    li.appendChild(stateBtn);
    li.appendChild(delBtn);
    li.appendChild(span);
    pendingList.appendChild(li);
    const pendingObj = {
      text: text,
      id: newId,
    };
    pendingTasks.push(pendingObj);
  } else if (state === FINISHED) {
    const newId = finishedTasks.length + 1;
    li.id = newId;
    li.className = FINISHED;
    stateBtn.innerText = "⏪";
    stateBtn.className = PENDING_BTN;
    li.appendChild(stateBtn);
    li.appendChild(delBtn);
    li.appendChild(span);
    finishedList.appendChild(li);
    const finishedObj = {
      text: text,
      id: newId,
    };
    finishedTasks.push(finishedObj);
  }
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue) {
    const state = PENDING;
    paintToDos(currentValue, state);
    toDoInput.value = "";
  }
}

function loadToDos() {
  const pending = localStorage.getItem(PENDING, JSON.stringify(pendingTasks));
  const finished = localStorage.getItem(
    FINISHED,
    JSON.stringify(finishedTasks)
  );
  if (pending !== null) {
    const parsedTasks = JSON.parse(pending);
    parsedTasks.forEach((toDo) => {
      paintToDos(toDo.text, PENDING);
    });
  }
  if (finished !== null) {
    const parsedTasks = JSON.parse(finished);
    parsedTasks.forEach((toDo) => {
      paintToDos(toDo.text, FINISHED);
    });
  }
}

function handleRemove() {
  let li = pendingList.childNodes;
  for (let i = 0; i < li.length; i++) {
    li[i].childNodes[0].classList.toggle(NONE);
    li[i].childNodes[1].classList.toggle(NONE);
  }
  li = finishedList.childNodes;
  for (let i = 0; i < li.length; i++) {
    li[i].childNodes[0].classList.toggle(NONE);
    li[i].childNodes[1].classList.toggle(NONE);
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  removeBtn.addEventListener("click", handleRemove);
}

init();
