const mongoose = require("mongoose");

const authorsSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

module.exports = mongoose.model('Author', authorsSchema);