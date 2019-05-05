const express = require('express');
const bcrypt = require('bcrypt');

const {User, validateUser} = require('../models/userModel')

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    const { name, email, password} = req.body;

    //checks if user already exist    
    let user = await User.findOne({email: email});
    if(user) return res.status(400).send('User already registered.');

    user = new User({
        name: name,
        email: email,
        password: await bcrypt.hash(password, await bcrypt.genSalt(10))
    });

    try {
        await user.save();
        res.status(200).send('User registered.');
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
})

module.exports = router;