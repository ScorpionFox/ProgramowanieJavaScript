// import { createWeatherContainer, updateWeatherContainer, addDeleteButton, saveToLocalStorage, removeCity, showErrorAlert } from './weather-utils.js';
// import { convertKelvinToCelsius, convertMetersPerSecondToMph, getWindDirectionDescription, getWeatherImage } from './weather-utils.js';

// export function setFunc(e) {
//   if (e.keyCode == 13) {
//     getData(searchValue.value);
//   }
// }

// export function getData(value) {
//   fetch(
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     value +
//     "&appid=672fbee1c5a0cd0266c5dbab9753f661"
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (weather) {
//       if (weather.cod === "404") {
//         showErrorAlert();
//       } else {
//         const weatherContainer = createWeatherContainer();
//         updateWeatherContainer(weatherContainer, weather);
//         saveToLocalStorage(value, weather, weatherContainer);
//       }
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }

// export function updateWeather() {
//   displayedCities.forEach((city) => {
//     getData(city);
//   });
// }