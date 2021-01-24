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
