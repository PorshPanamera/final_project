import React, { useState, useEffect } from "react";

const WeatherData = ({ city, onWeatherData, onLoading, onError }) => {
  useEffect(() => {
    const fetchWeather = async () => {
      onLoading(true);
      onError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5d066958a60d315387d9492393935c19`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (!data.main || !data.weather || !data.wind) {
          throw new Error("Incomplete data received from API");
        }

        onWeatherData(data);
        onLoading(false);
      } catch (error) {
        console.error("Error fetching the weather data:", error);
        onError(error.message);
        onLoading(false);
      }
    };

    fetchWeather();
  }, [city, onWeatherData, onLoading, onError]);

  return null;
};

export default WeatherData;
