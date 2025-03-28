const db = require('../db');

// Créer une salle
exports.creerSalle = async (req, res) => {
  const { nom, description } = req.body;
  if (!nom) {
    return res.status(400).json({ error: 'Le nom de la salle est requis.' });
  }

  try {
    const [result] = await db.promise().execute(
      'INSERT INTO salles (nom, description) VALUES (?, ?)',
      [nom, description || null]
    );
    res.status(201).json({ message: 'Salle créée.', id: result.insertId });
  } catch (err) {
    console.error('Erreur lors de la création de la salle :', err);
    res.status(500).json({ error: 'Erreur lors de la création de la salle.' });
  }
};

// Lister les salles
exports.listerSalles = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM salles');
    res.json(rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des salles :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des salles.' });
  }
};

// Obtenir les éclairages d'une salle donnée
exports.getEclairagesParSalle = async (req, res) => {
  const idSalle = req.params.id;

  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM eclairages WHERE Id_Salle = ?',
      [idSalle]
    );

    res.json(rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des éclairages de la salle :', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};
