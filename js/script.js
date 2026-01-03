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

        // Alle data in één fetch voor snellere laadtijd
        // Format: temperatuur,voelt als,neerslag,wind,luchtvochtigheid,zonsopkomst/ondergang,conditie
        const data = await fetch(`https://wttr.in/${name}?format=%t;%f;%p;%w;%h;%S+%s;%C`).then(r=>r.text());
        const [temp, feels, precip, wind, humidity, sun, condText] = data.split(";");

        document.getElementById(condition).innerText = condText;

        const html = `
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/temperature.png"/>
            <span>${temp}</span>
            <div class="icon-label">Temperatuur</div>
            <div class="meter"><div style="width:${parseInt(temp)||0*4}%"></div></div>
        </div>
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/thermometer.png"/>
            <span>${feels}</span>
            <div class="icon-label">Voelt als</div>
            <div class="meter"><div style="width:${parseInt(feels)||0*4}%"></div></div>
        </div>
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/rain.png"/>
            <span>${precip}</span>
            <div class="icon-label">Neerslag</div>
            <div class="meter"><div style="width:${parseFloat(precip)||0*5}%"></div></div>
        </div>
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/wind.png"/>
            <span>${wind}</span>
            <div class="icon-label">Wind</div>
            <div class="meter"><div style="width:${parseInt(wind)||0}%"></div></div>
        </div>
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/humidity.png"/>
            <span>${humidity}</span>
            <div class="icon-label">Luchtvochtigheid</div>
            <div class="meter"><div style="width:${parseInt(humidity)||0}%"></div></div>
        </div>
        <div class="icon-block">
            <img src="https://img.icons8.com/fluency/48/000000/sun.png"/>
            <span>${sun}</span>
            <div class="icon-label">Zon op/onder</div>
        </div>
        `;

        document.getElementById(graphical).innerHTML = html;

        // Achtergrond kleur
        if(condText.toLowerCase().includes("rain")){
            cardEl.style.background = "#00a4e450";
        } else if(condText.toLowerCase().includes("cloud")){
            cardEl.style.background = "#fbb03420";
        } else if(condText.toLowerCase().includes("sun") || condText.toLowerCase().includes("clear")){
            cardEl.style.background = "#fbb03440";
        } else {
            cardEl.style.background = "#f0f4f820";
        }

    }catch(err){console.error(err);}
}

locations.forEach(loc=>createWeatherCard(loc));
