import gql from 'graphql-tag';

export const RESEND_OTP_SCHEMA = gql`
    mutation sendOtpToEmail($email: String!){
        sendOtpToEmail(email: $email)
    }
`;