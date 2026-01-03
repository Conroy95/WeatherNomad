async function getWeather(location, ids) {
    try {
        // Temperatuur
        const temp = await fetch(`https://wttr.in/${location}?format=%t`).then(res => res.text());
        document.getElementById(ids.temp).innerText = temp;
        const tempValue = parseInt(temp.replace('°C','')) || 0;
        document.getElementById(ids.tempMeter).style.width = Math.min(Math.max(tempValue*4,0),100) + '%';

        // Neerslag
        const precip = await fetch(`https://wttr.in/${location}?format=%p`).then(res => res.text());
        document.getElementById(ids.precip).innerText = precip;
        const precipValue = parseFloat(precip.replace('mm','')) || 0;
        document.getElementById(ids.precipMeter).style.width = Math.min(precipValue*5,100) + '%';

        // Wind
        const wind = await fetch(`https://wttr.in/${location}?format=%w`).then(res => res.text());
        document.getElementById(ids.wind).innerText = wind;
        const windValue = parseInt(wind.replace(' km/h','')) || 0;
        document.getElementById(ids.windMeter).style.width = Math.min(windValue,100) + '%';

        // Luchtvochtigheid
        const humidity = await fetch(`https://wttr.in/${location}?format=%h`).then(res => res.text());
        document.getElementById(ids.humidity).innerText = humidity;
        const humValue = parseInt(humidity.replace('%','')) || 0;
        document.getElementById(ids.humidityMeter).style.width = humValue + '%';

        // Zonsopkomst/ondergang
        const sun = await fetch(`https://wttr.in/${location}?format=%S+%s`).then(res => res.text());
        document.getElementById(ids.sun).innerText = sun;

    } catch (error) {
        console.error(error);
    }
}

// Den Haag
getWeather('Den+Haag', {
    temp:'denhaag-temp', tempMeter:'denhaag-temp-meter',
    precip:'denhaag-precip', precipMeter:'denhaag-precip-meter',
    wind:'denhaag-wind', windMeter:'denhaag-wind-meter',
    humidity:'denhaag-humidity', humidityMeter:'denhaag-humidity-meter',
    sun:'denhaag-sun'
});

// Pijnacker
getWeather('Pijnacker', {
    temp:'pijnacker-temp', tempMeter:'pijnacker-temp-meter',
    precip:'pijnacker-precip', precipMeter:'pijnacker-precip-meter',
    wind:'pijnacker-wind', windMeter:'pijnacker-wind-meter',
    humidity:'pijnacker-humidity', humidityMeter:'pijnacker-humidity-meter',
    sun:'pijnacker-sun'
});
