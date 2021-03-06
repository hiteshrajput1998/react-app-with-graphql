import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LeftDrawer from '../drawer/LeftDrawer';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbar
} from '@material-ui/data-grid';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation, useQuery } from 'react-apollo';
import { GET_COLLEGES_SCHEMA } from '../../api/college-api/CollegeQueries';
import { ToastContainer, toast } from 'react-toastify';
import { Edit, Delete } from '@material-ui/icons';
import { DELETE_COLLEGES_BY_ID, DELETE_COLLEGES_BY_IDS_SCHEMA, DELETE_COLLEGE_SCHEMA } from '../../api/college-api/CollegeMutation';
import { useCollegeContext } from '../../hooks/college-manager/CollegeManagerContext';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 20,
        color: "black"
    },
    contentPd: {
        paddingBottom: '0px'
    },
    dataGridParent: {
        height: '400px'
    }
}));

// function CustomToolbar() {   // custom toolbar in grid
//     return (
//         <GridToolbarContainer style={{float: 'right'}}>
//             <GridToolbarExport />
//         </GridToolbarContainer>
//     );
// }

const Dashboard = (props) => {

    const { collegesData,
        getColleges,
        deleteCollegeById,
        deleteCollegeByIds } = useCollegeContext();

    const classes = useStyles();
    const { t } = useTranslation();
    const [rowsData, setRowsData] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [deleteParams, setDeleteParams] = useState({});

    const [selectedIds, setSelectedVal] = React.useState([]);
    //const { loading, error, data, refetch } = useQuery(GET_COLLEGES_SCHEMA, { errorPolicy: 'all' });


    useEffect(() => {
        getColleges();
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {

        if (Object(collegesData.data).getcolleges) {
            setRowsData(Object(collegesData.data).getcolleges);
        }
    }, [Object(collegesData.data).getcolleges, collegesData.error, rowsData]);

    const handleClose = () => {
        setDeleteParams({});
        setOpen(false);
    };

    const handleUpdate = (params) => {
        props.history.push({
            pathname: '/updateCollege/' + params.id,
            arguments: { ...params.row, updateCollege: true }
        });
    };

    const handleDelete = (params) => {
        setDeleteParams({
            id: params.id
        });
        setOpen(true);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'collegeName', headerName: 'College name', width: 130 },
        { field: 'address', headerName: 'Address', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            description: 'This column has contains update button.',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <strong>
                    <IconButton color="inherit" edge="end" onClick={() => handleUpdate(params)}>
                        <Edit />
                    </IconButton>
                </strong>
            )
        },
        {
            field: 'action2',
            headerName: 'Action',
            description: 'This column has contains delete button.',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <strong>
                    <IconButton color="inherit" edge="end" onClick={() => handleDelete(params)}>
                        <Delete />
                    </IconButton>
                </strong>
            ),
        },
    ];

    //Delete college through id
    // const [setMutationData] = useMutation(DELETE_COLLEGE_SCHEMA, {
    //     onError: ({ networkError, graphQLErrors }) => {
    //         if (graphQLErrors) {
    //             setErrors({ others: graphQLErrors.map(x => x.message)[0] })
    //         }

    //         if (networkError) {
    //             console.log(networkError);
    //             setErrors({ others: 'network error!' })
    //         }
    //         toast.error('Delete failed!');
    //     },
    //     onCompleted: ({ deleteCollege }) => {
    //         console.log(deleteCollege);
    //         setOpen(false);
    //         toast.success(deleteCollege.message);
    //         getColleges();
    //         //props.history.push('/dashboard');
    //     }
    // });

    //Delete colleges throgh id
    // const [setDeleteCollegesMutation] = useMutation(DELETE_COLLEGES_BY_IDS_SCHEMA, {
    //     onError: ({ networkError, graphQLErrors }) => {
    //         if (graphQLErrors) {
    //             setErrors({ others: graphQLErrors.map(x => x.message)[0] })
    //         }

    //         if (networkError) {
    //             console.log(networkError);
    //             setErrors({ others: 'network error!' })
    //         }
    //         toast.error('Delete failed!');
    //     },
    //     onCompleted: ({ deleteColleges }) => {
    //         console.log(deleteColleges);
    //         setOpen(false);
    //         toast.success(deleteColleges.message);
    //     }
    // });

    const handleDeleteConfirmation = async () => {

        if (deleteParams?.id) {
            deleteCollegeById(deleteParams?.id);
            setOpen(false);
        }

        if (deleteParams?.ids) {
            deleteCollegeByIds(deleteParams?.ids);
            setOpen(false);
        }
    };

    const handleSelection = (selectedArr) => {
        setSelectedVal(selectedArr);
        // remove it if it's already present - this means the user unchecked it
        // if (rowsToKeep.includes(e.data.id)) {
        //     for (var i = 0; i < rowsToKeep.length; i++) {
        //         if (rowsToKeep[i] === e.data.id) {
        //             rowsToKeep.splice(i, 1);
        //         }
        //     }
        // } else {
        //     // user clicked it - add it to the list of rows to keep.
        //     rowsToKeep.push(e.data.id);
        // }
    }

    const handlePurge = () => {
        setDeleteParams({
            ids: selectedIds
        });
        setOpen(true);
    }

    return (
        <>
            <div style={{ height: 400, width: '70%', marginLeft: '20%', marginRight: '20%' }}>
                {/* <Card className={classes.root} variant="outlined">
                    <CardContent className={classes.contentPd}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            List of College
                        </Typography>
                    </CardContent>
    </Card> */ }
                {rowsData.length > 0 ?
                    (
                        <div>
                            <div className={classes.dataGridParent}>
                                <DataGrid
                                    rows={rowsData}
                                    columns={columns}
                                    components={{
                                        Toolbar: GridToolbar,
                                    }}
                                    //onRowSelected={handleRowSelection}
                                    onSelectionModelChange={(newSelection) => {
                                        handleSelection(newSelection.selectionModel);
                                    }}
                                    pageSize={5}
                                    checkboxSelection />
                            </div>
                            <div>
                                <Button variant="contained" color="primary" startIcon={<DeleteIcon />} style={{ textTransform: "none" }} onClick={handlePurge}>
                                    Purge Records
                                </Button>
                            </div>
                        </div>
                    )


                    : <Card className={classes.root} variant="outlined">
                        <CardContent className={classes.contentPd}>
                            <Typography color="inherit" gutterBottom>
                                No data
                     </Typography>
                        </CardContent>
                    </Card>}

            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmation!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure want to delete ?
              </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
              </Button>
                    <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
                        Agree
              </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer autoClose={5000} />
        </>
    );
}

export default Dashboard;