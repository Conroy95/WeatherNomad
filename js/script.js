const cities = [
    {name:"Den Haag", id:"denhaag", query:"Den+Haag"},
    {name:"Pijnacker", id:"pijnacker", query:"Pijnacker"},
    {name:"Delft", id:"delft", query:"Delft"},
    {name:"Rijswijk", id:"rijswijk", query:"Rijswijk"},
    {name:"Schiphol Airport", id:"schiphol", query:"Schiphol"},
    {name:"Rotterdam Airport", id:"rotterdam", query:"Rotterdam+Airport"}
];

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

        const card = document.getElementById(ids.card);
        document.getElementById(ids.temp).innerText=temp;
        document.getElementById(ids.feels).innerText=feels;
        document.getElementById(ids.precip).innerText=precip;
        document.getElementById(ids.wind).innerText=wind;
        document.getElementById(ids.humidity).innerText=humidity;
        document.getElementById(ids.sun).innerText=sun;
        document.getElementById(ids.uv).innerText="UV "+uv;
        document.getElementById(ids.condition).innerText=cond;

        if(cond.toLowerCase().includes("rain")) card.style.background="#00a4e450";
        else if(cond.toLowerCase().includes("cloud")) card.style.background="#fbb03420";
        else if(cond.toLowerCase().includes("sun")||cond.toLowerCase().includes("clear")) card.style.background="#fbb03440";
        else card.style.background="#f0f4f820";

    } catch(err){console.error(err);}
}

async function createHourlyChart(location, canvasId){
    try{
        const data = await fetch(`https://wttr.in/${location}?format=%H:%t:%p:%w`).then(r=>r.text());
        const lines = data.split("\n");
        const labels=[], tempData=[], precipData=[], windData=[];
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

// Loop door alle steden
cities.forEach(city=>{
    const ids = {
        temp:city.id+'-temp',
        feels:city.id+'-feelslike',
        precip:city.id+'-precip',
        wind:city.id+'-wind',
        humidity:city.id+'-humidity',
        sun:city.id+'-sun',
        uv:city.id+'-uv',
        condition:city.id+'-condition',
        card:city.id+'-card'
    };
    getWeather(city.query, ids);
    createHourlyChart(city.query, city.id+'Chart');
});
