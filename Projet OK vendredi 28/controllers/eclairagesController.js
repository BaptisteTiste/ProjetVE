const db = require('../db');

// ➕ Ajouter un éclairage (coordonnées facultatives)
exports.ajouterEclairage = async (req, res) => {
  const { Id_Salle, Id_Eclair_Salle, PosX, PosY, PosZ, etat } = req.body;

  console.log('➡️ Données reçues :', req.body);

  if (!Id_Salle || !Id_Eclair_Salle || PosX === undefined || PosY === undefined || PosZ === undefined) {
    return res.status(400).json({ error: 'Tous les champs doivent être fournis, y compris les coordonnées.' });
  }
  

  // Vérifie seulement les champs obligatoires
  if (!Id_Salle || !Id_Eclair_Salle) {
    return res.status(400).json({ error: 'Id_Salle et Id_Eclair_Salle sont obligatoires.' });
  }

  const sql = `
    INSERT INTO eclairages (Id_Salle, Id_Eclair_Salle, PosX, PosY, PosZ, etat)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.promise().execute(sql, [
      Id_Salle,
      Id_Eclair_Salle,
      PosX || null,
      PosY || null,
      PosZ || null,
      etat || 'bon'
    ]);

    res.status(201).json({
      message: 'Éclairage ajouté avec succès.',
      id: result.insertId
    });
  } catch (err) {
    console.error('❌ Erreur lors de l\'insertion de l\'éclairage :', err);
    res.status(500).json({ error: 'Erreur lors de l\'insertion de l\'éclairage.' });
  }
}
// 📄 Lister tous les éclairages
exports.listerEclairages = async (req, res) => {
    try {
      const [rows] = await db.promise().query('SELECT * FROM eclairages');
      res.json(rows);
    } catch (err) {
      console.error('Erreur lors de la récupération des éclairages :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des éclairages.' });
    }
  };
  
  // 🔧 Modifier l'état d'un éclairage
  exports.mettreAJourEtat = async (req, res) => {
    const idEclairage = req.params.id;
    const { etat } = req.body;
  
    if (!etat || (etat !== 'bon' && etat !== 'defectueux')) {
      return res.status(400).json({ error: "L'état doit être 'bon' ou 'defectueux'." });
    }
  
    try {
      const [result] = await db.promise().execute(
        'UPDATE eclairages SET etat = ? WHERE id = ?',
        [etat, idEclairage]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Éclairage non trouvé." });
      }
  
      res.json({ message: "État de l'éclairage mis à jour." });
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'éclairage :', err);
      res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
    }
  };

  // 🗑️ Supprimer un éclairage
exports.supprimerEclairage = async (req, res) => {
    const id = req.params.id;
    try {
      const [result] = await db.promise().execute('DELETE FROM eclairages WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Éclairage non trouvé." });
      }
      res.status(200).json({ message: "Éclairage supprimé." });
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'éclairage :', err);
      res.status(500).json({ error: "Erreur lors de la suppression." });
    }
  };  
  
  
;
