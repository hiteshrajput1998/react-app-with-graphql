import axios from 'axios';
import { client } from '../../index';
import { GET_WEATHERFORECASTDATA_SCHEMA } from './WeatherQueries';

export const loadWeatherForecastData = ({ cityName, days }, callback) => {
    client
        .query({
            query: GET_WEATHERFORECASTDATA_SCHEMA,
            variables: { cityName, days }
        })
        .then(result => {
            callback(result);
        })
        .catch(error => {
            callback(error);
        });
};

export const getCurrentLocationInfo = async (latitude, longitude) => {
    return await axios(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(result => {
            return result.data;
        })
        .catch(error => {
            return error;
        });
}