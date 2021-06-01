import { useEffect, useState } from 'react';
import { getUser } from '../../api/user-api/UserAPI';

export const useUserProfileRetriver = (actions) => {
    console.log(`useUserProfileHook: ${actions}`);

    
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        getUserData("60b5d716d60175344015cc04");
    }, []);

    const getUserData = id => {
        getUser(id, result => {
            if (result.networkError || result.graphQLErrors) {
                setUserProfile({error: result});
            } else {
                console.log(`UserManagerHook: ${JSON.stringify(result)}`);
                setUserProfile(result);
            }
        });
    };
    // useEffect(() => {
    //     getUser("", result => {
    //         if (result.networkError || result.graphQLErrors) {
    //             setUserProfile({error: result});
    //         } else {
    //             console.log(`UserManagerHook: ${JSON.stringify(result)}`);
    //             setUserProfile(result);
    //         }
    //     });
    // },[]);

    return {
        userProfile,
        getUserData
    };
};