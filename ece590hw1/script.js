const API_KEY = "7291ef235e49472c93f101526263008";

let lastForecast = null;
let useCelsius = false;

const zipInput = document.getElementById("zip");
const statusEl = document.getElementById("status");
const weatherEl = document.getElementById("weather");
const placeEl = document.getElementById("place");
const tempEl = document.getElementById("temp");
const forecastBody = document.getElementById("forecast-body");
const toggleBtn = document.getElementById("toggle-units");

document.getElementById("get-forecast").addEventListener("click", getForecast);
toggleBtn.addEventListener("click", toggleUnits);
zipInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getForecast();
  }
});

function showStatus(message) {
  statusEl.textContent = message;
  statusEl.hidden = !message;
}

function formatTemp(value) {
  const rounded = Math.round(value * 10) / 10;
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return text + (useCelsius ? "°C" : "°F");
}

function formatDay(dateStr) {
  const parts = dateStr.split("-");
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function render(data) {
  const current = useCelsius ? data.current.temp_c : data.current.temp_f;
  placeEl.textContent = "Weather for " + data.location.name + ", " + data.location.region;
  tempEl.textContent = formatTemp(current);
  toggleBtn.textContent = useCelsius ? "Switch to Fahrenheit" : "Switch to Celsius";

  forecastBody.innerHTML = "";
  data.forecast.forecastday.forEach((day) => {
    const high = useCelsius ? day.day.maxtemp_c : day.day.maxtemp_f;
    const low = useCelsius ? day.day.mintemp_c : day.day.mintemp_f;
    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" +
      formatDay(day.date) +
      "</td><td>" +
      formatTemp(high) +
      "</td><td>" +
      formatTemp(low) +
      "</td><td>" +
      day.day.condition.text +
      "</td>";
    forecastBody.appendChild(row);
  });

  weatherEl.hidden = false;
}

function toggleUnits() {
  if (lastForecast === null) {
    return;
  }
  useCelsius = !useCelsius;
  render(lastForecast);
}

async function getForecast() {
  const zip = zipInput.value.trim();
  if (zip === "") {
    showStatus("Enter a zip code.");
    weatherEl.hidden = true;
    return;
  }

  if (API_KEY === "") {
    showStatus("Add your WeatherAPI key to script.js.");
    weatherEl.hidden = true;
    return;
  }

  showStatus("Loading…");
  weatherEl.hidden = true;

  const url =
    "https://api.weatherapi.com/v1/forecast.json?key=" +
    encodeURIComponent(API_KEY) +
    "&q=" +
    encodeURIComponent(zip) +
    "&days=3";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data.error) {
      const message =
        data.error && data.error.message
          ? data.error.message
          : "Could not load the forecast.";
      showStatus(message);
      lastForecast = null;
      return;
    }

    lastForecast = data;
    useCelsius = false;
    showStatus("");
    render(data);
  } catch (err) {
    showStatus("Network error. Try again.");
    lastForecast = null;
  }
}
