const api = {
    key: "you api key",
    base: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('keypress', setQuery);

function setQuery(e){
    if (e.keyCode == 13) {
        searchResults(searchBox.value);
    }
}

function searchResults(query){
    fetch(`${api.base}weather?q=${query}&units=metrics&appid=${api.key}&lang=sp`)
        .then(weather => {
                return weather.json();
        }).then(displayResults);
}

function displayResults(weather){
    let city = document.querySelector('.city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`
    
    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp-274.15)}<span>°c</span>`;

    let dateNow = new Date();
    let date = document.querySelector('.date');
    date.innerHTML = getDate(dateNow);

    let weatherIcon = document.querySelector('.weather-icon');
    const { icon } = weather.weather[0];
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/w/${icon}.png">`;
    
    let description = document.querySelector('.description');
    description.innerHTML = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1);

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerHTML =  `Min ${Math.floor(weather.main.temp_min-274.15)}°c / Max ${Math.ceil(weather.main.temp_max-274)}°c`;

    let visibility = document.querySelector('.wind');
    visibility.innerHTML = `Wind <br> ${weather.wind.speed} m/s`;

    let humidity = document.querySelector('.humidity');
    humidity.innerHTML = `Humedad <br> ${weather.main.humidity}%`;
}

function getDate(date){
    let days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}


searchResults('parana');