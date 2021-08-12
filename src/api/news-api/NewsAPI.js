import React from 'react';
import { client } from '../../index';
import { GET_NEWS_SCHEMA } from '../news-api/NewsQueries';

export const loadNews = ({ country, lang }, callback) => {
    client
        .query({
            query: GET_NEWS_SCHEMA,
            fetchPolicy: "no-cache",
            variables: {
                country,
                lang
            }
        })
        .then((news) => {
            callback(news);
        })
        .catch((err) => {
            callback(err);
        });
};