const express = require('express');
const auth = require('../middleware/auth');
const Team = require('../models/teamModel');

const router = express.Router();

router.post('/', auth, async (req, res) => {

    // new team object
    const team = new Team({
        mentorId: req.body.mentorId, //tutaj id zalogowanego użytkownika tworzącego checklistę wyciągnięte z tokena
        name: req.body.name,
        members: [...req.body.members, req.body.mentorId]
    });


    //zapisuję ją do bazy i przechowuję wynik
    const result = await team.save()

    return res.status(200).send(result);
});

router.get('/:id', auth, async (req, res) => {

    const team = await Team.findById(req.params.id);
    if (!(team.members.includes(req.body.userId))) return res.status(403).send('Access denied - not a team member or mentor.');

    return res.status(200).send(team);
});

router.put('/:id', auth, async (req, res) => {
    
} )

router.delete('/:id', auth, async (req, res) => {
    const team = await Team.findById(req.params.id);

    if (!(team.mentorId === req.body.mentorId)) return res.status(403).send('Access denied - not the team mentor.');

    await Team.findByIdAndDelete(team._id);

    return res.status(200).send(req.params.id);
});

module.exports = router;