var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = Schema({
    name: { type: String, required: true },
    todo: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', TodoSchema);