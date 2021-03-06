import React, { useEffect } from 'react';
import i18n from "i18next";
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { AppBar, makeStyles, Toolbar, Typography, CssBaseline, Button, DRO, Select, MenuItem, ListItemIcon, ListItemText, InputLabel, FormControl } from '@material-ui/core';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import LeftDrawer from '../drawer/LeftDrawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    title: {
        flexGrow: 1,
    },
    menuItem: {
        maxHeight: '15%'
    }
}));

const Header = (props) => {

    const classes = useStyles();
    const { t } = useTranslation();
    let history = useHistory();

    const color = {
        color: 'white'
    };

    const handleTrantion = (e) => {
        console.log(e.target.value);

        let value = e.target.value;

        switch (value) {
            case "English":
                i18n.changeLanguage("en");
                localStorage.setItem("language", "en");
                break;
            case "Gujarati":
                i18n.changeLanguage("guj");
                localStorage.setItem("language", "guj");
                break;
            case "Hindi":
                i18n.changeLanguage("hin");
                localStorage.setItem("language", "hin");
                break;
            case "Swedish":
                i18n.changeLanguage("swedish");
                localStorage.setItem("language", "swedish");
                break;
            case "Japanese":
                i18n.changeLanguage("jap");
                localStorage.setItem("language", "jap");
                break;
            default:
                i18n.changeLanguage("en");
                localStorage.setItem("language", "en");
                break;
        }
    };

    const handleLogin = () => {
        history.push('/login');
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title} style={color}>
                        {
                            t('hr')
                        }
                    </Typography>
                    <Button color="inherit" onClick={handleLogin}>Login</Button>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Select
                            IconComponent={GTranslateIcon}
                            disableUnderline={true}
                            onChange={handleTrantion}
                            renderValue={() => {
                                return "";
                            }}
                            MenuProps={{ classes: { paper: classes.menuItem } }}
                        >
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Gujarati">Gujarati</MenuItem>
                            <MenuItem value="Hindi">Hindi</MenuItem>
                            <MenuItem value="Swedish">Swedish</MenuItem>
                            <MenuItem value="Japanese">Japanese</MenuItem>
                        </Select>
                    </div>
                </Toolbar>
            </AppBar>
            <LeftDrawer />
        </div>
    );
}

export default Header;