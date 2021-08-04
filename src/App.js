// import gql from 'graphql-tag';
import React, { useState } from 'react';
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
import ErrorBoundary from './error-boundry/ErrorBoundry';
import NetworkOffline from './components/check-network-status/NetworkOffline';
import NetworkOnline from './components/check-network-status/NetworkOnline';
const useStyles = makeStyles((theme) => ({

  content: {
    flexGrow: 1,
    margin: theme.spacing(3),
    marginTop: '10%'
  }
}));

function App(props) {
  const classes = useStyles();
  const [showBackOnline, setShowBackOnline] = useState(false);
  const [showOffline, setShowOffline] = useState(false);
  //const timer = useIdleTimer(120);

  // event called when network switch from online to offline
  window.onoffline = (event) => {
    setShowOffline(true);
  };

  // event called when network switch from offline to online
  window.ononline = (event) => {
    setShowOffline(false);
    setShowBackOnline(true);
  };

  return (
    <>
      <CollegeMainContextProvider>
        <UserProfileContextProvider>
          <ErrorBoundary>
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
        
        */}
              <Routes />
            </main>
            <SpeedDIal />
            <div className="footer">
              <Footer />
              {showBackOnline && <NetworkOnline />}
              {showOffline && <NetworkOffline />}
            </div>
          </ErrorBoundary>
        </UserProfileContextProvider>
      </CollegeMainContextProvider>
    </>
  );
}

export default withRouter(App);
