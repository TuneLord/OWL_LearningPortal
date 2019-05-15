const express = require('express');
const bcrypt = require('bcrypt');

const {User, validateUserLogin, validateGoogleToken} = require('../models/userModel');

const router = express.Router();

router.post('/', async (req, res) => {
    let user;
    if (req.query.googleAuth === 'true') {
        const token = req.header('x-auth-token-google');      
        
        const email = await validateGoogleToken(token);
        if (!email) return res.status(400).send('Invalid token.');

        user = await User.findOne({email: email.toLowerCase()});
        if(!user) return res.status(400).send('User not exists.')
    }
    else {
        const { error } = validateUserLogin(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        user = await User.findOne({email: req.body.email.toLowerCase()});
        if(!user) return res.status(400).send('Invalid email or password.')

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.')
    }
    
    res.header('x-auth-token', user.genToken()).status(200).send(user._id);
});

module.exports = router;