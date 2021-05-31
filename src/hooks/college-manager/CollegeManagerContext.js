import React, { useContext } from 'react';
import { useCollegesRetriver } from './CollegeManagerHook';

export const CollegeContext = React.createContext({});

export const CollegeContextProvider = ({ children, actions }) => {
    //console.log(`CollegeContextProvider`);
    //console.log(children);

    const collegeData = useCollegesRetriver(actions);
    //console.log(`CollegeData: ${JSON.stringify(collegeData)}`);

    return (
        <CollegeContext.Provider value={collegeData}>
            {children}
        </CollegeContext.Provider>
    )
};

export const useCollegeContext = () => {
    return useContext(CollegeContext);
};