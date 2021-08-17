import gql from 'graphql-tag';

export const GET_WEATHERFORECASTDATA_SCHEMA = gql`
    query getWeatherForecast($cityName: String, $days: Float){
        getWeatherForecastDay(cityName: $cityName, days: $days){
        location{
            name
            region
            country
            lat
            lon
            localtime
        }
        current{
            last_updated
            temp_c
            temp_f
            icon
        }
        forecastDay{
            date
            dayInfo{
            maxtemp_c
            maxtemp_f
            icon
            mintemp_c
            mintemp_f
            avgtemp_c
            }
            astroInfo{
            sunrise
            sunset
            moonrise
            moonset
            }
            hourlyData{
            time
            temp_c
            temp_f
            icon
            wind_mph
            wind_kph
            wind_degree
            }
        }
        }
    }
`;
