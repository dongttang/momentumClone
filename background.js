const htmlBody = document.querySelector("body");
const numberOFImages = 4;

function generateBackgroundImage() {

    const randomImageNumber = (Math.floor(Math.random() * 10) % numberOFImages) + 1;
    htmlBody.background = `./Resources/${randomImageNumber}.jpg`;
}

function init() {
    generateBackgroundImage();
}

init();
