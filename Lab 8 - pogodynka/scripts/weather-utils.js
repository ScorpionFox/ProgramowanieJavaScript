// export function createWeatherContainer() {
//   const weatherContainer = document.createElement("div");
//   weatherContainer.classList.add("note");

//   weatherContainer.innerHTML = `
//     <h2 class="city"></h2>
//     <h1 class="temp"></h1>
//     <span class="min_max_temp"></span>
//     <h4 class="weather"></h4>
//     <img class="weather_image">
//     <p class="weather_desc"></p>
//     <span class="wind_dir_speed"></span>
//   `;

//   const weatherImage = weatherContainer.querySelector(".weather_image");
//   weatherImage.classList.add("image");

//   const weatherInfoContainer = document.querySelector("#weather_info_container");
//   weatherInfoContainer.appendChild(weatherContainer);

//   return weatherContainer;
// }

// export function updateWeatherContainer(container, weather) {
//   container.querySelector(".city").innerHTML = weather.name;
//   container.querySelector(".temp").innerHTML =
//     convertKelvinToCelsius(weather.main.temp).toFixed(2) + "°C";
//   container.querySelector(".min_max_temp").innerHTML =
//     "Min. " +
//     convertKelvinToCelsius(weather.main.temp_min).toFixed(2) +
//     "°C / Max. " +
//     convertKelvinToCelsius(weather.main.temp_max).toFixed(2) +
//     "°C";
//   container.querySelector(".weather").innerHTML = weather.weather[0].main;
//   container.querySelector(".weather_desc").innerHTML =
//     weather.weather[0].description;
//   const windDirectionDescription = getWindDirectionDescription(
//     weather.wind.deg
//   );
//   container.querySelector(".wind_dir_speed").innerHTML =
//     "Wind direction: " +
//     windDirectionDescription +
//     " / Wind speed: " +
//     convertMetersPerSecondToMph(weather.wind.speed).toFixed(2) +
//     " mph";
//   const weatherImage = getWeatherImage(weather.weather[0].main);
//   container.querySelector(".weather_image").src = `images/${weatherImage}`;
// }

// export function addDeleteButton(container, city) {
//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Delete";
//   deleteButton.addEventListener("click", () => {
//     removeCity(city, container);
//   });
//   container.appendChild(deleteButton);
// }

// export function saveToLocalStorage(city, data, container) {
//   if (displayedCities.length >= maxStoredCities) {
//     alert("Maximum 10 cities allowed. Remove a city before adding a new one.");
//     return;
//   }

//   storedCities.push({ city, data });
//   localStorage.setItem("cities", JSON.stringify(storedCities));
//   addDeleteButton(container, city);
//   displayedCities.push(city);
// }

// export function removeCity(city, container) {
//   const index = storedCities.findIndex((item) => item.city === city);
//   if (index > -1) {
//     storedCities.splice(index, 1);
//     localStorage.setItem("cities", JSON.stringify(storedCities));

//     const displayedIndex = displayedCities.indexOf(city);
//     if (displayedIndex > -1) {
//       displayedCities.splice(displayedIndex, 1);
//     }

//     container.remove();
//   }
// }

// export function showErrorAlert() {
//   alert("Incorrect city name. Please try again.");
// }

// export function convertKelvinToCelsius(kelvin) {
//   return kelvin - 273.15;
// }

// export function convertMetersPerSecondToMph(metersPerSecond) {
//   return metersPerSecond * 2.237;
// }

// export function getWindDirectionDescription(degrees) {
//   const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
//   const index = Math.round(degrees / 45) % 8;
//   return directions[index];
// }

// export function getWeatherImage(weatherCode) {
//   const imageMapping = {
//     Clear: "sunny.png",
//     Clouds: "cloudy.png",
//     Drizzle: "cloudrainsun.png",
//     Rain: "rainy.png",
//     Snow: "snowy.png",
//     Thunderstorm: "stormy.png",
//     Mist: "misty.png",
//     Fog: "misty.png",
//   };

//   return imageMapping[weatherCode] || "sunny.png";
// }