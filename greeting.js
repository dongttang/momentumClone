const greetingForm = document.querySelector(".js-greetingForm");
const nameInput = greetingForm.querySelector(".js-nameInput");
const greetingMessage = greetingForm.querySelector(".js-greetingMessage");
let NAME = localStorage.getItem("name");

function controlGreetingView() {
  nameInput.classList.toggle("css-greetingViewToggle");
  greetingMessage.classList.toggle("css-greetingViewToggle");
}

function handleGreeting(NAME) {
  if (NAME !== null) {
    controlGreetingView();
    greetingMessage.textContent = `Good day, ${NAME}.`;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  NAME = nameInput.value;
  localStorage.setItem("name", NAME);
  handleGreeting(NAME);
}

function init() {
  greetingForm.addEventListener("submit", handleSubmit);
  handleGreeting(NAME);
}

init();
