import React from 'react';
import { Box, Button, Grid, Icon, makeStyles, Paper, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: '0px 4% 10px 4%',
        minWidth: '92%',
    },
}));

const NewsList = ({ news }) => {
    const classes = useStyles();

    const handleDetails = (url) => {
        window.open(url, '_blank');
    };

    return (
        <>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="row" spacing={2}>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    <Box fontWeight="fontWeightBold">
                                        {news.title}
                                    </Box>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {news.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                    {news.publishedAt.split('T')[0]} {news.publishedAt.split('T')[1]}
                                </Typography>
                                <Button onClick={() => handleDetails(news.url)}>
                                    <InfoIcon style={{ color: 'darkblue', marginLeft: '2%' }} />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item style={{ marginLeft: '2%', marginTop: '1%' }}>
                            <img className={classes.img} alt="complex" src={news.image} width="250" height="150" />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default NewsList;