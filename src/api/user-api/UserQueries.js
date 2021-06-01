import gql from 'graphql-tag';


export const GET_USERS_SCHEMA = gql`
    query GetColleges{
        getcolleges{
            id
            userName
            email
            created
        }
    }
`;

export const GET_USER_SCHEMA = gql`
    query GetUser($id: String!){
        getUser(id: $id){
            id
            userName
            email
            created
            firstName
            lastName
        }
    }
`;