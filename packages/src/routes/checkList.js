const express = require('express');

const Checklist = require('../models/checkListModel');
const { User } = require('../models/userModel');

const router = express.Router();

router.post('/', async (req, res) => {

    const checklist = new Checklist ({
        authorId: req.body.authorId,
        name: req.body.name,
        content: req.body.content,
        isChecked: req.body.isChecked
    })

    const result = await checklist.save()

    const user = await User.findById(req.body.authorId)
    user.checkLists.push(
        {name:result.name, listId:result._id, isChecked:result.isChecked, isOwner: true}
    )

    await user.save();

    res.status(200).send(user);
})

module.exports = router;