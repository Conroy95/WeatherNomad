const apiKey = "JOUW_API_KEY_HIER";

const cities = {
    denhaag: "Den Haag,NL",
    pijnacker: "Pijnacker,NL"
};

async function getWeather(city, elementId) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=nl&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        document.querySelector(`#${elementId} .temp`)
            .innerText = `${Math.round(data.main.temp)} °C`;

        document.querySelector(`#${elementId} .desc`)
            .innerText = data.weather[0].description;
    } catch (error) {
        document.querySelector(`#${elementId} .desc`)
            .innerText = "Fout bij laden";
    }
}

getWeather(cities.denhaag, "denhaag");
getWeather(cities.pijnacker, "pijnacker");

// Live update elke 5 minuten
setInterval(() => {
    getWeather(cities.denhaag, "denhaag");
    getWeather(cities.pijnacker, "pijnacker");
}, 300000);
