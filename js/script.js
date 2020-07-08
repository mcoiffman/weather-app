// window.addEventListener("load", () => {
// let long;
// let lat;

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition((position) => {
//     long = position.coords.longitude;
//     lat = position.coords.latitude;

function newLocationFunc() {
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  const newLocationValue = document.getElementById("newLocation").value;
  const proxy = "https://cors-anywhere.herokuapp.com/";

  // by current local location undo lines 1 - 8, 55 and 63.
  // const api = `${proxy}http://api.weatherapi.com/v1/current.json?key=7b0a489f0cfa4be3bcb161628200707&q=${lat},${long}`;

  // by input location
  const api = `${proxy}http://api.weatherapi.com/v1/current.json?key=7b0a489f0cfa4be3bcb161628200707&q=${newLocationValue}`;

  fetch(api)
    .then((apiResponse) => {
      return apiResponse.json();
    })
    .then((data) => {
      console.log(data);
      const { temp_f } = data.current;
      const { text, icon } = data.current.condition;
      const { name, region } = data.location;

      temperatureDegree.textContent = temp_f;
      temperatureDescription.textContent = text;
      locationTimezone.textContent = `${name} / ${region}`;

      let celsius = (temp_f - 32) * (5 / 9);
      setIconImageFromApi(icon);

      const mySpanLetter = document.getElementById("temp-letter");
      mySpanLetter.style.display = "block";

      temperatureSection.addEventListener("click", () => {
        if (temperatureSpan.textContent === "'F") {
          temperatureSpan.textContent = "'C";
          temperatureDegree.textContent = Math.floor(celsius);
        } else if (temperatureSpan.textContent === "'C") {
          temperatureSpan.textContent = "'F";
          temperatureDegree.textContent = temp_f;
        }
      });
    });
}
// });

function setIconImageFromApi(icon) {
  const iconSplit = icon.split("64x64/");
  document.getElementById(
    "icon-image"
  ).src = `icons/weather/64x64/${iconSplit[1]}`;
}
// });
