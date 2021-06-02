import gql from 'graphql-tag';
import { CORE_COLLEGE_FIELDS } from '../fragments/Fragments';

export const GET_COLLEGES_SCHEMA = gql`
    ${CORE_COLLEGE_FIELDS}
    query GetColleges{
        getcolleges{
            id
            ...CoreCollegeFields
        }
    }
`;

export const GET_COLLEGE_SCHEMA = gql`
    ${CORE_COLLEGE_FIELDS}
    query GetCollege($id: String!){
        getCollege(id: $id){
            id
            ...CoreCollegeFields
        }
    }
`;