import gql from 'graphql-tag';
import { CORE_COLLEGE_FIELDS } from '../fragments/Fragments';

export const CREATE_COLLEGE_SCHEMA = gql`
    ${CORE_COLLEGE_FIELDS}
    mutation CreateCollege($input: CreateCollegeInput){
        createCollege(input: $input){
            message
            data{
                id
                ...CoreCollegeFields
            }
        }
    }
`;

export const UPDATE_COLLEGE_SCHEMA = gql`
    ${CORE_COLLEGE_FIELDS}
    mutation UpdateCollege($id: String!, $input: UpdateCollegeInput){
        updateCollege(id: $id, input: $input){
            message
            data{
                id
                ...CoreCollegeFields
            }
        }
    }
`;

export const DELETE_COLLEGE_SCHEMA = gql`
    ${CORE_COLLEGE_FIELDS}
    mutation DeleteCollege($id: String!){
        deleteCollege(id: $id){
            message
            data{
                id
                ...CoreCollegeFields
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