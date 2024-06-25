document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '100ecb9a0324e8317183ce7b8b4ecef3'; // Your OpenWeatherMap API key
    const getWeatherButton = document.getElementById('get-weather');
    const cityInput = document.getElementById('city-input');
    const weatherOutput = document.getElementById('weather-output');

    getWeatherButton.addEventListener('click', function() {
        const cityName = cityInput.value.trim();
        if (cityName !== '') {
            fetchWeatherData(cityName);
        } else {
            weatherOutput.innerHTML = '<p class="error">Please enter a city name.</p>';
        }
    });

    function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        weatherOutput.innerHTML = '<p class="loading">Loading...</p>'; // Display loading message

        fetch(url)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherOutput.innerHTML = '<p class="error">Error fetching weather data. Please try again.</p>';
            });
    }

    function displayWeatherData(data) {
        if (data.cod === 200) {
            const { name, main, weather } = data;
            const weatherDetails = `
                <h2>${name}</h2>
                <p>Temperature: <span>${main.temp} °C</span></p>
                <p>Weather: <span>${weather[0].description}</span></p>
                <p>Humidity: <span>${main.humidity}%</span></p>
                <p>Pressure: <span>${main.pressure} hPa</span></p>
            `;
            weatherOutput.innerHTML = weatherDetails;
        } else {
            weatherOutput.innerHTML = `<p class="error">${data.message}</p>`;
        }
    }
});
