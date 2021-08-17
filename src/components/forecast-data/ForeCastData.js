import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: '0px 1% 10px 1%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '10%'
    },
}));

function ForeCastData({ forecastData }) {
    const classes = useStyles();

    return (
        <div>
            <Grid container>
                <Grid xs={12}>
                    <Typography variant='h6' component='subtitle1' style={{ color: 'white' }}>Forecast</Typography>
                </Grid>
                <Grid item style={{ display: 'flex', marginTop: '1%', overflowX: 'scroll' }}>
                    {
                        forecastData && forecastData.length > 0 && forecastData.map((val, key) => {
                            if (val.time.toString().split(' ')[1] >= `${new Date().getHours()})`) {
                                return (
                                    <>
                                        < Paper className={classes.paper} >
                                            <Typography variant='subtitle2' >{val.time.toString().split(' ')[0]}</Typography>
                                            <Typography variant='subtitle2' >{val.time.toString().split(' ')[1]}</Typography>
                                            <img src={val.icon} width="50" height="50" style={{ marginTop: '5%' }} />
                                            <Typography variant='subtitle2' style={{ marginTop: '5%' }} >{val.temp_c}{'\u00b0'}</Typography>
                                        </Paper>
                                    </>)
                            }

                        })
                    }
                </Grid>
            </Grid>
        </div >
    );
}

export default ForeCastData;