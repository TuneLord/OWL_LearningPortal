const mongoose = require('mongoose');
const config = require('../config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    type: {type: String, required:true},
    checkLists: {type: Array, default: []}
})

userSchema.methods.genToken = function() {
    return jwt.sign({_id: this._id, name: this.name, type: this.type}, config.jwtKey);
}

userSchema.methods.unpinCheckList = function(checkListId) {
    return this.checkLists.filter(el => String(el.listId) !== String(checkListId));
}

userSchema.methods.modifyCheckList = function (checkListId) {
    return this.checkLists.map(el => {
        if(String(el.listId) === String(checkListId)) {
            el.name = "kalafior";
            return el;
        } else {
            return el
        }
    });
}

module.exports = userSchema;