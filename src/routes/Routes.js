import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import CreateUpdateCollege from '../components/forms/create-update-college/CreateUpdateCollege';
import LoginForm from "../components/forms/signin/LoginForm";
import SignUpForm from '../components/forms/signup/SignUpForm';
import NotFound from '../components/not-found/NotFound';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={LoginForm} />
            <Route path='/login' exact component={LoginForm} />
            <Route path='/register' component={SignUpForm} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/createCollege' exact  component={CreateUpdateCollege} />
            <Route path='/updateCollege/:id' component={CreateUpdateCollege} /> 
            <Route path="*" component={NotFound} />
        </Switch>
    )
};

export default Routes;