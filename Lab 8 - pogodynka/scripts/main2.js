// import { getData, updateWeather, setFunc } from './weather.js';
// import { createWeatherContainer, updateWeatherContainer, addDeleteButton, saveToLocalStorage, removeCity, showErrorAlert } from './weather-utils.js';
// import { convertKelvinToCelsius, convertMetersPerSecondToMph, getWindDirectionDescription, getWeatherImage } from './weather-utils.js';
// let searchValue = document.querySelector("#searchbox");
// searchValue.addEventListener("keypress", setFunc);

// let storedCities = JSON.parse(localStorage.getItem("cities")) || [];
// const maxStoredCities = 10;

// let displayedCities = [];

// window.addEventListener("load", () => {
//   const weatherInfoContainer = document.querySelector("#weather_info_container");

//   storedCities.forEach(({ city, data }) => {
//     const weatherContainer = createWeatherContainer();
//     updateWeatherContainer(weatherContainer, data);
//     addDeleteButton(weatherContainer, city);
//     displayedCities.push(city);
//   });
// });

// function setFunc(e) {
//   if (e.keyCode == 13) {
//     getData(searchValue.value);
//   }
// }

// function updateWeather() {
//   displayedCities.forEach((city) => {
//     getData(city);
//   });
// }

// updateWeather();

// setInterval(updateWeather, 300000);