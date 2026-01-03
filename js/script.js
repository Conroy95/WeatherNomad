const locations = [
    {name:'Den+Haag', card:'denhaag-card', condition:'denhaag-condition', graphical:'denhaag-graphical'},
    {name:'Pijnacker', card:'pijnacker-card', condition:'pijnacker-condition', graphical:'pijnacker-graphical'},
    {name:'Delft', card:'delft-card', condition:'delft-condition', graphical:'delft-graphical'},
    {name:'Rijswijk', card:'rijswijk-card', condition:'rijswijk-condition', graphical:'rijswijk-graphical'},
    {name:'Schiphol', card:'schiphol-card', condition:'schiphol-condition', graphical:'schiphol-graphical'},
    {name:'Rotterdam', card:'rotterdam-card', condition:'rotterdam-condition', graphical:'rotterdam-graphical'}
];

async function createWeatherCard(location){
    const {name, card, condition, graphical} = location;

    try{
        const cardEl = document.getElementById(card);

        // Één fetch naar JSON-output van wttr.in
        const response = await fetch(`https://wttr.in/${name}?format=j1`);
        const data = await response.json();

        // Haal actuele weergegevens
        const current = data.current_condition[0];
        const condText = current.weatherDesc[0].value;
        const temp = current.temp_C + "°C";
        const feels = current.FeelsLikeC + "°C";
        const precip = current.precipMM + " mm";
        const wind = current.windspeedKmph + " km/h";
        const humidity = current.humidity + "%";
        const sun = data.weather[0].astronomy[0].sunrise + " / " + data.weather[0].astronomy[0].sunset;

        document.getElementById(condition).innerText = condText;

        const html = `
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/temperature.png"/>
            <span>${temp}</span>
            <div class="icon-label">Temperatuur</div>
            <div class="meter"><div style="width:${parseInt(current.temp_C)||0*4}%"></div></div>
        </div>
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/thermometer.png"/>
            <span>${feels}</span>
            <div class="icon-label">Voelt als</div>
            <div class="meter"><div style="width:${parseInt(current.FeelsLikeC)||0*4}%"></div></div>
        </div>
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/rain.png"/>
            <span>${precip}</span>
            <div class="icon-label">Neerslag</div>
            <div class="meter"><div style="width:${parseFloat(current.precipMM)||0*5}%"></div></div>
        </div>
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/wind.png"/>
            <span>${wind}</span>
            <div class="icon-label">Wind</div>
            <div class="meter"><div style="width:${parseInt(current.windspeedKmph)||0}%"></div></div>
        </div>
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/humidity.png"/>
            <span>${humidity}</span>
            <div class="icon-label">Luchtvochtigheid</div>
            <div class="meter"><div style="width:${parseInt(current.humidity)||0}%"></div></div>
        </div>
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/sun.png"/>
            <span>${sun}</span>
            <div class="icon-label">Zon op/onder</div>
        </div>
        `;

        document.getElementById(graphical).innerHTML = html;

        // Achtergrondkleur kaart
        if(condText.toLowerCase().includes("rain")){
            cardEl.style.background = "#00a4e450";
        } else if(condText.toLowerCase().includes("cloud")){
            cardEl.style.background = "#fbb03420";
        } else if(condText.toLowerCase().includes("sun") || condText.toLowerCase().includes("clear")){
            cardEl.style.background = "#fbb03440";
        } else {
            cardEl.style.background = "#f0f4f820";
        }

    } catch(err){
        console.error(err);
    }
}

// Laad alle kaarten parallel
locations.forEach(loc => createWeatherCard(loc));
