const mongoose = require('mongoose');

const checkListSchema = new mongoose.Schema({
    authorId: {type: String, required:true},
    name: {type: String, required:true},
    content: Object,
    members: {type: Array, default: []}
});

checkListSchema.methods.unpinMember = function (memberId) {
    return this.members.filter(el => String(el) !== String(memberId));
}

module.exports = checkListSchema;