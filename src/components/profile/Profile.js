import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useUserProfileContext } from '../../hooks/user-manager/UserProfileManagerContext';
import ProfileImage from './prof2.png';
import { ToastContainer, toast } from 'react-toastify';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


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
    const [uploadImg, setUploadImg] = useState();
    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        width: 80,
        height: 80,
    });
    const [imageRef, setImageRef] = useState();

    const [croppedImage, setCroppedImage] = useState();

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

    const onImageLoaded = async (image) => {
        setImageRef(image)
    }

    const onCropComplete = async (crop) => {
        console.log(`onCroppedComplete`);
        if (imageRef && crop.x && crop.y) {
            const croppedImage = await getCroppedImg(imageRef, crop);
            setCroppedImage(croppedImage);
        }
    }

    const uploadFile = (e) => {
        console.log(e.target.files);
        let file = e.target.files;
        let allowedExtentions = /(jpg|jpeg|png)$/i;

        if (file) {
            let fType = file[0]?.type;
            let fSize = Math.round((file[0]?.size / 1024) / 1024).toFixed(2);

            if (!allowedExtentions.exec(fType)) {
                toast.error('Invalid image type');
                return;
            }

            if (fSize > 5) {
                toast.error('Payload is too large, it must be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setUploadImg(reader.result)
            );
            reader.readAsDataURL(file[0]);
        }
    }

    // const createImage = (url) =>
    //     new Promise((resolve, reject) => {
    //         const image = new Image()
    //         image.addEventListener('load', () => resolve(image))
    //         image.addEventListener('error', error => reject(error))
    //         image.setAttribute('crossOrigin', 'anonymous')
    //         image.src = url
    //     });

    const getCroppedImg = (image, crop) => {
        const canvas = document.createElement('canvas');
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        console.log(canvas.width, canvas.height);

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    let fileUrl;
                    if (!blob) {
                        return;
                    }
                    blob.name = "croppedImg";
                    window.URL.revokeObjectURL(fileUrl);
                    fileUrl = window.URL.createObjectURL(blob);
                    resolve(fileUrl);
                },
                'image/jpeg',
                1
            );
        });
    }

    const onCropChange = (crop) => {
        setCrop(crop);
    }

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
                            <div style={{ height: '140px', backgroundImage: `url(${croppedImage ? croppedImage : ProfileImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                            </div>
                            {/*<CardMedia
                                component="img"
                                style={{ maxWidth: '100%', height: '140px' }}
                                // className={classes.media}
                                image={croppedImage ? croppedImage : ProfileImage}
                            />*/}
                            <input type="file" name="profile" onChange={uploadFile} />
                            {
                                uploadImg &&
                                <ReactCrop
                                    src={uploadImg}
                                    crop={crop}
                                    onImageLoaded={onImageLoaded}
                                    onComplete={onCropComplete}
                                    onChange={onCropChange}
                                />
                            }
                            <CardContent>
                                <CardHeader
                                    style={{ padding: "10px 0px 10px 0px" }}
                                    avatar={
                                        <Avatar aria-label="Recipe" className={classes.avatar}>
                                            {String(profile?.firstName ?? "P").charAt(0) + String(profile?.lastName ?? "R").charAt(0)}
                                        </Avatar>
                                    }
                                    title={<Typography gutterBottom variant="h5" component="h2">
                                        {profile?.firstName ?? "Unknown"} {profile?.lastName ?? "Unknown"}
                                    </Typography>}
                                    subheader={<Typography component="h6">
                                        Software Engineer
                                            </Typography>}
                                />
                                <Typography component="h6">
                                    {profile?.email ?? "Unknown"}
                                </Typography>
                                <Typography component="h6">
                                    {profile?.created ?? "Unknown"}
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
            <ToastContainer autoClose={5000} />
        </>
    );
}

export default Profile;