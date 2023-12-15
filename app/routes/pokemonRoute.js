const router = require("express").Router();
const { getAllPokemon, getPokemonByName, createPokemon, updatePokemon, deletePokemon } = require("../controller/pokemonController");

router.get("/", getAllPokemon);

router.get("/:id", getPokemonByName);

router.post("/", createPokemon);

router.put("/:id", updatePokemon);

router.delete("/:id", deletePokemon);

module.exports = router;