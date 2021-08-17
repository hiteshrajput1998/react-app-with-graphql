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