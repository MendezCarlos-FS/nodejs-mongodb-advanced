const express = require("express");
const router = express.Router();
const authorRoutes = require("./authorRoute");
const pokemonRoutes = require("./pokemonRoute");
const trainerRoutes = require("./trainerRoute");

router.get("/", (req, res) => {
    res.status(200).json({ success: true, message: `${req.method} - Request made`});
});

router.use('/authors', authorRoutes);
router.use('/pokemon', pokemonRoutes);
router.use('/trainers', trainerRoutes);

module.exports = router;