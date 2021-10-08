import { client } from '../../index';
import { RESEND_OTP_SCHEMA } from './UserMutations';
import { CHECK_VERYFY_OTP_SCHEMA, GET_USERS_SCHEMA, GET_USER_SCHEMA } from './UserQueries';

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

export const verifyOtp = ({ otp, userName }, callback) => {
    console.log(`opt: ${otp} userName: ${userName}`);

    client
        .query({
            query: CHECK_VERYFY_OTP_SCHEMA,
            variables: { otp, userName },
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
}

export const resendOtp = ({ email }, callback) => {
    console.log(`resendOtp request: ${email}`);

    client
        .mutate({
            mutation: RESEND_OTP_SCHEMA,
            variables: { email },
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
}