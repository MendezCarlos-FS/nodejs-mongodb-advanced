const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must specify a name for the Pokemon.'],
        trim: true,
        unique: [true, "You can only have one Pokemon of that name."],
    },
    level: {
        type: Number,
        min: [1, "Level cannot be lower than 1."],
        max: [100, "Level cannot be higher than 100."],
    },
    abilities: {
        type: [String],
    },
    shiny: Boolean
});

module.exports = mongoose.model('Pokemon', pokemonSchema);