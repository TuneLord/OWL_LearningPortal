const express = require('express');
const bcrypt = require('bcrypt');

const {User, validateUserSignUp} = require('../models/userModel')

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUserSignUp(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    const { name, email, password, type} = req.body;

    //checks if user already exist    
    let user = await User.findOne({email: email.toLowerCase()});
    if(user) return res.status(400).send('User already registered.');

    user = new User({
        name: name,
        email: email.toLowerCase(),
        password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
        type: type
    });

    try {
        const response = await user.save();
        res.header('x-auth-token',response.genToken()).status(200).send(response._id);
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
})

module.exports = router;