import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useUserProfileRetriver } from './UserProfileHook';

export const UserProfileContext = React.createContext({});

export const UserProfileContextProvider = ({ children, actions }) => {
    console.log(`userProfile Context: ${actions}`);

    const profileData = useUserProfileRetriver(actions);
    console.log(`profileData: ${JSON.stringify(profileData)}`);

    return (
        <UserProfileContext.Provider value={profileData}>
            {children}
        </UserProfileContext.Provider>
    )
};

export const useUserProfileContext = () => {
    return useContext(UserProfileContext);
};

UserProfileContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    actions: PropTypes.object
};