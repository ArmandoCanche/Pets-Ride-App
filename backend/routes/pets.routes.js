const express = require('express');
const { createPet } = require('../controllers/pets.controller');
const router = express.Router();

router.post('/', createPet);

module.exports = router;