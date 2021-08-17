import Joi from 'joi-browser';

export const REGISTRATION_VALIDATE_SCHEMA = Joi.object().keys({
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    created: Joi.required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.object().keys({
        zipCode: Joi.number().min(6).required(),
    })
});