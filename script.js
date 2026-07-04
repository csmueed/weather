const cityInput = document.querySelector("#city-input");
const getWeatherButton = document.querySelector("#get-weather-btn");
const weatherInfoCard = document.querySelector("#weather-info");
const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const errorMessage = document.querySelector("#error-message");

const API_KEY = "5814122feccd452b6447f575bf08c23f";

getWeatherButton.addEventListener("click",  (e) => {
   getWeather();
});

cityInput.addEventListener("keydown", (x)=>{
  if (x.key === "Enter") {
    getWeather();
  }
})

async function getWeather () {
  let myCity = cityInput.value.trim();
  if (!myCity) {
    alert("Please Enter a City Name e.g London");
    return;
  }
  try {
    const weatherData = await fetchWeatherData(myCity);
    displayWeatherData(weatherData);
  } catch (error) {
    showErrorMessage();
    console.log(error);
  }
  cityInput.value = "";
}

async function fetchWeatherData(city) {
  const myUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  const responce = await fetch(myUrl);
  // console.log(responce);
  if (responce.ok === false) {
    console.error("city not found");
  }
  const data = await responce.json();
  // console.log(data)
  return data;
}

function displayWeatherData(weatherData) {
  console.log(weatherData);
  weatherInfoCard.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  const {main, name, weather} = weatherData;
  cityName.textContent = `${name}`;
  temperature.textContent = `${main.temp} Degree`;
  description.textContent = `${weather[0].description}`;
}

function showErrorMessage() {
  weatherInfoCard.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}
