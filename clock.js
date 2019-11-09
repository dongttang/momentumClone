const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function pad(n, width) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

function timeHandler() {
  const currentDate = new Date();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();
  clockTitle.innerHTML = `
  ${pad(hour, 2)}
  : ${pad(minute, 2)}
  : ${pad(second, 2)}`;
}

function init() {
  window.setInterval(timeHandler, 1);
}

init();
