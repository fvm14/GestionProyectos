// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { register, login } = require('../controllers/authController');

// Registro e inicio de sesión
router.post('/register', register);
router.post('/login', login);

// Listar pacientes
router.get('/usuarios/pacientes', (req, res) => {
  db.all(`SELECT id, nombre FROM usuarios WHERE rol = 'paciente'`, [], (err, rows) => {
    if (err) return res.status(500).json({ mensaje: 'Error en la base de datos' });
    res.json(rows);
  });
});

// Listar diseñadores
router.get('/usuarios/disenadores', (req, res) => {
  db.all(`SELECT id, nombre, codigo FROM usuarios WHERE rol = 'disenador'`, [], (err, rows) => {
    if (err) return res.status(500).json({ mensaje: 'Error en la base de datos' });
    res.json(rows);
  });
});

module.exports = router;
