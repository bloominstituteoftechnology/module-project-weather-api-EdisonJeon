async function moduleProject4() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"],
  ];

  // 👉 Tasks 1 - 5 go here
  /* ACCESS DIFFERENT CITIES */
  // http://localhost:3003/api/weather?city=New+York

  const loadingP = document.querySelector(".info");
  const selector = document.querySelector("#citySelect");
  const mainWidget = document.querySelector("#weatherWidget");

  mainWidget.style.display = "none";
  selector.addEventListener("change", async (evt) => {
    try {
      evt.target.setAttribute("disabled", "");
      mainWidget.style.display = "none";
      loadingP.textContent = "Fetching weather data...";
      let city = evt.target.value;
      let url = `http://localhost:3003/api/weather?city=${city}`;
      const res = await axios.get(url);
      mainWidget.style.display = "block";
      loadingP.textContent = "";
      evt.target.removeAttribute("disabled");
      let { data } = res;

      document.querySelector(
        "#apparentTemp div:nth-child(2)"
      ).textContent = `${data.current.apparent_temperature}`;
      document.querySelector("#todayDescription").textContent =
        descriptions.find(
          (elem) => elem[0] === data.current.weather_description
        )[1];
      document.querySelector(
        "#todayStats div:nth-child(1)"
      ).textContent = `${data.current.temperature_min}°/ ${data.current.temperature_max}°`;
      document.querySelector(
        "#todayStats div:nth-child(2)"
      ).textContent = `Precipitation: ${
        data.current.precipitation_probability * 100
      }%`;
      document.querySelector(
        "#todayStats div:nth-child(3)"
      ).textContent = `Humidity: ${data.current.humidity}%`;
      document.querySelector(
        "#todayStats div:nth-child(4)"
      ).textContent = `Wind: ${data.current.wind_speed} m/s`;

      data.forecast.daily.forEach((day, idx) => {
        let card = document.querySelectorAll(".next-day")[idx];

        let weekday = card.children[0];
        let apparent = card.children[1];
        let minMax = card.children[2];
        let precip = card.children[3];

        weekday.textContent = day.date;
        apparent.textContent = descriptions.find(
          (elem) => elem[0] === day.weather_description
        )[1];
        minMax.textContent = `${day.temperature_min}°/ ${day.temperature_max}°`;
        precip.textContent = `Precipitation: ${
          day.precipitation_probability * 100
        }%`;
      });

      document.querySelector(
        "#location div:nth-child(1)"
      ).textContent = `${data.location.city}`;
      document.querySelector(
        "#location div:nth-child(2)"
      ).textContent = `${data.location.country}`;
    } catch (err) {
      console.log("Promise rejected with an err.message --> ", err.message);
    }
  });

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { moduleProject4 };
else moduleProject4();

// document.querySelector(
//   "#forecast div:nth-child(1) div:nth-child(2)"
// ).textContent = descriptions.find(
//   (elem) => elem[0] === data.forecast.daily[0].weather_description
// )[1];
// document.querySelector(
//   "#forecast div:nth-child(1) div:nth-child(3)"
// ).textContent = `${data.forecast.daily[0].temperature_min}°/ ${data.forecast.daily[0].temperature_max}°`;
// document.querySelector(
//   "#forecast div:nth-child(1) div:nth-child(4)"
// ).textContent = `Precipitation ${
//   data.forecast.daily[0].precipitation_probability * 100
// }%`;
