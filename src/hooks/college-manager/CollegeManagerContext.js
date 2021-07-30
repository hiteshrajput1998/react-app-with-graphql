import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useCollegesRetriver } from './CollegeManagerHook';

export const CollegeContext = React.createContext();

export const CollegeContextProvider = ({ children, actions }) => {
    //console.log(`CollegeContextProvider`);
    //console.log(children);

    const [collegesData, getColleges, deleteResponse, deleteCollegeById, deleteCollegeByIds, error] = useCollegesRetriver(actions);

    return (
        <CollegeContext.Provider value={[collegesData, getColleges, deleteResponse, deleteCollegeById, deleteCollegeByIds, error]}>
            {children}
        </CollegeContext.Provider>
    )
};

export const useCollegeContext = () => {
    return useContext(CollegeContext);
};

CollegeContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};