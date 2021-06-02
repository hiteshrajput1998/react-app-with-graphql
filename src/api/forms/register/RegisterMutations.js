import gql from 'graphql-tag';

export const Register_RECORD = gql`
    mutation registerUser($inputRegister: RegisterInput){
        registerUser(inputRegister: $inputRegister){
            message
            data {
                userName
                email
                created
                firstName
                lastName
                id
            }
        }
    }
    `;