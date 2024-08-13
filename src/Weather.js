import React, { useState } from "react";
import axios from 'axios';
import "./weather.css";

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = () => {
    const apikey = '6e0e84e0dfbe4760a2393259240806';
    axios.get(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`)
      .then((response) => {
        setWeather(response.data); console.log(response.data);
        setError('');
      }).catch((error) => {
        setError('Error fetching weather data');
        setWeather(null); 
         
      });
  }

  const handleClick = (e) => {
    e.preventDefault();
    fetchWeather();
  }

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search city" onChange={(e) => setCity(e.target.value)} />
        <button onClick={handleClick}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      {weather ? (
        <>
          <img src={weather.current.condition.icon} alt="weather icon" className="weather-icon" />
          <p className="temperature">{weather.current.temp_c}°C</p>
          <p className="location">{weather.location.name}, {weather.location.country}</p>
          <p style={{color:"white"}}>{weather.location.localtime}</p>

          <div className="weather-data">
            <div className="col">
              <i className="fas fa-tint" style={{ marginRight: "10px" }}></i>
              <p>{weather.current.humidity}%</p>
              <span>Humidity</span>
            </div>
            
            <div className="col">
              <i className="fas fa-wind" style={{ marginRight: "10px" }}></i>
              <p>{weather.current.wind_kph} kph</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      ) : (
        <p style={{color:"yellow",marginTop:"30px"}}>{error}</p>
      )}
    </div>
  );
}

export default Weather;
