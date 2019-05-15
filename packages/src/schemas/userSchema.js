const mongoose = require('mongoose');
const config = require('../config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    type: {type: String, required:true},
    checkLists: {type: Array, default: []},
    teams: {type: Array, default: []}
})

userSchema.methods.genToken = function() {
    return jwt.sign({_id: this._id, name: this.name, email: this.email, type: this.type}, config.jwtKey);
}

userSchema.methods.unpinCheckList = function(checkListId) {
    return this.checkLists.filter(el => String(el.listId) !== String(checkListId));
}

userSchema.methods.modifyCheckList = function (checkListId, newName) {
    return this.checkLists.map(el => {
        if (String(el.listId) === String(checkListId)) {
            el.name = newName;
            return el;
        } else {
            return el
        }
    });
}

userSchema.methods.modifyTeam = function (teamId, newName) {
    return this.teams.map(el => {
        if (String(el.teamId) === String(teamId)) {
            el.name = newName;
            return el;
        } else {
            return el
        }
    });
}

userSchema.methods.checkCheckList = function (checkListId) {
    return this.checkLists.map(el => {
        if (String(el.listId) === String(checkListId)) {
            el.isChecked = !el.isChecked;
            return el;
        } else {
            return el
        }
    });
}

module.exports = userSchema;