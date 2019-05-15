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

module.exports = teamSchema;