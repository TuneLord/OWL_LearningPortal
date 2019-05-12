const mongoose = require('mongoose');
// const Joi = require('@hapi/joi');
// const { OAuth2Client } = require('google-auth-library');

const teamSchema = require('../schemas/teamSchema')

const Team = mongoose.model('Team', teamSchema);

/* const validateUserSignUp = (user) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(50).required(),
        mentor: Joi.string().min(3).max(50).required(),
        type: Joi.string().valid('mentor', 'student').required()
    })
    return Joi.validate(user, schema)
}

const validateUserLogin = (user) => {
    const schema = Joi.object().keys({
        email: Joi.string().email({
            minDomainSegments: 2
        }).required(),
        password: Joi.string().min(6).max(50).required()
    })
    return Joi.validate(user, schema)
}

const validateGoogleToken = async (token) => {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GCLIENT_ID
    });
    const payload = ticket.getPayload();
    return payload.email;
} */

module.exports = Team;