const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    mentorId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        default: [],
        required: true
    },
    checkLists: {
        type: Array,
        default: [],
        required: true
    }
})

teamSchema.methods.unpinCheckList = function (checkListId) {
    return this.checkLists.filter(el => String(el.listId) !== String(checkListId));
}

teamSchema.methods.modifyCheckList = function (checkListId, newName) {
    return this.checkLists.map(el => {
        if (String(el.listId) === String(checkListId)) {
            el.name = newName;
            return el;
        } else {
            return el
        }
    });
}

module.exports = teamSchema;