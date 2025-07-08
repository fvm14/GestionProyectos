const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento para archivos de diseño
const storage = multer.diskStorage({
  destination: './uploads/', // Carpeta donde se guardarán los archivos
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `diseno_${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// Crear un nuevo caso clínico con posible archivo de diseño
router.post('/', upload.single('archivo'), casosController.crearCaso);

// Obtener todos los casos clínicos creados por un doctor
router.get('/doctor/:id', casosController.obtenerCasosDoctor);

// Obtener todos los casos clínicos de un paciente
router.get('/paciente/:id', casosController.obtenerCasosPaciente);

// Obtener todos los casos clínicos asignados a un diseñador
router.get('/disenador/:id', casosController.obtenerCasosDisenador);

// Obtener un caso clínico por su ID (con nombres de paciente y diseñador)
router.get('/:id', casosController.obtenerCasoPorId);

// Actualizar un caso clínico (posiblemente con nuevo archivo)
router.put('/:id', upload.single('archivo'), casosController.actualizarCaso);

module.exports = router;
