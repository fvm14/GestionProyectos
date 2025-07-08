const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const casosRoutes = require('./routes/casosRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (archivos subidos como PDF, imágenes, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/casos', casosRoutes);

// Puerto
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
