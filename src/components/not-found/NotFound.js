import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#007aff',
        color: '#fff',
        fontSize: '100%',
        lineHeight: 1.5,
        fontFamily: "Roboto",
        marginLeft: '20%',
        textAlign: 'center'
    },
    h1: {
        textAlign: 'center',
        fontSize: '10em',
        fontWeight: 100,
        textShadow: '#0062cc 1px 1px',
    },
    p: {
        fontSize: '2em',
        textAlign: 'center',
        fontWeight: 100,
    }
}));

const NotFound = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1 className={classes.h1}>404 </h1>
            <p className={classes.p}>Oops! Page not found</p>
        </div>
    )
}

export default NotFound;