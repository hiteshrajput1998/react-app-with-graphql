import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useUserProfileRetriver } from '../../hooks/user-manager/UserProfileHook';
import { useUserProfileContext } from '../../hooks/user-manager/UserProfileManagerContext';


const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        backgroundColor: 'whitesmoke'
    },
    media: {
        width: '75%',
        objectFit: 'cover',
    },
    avatar: {
        backgroundColor: "red",
    },
}));

function Profile(props) {

    const classes = useStyles();


    const { userProfile, getUserData } = useUserProfileContext();
    console.log(`GetUser: ${JSON.stringify(userProfile)}`);

    const [open, setOpen] = useState(true);
    const [scoll, setScroll] = useState("paper");
    const [profile, setProfile] = useState();

    useEffect(() => {
        if (userProfile) {
            console.log(`userProfile: ${JSON.stringify(userProfile)}`);
            //setProfile(data.userProfile.data.getUser);
        }
    }, [userProfile]);

    const handleClickOpen = scroll => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scoll}
                aria-labelledby="scroll-dialog-title"
            >
                <DialogTitle id="scroll-dialog-title">Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            title="HR"
                            subheader="September 14, 2016"
                        />
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                className={classes.media}
                                height="140"
                                image="./logo192.png"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Profile
                                </Typography>
                                <Typography component="p">
                                    Hitesh Rajput
                                </Typography>
                                <Typography component="p">
                                    hitesh@gmail.com
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Profile;