const express = require('express');

const auth = require('../middleware/auth');
const checkListExistance = require('../middleware/checkListExistance');
const isAuthor = require('../middleware/isAuthor');

const Checklist = require('../models/checkListModel');
const { User } = require('../models/userModel');

const router = express.Router();

router.post('/',auth, async (req, res) => {

    //tworzy nowy obiekt checklisty
    const checklist = new Checklist ({
        authorId: req.user._id, //tutaj id zalogowanego użytkownika tworzącego checklistę wyciągnięte z tokena
        authorName: req.user.name,
        name: req.body.name,
        content: req.body.content,
        members: [req.user._id]
    });

    //zapisuję ją do bazy i przechowuję wynik
    const result = await checklist.save();

    //znajduję autora
    const user = await User.findById(req.user._id);
    user.checkLists.push(
        {name:result.name, listId:result._id, listAuthor:result.authorName, isChecked:false, isOwner: true}
    );
    await user.save();

    res.status(200).send(user.checkLists);
});

router.get('/:id', auth, checkListExistance, async (req, res) => {
    const memberId = req.checklist.members.find(member => String(member) === String(req.user._id));
    if (!memberId) return res.status(403).send('Access denied - not a member of a checklist.');

    res.status(200).send(req.checklist);
});





router.put('/:id', auth, checkListExistance, isAuthor, async (req, res) => {
    const currentName = req.checklist.name;
    //jeśli, która kolwiek z tych wartości została przekazana w body, to nastąpi jej update, jeśli nie to podstawi to co wcześniej
    req.checklist.name = req.body.name || req.checklist.name;
    req.checklist.content = req.body.content || req.checklist.content;

    //zmienia imię w user.checLists tylko wtedy jeśli różni się od poprzedniego
    if (currentName !== req.checklist.name) {
        req.checklist.members.forEach(async el => {
            const user = await User.findById(el);
 
            const newName = user.modifyCheckList(req.checklist._id, req.body.name);
            user.checkLists = []; //z niewiadomych powodów muszę najpierw przypisać pustą tablicę do user.checkLists, inaczej nie przypisze nowych wartości
            user.checkLists = newName;
            await user.save();
        })
    }

    const result = await req.checklist.save();
    res.status(200).send(result);
});

router.delete('/:id', auth, checkListExistance, isAuthor, async (req, res) => {
    //iteruje się po członkach listy w celu usnięcia ich przypisania do niej w obiekcie User
    req.checklist.members.forEach(async member => {
        const user = await User.findById(member);
        user.checkLists = user.unpinCheckList(req.checklist._id);
        await user.save();
    })

    //usuwa listę
    await Checklist.findByIdAndDelete(req.checklist._id);

    //zwraca listy usuwającego usera
    const ownerChecklists = await User.findById(req.user._id)
    console.log(ownerChecklists.checkLists);
    res.status(200).send(ownerChecklists.checkLists);
});

module.exports = router;