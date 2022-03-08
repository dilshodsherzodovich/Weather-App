"use strict";
const api = {
  key: "0704804fd9ce781b51d329a080fc16c0",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResult(searchBox.value);
  }
  // searchBox.value = "";
}

function getResult(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      // console.log(weather.json());
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(havo) {
  const city = document.querySelector(".city");
  const temperature = document.querySelector(".temp"),
    dayStatus = document.querySelector(".wheather"),
    maxMin = document.querySelector(".high-low");

  let now = new Date();
  let date = document.querySelector(".location, .date");
  date.innerHTML = dateBuilder(now);

  city.innerHTML = `${havo.name} , ${havo.sys.country}`;
  temperature.innerHTML = `${Math.round(havo.main.temp)}<span>°C</span>`;
  dayStatus.innerHTML = havo.weather[0].description;
  maxMin.innerHTML = `${Math.round(havo.main.temp_min)}°C / ${Math.round(
    havo.main.temp_max
  )}°C`;
  searchBox.value = "";
}

function dateBuilder(s) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[s.getDay() - 1];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
