const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = require('../schemas/userSchema')

const User = mongoose.model('User', userSchema);

const validateUserSignUp = (user) => {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(50).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(6).max(50).required(),
        type: Joi.string().valid('mentor', 'student').required()
    })

    return Joi.validate(user,schema)
}

const validateUserLogin = (user) => {
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(6).max(50).required()
    })

    return Joi.validate(user,schema)
}


module.exports = {
    User,
    validateUserSignUp,
    validateUserLogin
};