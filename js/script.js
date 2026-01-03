async function getWeather(location, ids){
    try{
        const temp = await fetch(`https://wttr.in/${location}?format=%t`).then(r=>r.text());
        const feels = await fetch(`https://wttr.in/${location}?format=%f`).then(r=>r.text());
        const minmax = await fetch(`https://wttr.in/${location}?format=%m+%M`).then(r=>r.text());
        const precip = await fetch(`https://wttr.in/${location}?format=%p`).then(r=>r.text());
        const snow = await fetch(`https://wttr.in/${location}?format=%P`).then(r=>r.text());
        const wind = await fetch(`https://wttr.in/${location}?format=%w`).then(r=>r.text());
        const humidity = await fetch(`https://wttr.in/${location}?format=%h`).then(r=>r.text());
        const sun = await fetch(`https://wttr.in/${location}?format=%S+%s`).then(r=>r.text());
        const uv = await fetch(`https://wttr.in/${location}?format=%U`).then(r=>r.text());
        const cond = await fetch(`https://wttr.in/${location}?format=%C`).then(r=>r.text());
        const pressure = await fetch(`https://wttr.in/${location}?format=%P`).then(r=>r.text());
        const chanceRain = await fetch(`https://wttr.in/${location}?format=%P`).then(r=>r.text());
        const chanceSnow = await fetch(`https://wttr.in/${location}?format=%P`).then(r=>r.text());

        document.getElementById(ids.temp).innerText = temp;
        document.getElementById(ids.feelslike).innerText = "Voelt als " + feels;
        document.getElementById(ids.minmax).innerText = "Min " + minmax.split(" ")[0] + " / Max " + minmax.split(" ")[1];
        document.getElementById(ids.precip).innerText = "Neerslag " + precip;
        document.getElementById(ids.snow).innerText = "Sneeuw " + snow;
        document.getElementById(ids.wind).innerText = "Wind " + wind;
        document.getElementById(ids.humidity).innerText = "Luchtvochtigheid " + humidity;
        document.getElementById(ids.sun).innerText = "Zon op " + sun.split(" ")[0] + " / Zon onder " + sun.split(" ")[1];
        document.getElementById(ids.uv).innerText = "UV-index " + uv;
        document.getElementById(ids.condition).innerText = cond;
        document.getElementById(ids.pressure).innerText = "Druk " + pressure;
        document.getElementById(ids.chancerain).innerText = "Kans regen " + chanceRain + "%";
        document.getElementById(ids.chancesnow).innerText = "Kans sneeuw " + chanceSnow + "%";

        const card = document.getElementById(ids.card);
        if(cond.toLowerCase().includes("rain")) card.style.background="#00a4e450";
        else if(cond.toLowerCase().includes("cloud")) card.style.background="#fbb03420";
        else if(cond.toLowerCase().includes("sun")||cond.toLowerCase().includes("clear")) card.style.background="#fbb03440";
        else card.style.background="#f0f4f820";

    }catch(err){console.error(err);}
}

// Realtime update functie
function refreshDashboard(){
    getWeather('Den+Haag',{
        temp:'denhaag-temp', feelslike:'denhaag-feelslike', minmax:'denhaag-minmax',
        precip:'denhaag-precip', snow:'denhaag-snow', wind:'denhaag-wind',
        humidity:'denhaag-humidity', sun:'denhaag-sun', uv:'denhaag-uv',
        condition:'denhaag-condition', pressure:'denhaag-pressure',
        chancerain:'denhaag-chancerain', chancesnow:'denhaag-chancesnow',
        card:'denhaag-card'
    });

    getWeather('Pijnacker',{
        temp:'pijnacker-temp', feelslike:'pijnacker-feelslike', minmax:'pijnacker-minmax',
        precip:'pijnacker-precip', snow:'pijnacker-snow', wind:'pijnacker-wind',
        humidity:'pijnacker-humidity', sun:'pijnacker-sun', uv:'pijnacker-uv',
        condition:'pijnacker-condition', pressure:'pijnacker-pressure',
        chancerain:'pijnacker-chancerain', chancesnow:'pijnacker-chancesnow',
        card:'pijnacker-card'
    });
}

// Eerste keer laden
refreshDashboard();
// Automatisch verversen elke 10 minuten
setInterval(refreshDashboard, 600000);
