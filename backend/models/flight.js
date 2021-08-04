const mongoose = require('mongoose');

const flightSchema = mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true }
});

module.exports = mongoose.model('Flight', flightSchema);