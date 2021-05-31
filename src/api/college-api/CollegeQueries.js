import gql from 'graphql-tag';

export const GET_COLLEGES_SCHEMA = gql`
    query GetColleges{
        getcolleges{
            id
            collegeName
            address
        }
    }
`;

export const GET_COLLEGE_SCHEMA = gql`
    query GetCollege($id: String!){
        getCollege(id: $id){
            id
            collegeName
            address
        }
    }
`;