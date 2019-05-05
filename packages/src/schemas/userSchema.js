const mongoose = require('mongoose');
const config = require('../config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true}
})

userSchema.methods.genToken = function() {
    return jwt.sign({_id: this._id}, config.jwtKey);
}

module.exports = userSchema;