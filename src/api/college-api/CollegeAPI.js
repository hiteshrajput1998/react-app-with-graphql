import React from 'react';
import { GET_COLLEGES_SCHEMA } from './CollegeQueries';
import { client } from '../../index';
import { DELETE_COLLEGES_BY_IDS_SCHEMA, DELETE_COLLEGE_SCHEMA } from './CollegeMutation';

export const loadColleges = (options, callback) => {
    client
        .query({
            query: GET_COLLEGES_SCHEMA,
            fetchPolicy: "no-cache"
        })
        .then(result => {
            callback(result);
        })
        .catch(error => {
            callback(error);
        });
};

export const deleteCollegeById2 = (id, callback) => {
    client
        .mutate({
            mutation: DELETE_COLLEGE_SCHEMA,
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

export const deleteCollegeByIds2 = (ids, callback) => {
    client
        .mutate({
            mutation: DELETE_COLLEGES_BY_IDS_SCHEMA,
            variables: { ids },
            fetchPolicy: "no-cache"
        })
        .then(result => {
            callback(result);
        })
        .catch(error => {
            callback(error);
        });
};