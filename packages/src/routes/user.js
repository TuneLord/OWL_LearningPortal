const express = require('express');
const auth = require('../middleware/auth')
const { User } = require('../models/userModel');
const Team = require('../models/teamModel');

const router = express.Router();

router.get('/', auth, async (req,res) => {
    const user = await User.findById(req.user._id).select('name email type checkLists')

    const objUser = {
        ...user._doc
    };
    const teams = await Team.find({ members: `${user._id}` }).select('mentorId name members');
    objUser.teams = teams;

    res.status(200).send(objUser);
})

module.exports = router;