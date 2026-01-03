async function getWeather(location, ids){
    try{
        const temp = await fetch(`https://wttr.in/${location}?format=%t`).then(r=>r.text());
        const feels = await fetch(`https://wttr.in/${location}?format=%f`).then(r=>r.text());
        const precip = await fetch(`https://wttr.in/${location}?format=%p`).then(r=>r.text());
        const wind = await fetch(`https://wttr.in/${location}?format=%w`).then(r=>r.text());
        const humidity = await fetch(`https://wttr.in/${location}?format=%h`).then(r=>r.text());
        const sun = await fetch(`https://wttr.in/${location}?format=%S+%s`).then(r=>r.text());
        const uv = await fetch(`https://wttr.in/${location}?format=%U`).then(r=>r.text());
        const cond = await fetch(`https://wttr.in/${location}?format=%C`).then(r=>r.text());

        document.getElementById(ids.temp).innerText = temp;
        document.getElementById(ids.feels).innerText = feels;
        document.getElementById(ids.precip).innerText = precip;
        document.getElementById(ids.wind).innerText = wind;
        document.getElementById(ids.humidity).innerText = humidity;
        document.getElementById(ids.sun).innerText = sun;
        document.getElementById(ids.uv).innerText = "UV " + uv;
        document.getElementById(ids.condition).innerText = cond;

        const card = document.getElementById(ids.card);
        if(cond.toLowerCase().includes("rain")) card.style.background="#00a4e450";
        else if(cond.toLowerCase().includes("cloud")) card.style.background="#fbb03420";
        else if(cond.toLowerCase().includes("sun")||cond.toLowerCase().includes("clear")) card.style.background="#fbb03440";
        else card.style.background="#f0f4f820";

    }catch(err){console.error(err);}
}

// Functie voor realtime update
function refreshDashboard(){
    getWeather('Den+Haag',{
        temp:'denhaag-temp', feels:'denhaag-feelslike', precip:'denhaag-precip',
        wind:'denhaag-wind', humidity:'denhaag-humidity', sun:'denhaag-sun',
        uv:'denhaag-uv', condition:'denhaag-condition', card:'denhaag-card'
    });

    getWeather('Pijnacker',{
        temp:'pijnacker-temp', feels:'pijnacker-feelslike', precip:'pijnacker-precip',
        wind:'pijnacker-wind', humidity:'pijnacker-humidity', sun:'pijnacker-sun',
        uv:'pijnacker-uv', condition:'pijnacker-condition', card:'pijnacker-card'
    });
}

// Eerste keer laden
refreshDashboard();
// Automatisch verversen elke 10 minuten
setInterval(refreshDashboard, 600000);
