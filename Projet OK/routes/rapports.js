const express = require('express');
const router = express.Router();
const rapportsController = require('../controllers/rapportsController');

// Route POST : ajout d’un rapport
router.post('/', rapportsController.ajouterRapport);

// ✅ Nouvelle route GET : rapports pour une visite
router.get('/visite/:id', rapportsController.getRapportsParVisite);

module.exports = router;
