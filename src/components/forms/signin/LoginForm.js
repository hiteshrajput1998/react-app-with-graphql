import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, Button, Container, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { validateLoginForm } from '../../utils';
import { Login_RECORD } from '../../../api/forms/login/LoginMutations';
import { ToastContainer, toast } from 'react-toastify';




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

    const [errors, setErrors] = useState({
        userName: '',
        password: '',
        others: ''
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
            toast.success("Login successfully!");
            //setTostify(true);
            localStorage.setItem("AUTH_TOKEN", loginUser.token);
        }
    });

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
        </div>
    );
}

export default LoginForm;