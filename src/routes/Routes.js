import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
// import Dashboard from '../components/dashboard/Dashboard';
// import CreateUpdateCollege from '../components/forms/create-update-college/CreateUpdateCollege';
import LoginForm from "../components/forms/signin/LoginForm";
import SignUpForm from '../components/forms/signup/SignUpForm';
import NotFound from '../components/not-found/NotFound';
// import Profile from '../components/profile/Profile';

const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));
const CreateUpdateCollege = lazy(() => import('../components/forms/create-update-college/CreateUpdateCollege'));
const Profile = lazy(() => import('../components/profile/Profile'));
const HeadingNews = lazy(() => import('../screens/top-heading-news/TopHeadingNews'));

const Routes = () => {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Switch>
                <Route path='/' exact component={LoginForm} />
                <Route path='/login' exact component={LoginForm} />
                <Route path='/register' component={SignUpForm} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/createCollege' exact component={CreateUpdateCollege} />
                <Route path='/updateCollege/:id' component={CreateUpdateCollege} />
                <Route path="/profile" component={Profile} />
                <Route path="/topHeadlineNews" component={HeadingNews} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Suspense>
    )
};

export default Routes;