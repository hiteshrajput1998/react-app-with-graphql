import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Container, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import FaceBook from '@material-ui/icons/Facebook';
import Instagram from '@material-ui/icons/Instagram';
import Twitter from '@material-ui/icons/Twitter';
import LinkedIn from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({

    footer: {
        width: '100%',
        background: '#3f51b5',
        color: 'white'
    },
    button: {
        margin: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    }
}));

const Footer = () => {

    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <div className={classes.footer}>
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" color="inherit" className={`${classes.title} MuiAppBar-positionFixed2`}>
                        ©{t('2021')} {t('hr')}
                    </Typography>
                    <IconButton color="inherit" edge="end" >
                        <FaceBook />
                    </IconButton>
                    <IconButton color="inherit" edge="end">
                        <Instagram />
                    </IconButton>
                    <IconButton color="inherit" edge="end">
                        <Twitter />
                    </IconButton>
                    <IconButton color="inherit" edge="end">
                        <LinkedIn />
                    </IconButton>
                </Toolbar>
            </Container>
        </div>
    );
}

export default Footer;
