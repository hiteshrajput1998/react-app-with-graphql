import gql from 'graphql-tag';

export const CORE_COLLEGE_FIELDS = gql`
    fragment CoreCollegeFields on College{
        collegeName
        address
    }
`;

export const CORE_USER_FIELDS = gql`
    fragment CoreUserFields on User{
        userName
        email
        created
        firstName
        lastName
    }
`;