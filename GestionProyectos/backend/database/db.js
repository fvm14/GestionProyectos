const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./usuarios.db');

db.serialize(() => {
  // Crear tabla usuarios (rol: 'doctor', 'paciente', 'disenador')
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      rol TEXT CHECK(rol IN ('doctor', 'paciente', 'disenador')) NOT NULL,
      codigo TEXT
    )
  `);

  // Crear tabla casos clínicos
  db.run(`
    CREATE TABLE IF NOT EXISTS casos_clinicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT NOT NULL,
      paciente_id INTEGER NOT NULL,
      doctor_id INTEGER NOT NULL,
      disenador_id INTEGER NOT NULL,
      notas_clinicas TEXT,
      estado TEXT DEFAULT 'diseño',
      archivo_diseno TEXT, 
      fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(paciente_id) REFERENCES usuarios(id),
      FOREIGN KEY(doctor_id) REFERENCES usuarios(id),
      FOREIGN KEY(disenador_id) REFERENCES usuarios(id)
    )
  `);
});

module.exports = db;
