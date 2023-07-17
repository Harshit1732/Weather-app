import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = '7bef0f991ee49e4224c085421973f80d';
  const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Change to 'imperial' for Fahrenheit
        },
      });
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div className="weather-info">
          <i class="fa-solid fa-street-view"></i>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
