const express = require('express');

const auth = require('../middleware/auth');
const checkListExistance = require('../middleware/checkListExistance');
const isAuthor = require('../middleware/isAuthor');
const isNotAuthor = require('../middleware/isNotAuthor');

const Checklist = require('../models/checkListModel');
const {
    User
} = require('../models/userModel');
const Team = require('../models/teamModel');

const router = express.Router();

router.put('/team/:id', auth, checkListExistance, isAuthor, async (req, res) => {
    if(!req.body.members) return res.status(404).send('Provide team.');
    
    const team = await Team.findById(req.body._id);
    if (!team) return res.status(400).send("Team does not exist.");
    if ((team.members.filter((member) => String(member._id) === String(req.user._id))).length === 0)
        return res.status(400).send("Access denied.");
    
    const checklist = await Checklist.findById(req.checklist._id);
    if ((team.checkLists.filter((checkList) => String(checkList.listId) === String(checklist._id))).length > 0)
        return res.status(400).send("Checklista jest już przypisana do teamu");
  
    for(let tMemEmail of req.body.members) {
        const user = await User.findOne({email:tMemEmail.email});

        //sprawdza czy User już ma udostępnioną checlistę, jeśli tak to pomija i przechodzi do następnego usera
        const isAlreadyMember = req.checklist.members.filter(el => {
            return String(el) === String(user._id);
            
        })
        if (!!isAlreadyMember[0]) continue;

        //dodaje info o checkliście do obiektu usera
        user.checkLists.push(
            {
                name: req.checklist.name,
                listId: req.checklist._id,
                listAuthor: req.checklist.authorName,
                isChecked: false,
                isOwner: false
            }
        );
        const savedUser = await user.save();

        //dodaje członka do checklisty
        checklist.members.push(savedUser._id);
        await checklist.save();
    }

    //przypisuje chechkliste do teama
    const { _id, name } = checklist;
    team.checkLists.push({ listId:  _id, name });
    await team.save();

    res.status(200).send('Success');
});


router.put('/:id', auth, checkListExistance, isAuthor, async (req, res) => {
    if(!req.body.email) return res.status(404).send('Provide user email.');

    const user = await User.findOne({email:req.body.email});

    //sprawdza czy User już ma udostępnioną checlistę, jeśli tak to zwraca komunikat.
    const isAlreadyMember = req.checklist.members.filter(el => {
        return String(el) === String(user._id);
    })
    if(!!isAlreadyMember[0]) return res.status(409).send(`Checklist already shared: ${req.body.email}`);

    //dodaje info o checkliście do obiektu usera
    user.checkLists.push(
        {
            name: req.checklist.name,
            listId: req.checklist._id,
            listAuthor: req.checklist.authorName,
            isChecked: false,
            isOwner: false
        }
    );
    const savedUser = await user.save();

    //dodaje członka do checklisty
    const checklist = await Checklist.findById(req.checklist._id);
    checklist.members.push(savedUser._id);
    const resultChecklist = await checklist.save();

    res.status(200).send(resultChecklist);
});

router.put('/unsub/:id', auth, checkListExistance, isNotAuthor, async (req, res) => {
    const user = await User.findById(req.user._id);

    //sprawdza czy User ma udostępnioną checlistę, jeśli NIE to zwraca komunikat
    const isAlreadyMember = req.checklist.members.filter(el => {
        return String(el) === String(user._id);
    })
    if (!isAlreadyMember[0]) return res.status(409).send(`Not a member. Subscribe first`);

    user.checkLists = user.unpinCheckList(req.checklist._id);
    const unsubUser = await user.save();

    req.checklist.members = req.checklist.unpinMember(req.user._id);
    await req.checklist.save();

    res.status(200).send(unsubUser.checkLists);
});


module.exports = router;