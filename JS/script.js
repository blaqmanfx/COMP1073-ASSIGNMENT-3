// API configuration

const API_KEY = '3b747fef83d8a893c320157f6fa07393';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=3b747fef83d8a893c320157f6fa07393';

// Get DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');

// Add event listeners
searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

