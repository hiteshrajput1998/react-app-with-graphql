import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useUserProfileContext } from '../../hooks/user-manager/UserProfileManagerContext';
import ProfileImage from './prof2.png';


const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 280,
        backgroundColor: 'whitesmoke'
    },
    media: {
        width: '100%',
        objectFit: 'cover',
    },
    avatar: {
        backgroundColor: "red",
    },
}));

function Profile(props) {
    const classes = useStyles();

    const { userProfile, getUserData } = useUserProfileContext();
    // if (!props) {
    //     getUserData("60b5d716d60175344015cc04");
    // }

    const [open, setOpen] = useState(true);
    const [scoll, setScroll] = useState("paper");
    const [profile, setProfile] = useState({});

    useEffect(() => {
        if (userProfile) {
            console.log(`userProfile: ${JSON.stringify(userProfile)}`);

            let userd = userProfile.data?.getUser;
            setProfile(userd);
        }
    }, [userProfile]);

    const handleClose = () => {
        setOpen(false);
        props.history.push('/dashboard');
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
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                className={classes.media}
                                height="200"
                                image={ProfileImage}
                            />
                            <CardContent>
                                <CardHeader
                                    style={{padding: "10px 0px 10px 0px"}}
                                    avatar={
                                        <Avatar aria-label="Recipe" className={classes.avatar}>
                                            {String(profile?.firstName).charAt(0) + String(profile?.lastName).charAt(0)}
                                        </Avatar>
                                    }
                                    title={<Typography gutterBottom variant="h5" component="h2">
                                            {profile?.firstName + "    " + profile?.lastName}
                                        </Typography>}
                                    subheader={<Typography component="h6">
                                                Software Engineer
                                            </Typography>}
                                />
                                <Typography component="h6">
                                    {profile?.email}
                                </Typography>
                                <Typography component="h6">
                                    {profile?.created}
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