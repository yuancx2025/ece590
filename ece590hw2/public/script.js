const API_KEY = "7291ef235e49472c93f101526263008";
const US_ZIP = /^\d{5}$/;

let lastForecast = null;
let useCelsius = false;

const zipInput = document.getElementById("zip");
const statusEl = document.getElementById("status");
const weatherEl = document.getElementById("weather");
const placeEl = document.getElementById("place");
const tempEl = document.getElementById("temp");
const forecastBody = document.getElementById("forecast-body");
const toggleBtn = document.getElementById("toggle-units");
const favoritesList = document.getElementById("favorites-list");
const favoritesEmpty = document.getElementById("favorites-empty");

document.getElementById("get-forecast").addEventListener("click", getForecast);
document.getElementById("add-favorite").addEventListener("click", addFavorite);
toggleBtn.addEventListener("click", toggleUnits);
zipInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getForecast();
  }
});

loadFavorites();

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

function readZip() {
  return zipInput.value.trim();
}

async function getForecast() {
  const zip = readZip();
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

function renderFavorites(favorites) {
  favoritesList.innerHTML = "";
  favoritesEmpty.hidden = favorites.length > 0;

  favorites.forEach((favorite) => {
    const item = document.createElement("li");
    const zipLabel = document.createElement("span");
    zipLabel.textContent = favorite.zip + " ";

    const goBtn = document.createElement("button");
    goBtn.type = "button";
    goBtn.textContent = "Go";
    goBtn.addEventListener("click", () => goToFavorite(favorite.zip));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteFavorite(favorite.id));

    item.appendChild(zipLabel);
    item.appendChild(goBtn);
    item.appendChild(deleteBtn);
    favoritesList.appendChild(item);
  });
}

async function loadFavorites() {
  try {
    const res = await fetch("/favorites");
    if (!res.ok) {
      showStatus("Could not load favorites.");
      return;
    }
    const favorites = await res.json();
    renderFavorites(favorites);
  } catch (err) {
    showStatus("Network error. Could not load favorites.");
  }
}

async function addFavorite() {
  const zip = readZip();
  if (!US_ZIP.test(zip)) {
    showStatus("Enter a valid 5-digit US zip code.");
    return;
  }

  try {
    const res = await fetch("/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zip }),
    });
    const data = await res.json();

    if (!res.ok) {
      showStatus(data.error || "Could not add favorite.");
      return;
    }

    showStatus("");
    await loadFavorites();
  } catch (err) {
    showStatus("Network error. Could not add favorite.");
  }
}

function goToFavorite(zip) {
  zipInput.value = zip;
  getForecast();
}

async function deleteFavorite(id) {
  try {
    const res = await fetch("/favorites/" + encodeURIComponent(id), {
      method: "DELETE",
    });
    const data = await res.json();

    if (!res.ok) {
      showStatus(data.error || "Could not delete favorite.");
      return;
    }

    showStatus("");
    await loadFavorites();
  } catch (err) {
    showStatus("Network error. Could not delete favorite.");
  }
}
