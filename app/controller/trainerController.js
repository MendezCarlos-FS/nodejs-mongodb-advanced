const { trainer_get_success, trainer_get_by_name_success, trainer_not_found, trainer_create_success, trainer_duplicate_entry, trainer_update_success, trainer_delete_success } = require("../messages/trainerMessages");
const Trainers = require("../models/Trainers");

const getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainers.find({})
        .populate("pokemonList", "name level abilities shiny")
        .select("name age ownedPokemon");
        // Takes the virutal values that were populated in pokemonList and puts them in ownedPokemon array
        trainers.forEach(trainer => {
            trainer.ownedPokemon = trainer.pokemonList.map(pokemon => pokemon);
        });

        res.status(200).json({
            trainers,
            success: true,
            message: trainer_get_success
        });
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
}

const getTrainerByName = async (req, res) => {
    const name = req.params.id;
    try {
        const trainer = await Trainers.findOne({name})
        .populate("pokemonList", "name level abilities shiny")
        .select("name age ownedPokemon");
        if (trainer) {
            // Takes the virutal values that were populated in pokemonList and puts them in ownedPokemon array
            trainer.ownedPokemon = trainer.pokemonList.map(pokemon => pokemon);
        }

        const statusCode = trainer ? 200 : 404;
        const message = statusCode === 200 ? trainer_get_by_name_success : trainer_not_found;
        res.status(statusCode).json({
            trainer,
            success: trainer ? true : false,
            message
        });
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
};

const createTrainer = async (req, res) => {
    const {trainer} = req.body;
    try {
        // Awaits the creation, then populates the pokemonList field.
        const newTrainer = await(await Trainers.create(trainer))
        .populate("pokemonList", "name level abilities shiny");
        if (newTrainer) {
            // Takes the virutal values that were populated in pokemonList and puts them in ownedPokemon array
            newTrainer.ownedPokemon = newTrainer.pokemonList.map(pokemon => pokemon);
        }

        // 201 indicates successful creation
        res.status(201).json({
            trainer: newTrainer,
            success: true,
            message: trainer_create_success
        });
    } catch(error) {
        // If validation was unsuccessful, return a 422 status code
        if (error.name === "ValidationError") {
            console.error("Error Validating!", error);
            res.status(422).json(error);
        }
        // If there is a duplicate entry, mongo returns a code 11000
        else if (error.code === 11000) {
            console.error(error);
            res.status(409).json({
                message: trainer_duplicate_entry,
                error
            });
        }
        // Else, return a status code 500
        else {
            console.error(error);
            res.status(500).json(error);
        }
    }
}

const updateTrainer = async (req, res) => {
    try {
        const name = req.params.id;
        const trainer = await Trainers.findOneAndUpdate({name}, req.body, {new:true, runValidators:true})
        .populate("pokemonList", "name level abilities shiny")
        .select("name age ownedPokemon");
        if (trainer) {
            // Takes the virutal values that were populated in pokemonList and puts them in ownedPokemon array
            trainer.ownedPokemon = trainer.pokemonList.map(pokemon => pokemon);
        }

        const statusCode = trainer ? 200 : 404;
        const message = statusCode === 200 ? trainer_update_success : trainer_not_found;
        res.status(statusCode).json({
            trainer,
            success: trainer ? true : false,
            message
        });
    } catch(error) {
        if (error.name === "ValidationError") {
            console.error("Error Validating!", error);
            res.status(422).json(error);
        } else {
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const deleteTrainer = async (req, res) => {
    try {
        const name = req.params.id;
        const trainer = await Trainers.findOneAndDelete({name: name})
        .populate("pokemonList", "name level abilities shiny")
        .select("name age ownedPokemon");
        if (trainer) {
            // Takes the virutal values that were populated in pokemonList and puts them in ownedPokemon array
            trainer.ownedPokemon = trainer.pokemonList.map(pokemon => pokemon);
        }

        const statusCode = trainer ? 200 : 404;
        const message = statusCode === 200 ? trainer_delete_success : trainer_not_found;
        res.status(statusCode).json({
            trainer,
            success: trainer ? true : false,
            message
        });
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = {
    getAllTrainers,
    getTrainerByName,
    createTrainer,
    updateTrainer,
    deleteTrainer,
}