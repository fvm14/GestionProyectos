const CasoClinico = require('../models/CasoClinico');

const crearCaso = (req, res) => {
  const data = req.body;
  const archivo = req.file?.filename;

  if (!data.codigo || !data.paciente_id || !data.doctor_id || !data.disenador_id) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
  }

  if (archivo) data.archivo_diseno = archivo;

  CasoClinico.crear(data, (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al crear el caso' });
    res.status(201).json({ mensaje: 'Caso creado exitosamente' });
  });
};

const obtenerCasosDoctor = (req, res) => {
  const id = req.params.id;
  CasoClinico.obtenerPorDoctor(id, (err, filas) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener casos' });
    res.json(filas);
  });
};

const obtenerCasosPaciente = (req, res) => {
  const id = req.params.id;
  CasoClinico.obtenerPorPaciente(id, (err, filas) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener casos' });
    res.json(filas);
  });
};

const obtenerCasosDisenador = (req, res) => {
  const id = req.params.id;
  CasoClinico.obtenerPorDisenador(id, (err, filas) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener casos' });
    res.json(filas);
  });
};

const obtenerCasoPorId = (req, res) => {
  const id = req.params.id;
  CasoClinico.obtenerPorId(id, (err, caso) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener el caso' });
    if (!caso) return res.status(404).json({ mensaje: 'Caso no encontrado' });
    res.json({
      ...caso,
      paciente: caso.nombre_paciente || 'Desconocido',
      disenador: caso.nombre_disenador || 'Desconocido'
    });
  });
};

const actualizarCaso = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const nuevoArchivo = req.file?.filename;

  if (!data || !data.codigo || !data.paciente_id || !data.doctor_id || !data.disenador_id) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  // ✅ Fijar archivo final: el nuevo archivo si existe, si no, el existente, y si no, null
  data.archivo_diseno = nuevoArchivo || data.archivo_existente || null;

  CasoClinico.actualizar(id, data, (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al actualizar el caso' });
    res.json({ mensaje: 'Caso actualizado correctamente' });
  });
};



module.exports = {
  crearCaso,
  obtenerCasosDoctor,
  obtenerCasosPaciente,
  obtenerCasosDisenador,
  obtenerCasoPorId,
  actualizarCaso
};
