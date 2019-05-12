const express = require('express');
const auth = require('../middleware/auth')
const { User } = require('../models/userModel');

const router = express.Router();

router.get('/', auth, async (req,res) => {
    const user = await User.findById(req.user._id)

    res.status(200).send(user);
})

module.exports = router;