import Joi from 'joi-browser';
import { REGISTRATION_VALIDATE_SCHEMA } from "./schemas";

export const validateLoginForm = (value) => {
    let errors = {};

    if (!value.userName) {
        errors.userName = 'UserName is required!';
    } else if (value.userName.length < 3) {
        errors.userName = 'UserName length must be at least 3 characters long'
    }

    if (!value.password) {
        errors.password = 'Password is required!';
    }
    else if (value.password.length < 4) {
        errors.password = 'Password must be 4 character';
    }

    return errors;
};

export const validateOTPForm = (value) => {
    let errors = {};

    if (!value) {
        errors.otp = 'OTP is required';
    } else if (value.length < 6 || value.length > 6) {
        errors.otp = 'OTP length must be 6 number long';
    } else if (isNaN(value)) {
        errors.otp = 'OTP must be number';
    }

    return errors;
};


// export const validateSignupForm = (value) => {
//     let errors = {};

//     if (!value.userName) {
//         errors.userName = 'UserName is required!';
//     } else if (value.userName.length < 3) {
//         errors.userName = 'UserName length must be at least 3 characters long'
//     }

//     if (!value.email) {
//         errors.email = 'Email is required!';
//     }

//     if (!value.password) {
//         errors.password = 'Password is required!';
//     }
//     else if (value.password.length < 4) {
//         errors.password = 'Password must be 4 character';
//     }

//     if (!value.address.zipCode) {
//         errors.zipCode = 'Zipcode is required!';
//     }

//     return errors;
// };

export const validateSignupForm = (value) => {
    let errors = {};

    let validateResponse = Joi.validate(value, REGISTRATION_VALIDATE_SCHEMA, { abortEarly: false });

    if (validateResponse.error) {
        validateResponse.error.details.map(err => ErrorDetails(err.path[0], err.message, errors));
    }

    return errors;
};

function ErrorDetails(field, message, errors) {
    const regex = /"/gi;

    return errors[field] = message.replace(regex, '');
}

export const validateCollegeForm = (value) => {
    let errors = {};

    if (!value.collegeName) {
        errors.collegeName = 'College is required!';
    } else if (value.collegeName.length < 3) {
        errors.collegeName = 'CollegeName must be at least 3 character.';
    }

    if (!value.address) {
        errors.address = 'Address is required!';
    }

    return errors;
}