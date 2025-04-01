// controllers/rapportsController.js
const db = require('../db');

// ➕ Ajouter un rapport pour un éclairage dans une visite
exports.ajouterRapport = async (req, res) => {
  const { id_visite, id_eclairage, etat, remarque } = req.body;

  if (!id_visite || !id_eclairage || !etat || !['bon', 'defectueux', 'défectueux'].includes(etat)) {
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

// 🧾 Obtenir les rapports d'une visite
exports.getRapportsParVisite = async (req, res) => {
  const idVisite = req.params.id;

  try {
    const [rows] = await db.promise().query(
      `SELECT r.id, r.id_eclairage, e.PosX, e.PosY, e.PosZ, r.etat, r.remarque, r.date_creation
       FROM rapports r
       JOIN eclairages e ON r.id_eclairage = e.id
       WHERE r.id_visite = ?`,
      [idVisite]
    );

    console.log("🖨️ Rapports renvoyés au frontend :", rows);
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des rapports :", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};



