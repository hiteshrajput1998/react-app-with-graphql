import React, { useState } from 'react';
import { loadWeatherForecastData } from '../../api/weather-api/WeatherAPI';

export const useWeatherForecastManager = (actions) => {
    const [foreCastDay, setForecastDay] = useState();

    const getWeatherForecastDay = ({ cityName, days }) => {
        loadWeatherForecastData({ cityName, days }, result => {
            setForecastDay(result);
        });
    }

    return {
        foreCastDay,
        getWeatherForecastDay
    }
};