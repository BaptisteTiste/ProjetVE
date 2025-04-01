const express = require('express');
const router = express.Router();
const sallesController = require('../controllers/sallesController');

// Routes existantes
router.post('/', sallesController.creerSalle);
router.get('/', sallesController.listerSalles);
router.get('/:id/eclairages', sallesController.getEclairagesParSalle); // ✅

module.exports = router;
