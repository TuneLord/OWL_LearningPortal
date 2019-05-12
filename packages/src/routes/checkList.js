const express = require('express');

const auth = require('../middleware/auth');
const checkListExistance = require('../middleware/checkListExistance');
const Checklist = require('../models/checkListModel');
const { User } = require('../models/userModel');

const router = express.Router();

router.post('/',auth, async (req, res) => {

    //tworzy nowy obiekt checklisty
    const checklist = new Checklist ({
        authorId: req.body.authorId, //tutaj id zalogowanego użytkownika tworzącego checklistę wyciągnięte z tokena
        name: req.body.name,
        content: req.body.content,
        isChecked: req.body.isChecked,
        members:[req.body.authorId]
    });

    //zapisuję ją do bazy i przechowuję wynik
    const result = await checklist.save();

    //znajduję autora
    const user = await User.findById(req.body.authorId);
    user.checkLists.push(
        {name:result.name, listId:result._id, isChecked:result.isChecked, isOwner: true}
    );
    await user.save();

    res.status(200).send(user.checkLists);
});

router.get('/:id', auth, checkListExistance, async (req, res) => {
    const memberId = req.checklist.members.find(member => member === req.user._id);
    if (!memberId) return res.status(403).send('Access denied - not a member of a checlist.');

    res.status(200).send(req.checklist);
});

router.delete('/:id', auth, checkListExistance, async (req, res) => {
    //sprawdza czy użytkownik próbujący usunąć listę jest jej właścicielem, jeśli nie to lista nie zostaje usunięta
    const isOwner = req.checklist.authorId === req.user._id;
    if (!isOwner) return res.status(403).send('Access denied - not an owner.');

    //iteruje się po członkach listy w celu usnięcia ich przypisania do niej w obiekcie User
    req.checklist.members.forEach(async member => {
        const user = await User.findById(member);
        user.checkLists = user.unpinCheckList(req.checklist._id);
        await user.save();
    })

    //usuwa listę
    await Checklist.findByIdAndDelete(req.checklist._id);

    res.status(200).send("Checklist deleted.");
});

module.exports = router;