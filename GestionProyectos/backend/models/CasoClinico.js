const db = require('../database/db');

class CasoClinico {
  static crear(data, callback) {
    const query = `
      INSERT INTO casos_clinicos 
      (codigo, paciente_id, doctor_id, disenador_id, notas_clinicas, estado, archivo_diseno)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const {
      codigo,
      paciente_id,
      doctor_id,
      disenador_id,
      notas_clinicas,
      estado,
      archivo_diseno
    } = data;

    db.run(
      query,
      [codigo, paciente_id, doctor_id, disenador_id, notas_clinicas, estado || 'diseño', archivo_diseno || null],
      callback
    );
  }

  static obtenerPorDoctor(doctor_id, callback) {
    const query = `
      SELECT c.*, 
             p.nombre AS nombre_paciente,
             d.nombre AS nombre_disenador
      FROM casos_clinicos c
      LEFT JOIN usuarios p ON c.paciente_id = p.id
      LEFT JOIN usuarios d ON c.disenador_id = d.id
      WHERE c.doctor_id = ?
      ORDER BY c.fecha_creacion DESC
    `;
    db.all(query, [doctor_id], callback);
  }

  static obtenerPorPaciente(paciente_id, callback) {
    db.all(`SELECT * FROM casos_clinicos WHERE paciente_id = ?`, [paciente_id], callback);
  }

  static obtenerPorDisenador(disenador_id, callback) {
    db.all(`SELECT * FROM casos_clinicos WHERE disenador_id = ?`, [disenador_id], callback);
  }

  static obtenerPorId(id, callback) {
    const query = `
      SELECT c.*, 
             p.nombre AS nombre_paciente,
             d.nombre AS nombre_disenador
      FROM casos_clinicos c
      LEFT JOIN usuarios p ON c.paciente_id = p.id
      LEFT JOIN usuarios d ON c.disenador_id = d.id
      WHERE c.id = ?
    `;
    db.get(query, [id], callback);
  }

  static actualizar(id, data, callback) {
    const {
      codigo,
      paciente_id,
      doctor_id,
      disenador_id,
      notas_clinicas,
      estado,
      archivo_diseno,
      archivo_existente
    } = data;

    const archivoFinal = archivo_diseno || archivo_existente || null;

    const query = `
      UPDATE casos_clinicos
      SET codigo = ?, paciente_id = ?, doctor_id = ?, disenador_id = ?, 
          notas_clinicas = ?, estado = ?, archivo_diseno = ?
      WHERE id = ?
    `;

    db.run(
      query,
      [codigo, paciente_id, doctor_id, disenador_id, notas_clinicas, estado, archivoFinal, id],
      callback
    );
  }

}

module.exports = CasoClinico;
