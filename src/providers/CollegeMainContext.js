import React from 'react';
import PropTypes from 'prop-types';
import { CollegeContextProvider } from '../hooks/college-manager/CollegeManagerContext';

export const CollegeMainContextProvider = ({ children, actions }) => {

    console.log(`CollegeMainContextProvider`);
    console.log(children);
    return (
        <CollegeContextProvider actions={actions}>
            {children}
        </CollegeContextProvider>
    );
};

CollegeMainContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    actions: PropTypes.object
};