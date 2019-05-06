const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = require('../schemas/userSchema')

const User = mongoose.model('User', userSchema);

const validateUserSignUp = (user) => {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().regex(/^(?=.*\d).{4,30}$/)
    })

    return Joi.validate(user,schema)
}

const validateUserLogin = (user) => {
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().regex(/^(?=.*\d).{4,30}$/)
    })

    return Joi.validate(user,schema)
}


module.exports = {
    User,
    validateUserSignUp,
    validateUserLogin
};