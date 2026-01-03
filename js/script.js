const locations = [
    {name:'Den+Haag', display:'Den Haag'},
    {name:'Pijnacker', display:'Pijnacker'},
    {name:'Delft', display:'Delft'},
    {name:'Rijswijk', display:'Rijswijk'},
    {name:'Schiphol', display:'Schiphol Airport'},
    {name:'Rotterdam', display:'Rotterdam Airport'}
];

const container = document.getElementById('weather-container');

async function fetchWeatherData(loc) {
    const endpoints = {
        cond: `https://wttr.in/${loc.name}?format=%C`,
        temp: `https://wttr.in/${loc.name}?format=%t`,
        feels: `https://wttr.in/${loc.name}?format=%f`,
        precip: `https://wttr.in/${loc.name}?format=%p`,
        wind: `https://wttr.in/${loc.name}?format=%w`,
        humidity: `https://wttr.in/${loc.name}?format=%h`,
        sun: `https://wttr.in/${loc.name}?format=%S+%s`
    };

    // Parallel fetches
    const [cond,temp,feels,precip,wind,humidity,sun] = await Promise.all(
        Object.values(endpoints).map(url => fetch(url).then(r => r.text()))
    );

    return {cond,temp,feels,precip,wind,humidity,sun};
}

function createCardHTML(loc, data){
    const bgColor = data.cond.toLowerCase().includes('rain') ? '#00a4e450' :
                    data.cond.toLowerCase().includes('cloud') ? '#fbb03420' :
                    data.cond.toLowerCase().includes('sun') || data.cond.toLowerCase().includes('clear') ? '#fbb03440' : '#f0f4f820';

    return `
    <div class="col-12 col-md-6 col-lg-4">
        <div class="weather-card" style="background:${bgColor}">
            <h2>${loc.display}</h2>
            <div class="condition">${data.cond}</div>
            <div class="weather-graphical">
                <div class="icon-block">
                    <img src="https://img.icons8.com/fluency/48/000000/temperature.png"/>
                    <span>${data.temp}</span>
                    <div class="icon-label">Temperatuur</div>
                    <div class="meter"><div style="width:${parseInt(data.temp)||0*4}%"></div></div>
                </div>
                <div class="icon-block">
                    <img src="https://img.icons8.com/fluency/48/000000/thermometer.png"/>
                    <span>${data.feels}</span>
                    <div class="icon-label">Voelt als</div>
                    <div class="meter"><div style="width:${parseInt(data.feels)||0*4}%"></div></div>
                </div>
                <div class="icon-block">
                    <img src="https://img.icons8.com/fluency/48/000000/rain.png"/>
                    <span>${data.precip}</span>
                    <div class="icon-label">Neerslag</div>
                    <div class="meter"><div style="width:${parseFloat(data.precip)||0*5}%"></div></div>
                </div>
                <div class="icon-block">
                    <img src="https://img.icons8.com/fluency/48/000000/wind.png"/>
                    <span>${data.wind}</span>
                    <div class="icon-label">Wind</div>
                    <div class="meter"><div style="width:${parseInt(data.wind)||0}%"></div></div>
                </div>
                <div class="icon-block">
                    <img src="https://img.icons8.com/fluency/48/000000/humidity.png"/>
                    <span>${data.humidity}</span>
                    <div class="icon-label">Luchtvochtigheid</div>
                    <div class="meter"><div style="width:${parseInt(data.humidity)||0}%"></div></div>
                </div>
                <div class="icon-block">
                    <img src="https://img.icons8.com/fluency/48/000000/sun.png"/>
                    <span>${data.sun}</span>
                    <div class="icon-label">Zon op/onder</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

async function loadWeather() {
    const promises = locations.map(async loc => {
        const data = await fetchWeatherData(loc);
        container.insertAdjacentHTML('beforeend', createCardHTML(loc, data));
    });
    await Promise.all(promises);
}

// Start
loadWeather();
