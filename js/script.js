// Functie om neerslag van wttr.in te halen
async function getPrecip(location, elementId) {
    try {
        const response = await fetch(`https://wttr.in/${location}?format=%p`);
        const data = await response.text();
        document.getElementById(elementId).innerText = data;
    } catch (error) {
        document.getElementById(elementId).innerText = 'Niet beschikbaar';
        console.error(error);
    }
}

// Haal data op bij laden
getPrecip('Den+Haag', 'denhaag-precip');
getPrecip('Pijnacker', 'pijnacker-precip');
