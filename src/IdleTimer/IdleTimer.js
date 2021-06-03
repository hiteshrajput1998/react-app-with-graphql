import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const useIdleTimer = (startTime) => {
    const [timer, setTimer] = useState(startTime);
    useEffect(() => {
        const myInterval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);
        const resetTimeout = () => {
            setTimer(startTime);
        };
        const events = [
            "click",
            "scroll",
            "keypress"
        ];
        for (let i in events) {
            window.addEventListener(events[i], resetTimeout);
        }
        return () => {
            clearInterval(myInterval);
            for (let i in events) {
                window.removeEventListener(events[i], resetTimeout);
            }
        };
    });
    return timer;
};

export default useIdleTimer;

useIdleTimer.propTypes = {
    startTime: PropTypes.number
};