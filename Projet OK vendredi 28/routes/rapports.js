// routes/rapports.js
const express = require('express');
const router = express.Router();
const rapportsController = require('../controllers/rapportsController');

// Route POST : ajout d’un rapport
router.post('/', rapportsController.ajouterRapport);

module.exports = router;
