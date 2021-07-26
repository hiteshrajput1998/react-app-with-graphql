import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { validateLoginForm, validateOTPForm } from '../../utils';
import { Login_RECORD } from '../../../api/forms/login/LoginMutations';
import { ToastContainer, toast } from 'react-toastify';
import { CHECK_VERYFY_OTP_SCHEMA } from '../../../api/user-api/UserQueries';
import { RESEND_OTP_SCHEMA } from '../../../api/user-api/UserMutations';




const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh"
    },
    container: {
        // position: "absolute",
        // top: "30%",
        backgroundColor: "rgb(242,243,244)",
        borderRadius: "10px",
        padding: "20px"
    },
    paper: {
        height: 140,
        maxWidth: 100,
    },
    iconAdjust: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px"
    },
    iconAvatar: {
        height: 120,
        width: 120
    },
    iconUser: {
        height: 80,
        width: 200
    },
    grid: {
        backgroundColor: "lightblue"
    }
}));

const LoginForm = (props) => {

    const firstRender = useRef(true)
    const classes = useStyles();
    const [data, setData] = useState({
        userName: '',
        password: ''
    });
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState();

    const [errors, setErrors] = useState({
        userName: '',
        password: '',
        others: '',
        otp: ''
    });

    const [setMutationData] = useMutation(Login_RECORD, {
        onError: (error) => {
            console.log(Object(JSON.stringify(error)));
            const { networkError, graphQLErrors } = error;
            if (graphQLErrors) {
                setErrors({ others: graphQLErrors.map(x => x.message)[0] })
            }

            if (networkError) {
                console.log(networkError);
                setErrors({ others: 'network error!' })
            }
            toast.error('Login failed!');
        },
        onCompleted: ({ loginUser }) => {
            console.log(loginUser.token);
            toast.success(loginUser.message);
            localStorage.setItem("AUTH_TOKEN", loginUser.token);
            setOpen(true);
        }
    });

    const [setResendOtp] = useMutation(RESEND_OTP_SCHEMA, {
        onError: (error) => {
            const { networkError, graphQLErrors } = error;
            if (graphQLErrors) {
                setErrors({ others: graphQLErrors.map(x => x.message)[0] })
            }

            if (networkError) {
                console.log(networkError);
                setErrors({ others: 'network error!' })
            }
            toast.error('Login failed!');
        }
    });

    // const [VerifyOTP] = useMutation(CHECK_VERYFY_OTP_SCHEMA, {
    //     onError: (error) => {
    //         console.log(Object(JSON.stringify(error)));
    //         const { networkError, graphQLErrors } = error;
    //         if (graphQLErrors) {
    //             setErrors({ others: graphQLErrors.map(x => x.message)[0] })
    //         }

    //         if (networkError) {
    //             console.log(networkError);
    //             setErrors({ others: 'network error!' })
    //         }
    //         toast.error('Login failed!');
    //     },
    //     onCompleted: ({ verifyOTP }) => {
    //         console.log(verifyOTP);
    //         toast.success(verifyOTP);
    //     }
    // });

    useEffect(() => {
        console.log('useEffect called');
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        const validationErrors = validateLoginForm(data);
        console.log(validationErrors);
        setErrors(validationErrors);
    }, [data])

    useEffect(() => {
        const validationErrors = validateOTPForm(otp);
        console.log(validationErrors);
        setErrors(validationErrors);
    }, [otp])

    const updateField = async e => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log(data);
        const validationErrors = validateLoginForm(data);
        console.log(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_KEY).toString();
        console.log(encrypted);
        // const bytes = CryptoJS.AES.decrypt(encrypted, process.env.REACT_APP_SECRET_KEY);
        // console.log(`bytes: ${JSON.stringify(bytes)}`);
        // let data3 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log(`data: ${JSON.stringify(data3)}`);
        setMutationData({
            variables: {
                data2: encrypted
            },
        });
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOTP = (e) => {
        console.log(e.target.value);
        setOtp(e.target.value)
    };

    const handleResendOtp = () => {
        setResendOtp({
            variables: {
                email: this.stat
            }
        })
    };

    const handleOTPVerification = () => {
        console.log(otp);

        const validationErrors = validateOTPForm(otp);
        console.log(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // VerifyOTP({
        //     variables: {
        //         otp: otp,
        //         userName: data.userName
        //     }
        // });
    };


    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="xs">
                <Grid item className={classes.iconAdjust}>
                    <Avatar className={classes.iconAvatar}>
                        <FontAwesomeIcon icon={faUser} size="3x" />
                    </Avatar>
                </Grid>

                <form >
                    {
                        errors.others
                        &&
                        <Alert variant="outlined" severity="error" style={{ marginBottom: "20px" }}>
                            {errors.others}
                        </Alert>
                    }
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="UserName"
                                        name="userName"
                                        size="small"
                                        variant="outlined"
                                        onChange={updateField}
                                    />
                                    {
                                        errors.userName &&
                                        <Alert variant="outlined" severity="error">
                                            {errors.userName} — check it out!
                                        </Alert>
                                    }

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                        onChange={updateField}
                                    />
                                    {
                                        errors.password &&
                                        <Alert variant="outlined" severity="error">
                                            {errors.password} — check it out!
                                        </Alert>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" fullWidth variant="contained" onClick={handleSubmit}>
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <ToastContainer autoClose={5000} />
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"OTP verification !"}</DialogTitle>
                <DialogContent>
                    {
                        errors.otp &&
                        <Alert variant="outlined" severity="error">
                            {errors.otp}!
                        </Alert>
                    }
                    <TextField
                        fullWidth
                        label="OTP"
                        name="otp"
                        size="small"
                        type="password"
                        variant="outlined"
                        onChange={handleOTP}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleResendOtp} color="primary">
                        Resend otp
                    </Button>
                    <Button onClick={handleOTPVerification} color="primary" autoFocus>
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LoginForm;