async function getWeather(location, ids) {
    try {
        // Temperatuur
        const temp = await fetch(`https://wttr.in/${location}?format=%t`).then(r=>r.text());
        document.getElementById(ids.temp).innerText = temp;
        document.getElementById(ids.tempMeter).style.width = Math.min(Math.max(parseInt(temp)||0*4,100),100) + '%';

        // Voelt als
        const feels = await fetch(`https://wttr.in/${location}?format=%f`).then(r=>r.text());
        document.getElementById(ids.feels).innerText = feels;
        document.getElementById(ids.feelsMeter).style.width = Math.min(Math.max(parseInt(feels)||0*4,100),100) + '%';

        // Neerslag
        const precip = await fetch(`https://wttr.in/${location}?format=%p`).then(r=>r.text());
        document.getElementById(ids.precip).innerText = precip;
        const precipVal = parseFloat(precip)||0;
        document.getElementById(ids.precipMeter).style.width = Math.min(precipVal*5,100) + '%';

        // Wind
        const wind = await fetch(`https://wttr.in/${location}?format=%w`).then(r=>r.text());
        document.getElementById(ids.wind).innerText = wind;
        const windVal = parseInt(wind)||0;
        document.getElementById(ids.windMeter).style.width = Math.min(windVal,100) + '%';

        // Luchtvochtigheid
        const humidity = await fetch(`https://wttr.in/${location}?format=%h`).then(r=>r.text());
        document.getElementById(ids.humidity).innerText = humidity;
        document.getElementById(ids.humidityMeter).style.width = parseInt(humidity)||0 + '%';

        // Zonsopkomst / zonsondergang
        const sun = await fetch(`https://wttr.in/${location}?format=%S+%s`).then(r=>r.text());
        document.getElementById(ids.sun).innerText = sun;

        // UV-index
        const uv = await fetch(`https://wttr.in/${location}?format=%U`).then(r=>r.text());
        document.getElementById(ids.uv).innerText = "UV " + uv;

        // Weerconditie
        const cond = await fetch(`https://wttr.in/${location}?format=%C`).then(r=>r.text());
        document.getElementById(ids.condition).innerText = cond;

        // Achtergrondkleur kaart op basis van weer
        const card = document.getElementById(ids.card);
        if(cond.toLowerCase().includes("rain")){
            card.style.background = "#00a4e450";
        } else if(cond.toLowerCase().includes("cloud")){
            card.style.background = "#fbb03420";
        } else if(cond.toLowerCase().includes("sun") || cond.toLowerCase().includes("clear")){
            card.style.background = "#fbb03440";
        } else {
            card.style.background = "#f0f4f820";
        }

    } catch(err){console.error(err);}
}

// Den Haag
getWeather('Den+Haag',{
    temp:'denhaag-temp', tempMeter:'denhaag-temp-meter',
    feels:'denhaag-feelslike', feelsMeter:'denhaag-feelslike-meter',
    precip:'denhaag-precip', precipMeter:'denhaag-precip-meter',
    wind:'denhaag-wind', windMeter:'denhaag-wind-meter',
    humidity:'denhaag-humidity', humidityMeter:'denhaag-humidity-meter',
    sun:'denhaag-sun', uv:'denhaag-uv',
    condition:'denhaag-condition', card:'denhaag-card'
});

// Pijnacker
getWeather('Pijnacker',{
    temp:'pijnacker-temp', tempMeter:'pijnacker-temp-meter',
    feels:'pijnacker-feelslike', feelsMeter:'pijnacker-feelslike-meter',
    precip:'pijnacker-precip', precipMeter:'pijnacker-precip-meter',
    wind:'pijnacker-wind', windMeter:'pijnacker-wind-meter',
    humidity:'pijnacker-humidity', humidityMeter:'pijnacker-humidity-meter',
    sun:'pijnacker-sun', uv:'pijnacker-uv',
    condition:'pijnacker-condition', card:'pijnacker-card'
});
