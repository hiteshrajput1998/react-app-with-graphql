import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIdleTimeManager } from './IdleTimeManagerHooks';

export const IdleTimeContext = React.createContext();

export const IdleTimeContextProvider = ({ children, action }) => {
    const { isAuthenticated, handleAuth } = useIdleTimeManager(action);

    return (
        <IdleTimeContext.Provider value={{ isAuthenticated, handleAuth }} >
            {children}
        </IdleTimeContext.Provider>
    )
};

export const useIdleTimeContext = () => {
    return useContext(IdleTimeContext);
};

IdleTimeContextProvider.prototype = {
    children: PropTypes.node.isRequired,
};
