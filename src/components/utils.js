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

export const validateSignupForm = (value) => {
    let errors = {};

    if (!value.userName) {
        errors.userName = 'UserName is required!';
    } else if (value.userName.length < 3) {
        errors.userName = 'UserName length must be at least 3 characters long'
    }

    if (!value.email) {
        errors.email = 'Email is required!';
    }

    if (!value.password) {
        errors.password = 'Password is required!';
    }
    else if (value.password.length < 4) {
        errors.password = 'Password must be 4 character';
    }

    return errors;
};

export const validateCollegeForm = (value) => {
    let errors = {};

    if (!value.collegeName) {
        errors.collegeName = 'College is required!';
    }else if(value.collegeName.length < 3){
        errors.collegeName = 'CollegeName must be at least 3 character.';
    }

    if (!value.address) {
        errors.address = 'Address is required!';
    }

    return errors;
}