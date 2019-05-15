const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const auth = require('../middleware/auth');
const Team = require('../models/teamModel');
const { User } = require('../models/userModel');
const router = express.Router();

router.post('/', auth, async (req, res) => {

    // if(req.user.type !== "mentor") {
    //     return res.status(403).send("Access denied - not a mentor.");
    // }

    const team = new Team({
        mentorId: req.user._id,
        name: req.body.name,
        members: [req.user._id]
    });

    const result = await team.save()

    return res.status(200).send({ _id: result._id, name: result.name, mentorId: result.mentorId, members: result.members });
});

router.get('/:id', auth, async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid object ID");
    }

    const team = await Team.findById(req.params.id).select('mentorId name members');
    if (!(team.members.includes(req.user._id))) return res.status(403).send('Access denied - not a team member or mentor.');

    const objTeam = JSON.parse(JSON.stringify(team));

    for (let i in objTeam.members) {
        const user = await User.findOne({
            _id: `${objTeam.members[i]}`
        });
        objTeam.members[i] = {
            _id: objTeam.members[i],
            email: user.email
        }
    }

    return res.status(200).send(objTeam);
});

router.put('/:id', auth, async (req, res) => {

    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid object ID");
    }

    const team = await Team.findById(req.params.id);
    if (!team) return res.status(400).send("Team does not exist.");
    if (!(team.mentorId === req.user._id)) return res.status(403).send('Access denied - not the team mentor.');

    if (req.query.name) {
       team.name = req.query.name;
       await Team.findByIdAndUpdate(team._id, team);
       return res.status(200).send(team);
    }

    if (req.query.add) {
        const user = await  User.findOne({email: req.query.add});
        
        if (!user) return res.status(400).send("User does not exist.");

        if (team.members.includes(user._id)) return res.status(400).send("User already in team.");

        team.members = [...team.members, user._id];
        await Team.findByIdAndUpdate(team._id, team);
        return res.status(200).send(team);
    }

    if (req.query.remove) {

        if (!ObjectId.isValid(req.query.remove)) {
            return res.status(400).send("Invalid object ID");
        }

        const user = await User.findById(req.query.remove);
        if (!user) return res.status(400).send("User does not exist.");

        if (!team.members.includes(req.query.remove)) return res.status(400).send("User not in team.");

        team.members = team.members.filter((name) => name != req.query.remove);
        await Team.findByIdAndUpdate(team._id, team);
        return res.status(200).send(team);
    }

    const result = await Team.findById(req.params.id);
    return res.status(200).send(result);

});

router.delete('/:id', auth, async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid object ID");
    }

    const team = await Team.findById(req.params.id);
    if (!team) return res.status(400).send("Team does not exist.");
    if (!(team.mentorId === req.user._id)) return res.status(403).send('Access denied - not the team mentor.');

    await Team.findByIdAndDelete(team._id);

    return res.status(200).send();
});

module.exports = router;