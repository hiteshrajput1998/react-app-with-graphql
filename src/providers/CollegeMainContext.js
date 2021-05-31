import React from 'react';
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