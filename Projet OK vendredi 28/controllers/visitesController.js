const db = require('../db');

// Créer une visite
exports.creerVisite = async (req, res) => {
  const { id_utilisateur, id_salle, commentaire } = req.body;

  if (!id_utilisateur || !id_salle) {
    return res.status(400).json({ error: 'Utilisateur et salle sont requis.' });
  }

  try {
    const [result] = await db.promise().execute(
      'INSERT INTO visites (id_utilisateur, id_salle, commentaire) VALUES (?, ?, ?)',
      [id_utilisateur, id_salle, commentaire || null]
    );

    res.status(201).json({
      message: 'Visite créée avec succès.',
      id: result.insertId
    });
  } catch (err) {
    console.error('Erreur lors de la création de la visite :', err);
    res.status(500).json({ error: 'Erreur lors de la création de la visite.' });
  }
};

// 🧾 Obtenir les rapports d'une visite
exports.getRapportsParVisite = async (req, res) => {
  const idVisite = req.params.id;

  try {
    const [rows] = await db.promise().query(
      `SELECT r.id, r.id_eclairage, e.PosX, e.PosY, e.PosZ, r.etat, r.remarque
       FROM rapports r
       JOIN eclairages e ON r.id_eclairage = e.id
       WHERE r.id_visite = ?`,
      [idVisite]
    );

    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des rapports :", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// 📋 Lister les visites existantes
exports.listerVisites = async (req, res) => {
    try {
      const [rows] = await db.promise().query(`
        SELECT v.id, s.nom AS nom_salle, u.nom AS nom_utilisateur, v.commentaire, v.date_creation
        FROM visites v
        JOIN salles s ON v.id_salle = s.id
        JOIN utilisateurs u ON v.id_utilisateur = u.id
        ORDER BY v.date_creation DESC
      `);
      res.json(rows);
    } catch (err) {
      console.error("Erreur lors de la récupération des visites :", err);
      res.status(500).json({ error: "Erreur lors de la récupération des visites." });
    }
  };

  // 🗑️ Supprimer une visite
exports.supprimerVisite = async (req, res) => {
    const id = req.params.id;
  
    try {
      const [result] = await db.promise().execute('DELETE FROM visites WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Visite non trouvée." });
      }
  
      res.status(200).json({ message: "Visite supprimée avec succès." });
    } catch (err) {
      console.error("Erreur lors de la suppression de la visite :", err);
      res.status(500).json({ error: "Erreur lors de la suppression de la visite." });
    }
  };
  