// Weer data voor meters
async function getWeather(location, ids) {
    try {
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

    } catch(err){console.error(err);}
}

// Grafieken per uur
async function createHourlyChart(location, canvasId){
    try{
        const data = await fetch(`https://wttr.in/${location}?format=%H:%t:%p:%w`).then(r=>r.text());
        const lines = data.split("\n");
        const labels = [], tempData=[], precipData=[], windData=[];
        lines.forEach(line=>{
            const parts=line.split(":");
            if(parts.length>=4){
                labels.push(parts[0]);
                tempData.push(parseInt(parts[1]));
                precipData.push(parseFloat(parts[2]));
                windData.push(parseInt(parts[3]));
            }
        });
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx,{
            type:'line',
            data:{
                labels:labels,
                datasets:[
                    {label:'Temp (°C)', data:tempData, borderColor:'#00a4e4', backgroundColor:'#00a4e450', yAxisID:'y1'},
                    {label:'Precip (mm)', data:precipData, borderColor:'#fbb034', backgroundColor:'#fbb03450', yAxisID:'y2'},
                    {label:'Wind (km/h)', data:windData, borderColor:'#00a4e4', backgroundColor:'#00a4e430', yAxisID:'y3'}
                ]
            },
            options:{
                responsive:true,
                interaction:{mode:'index', intersect:false},
                stacked:false,
                scales:{
                    y1:{type:'linear', position:'left', title:{display:true,text:'Temp °C'}},
                    y2:{type:'linear', position:'right', title:{display:true,text:'Precip mm'}, grid:{drawOnChartArea:false}},
                    y3:{type:'linear', position:'right', title:{display:true,text:'Wind km/h'}, grid:{drawOnChartArea:false}}
                }
            }
        });
    } catch(err){console.error(err);}
}

// Den Haag
getWeather('Den+Haag',{
    temp:'denhaag-temp', feels:'denhaag-feelslike', precip:'denhaag-precip',
    wind:'denhaag-wind', humidity:'denhaag-humidity', sun:'denhaag-sun',
    uv:'denhaag-uv', condition:'denhaag-condition', card:'denhaag-card'
});
createHourlyChart('Den+Haag','denhaagChart');

// Pi
