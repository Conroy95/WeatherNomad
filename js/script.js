// Realtime iframe refresh
function refreshIframes() {
    const iframes = document.querySelectorAll('.weather-iframe');
    iframes.forEach(f => {
        const src = f.src;
        f.src = src; // herlaad iframe
    });
}

// Eerste keer laden
refreshIframes();

// Automatisch verversen elke 10 minuten
setInterval(refreshIframes, 600000);
