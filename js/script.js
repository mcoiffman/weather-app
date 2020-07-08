window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}http://api.weatherapi.com/v1/current.json?key=7b0a489f0cfa4be3bcb161628200707&q=${lat},${long}`;

      fetch(api)
        .then((apiResponse) => {
          return apiResponse.json();
        })
        .then((data) => {
          const { temp_f } = data.current;
          const { text, icon } = data.current.condition;
          const { tz_id } = data.location;

          temperatureDegree.textContent = temp_f;
          temperatureDescription.textContent = text;
          locationTimezone.textContent = tz_id;
          setIconImageFromApi(icon);

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
            } else {
              temperatureSpan.textContent = "C";
            }
          });
        });
    });
  }

  function setIconImageFromApi(icon) {
    const iconSplit = icon.split("64x64/");
    document.getElementById(
      "icon-image"
    ).src = `icons/weather/64x64/${iconSplit[1]}`;
  }
});
