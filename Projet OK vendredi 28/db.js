// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'baptiste',
    password: '1234',
    database: 'projetVE',
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        process.exit(1);
    }
    console.log('✅ Connecté à la base de données MySQL');
});

module.exports = db;
