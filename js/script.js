const apiKey = "VUL_HIER_JE_API_KEY_IN"; // OpenWeatherMap API key
const refreshTime = 60000; // 60 seconden

const cities = {
    denhaag: { name: "Den Haag", lat: 52.0705, lon: 4.3007 },
    pijnacker: { name: "Pijnacker", lat: 52.0195, lon: 4.4297 }
};

async function getWeather(cityId, lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=nl&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        document.querySelector(`#${cityId} .temp`).innerText =
            Math.round(data.main.temp) + " °C";

        document.querySelector(`#${cityId} .desc`).innerText =
            data.weather[0].description;

        document.querySelector(`#${cityId} .extra`).innerText =
            `Wind: ${data.wind.speed} m/s | Luchtvochtigheid: ${data.main.humidity}%`;

    } catch (error) {
        console.error("Fout bij ophalen weerdata:", error);
    }
}

function updateWeather() {
    for (const city in cities) {
        getWeather(city, cities[city].lat, cities[city].lon);
    }
}

// Eerste keer laden
updateWeather();

// Live volgen (automatisch verversen)
setInterval(updateWeather, refreshTime);
