const weather = document.querySelector(".js-weather");
const API_KEY = "ba4d4ed6376296f5c98482028261b9a1"
const curLocation =
{
    latitude: null,
    longitude: null
};
let weatherInfo = null;

function loadWeather() {
    checkLocationInfo();
    if (curLocation.latitude === null || curLocation.longitude === null) {
        requestCurLocation();
    }
    if (curLocation.latitude !== null && curLocation.longitude !== null) {
        getWeatherInfomation(curLocation.latitude, curLocation.longitude);
    }
}

function getWeatherInfomation(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (loadedJson) {
            weatherInfo = loadedJson;
            weather.textContent = `${weatherInfo.main.temp.toFixed(1)}°C @ ${weatherInfo.name}`;
        })
}

function checkLocationInfo() {
    const sotredLocationString = localStorage.getItem("curLocation");
    if (sotredLocationString) {
        const parsedLocationInfo = JSON.parse(sotredLocationString);
        if (parsedLocationInfo.latitude && parsedLocationInfo.longitude) {
            curLocation.latitude = parsedLocationInfo.latitude;
            curLocation.longitude = parsedLocationInfo.longitude;
        }
    }
}

function requestCurLocation() {
    navigator.geolocation.getCurrentPosition(getGeoSuccess, geoError);
}

function getGeoSuccess(position) {
    curLocation.latitude = position.coords.latitude;
    curLocation.longitude = position.coords.longitude;
    localStorage.setItem("curLocation", JSON.stringify(curLocation))
}

function geoError(errorCallback) {
    console.log("Can't access geo location.")
}

function init() {
    loadWeather();
}

init();