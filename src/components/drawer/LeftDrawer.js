import React from 'react';
import { useHistory } from "react-router-dom";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
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
    console.log(`leftDrawer: ${JSON.stringify(history)}`);
    const classes = useStyles();
    const { t } = useTranslation();

    const handleLeftDrawer = (index) => {
        console.log(index);

        switch (index) {
            case 0:
                history.push('/dashboard');
                break;
            case 1:
                history.push('/createCollege');
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
                    {[t("dashboard"), t("createCLG"), t("setting")].map((text, index) => (
                        <>
                            <ListItem button key={text} onClick={() => handleLeftDrawer(index)}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
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