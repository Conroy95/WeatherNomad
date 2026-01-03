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
    const [cond, temp, feels, precip, wind, humidity, sun] = await Promise.all([
        fetch(`https://wttr.in/${loc.name}?format=%C`).then(r=>r.text()),
        fetch(`https://wttr.in/${loc.name}?format=%t`).then(r=>r.text()),
        fetch(`https://wttr.in/${loc.name}?format=%f`).then(r=>r.text()),
        fetch(`https://wttr.in/${loc.name}?format=%p`).then(r=>r.text()),
        fetch(`https://wttr.in/${loc.name}?format=%w`).then(r=>r.text()),
        fetch(`https://wttr.in/${loc.name}?format=%h`).then(r=>r.text()),
        fetch(`https://wttr.in/${loc.name}?format=%S+%s`).then(r=>r.text())
    ]);

    return {cond, temp, feels, precip, wind, humidity, sun};
}

function createCardHTML(loc, data) {
    // dynamische achtergrondkleur
    let bg = '#ffffff';
    const c = data.cond.toLowerCase();
    if(c.includes('rain')) bg = '#00a4e450';
    else if(c.includes('cloud')) bg = '#fbb03420';
    else if(c.includes('sun') || c.includes('clear')) bg = '#fbb03440';

    return `
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="weather-card" style="background:${bg}">
        <h5>${loc.display}</h5>
        <div class="condition">${data.cond}</div>
        <div class="d-flex flex-wrap justify-content-center">
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
            <img src="https://i
