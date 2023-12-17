const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must specify a name."],
        trim: true,
        unique: [true, "You can only have one trainer of that name."],
    },
    age: Number,
    ownedPokemon: [Object]
});

trainerSchema.virtual("pokemonList", {
    ref: "Pokemon",
    localField: "ownedPokemon",
    foreignField: "name",
});

module.exports = mongoose.model('Trainer', trainerSchema);