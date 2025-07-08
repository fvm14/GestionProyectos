// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const claveSecreta = 'secreto123';

const register = (req, res) => {
  const { nombre, email, password, rol } = req.body;
  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ mensaje: 'Error al cifrar' });

    User.crear({ nombre, email, password: hash, rol }, (err) => {
      if (err) return res.status(500).json({ mensaje: 'Error al registrar' });
      res.status(201).json({ mensaje: 'Usuario registrado' });
    });
  });
};

const login = (req, res) => {
    const { email, password } = req.body;
    User.buscarPorEmail(email, (err, user) => {
      if (err || !user) return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  
      bcrypt.compare(password, user.password, (err, match) => {
        if (!match) return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  
        const token = jwt.sign({ id: user.id, rol: user.rol }, claveSecreta, { expiresIn: '1h' });
  
        res.json({
          mensaje: 'Login exitoso',
          token,
          usuario: {
            id: user.id,
            nombre: user.nombre,
            rol: user.rol
          }
        });
      });
    });
  };
  

module.exports = { register, login };
