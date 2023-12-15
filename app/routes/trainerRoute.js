const router = require("express").Router();
const { getAllTrainers, getTrainerByName, createTrainer, updateTrainer, deleteTrainer } = require("../controller/trainerController");

router.get("/", getAllTrainers);

router.get("/:id", getTrainerByName);

router.post("/", createTrainer);

router.put("/:id", updateTrainer);

router.delete("/:id", deleteTrainer);

module.exports = router;