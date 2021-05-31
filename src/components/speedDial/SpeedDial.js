import React from 'react';
import { withRouter } from 'react-router-dom';
import { Backdrop, makeStyles } from '@material-ui/core';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import HomeIcon from '@material-ui/icons/Home';
import ImageIcon from '@material-ui/icons/Image';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(4),
    },
}));


function SpeedDIal(props) {
    console.log(`props: ${JSON.stringify(props)}`);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const actions = [
        { icon: <HomeIcon />, name: 'Home' },
        { icon: <ImageIcon />, name: 'Image' },
        { icon: <PersonIcon />, name: 'Profile' },
        { icon: <PermContactCalendarIcon />, name: 'ContactUs' },
        { icon: <ExitToAppIcon />, name: 'Logout' },
    ];

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSpeedDialAction = (action) => {
        console.log(action);

        switch (action.name) {
            case "Home":
                props.history.push('/dashboard');
                break;
            case "Image":

                break;
            case "Video":

                break;
            case "ContactUs":

                break;
            case "Logout":
                props.history.push('/login');
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial"
                className={classes.speedDial}
                icon={<PersonIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={(e) => {
                            handleSpeedDialAction(action)
                        }}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}

export default withRouter(SpeedDIal);