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
    const teams = await Team.find({ members: `${user._id}` }).select('mentorId name');
    objUser.teams = teams;

    res.status(200).send(objUser);
})

router.get('/checklists', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
    res.status(200).send(user.checkLists);
})

router.put('/checklists', auth, async (req, res) => {
    const user = await User.findById(req.user._id);

    const newCheck = user.checkCheckList(req.body.listId);
    user.checkLists = []; //z niewiadomych powodów muszę najpierw przypisać pustą tablicę do user.checkLists, inaczej nie przypisze nowych wartości
    user.checkLists = newCheck;
    const result = await user.save();

    res.status(200).send(result.checkLists);
})

module.exports = router;