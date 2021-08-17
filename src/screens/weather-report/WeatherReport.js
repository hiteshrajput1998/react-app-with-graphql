import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from "react-toastify";
import { getCurrentLocationInfo } from '../../api/weather-api/WeatherAPI';
import ForeCastData from '../../components/forecast-data/ForeCastData';
import SearchBox from '../../components/searchabox/SearchBox';
import { useWeatherForecastManager } from '../../hooks/weather-manager/WeatherManagerHooks';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '85%',
        marginLeft: '15%',
        backgroundColor: 'lightgray',
        padding: '1%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function WeatherReport(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { foreCastDay, getWeatherForecastDay } = useWeatherForecastManager();
    const [searchText, setSearchText] = useState();
    const [forecastData, setForecastData] = useState({});

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                getCurrentLocation(position.coords.latitude, position.coords.longitude);
            });
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (foreCastDay?.networkError) {
            toast.error(t('error.network'));
        }
        if (foreCastDay?.data && Object.keys(foreCastDay?.data?.getWeatherForecastDay).length > 0) {
            setForecastData(foreCastDay?.data?.getWeatherForecastDay);
        }
        if (foreCastDay?.graphQLErrors && foreCastDay?.graphQLErrors.length > 0) {
            toast.error(JSON.parse(foreCastDay?.graphQLErrors.map(x => x.message.body)[0])?.error?.message);
        }
    }, [foreCastDay]);

    const getCurrentLocation = async (latitude, longitude) => {
        let response = await getCurrentLocationInfo(latitude, longitude);
        let localityTrim = (response.locality.split(' ')[0]).trim();
        getWeatherForecastDay({ cityName: localityTrim, days: 1 });
    };

    const handleSearchContent = (e) => {
        setForecastData({});
        let searchTextTrim = searchText.trim();
        getWeatherForecastDay({ cityName: searchTextTrim, days: 1 });
    };

    const handleChangeSearchContent = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SearchBox onChange={handleChangeSearchContent} onClick={handleSearchContent} />
                </Grid>
                {forecastData && Object.keys(forecastData).length > 0 &&
                    <Grid xs={12} container style={{ marginTop: '5%' }}>
                        <Grid xs={6}>
                            <Typography variant='h3' component='h3' style={{ color: 'white' }}>{forecastData?.location?.name}, {forecastData?.location?.country}</Typography>
                            <Typography variant='subtitle1' component='subtitle1' style={{ color: 'white' }}>{forecastData?.location?.localtime.split(' ')[0]}</Typography>
                            <Grid xs={12} container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={forecastData?.current?.icon} width="100" height="100" />
                                <Grid direction="column" style={{ marginLeft: '2%' }}>
                                    <Typography variant='h4' component='h4' style={{ color: 'white' }}>{forecastData?.current?.temp_c}{'\u00b0'}</Typography>
                                    <Typography variant='subtitle1' component='subtitle1' style={{ color: 'white' }}>{forecastData?.forecastDay?.dayInfo?.maxtemp_c}{'\u00b0'} / {forecastData?.forecastDay?.dayInfo?.mintemp_c}{'\u00b0'}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={6}>

                        </Grid>
                    </Grid>
                }
                <Grid xs={12} container style={{ marginTop: '5%' }}>
                    {
                        forecastData && forecastData?.forecastDay?.hourlyData.length > 0 ? <ForeCastData forecastData={forecastData?.forecastDay?.hourlyData} /> : <div>No Data</div>
                    }
                </Grid>
            </Grid>
            <ToastContainer autoClose={5000} />
        </div>
    );
}

export default WeatherReport;