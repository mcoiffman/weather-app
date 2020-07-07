window.addEventListener("load", () => {
  let long;
  let lat;

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
            console.log(data);
        });
    });
  }
});
