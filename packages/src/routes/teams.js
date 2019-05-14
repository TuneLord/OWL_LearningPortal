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

    const { _id, email, name } = req.user;

    const team = new Team({
        mentorId: req.user._id,
        name: req.body.name,
        members: [{_id, email, name }]
    });

    const result = await team.save()

    const user = await User.findById(req.user._id);
    user.teams.push({ teamId: result._id, name: result.name, isOwner: true });
    await user.save();

    return res.status(200).send({ teamId: result._id, name: result.name, isOwner: true });
});

router.get('/:id', auth, async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid object ID");
    }

    const team = await Team.findById(req.params.id).select('mentorId name members');
    if ((team.members.filter((member) => String(member._id) === String(req.user._id))).length === 0) 
        return res.status(403).send('Access denied - not a team member or mentor.');

    return res.status(200).send(team);
});

router.put('/:id', auth, async (req, res) => {

    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid object ID");
    }

    const team = await Team.findById(req.params.id);
    if (!team) return res.status(400).send("Team does not exist.");
    if (!(team.mentorId === req.user._id)) return res.status(403).send('Access denied - not the team mentor.');

    if (req.query.name) {
           
       if(team.name !== req.query.name) {
            team.members.forEach(async el => {
                const user = await User.findById(el);
                console.log(el)
                const newName = user.modifyTeam(team._id, req.query.name);
                user.teams = [];
                user.teams = newName;
                await user.save();
            })

            team.name = req.query.name;
            await Team.findByIdAndUpdate(team._id, team);           
       }

       return res.status(200).send(team);
    }

    if (req.query.add) {
        const user = await User.findOne({email: req.query.add});  
        if (!user) return res.status(400).send("User does not exist.");
        if ((team.members.filter((member) => String(member._id) === String(user._id))).length > 0)
            return res.status(400).send("User already in team.")
    
        user.teams = {
            teamId: team._id,
            name: team.name,
            isOwner: true
        };
        await user.save();

        const { _id, email, name } = user;
        team.members = [...team.members, { _id, email, name }];
        await Team.findByIdAndUpdate(team._id, team);

        return res.status(200).send(team);
    }

    if (req.query.remove) {

        const user = await User.findOne({email: req.query.remove});
        if (!user) return res.status(400).send("User does not exist.");
        if ((team.members.filter((member) => String(member._id) === String(user._id))).length === 0)
            return res.status(400).send("User not in team.");

        user.teams = user.teams.filter(el => String(el.teamId) !== String(team._id));
        await user.save();

        team.members = team.members.filter((member) => String(member._id) !== String(user._id));
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

    team.members.forEach(async member => {
        const user = await User.findById(member._id);
        user.teams = user.teams.filter(el => String(el.teamId) !== String(req.params.id));
        await user.save();
    })

    await Team.findByIdAndDelete(team._id);
    return res.status(200).send();
});

module.exports = router;