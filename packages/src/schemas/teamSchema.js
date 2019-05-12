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
        default: []
    }
})

module.exports = teamSchema;