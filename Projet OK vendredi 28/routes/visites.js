const express = require('express');
const router = express.Router();
const visitesController = require('../controllers/visitesController');

// Créer une visite
router.post('/', visitesController.creerVisite);

// Lister les visites
router.get('/', visitesController.listerVisites);

// Obtenir les rapports d'une visite
router.get('/:id/rapports', visitesController.getRapportsParVisite);

// Supprimer une visite
router.delete('/:id', visitesController.supprimerVisite);


module.exports = router;
