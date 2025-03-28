// controllers/rapportsController.js
const db = require('../db');

// ➕ Ajouter un rapport pour un éclairage dans une visite
exports.ajouterRapport = async (req, res) => {
  const { id_visite, id_eclairage, etat, remarque } = req.body;

  if (!id_visite || !id_eclairage || !etat || (etat !== 'bon' && etat !== 'défectueux')) {
    return res.status(400).json({ error: 'Champs requis manquants ou invalides.' });
  }

  try {
    const [result] = await db.promise().execute(
      'INSERT INTO rapports (id_visite, id_eclairage, etat, remarque) VALUES (?, ?, ?, ?)',
      [id_visite, id_eclairage, etat, remarque || null]
    );

    res.status(201).json({ message: 'Rapport ajouté.', id: result.insertId });
  } catch (err) {
    console.error("❌ Erreur lors de l'ajout du rapport :", err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};
