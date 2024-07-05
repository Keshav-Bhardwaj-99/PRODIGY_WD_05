const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.Weather-img'); // Corrected class name

const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "c12318ca4d50a4eb54c4ce505e83b6c2";
    const state_code = ""; // Define or remove if not necessary
    const country_code = ""; // Define or remove if not necessary
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state_code},${country_code}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("error");
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        //Weather image based on weather condition
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "Cloudy.webp";
                break;
            case 'Clear':
                weather_img.src = "Clear.png";
                break;
            case 'Rain':
                weather_img.src = "Rain.jpg";
                break;
            case 'Mist':
                weather_img.src = "Mist.avif";
                break;
            case 'Snow':
                weather_img.src = "Snow.jpg";
                break;
            default:
                weather_img.src = "default_weather_image.png"; // Set a default image if none of the above conditions match
                break;
        }
    } catch (error) {
        console.log("Error fetching weather data: ", error);
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
