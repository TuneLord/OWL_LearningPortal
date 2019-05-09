const express = require('express');

const auth = require('../middleware/auth')
const Checklist = require('../models/checkListModel');
const { User } = require('../models/userModel');

const router = express.Router();

router.post('/',auth, async (req, res) => {

    //tworzy nowy obiekt checklisty
    const checklist = new Checklist ({
        authorId: req.body.authorId, //tutaj id zalogowanego użytkownika tworzącego checklistę wyciągnięte z tokena
        name: req.body.name,
        content: req.body.content,
        isChecked: req.body.isChecked
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
})

module.exports = router;