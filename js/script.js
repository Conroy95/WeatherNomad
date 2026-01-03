async function getWeather(location, tempId, precipId, windId) {
    try {
        // Temperatuur
        const tempResponse = await fetch(`https://wttr.in/${location}?format=%t`);
        const temp = await tempResponse.text();
        document.getElementById(tempId).innerText = temp;

        // Neerslag
        const precipResponse = await fetch(`https://wttr.in/${location}?format=%p`);
        const precip = await precipResponse.text();
        document.getElementById(precipId).innerText = precip;

        // Wind
        const windResponse = await fetch(`https://wttr.in/${location}?format=%w`);
        const wind = await windResponse.text();
        document.getElementById(windId).innerText = wind;

    } catch (error) {
        console.error(error);
        document.getElementById(tempId).innerText = '--';
        document.getElementById(precipId).innerText = '--';
        document.getElementById(windId).innerText = '--';
    }
}

// Haal data op bij laden
getWeather('Den+Haag', 'denhaag-temp', 'denhaag-precip', 'denhaag-wind');
getWeather('Pijnacker', 'pijnacker-temp', 'pijnacker-precip', 'pijnacker-wind');
