const express = require('express');
const bcrypt = require('bcrypt');

const {User, validateUserLogin} = require('../models/userModel');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUserLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.')

    res.header('x-auth-token', user.genToken()).status(200).send('Success!');
});

module.exports = router;