import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, Button, Container, Grid, Paper } from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { validateSignupForm } from '../../utils';
import { Register_RECORD } from '../../../api/forms/register/RegisterMutations';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "62vh"
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

const SignUpForm = (props) => {

    const firstRender = useRef(true);
    const classes = useStyles();
    const [data, setData] = useState({
        userName: '',
        password: '',
        email: '',
        created: '',
        firstName: '',
        lastName: ''
    });

    const [errors, setErrors] = useState({
        userName: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        zipCode: '',
        other: ''
    });

    const [address, setAddress] = useState({
        zipCode: null,
        city: null,
        state: null,
    });

    const cache = useRef({});

    const [setMutationData] = useMutation(Register_RECORD, {
        onCompleted: (res) => {
            console.log(res);
            toast.success('Registered successfully!!');
            //localStorage.setItem("AUTH_TOKEN", loginUser.token);
        },
        onError: ({ networkError, graphQLErrors }) => {
            if (networkError) {
                toast.error('Signup failed!');
                setErrors({ others: networkError.map(x => x.message)[0] })
            }

            if (graphQLErrors) {
                toast.error('Signup failed!');
                setErrors({ others: graphQLErrors.map(x => x.message)[0] })
            }
        },
    });

    useEffect(() => {
        console.log('useEffect called');
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        const validationErrors = validateSignupForm(data);
        console.log(validationErrors);
        setErrors(validationErrors);
    }, [data]);

    useEffect(() => {
        const url = `https://api.postalpincode.in/pincode/${address.zipCode}`;

        const setCityState = async () => {
            if (cache.current[url]) {
                const data = cache.current[url];
                console.log(data);

                setAddress({
                    zipCode: address.zipCode || '',
                    city: (data.data[0]?.PostOffice[0]?.District).toLowerCase() || '',
                    state: (data.data[0]?.PostOffice[0]?.State).toLowerCase() || ''
                });
            }
            else {
                await axios(url)
                    .then(response => {
                        if (response.data[0].Status === 'Error') {
                            setErrors({
                                zipCode: response.data[0]?.Message
                            });
                        }
                        else {
                            cache.current[url] = response;
                            setAddress({
                                zipCode: address.zipCode || '',
                                city: (response.data[0]?.PostOffice[0]?.District).toLowerCase() || '',
                                state: (response.data[0]?.PostOffice[0]?.State).toLowerCase() || ''
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        };

        if (address.zipCode && address.zipCode.length > 5) {
            setCityState();
        }
    }, [address.zipCode]);

    console.log(address);

    const updateField = async e => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log(data);
        const validationErrors = validateSignupForm(data);
        console.log(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        data.created = Date.now().toString();
        console.log(data);
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_KEY).toString();
        console.log(encrypted);
        // const bytes = CryptoJS.AES.decrypt(encrypted, process.env.REACT_APP_SECRET_KEY);
        // console.log(`bytes: ${JSON.stringify(bytes)}`);
        // let data3 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log(`data: ${JSON.stringify(data3)}`);
        setMutationData({
            variables: {
                inputRegister: data
            }
        });
    }

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="xs">
                <Grid item className={classes.iconAdjust}>
                    <Avatar className={classes.iconAvatar}>
                        <FontAwesomeIcon icon={faUserPlus} size="3x" />
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
                                        label="Email"
                                        name="email"
                                        size="small"
                                        variant="outlined"
                                        onChange={updateField}
                                    />
                                    {
                                        errors.email &&
                                        <Alert variant="outlined" severity="error">
                                            {errors.email} — check it out!
                                        </Alert>
                                    }

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="firstName"
                                        name="firstName"
                                        size="small"
                                        variant="outlined"
                                        onChange={updateField}
                                    />
                                    {
                                        errors.firstName &&
                                        <Alert variant="outlined" severity="error">
                                            {errors.firstName} — check it out!
                                        </Alert>
                                    }

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="LastName"
                                        name="lastName"
                                        size="small"
                                        variant="outlined"
                                        onChange={updateField}
                                    />
                                    {
                                        errors.lastName &&
                                        <Alert variant="outlined" severity="error">
                                            {errors.lastName} — check it out!
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
                                <Grid item xs={12}>
                                    <Autocomplete
                                        value={address.zipCode ?? ''}
                                        // onChange={(event, newValue) => {
                                        //     setAddress({ zipCode: (newValue.replace(/[^\d{6}]$/, "").substr(0, 6)) });
                                        // }}
                                        inputValue={address.zipCode ?? ''}
                                        onInputChange={(event, newInputValue) => {
                                            setErrors({ zipCode: '' });
                                            setAddress({ zipCode: (newInputValue.replace(/[^\d{6}]$/, "").substr(0, 6)) });
                                        }}
                                        id="controllable-states-demo"
                                        options={['380022']}
                                        style={{ width: 200 }}
                                        renderInput={(params) => <TextField {...params} label="Zipcode" variant="outlined" />}
                                    />
                                </Grid>
                                {
                                    errors.zipCode &&
                                    <Alert variant="outlined" severity="error" style={{ marginLeft: '2%' }}>
                                        {errors.zipCode} — check it out!
                                    </Alert>
                                }
                                {(address.city !== null) && (address.state !== undefined) ? (<Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="city"
                                        name="city"
                                        size="small"
                                        value={address.city}
                                        variant="outlined"
                                    />
                                </Grid>) : ''
                                }
                                {(address.state !== null) && (address.state !== undefined) ? (<Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="state"
                                        name="state"
                                        size="small"
                                        value={address.state}
                                        variant="outlined"
                                    />
                                </Grid>) : ''
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" fullWidth variant="contained" onClick={handleSubmit}>
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <ToastContainer autoClose={5000} />
            </Container>
        </div>
    );
}

export default SignUpForm;