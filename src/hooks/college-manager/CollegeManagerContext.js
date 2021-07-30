import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useCollegeManager } from './CollegeManagerHook';

export const CollegeContext = React.createContext();

export const CollegeContextProvider = ({ children, actions }) => {
    //console.log(`CollegeContextProvider`);
    //console.log(children);

    const {
        collegesData,
        getColleges,
        getCollege,
        addCollege,
        updateCollege,
        deleteCollegeById,
        deleteCollegeByIds
    } = useCollegeManager(actions);

    return (
        <CollegeContext.Provider value={{
            collegesData,
            getColleges,
            getCollege,
            addCollege,
            updateCollege,
            deleteCollegeById,
            deleteCollegeByIds
        }}>
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