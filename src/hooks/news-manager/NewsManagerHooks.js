import React, { useEffect, useRef, useState } from 'react';
import { loadNews } from '../../api/news-api/NewsAPI';

export const useNewsManager = (action) => {
    const [news, setNews] = useState();

    const getNewsHeading = async ({ country, lang }) => {

        loadNews({ country, lang }, result => {
            setNews(result);
        });
    };

    return {
        news,
        getNewsHeading
    }
}

export const useNewsVariable = (value) => {
    const currentRef = useRef();

    useEffect(() => {
        currentRef.current = value;
    });
    
    return currentRef.current;
};