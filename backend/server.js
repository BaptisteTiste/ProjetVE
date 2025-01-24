require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

// Initialisation de l'application Express
const app = express();
app.use(express.json());

// Configuration de la base de données
const db = mysql.createConnection({
    host: '127.0.0.1',          // Adresse de la base de données
    user: 'baptiste',           // Utilisateur MySQL
    password: '1234',           // Mot de passe de l'utilisateur
    database: 'projetVE',       // Nom de la base de données
    port: 3307                  // Port MySQL
  });

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
  }
  console.log('Connecté à la base de données MySQL.');
});

// Route de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend !');
});

app.get('/api/utilisateurs', (req, res) => {
    db.query('SELECT * FROM utilisateurs', (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
      }
      res.json(results);
    });
  });
  

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
