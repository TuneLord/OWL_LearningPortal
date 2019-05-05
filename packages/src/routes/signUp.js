const express = require('express');

const User = require('../models/userModel')

const signUp = express.Router();

signUp.post('/', async (req, res) => {
    const { name, email, password} = req.body;
    const newUser = new User({
        name: name,
        email: email,
        password: password
    });

    const result = await newUser.save();

    res.status(200).send(result);
})

module.exports = signUp;