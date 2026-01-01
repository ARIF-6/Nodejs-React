const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    model: { type: String, required: true },
    count: { type: Number, default: 0 },
});

module.exports = mongoose.model('Counter', counterSchema);
