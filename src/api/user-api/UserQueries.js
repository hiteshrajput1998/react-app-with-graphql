import gql from 'graphql-tag';
import { CORE_USER_FIELDS } from '../fragments/Fragments';

export const GET_USERS_SCHEMA = gql`
    ${CORE_USER_FIELDS}
    query GetUsers{
        getUsers{
            id
            ...CoreUserFields
        }
    }
`;

export const GET_USER_SCHEMA = gql`
    ${CORE_USER_FIELDS}
    query GetUser($id: String!){
        getUser(id: $id){
            id
            ...CoreUserFields
        }
    }
`;

export const CHECK_VERYFY_OTP_SCHEMA = gql`
    query VerifyOTP($otp: String!, $userName: String!){
        verifyOTP(otp: $otp, userName: $userName)
    }
`;