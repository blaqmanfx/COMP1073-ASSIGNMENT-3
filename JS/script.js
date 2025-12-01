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

// function to search for weather
function searchWeather() {
    const city = cityInput.value.trim();
    
    if (city === '') {
        showError('Please enter a city name');
        return;
    }
    
    getWeather(city);
}

// Fetch weather data from API
async function getWeather(city) {
    // Show loading state
    showLoading();
    
    try {
        // Build the API URL with parameters
        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        
        // Make the API request
        const response = await fetch(url);
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Display the weather data
        displayWeather(data);
        
    } catch (error) {
        showError('Unable to find weather data for that city');
    }
}


