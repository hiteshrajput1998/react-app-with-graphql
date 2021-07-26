import React, { useEffect, useState } from 'react';

const NetworkOnline = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false)
        }, 5000)

        return () => {
            clearTimeout(timeId)
        }
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div className="backToOnline"><span>Back to online!</span></div>
    );
};

export default NetworkOnline;