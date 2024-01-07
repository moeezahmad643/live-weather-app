function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("output").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    let lat = position.coords.latitude
    let long = position.coords.longitude
    let data = { lat, long }
    showWeather(data)
}

function showError(error) {
    var output = document.getElementById("output");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            output.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            output.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            output.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            output.innerHTML = "An unknown error occurred.";
            break;
    }
}


function showWeather(data) {

    console.log(typeof (data))
    let url;
    if (typeof (data) == 'object') {

        url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.long}&appid=01931ec5713bf5720f7540d1d9ec390b`

    }
    else {
        let city = 'lahore'
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=01931ec5713bf5720f7540d1d9ec390b`

    }
    fetch(url)
        .then((responce) => responce.json())
        .then((data) => {
            console.log(data)

            document.getElementById("cardContent").innerHTML = `
            <h2 onclick='updateCity()'>${data.name} </h2>
            <h2>${(Number(data.main.temp) - 273.15).toFixed(2)} °C</h2>
            
            <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png'/>

            <h4>Weather</h4>
            <p>${data.weather[0].main} Weather</p>
            <p>Fahrenheit: ${(Number(data.main.temp)).toFixed(2)} °F</p>
            <p>Feels Like: ${(Number(data.main.feels_like) - 273.15).toFixed(2)} °C</p>
            <p>Humidity: ${data.main.humidity}</p>
            
            <br>
            <h4>Wind</h4>
            <li>Speed ${data.wind.speed}m/s </li>
            <li>Degree ${data.wind.deg}° </li>
            
            <br>
            <center><h4>Time: <span id='time'></span></h4></center>

            
            `

        })
    time()

}

function time() {

    setInterval(() => {

        let time = new Date()
        document.getElementById("time").innerHTML = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    }, 1000)

}

getLocation()
showWeather()