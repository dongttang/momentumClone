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
  syncLocalStorageData("todoList");
  // localStorage.setItem("todoList", JSON.stringify(TODOS));
  syncHtmlTableData(todoList, TODOS);
}

function liObjectBuilder(todoContent) {
  const date = new Date();
  return {
    id: parseInt(
      `${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getMilliseconds()}`
    ),
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
}

function delContent(event) {
  const target = event.target.parentNode;
  const targetId = parseInt(target.id);
  for (let i = 0; i < TODOS.length; i++) {
    if (TODOS[i].id === targetId) {
      TODOS.splice(i, 1);
      break;
    }
  }
  syncLocalStorageData("todoList");
  syncHtmlTableData("todoList");
}

function syncLocalStorageData(localStorageName) {
  if (TODOS.length > 0) {
    const jsonString = JSON.stringify(TODOS);
    localStorage.setItem(localStorageName, jsonString);
  } else if (TODOS.length === 0) {
    localStorage.removeItem(localStorageName);
  }
}

function syncHtmlTableData(localStorageName) {
  localStorageString = localStorage.getItem(localStorageName);
  if (localStorageString !== null) {
    TODOS = JSON.parse(localStorageString);
  }

  todoList.innerHTML = "";

  TODOS.forEach(element => {
    paintLiTagOnHTML(todoList, element);
  });
}

function init() {
  syncHtmlTableData("todoList");
  todoForm.addEventListener("submit", addTodoElement);
  // todoList.addEventListener("onchange", syncHtmlTableData);
}

init();
