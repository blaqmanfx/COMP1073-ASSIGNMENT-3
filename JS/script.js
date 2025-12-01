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

// Display weather data in the DOM

function displayWeather(data) {
    // Hide loading and error messages
    hideLoading();
    hideError();
    
    // Get data from the API response
    const cityName = data.name;
    const country = data.sys.country;
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    
    // Update the HTML elements with the data
    document.getElementById('cityName').textContent = `${cityName}, ${country}`;
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('description').textContent = description;
    document.getElementById('feelsLike').textContent = feelsLike;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('windSpeed').textContent = windSpeed;
    
    // Set the weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('weatherIcon').alt = description;
    
    // Show the weather display
    weatherDisplay.classList.remove('hidden');
}

// Helper functions
function showLoading() {
    loadingDiv.classList.remove('hidden');
}

function hideLoading() {
    loadingDiv.classList.add('hidden');
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
}

function hideError() {
    errorDiv.classList.add('hidden');
}


