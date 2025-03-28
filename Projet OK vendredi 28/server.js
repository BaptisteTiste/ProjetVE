require('dotenv').config();
const express = require('express');
const cors = require('cors');
const eclairagesController = require('./controllers/eclairagesController'); // Assure-toi du bon chemin du contrôleur

// Initialisation de l'application Express
const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la base de données (nouveau fichier)
const db = require('./db');

// Routes
const sallesRoutes = require('./routes/salles');
app.use('/api/salles', sallesRoutes);

const eclairagesRoutes = require('./routes/eclairages');
app.use('/api/eclairages', eclairagesRoutes);

const visitesRoutes = require('./routes/visites');
app.use('/api/visites', visitesRoutes);

const rapportsRoutes = require('./routes/rapports');
app.use('/api/rapports', rapportsRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend !');
});


// Route existante pour les utilisateurs
app.get('/api/utilisateurs', async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT * FROM utilisateurs');
    res.json(results);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// ECLAIRAGES -----------------------------------------------------------

// Route POST pour ajouter un éclairage
app.post('/api/eclairages', eclairagesController.ajouterEclairage);

// Route DELETE pour supprimer un éclairage
app.delete('/api/eclairages/:id', eclairagesController.supprimerEclairage);



// SALLES -----------------------------------------------------------

// Route pour récupérer les salles
app.get('/api/salles', (req, res) => {
  db.query('SELECT * FROM salles', (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des salles:', err);
      return res.status(500).send('Erreur serveur');
    }
    res.json(result); // On renvoie la liste des salles
  });
});

// Route pour supprimer une salle
app.delete('/api/salles/:id', (req, res) => {
  const salleId = req.params.id;

  db.query('DELETE FROM salles WHERE id = ?', [salleId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la salle :', err);
      return res.status(500).send('Erreur serveur');
    }
    res.status(200).send('Salle supprimée avec succès');
  });
});

// VISITES -----------------------------------------------------------






// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
