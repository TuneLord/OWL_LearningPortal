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

module.exports = userSchema;