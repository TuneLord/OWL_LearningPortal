const mongoose = require('mongoose');
const schema= require('../schemas/checkListSchema');

const Checklist = mongoose.model('Checklist', schema);

module.exports = Checklist;
