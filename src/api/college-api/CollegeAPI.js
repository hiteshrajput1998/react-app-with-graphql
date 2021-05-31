import React from 'react';
import { useQuery } from 'react-apollo';
import { GET_COLLEGES_SCHEMA } from './CollegeQueries';
import { client } from '../../index';
import { DELETE_COLLEGE_SCHEMA } from './CollegeMutation';

export const loadColleges = (options, callback) => {
    client
        .query({
            query: GET_COLLEGES_SCHEMA
        })
        .then(result => {
            callback(result);
        })
        .catch(error => {
            callback(error);
        });
};

export const deleteCollegeById = (id, callback) => {
    client
        .mutate({
            query: DELETE_COLLEGE_SCHEMA,
            variables: { id },
            fetchPolicy: "no-cache"
        })
        .then(result => {
            callback(result);
        })
        .catch(error => {
            callback(error);
        });
};