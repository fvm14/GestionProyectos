// models/User.js
const db = require('../database/db');

class User {
  static crear({ nombre, email, password, rol }, callback) {
    const query = `INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)`;
    db.run(query, [nombre, email, password, rol], callback);
  }

  static buscarPorEmail(email, callback) {
    const query = `SELECT * FROM usuarios WHERE email = ?`;
    db.get(query, [email], callback);
  }
}

module.exports = User;
