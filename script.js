const weaterTemp = document.getElementById("weather-temp");
const weatherSky = document.getElementById("weather-sky");
const weatherHumid = document.getElementById("weather-humid");
const weatherPressure = document.getElementById("weather-pressure");
const timeHome = document.getElementById("time-home");
const jokeBtn = document.getElementById("get-joke");
const countDown = document.getElementById("countdown")
const countDownDay = new Date("May 12, 2022 09:00").getTime();
const setup = document.getElementById("setup");
const punchline = document.getElementById("punchline");

jokeBtn.addEventListener("click", () => getJoke())


class WeatherData{
    constructor(location,temperature, clouds, wind, humidity, pressure ){
        this.location = location
        this.temperature = temperature
        this.clouds = clouds
        this.wind = wind
        this.humidity = humidity
        this.pressure = pressure
    }

}

async function getData(location){
    try{
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=8205d5b4151da5b3db6825ecab3aece7`,{mode: "cors"})
    const json = await response.json();
    
    let currentlocation = new WeatherData (json.name, json.main.temp, json.weather[0].description, json.wind.speed, json.main.humidity,json.main.pressure);
    weaterTemp.innerHTML=`${currentlocation.temperature} Grad`;
    weatherSky.innerHTML=`${currentlocation.clouds}`;
    weatherHumid.innerHTML=`Luftfeuchtigkeit: ${currentlocation.humidity}`;
    weatherPressure.innerHTML=`Windgeschwindigkeit: ${currentlocation.wind} km/h`;
    }
    
    catch{
        console.log("joa da ist wohl was schiefgelaufen")
    }
}

async function getJoke(){
    setup.innerHTML ="";
    punchline.innerHTML ="";
    try{
        const response = await fetch("https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun?lang=de&type=twopart")
        const json = await response.json();
        setup.innerHTML = json.setup;
        setTimeout(() => {
            punchline.innerHTML = json.delivery;
        }, 3500);
    }
    catch{
        console.log("kein witz für dich")
    }
}

function getDate(){
    let date = new Date;
    let time = date.getHours() + ":" + date.getMinutes();
    timeHome.innerHTML = time + "Uhr";
}

const startCountdown = setInterval(()=>{
    let now = new Date().getTime();
    let distance = countDownDay - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countDown.innerHTML = `${days} : ${hours} : ${minutes} : ${seconds}`;
},1000)

getData("Düsseldorf");
getDate();