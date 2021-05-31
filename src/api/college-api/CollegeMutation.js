import gql from 'graphql-tag';

export const CREATE_COLLEGE_SCHEMA = gql`
    mutation CreateCollege($input: CreateCollegeInput){
        createCollege(input: $input){
            message
            data{
                id
                collegeName
                address
            }
        }
    }
`;

export const UPDATE_COLLEGE_SCHEMA = gql`
    mutation UpdateCollege($id: String!, $input: UpdateCollegeInput){
        updateCollege(id: $id, input: $input){
            message
            data{
                id
                collegeName
                address
            }
        }
    }
`;

export const DELETE_COLLEGE_SCHEMA = gql`
    mutation DeleteCollege($id: String!){
        deleteCollege(id: $id){
            message
            data{
                id
                collegeName
                address
            }
        }
    }`;

export const DELETE_COLLEGES_BY_ID = gql`
    mutation DeleteColleges($ids: [String]!){
        deleteColleges(ids: $ids){
            message
        }
    }
`;