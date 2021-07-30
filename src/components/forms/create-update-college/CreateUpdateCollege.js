import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { toast, ToastContainer } from 'react-toastify';
import { validateCollegeForm } from '../../utils';
import { CREATE_COLLEGE_SCHEMA, UPDATE_COLLEGE_SCHEMA } from '../../../api/college-api/CollegeMutation';
import { GET_COLLEGE_SCHEMA } from '../../../api/college-api/CollegeQueries';
import { useMutation, useQuery } from 'react-apollo';
import { useCollegeContext } from '../../../hooks/college-manager/CollegeManagerContext';


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh"
    },
    container: {
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
        width: 180
    },
    iconUser: {
        height: 80,
        width: 200
    },
    grid: {
        backgroundColor: "lightblue"
    },
    cancelBtnRoot: {
        display: 'flex',
        justifyContent: 'center'
    }
}));



const CreateUpdateCollege = (props) => {

    const classes = useStyles();
    const {
        addCollege,
        updateCollege } = useCollegeContext();

    const [collegeData, setData] = useState({
        collegeName: '',
        address: ''
    });

    const [updateVar, setUpdateVar] = useState(false);
    const [updateId, setUpdateId] = useState(Object.keys(props.match.params).length > 0 ? props.match.params.id : '');

    const [errors, setErrors] = useState({
        collegeName: '',
        address: '',
        others: ''
    });




    const { loading, error, data, refetch } = useQuery(GET_COLLEGE_SCHEMA, {
        variables: { id: updateId }
    });


    useEffect(() => {
        if (Object.keys(props.match.params).length > 0 && data) {
            setUpdateVar(true);
            setData({
                collegeName: data ? data.getCollege[0].collegeName : '',
                address: data ? data.getCollege[0].address : ''
            })
        }
        // } else {
        //     setUpdateVar(false);
        //     setData({
        //         collegeName: '',
        //         address: ''
        //     })
        // }
    }, [props, data]);

    // const [setCreateCollegeMutation] = useMutation(CREATE_COLLEGE_SCHEMA, {
    //     onCompleted: (res) => {
    //         console.log(res);
    //         toast.success('College created!');
    //         props.history.push('/dashboard');
    //     },
    //     onError: ({ networkError, graphQLErrors }) => {
    //         if (networkError) {
    //             toast.error('networkError!');
    //             console.log(networkError);
    //             //setErrors({ others: networkError.map(x => x.message)[0] })
    //         }
    //         if (graphQLErrors) {
    //             toast.error('graphQLErrors!');
    //             console.log(graphQLErrors);
    //             //setErrors({ others: graphQLErrorst.map(x => x.message)[0] })
    //         }
    //     }
    // });

    const [setUpdateCollegeMutation] = useMutation(UPDATE_COLLEGE_SCHEMA, {
        onCompleted: (res) => {
            toast.success('Updated successfully');
            props.history.push('/dashboard');
        },
        onError: ({ networkError, graphQLErrors }) => {
            if (networkError) {
                toast.error('networkError!');
                console.log(networkError);
                //setErrors({ others: networkError.map(x => x.message)[0] })
            }
            if (graphQLErrors.length > 0) {
                toast.error('graphQLErrors!');
                console.log(graphQLErrors);
                //setErrors({ others: graphQLErrorst.map(x => x.message)[0] })
            }
        }
    });

    // useEffect(() => {
    //     console.log('useEffect called');
    //     if (firstRender.current) {
    //         firstRender.current = false
    //         return
    //     }
    //     const validationErrors = validateCollegeForm(data);
    //     console.log(validationErrors);
    //     setErrors(validationErrors);
    // }, [data])

    const updateField = async e => {
        e.preventDefault();
        setData({
            ...collegeData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log(props.location.arguments);
        const validationErrors = validateCollegeForm(collegeData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (updateId) {

            updateCollege(props.location.arguments.id, collegeData);
            props.history.push('/dashboard');
            // setUpdateCollegeMutation({
            //     variables: {
            //         id: props.location.arguments.id,
            //         input: collegeData
            //     }
            // });
        } else {
            
            addCollege(collegeData);
            props.history.push('/dashboard');
            // setCreateCollegeMutation({
            //     variables: {
            //         input: collegeData
            //     }
            // })
        }
    };

    const handleCancel = () => {
        props.history.push('/dashboard');
    }

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="xs">
                <Grid item className={classes.iconAdjust}>
                    <Typography variant="h4" component="h2">
                        {updateVar ? "Update College" : "Add College"}

                    </Typography>
                </Grid>

                <form>
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
                                        id="outlined-full-width"
                                        label="Name"
                                        name="collegeName"
                                        style={{ margin: 3 }}
                                        placeholder="CollegeName"
                                        fullWidth
                                        margin="normal"
                                        value={collegeData.collegeName}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        onChange={updateField}
                                    />
                                    {
                                        errors.collegeName &&
                                        <Alert variant="outlined" severity="error">
                                            {errors.collegeName} — check it out!
                                        </Alert>
                                    }

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-full-width"
                                        label="Add"
                                        name="address"
                                        style={{ margin: 3 }}
                                        placeholder="Address"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={collegeData.address}
                                        variant="outlined"
                                        onChange={updateField}
                                    />
                                    {
                                        errors.address &&
                                        <Alert variant="outlined" severity="error">
                                            {errors.address} — check it out!
                                        </Alert>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" fullWidth variant="contained" onClick={handleSubmit}>
                                {
                                    updateVar ? "Update" : "Add"
                                }
                            </Button>
                        </Grid>
                        <Grid item xs={12} className={classes.cancelBtnRoot}>
                            <Button color="default" size="small" variant="outlined" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <ToastContainer autoClose={5000} />
            </Container>
        </div>
    );
};

export default CreateUpdateCollege;