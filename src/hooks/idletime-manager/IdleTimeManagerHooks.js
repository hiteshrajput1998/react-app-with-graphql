import { useState } from "react";

export const useIdleTimeManager = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    console.log(isAuthenticated);

    const handleAuth = () => {
        setAuthenticated(!isAuthenticated);
    };

    return {
        isAuthenticated,
        handleAuth
    };
};