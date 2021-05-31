// import gql from 'graphql-tag';
import React from 'react';
import Dashboard from './components/dashboard/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CreateUpdateCollege from './components/forms/create-update-college/CreateUpdateCollege';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import LeftDrawer from './components/drawer/LeftDrawer';
import Routes from './routes/Routes';
import { makeStyles } from '@material-ui/core';
import SpeedDIal from './components/speedDial/SpeedDial';
import useIdleTimer from './IdleTimer/IdleTimer';
import { withRouter } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { CollegeMainContextProvider } from './providers/CollegeMainContext';
import Profile from './components/profile/Profile';
import { UserProfileContextProvider } from './hooks/user-manager/UserProfileManagerContext';
// import { useQuery } from '@apollo/react-hooks';
// import { graphql, compose } from 'react-apollo';
// import { Provider } from 'react-redux';
// import Routes from './routes/Routes';
// import Header from './components/header/Header';
// import LeftDrawer from './components/drawer/LeftDrawer';
// import CreateUpdateCollege from './components/forms/create-update-college/CreateUpdateCollege';

// const GET_POKEMON_INFO = gql`
// query GetColleges{
//   getcolleges{
//     id
//     name
//     address
//   }
// }`;
const useStyles = makeStyles((theme) => ({

  content: {
    flexGrow: 1,
    margin: theme.spacing(3),
    marginTop: '10%'
  }
}));

function App(props) {
  console.log(`App props: ${JSON.stringify(props)}`);
  const classes = useStyles();
  //const timer = useIdleTimer(120);

  return (
    <CollegeMainContextProvider>
      <UserProfileContextProvider>
        <Header />
        <LeftDrawer />
        <main className={classes.content}>
          {/*
          timer > 0 ? <Routes /> :
            <div style={{ marginLeft: "20%" }}>
              <Alert variant="filled" severity="error">
                Logout due to user inactivity!
              </Alert>
            </div>
        <Routes />
        */}
          <Profile />
        </main>
        <SpeedDIal />
        <Footer />
      </UserProfileContextProvider>
    </CollegeMainContextProvider>

  );
}

export default withRouter(App);
