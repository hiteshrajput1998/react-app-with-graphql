import React from 'react';
import { useHistory } from "react-router-dom";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RssFeedOutlinedIcon from '@material-ui/icons/RssFeedOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 200,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 200,
    },
}));
const LeftDrawer = (props) => {
    let history = useHistory();
    const classes = useStyles();
    const { t } = useTranslation();
    const leftDrawerItems = [
        {
            key: 'dashboard',
            icon: <MailIcon />
        },
        {
            key: 'createCLG',
            icon: <AddCircleOutlineIcon />
        },
        {
            key: 'topHeading',
            icon: <RssFeedOutlinedIcon />
        },
        {
            key: 'setting',
            icon: <SettingsIcon />
        }
    ];

    const handleLeftDrawer = (index) => {
        console.log(index);

        switch (index) {
            case 0:
                history.push('/dashboard');
                break;
            case 1:
                history.push('/createCollege');
                break;
            case 2:
                history.push('/topHeadlineNews');
                break;
            default:
                break;
        }
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {leftDrawerItems.map((text, index) => (
                        <>
                            <ListItem button key={text} onClick={() => handleLeftDrawer(index)}>
                                <ListItemIcon>{text.icon}</ListItemIcon>
                                <ListItemText primary={t(text.key)} />
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </div>
        </Drawer>
    );
};

export default LeftDrawer;