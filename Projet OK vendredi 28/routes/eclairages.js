const express = require('express');
const router = express.Router();
const eclairagesController = require('../controllers/eclairagesController');

// Route GET pour récupérer les éclairages
router.get('/', eclairagesController.listerEclairages);

// Route POST pour ajouter un éclairage
router.post('/', eclairagesController.ajouterEclairage);

// Route PUT pour modifier l'état d'un éclairage
router.put('/:id', eclairagesController.mettreAJourEtat);

// Route DELETE pour supprimer des éclairages
router.delete('/:id', eclairagesController.supprimerEclairage);

module.exports = router;
