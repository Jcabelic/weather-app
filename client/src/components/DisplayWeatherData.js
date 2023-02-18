/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import "./DisplayWeatherData.css";

const DisplayWeatherData = () => {
  //create an env file and add your api key from openweathermap
  const apiKey = process.env.REACT_APP_API_KEY;
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const handleClick = () => {
    setWeatherData("undefined");
  };
  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setCity("");
      });

    console.log(process.env.REACT_APP_API_KEY);
  };
  return (
    <div className="searchCity">
      {typeof weatherData.main === "undefined" ? (
        <div className="search">
          <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              className="input"
              placeholder="Enter City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>
          <button className="btn" onClick={getWeather}>
            Display Weather Data
          </button>
        </div>
      ) : (
        <div className="location-weather-data">
          <div className="location-info">
            <div>City: {weatherData.name}</div>
            <div>Country: {weatherData.sys.country}</div>
            <div>Current Time: {new Date().toLocaleTimeString()}</div>
          </div>

          <div className="content-table-grid-container">
            <div className="grid-item grid-item-1">Date</div>
            <div className="grid-item grid-item-2">Temp(°C)</div>
            <div className="grid-item grid-item-3">Description</div>
            <div className="grid-item grid-item-4">Main</div>
            <div className="grid-item grid-item-5">Pressure</div>
            <div className="grid-item grid-item-6">Humidity</div>

            <div className="grid-item grid-item-7">
              {new Date().toLocaleDateString()}
            </div>
            <div className="grid-item grid-item-8">
              {Math.round(weatherData.main.temp)}°C
            </div>
            <div className="grid-item grid-item-9">
              {weatherData.weather[0].description}
            </div>
            <div className="grid-item grid-item-10">
              {weatherData.weather[0].main}
            </div>
            <div className="grid-item grid-item-11">
              {weatherData.main.pressure}
            </div>
            <div className="grid-item grid-item-12">
              {weatherData.main.humidity}
            </div>
          </div>

          <button className="back-btn" onClick={handleClick}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default DisplayWeatherData;
