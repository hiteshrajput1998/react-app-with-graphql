import React, { useRef, useState } from 'react';
import { Alert } from '@material-ui/lab';
import IdleTimer from 'react-idle-timer';
import { useIdleTimeContext } from '../../hooks/idletime-manager/IdleTimeManagerContext';

const SessionTimeout = (props) => {
    const { isAuthenticated, handleAuth } = useIdleTimeContext();
    const [countDown, setCountDown] = useState(10);
    let idleTimer = useRef();
    let timeout, countdownInterval;

    const onIdle = () => {
        if (isAuthenticated) {
            timeout = setTimeout(() => {
                let countDown = 10;
                setCountDown(countDown);
                countdownInterval = setInterval(() => {
                    if (countDown > 0) {
                        setCountDown(--countDown);
                    }
                }, 1000);
            }, 1000);
        }
    };

    const clearSessionInterval = () => {
        clearInterval(countdownInterval);
    };

    const clearSessionTimeout = () => {
        clearSessionInterval(timeout);
        clearTimeout(timeout);
    };

    const onActive = () => {
        if (!isAuthenticated) {
            clearSessionTimeout();
        }
    };

    console.log(countDown);
    console.log(isAuthenticated);
    return (
        <>
            <IdleTimer
                ref={idleTimer}
                onActive={onActive}
                onIdle={onIdle}
                debounce={250}
                timeout={1000}
            />
            {
                countDown < 1 &&
                <div style={{ marginLeft: "20%" }}>
                    <Alert variant="filled" severity="error">
                        Logout due to user inactivity!
                        </Alert>
                </div>

            }
        </>
    );
};

export default SessionTimeout;