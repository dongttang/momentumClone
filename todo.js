const todoContainer = document.querySelector(".js-todoContainer"),
  todoForm = todoContainer.querySelector(".js-todoForm"),
  todoInput = todoContainer.querySelector(".js-todoInput"),
  todoList = todoContainer.querySelector(".js-todoList");
let TODOS = [];

function addTodoElement(event) {
  event.preventDefault();
  const todoContent = todoInput.value;
  todoInput.value = "";
  const liObject = liObjectBuilder(todoContent);
  TODOS.push(liObject);
  localStorage.setItem("todoList", JSON.stringify(TODOS));
  syncData(todoList, TODOS);
}

function liObjectBuilder(todoContent) {
  return {
    id: TODOS.length + 1,
    todoContent: todoContent,
    isCompleted: false
  };
}

function paintLiTagOnHTML(todoList, liObject) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const content = document.createElement("span");

  todoList.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(content);

  li.id = liObject.id;
  li.classList.add("css-todoListList");

  delBtn.innerText = "❌";
  delBtn.classList.add("css-todoList_delBTN");
  delBtn.addEventListener("click", delContent);

  content.innerText = liObject.todoContent;
  content.classList.add("css-todoList_content");
  content.addEventListener("click", toggleComplete);
}

function delContent() {
  const targetNodeId = event.parentNode;
  console.log(targetNodeId);
  // const list = event.target.parentNode;

  todoList.removeChild();
  syncData(todoList, "todoList");
}

function toggleComplete() {
  console.log(event.target.parentNode);
  // TODO : 태그 속성에 isCompleted 토글
  // TODO : is completed 값 바꾸고 css에 시각이미지 표현하기
  syncData(todoList, "todoList");
}

function syncData(localStorageName) {
  localStorageString = localStorage.getItem("todoList");
  if (localStorageString !== null) {
    TODOS = JSON.parse(localStorageString);
  }

  todoList.innerHTML = "";

  TODOS.forEach(element => {
    paintLiTagOnHTML(todoList, element);
  });
}

function init() {
  syncData("todoList");
  todoForm.addEventListener("submit", addTodoElement);
  // todoList.addEventListener("onchange", syncData);
}

init();
