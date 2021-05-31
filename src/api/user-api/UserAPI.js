import { client } from '../../index';
import { GET_USERS_SCHEMA, GET_USER_SCHEMA } from './UserQueries';

export const loadUsers = (options, callback) => {
    client
        .query({
            query: GET_USERS_SCHEMA
        })
        .then(result => {
            console.log(result);
            callback(result);
        })
        .catch(error => {
            console.log(error);
            callback(error);
        });
};

export const getUser = (id, callback) => {
    console.log(`UserAPI: ${JSON.stringify(id)}`);
    client
        .query({
            query: GET_USER_SCHEMA,
            variables: { id },
            fetchPolicy: "no-cache"
        })
        .then(result => {
            console.log(result);
            callback(result);
        })
        .catch(error => {
            console.log(error);
            callback(error);
        });
};