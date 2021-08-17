import React from 'react';
import { Divider, IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

function SearchBox({ onClick, onChange }) {
    const classes = useStyles();

    return (
        <div>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Enter city"
                    inputProps={{ 'aria-label': 'enter city' }}
                    onChange={onChange}
                />
                <SearchIcon style={{color: 'gray'}}/>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                    <DirectionsIcon onClick={onClick} />
                </IconButton>
            </Paper>
        </div>
    );
}

export default SearchBox;