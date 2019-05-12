const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mentor: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        default: []
    }
})

module.exports = teamSchema;