const mongoose = require('mongoose');

const checkListSchema = new mongoose.Schema({
    authorId: {type: String, required:true},
    name: {type: String, required:true},
    content: Object,
    isChecked: {type: Boolean, required:true}
})

module.exports = checkListSchema;