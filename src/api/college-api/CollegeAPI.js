import React from 'react';
import { GET_COLLEGES_SCHEMA } from './CollegeQueries';
import { client } from '../../index';
import { CREATE_COLLEGE_SCHEMA, DELETE_COLLEGES_BY_IDS_SCHEMA, DELETE_COLLEGE_SCHEMA, UPDATE_COLLEGE_SCHEMA } from './CollegeMutation';

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

export const createCollege = (input, callback) => {
    client
        .mutate({
            mutation: CREATE_COLLEGE_SCHEMA,
            variables: { input },
        })
        .then(result => {
            console.log(result);
            callback(result);
        })
        .catch(error => {
            callback(error);
        });
};

export const updateCollegeInfo = ({ id, input }, callback) => {
    client
        .mutate({
            mutation: UPDATE_COLLEGE_SCHEMA,
            variables: { id, input }
        })
        .then(result => {
            callback(result);
        })
        .catch(error => {
            callback(error);
        });
};

export const removeCollegeById = (id, callback) => {
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

export const removeCollegeByIds = (ids, callback) => {
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