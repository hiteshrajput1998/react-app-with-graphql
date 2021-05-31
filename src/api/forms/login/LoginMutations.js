import gql from 'graphql-tag';

export const Login_RECORD = gql`
    mutation loginUser($data2: String!){
        loginUser(data2: $data2){
            token
        }
    }
`;