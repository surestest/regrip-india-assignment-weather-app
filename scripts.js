$(document).ready(function() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    let isCelsius = true; // Default temperature unit

    // Function to fetch weather data
    function getWeather(city) {
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
            type: 'GET',
            success: function(data) {
                $('#error-message').addClass('hidden');
                $('#weather-info').removeClass('hidden');
                $('#city-name').text(data.name);
                $('#weather-condition').text(data.weather[0].description);
                $('#temperature').text(data.main.temp.toFixed(1));
                $('#humidity').text(data.main.humidity);
                $('#wind-speed').text(data.wind.speed);
            },
            error: function() {
                $('#weather-info').addClass('hidden');
                $('#error-message').removeClass('hidden').text('Error: Unable to retrieve weather data. Please check the city name.');
            }
        });
    }

    // Event handler for search button
    $('#search-btn').click(function() {
        const city = $('#city-input').val().trim();
        if (city) {
            getWeather(city);
        } else {
            $('#error-message').removeClass('hidden').text('Please enter a city name.');
            $('#weather-info').addClass('hidden');
        }
    });

    // Toggle temperature unit between Celsius and Fahrenheit
    $('#toggle-temp').click(function() {
        const currentTemp = parseFloat($('#temperature').text());
        if (isCelsius) {
            const fahrenheitTemp = (currentTemp * 9/5) + 32;
            $('#temperature').text(fahrenheitTemp.toFixed(1));
            $(this).text('°F');
        } else {
            const celsiusTemp = (currentTemp - 32) * 5/9;
            $('#temperature').text(celsiusTemp.toFixed(1));
            $(this).text('°C');
        }
        isCelsius = !isCelsius;
    });
});



