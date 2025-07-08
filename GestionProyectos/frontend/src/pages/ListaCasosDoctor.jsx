import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaCasosDoctor = () => {
  const [casos, setCasos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || usuario.rol !== 'doctor') {
      setMensaje('Acceso no autorizado');
      return;
    }

    axios.get(`http://localhost:3001/api/casos/doctor/${usuario.id}`)
      .then(res => setCasos(res.data))
      .catch(err => setMensaje('Error al cargar los casos'));
  }, []);

  const mostrarProgreso = (estado) => {
    const etapas = ['diseño', 'revisión', 'aprobado', 'impresión', 'entregado'];
    const indice = etapas.indexOf(estado);
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {etapas.map((etapa, i) => (
          <div key={i} style={{
            width: '20%',
            height: '8px',
            backgroundColor: i <= indice ? 'green' : '#ccc',
            borderRadius: '2px'
          }} title={etapa}></div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mis Casos Clínicos</h2>
      {mensaje && <p>{mensaje}</p>}
      {casos.length === 0 && !mensaje && <p>No se encontraron casos.</p>}
      {casos.map(caso => (
        <div key={caso.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Código:</strong> {caso.codigo}</p>
          <p><strong>Notas:</strong> {caso.notas_clinicas || '---'}</p>
          <p><strong>Estado:</strong> {caso.estado}</p>
          <p><strong>Fecha:</strong> {new Date(caso.fecha_creacion).toLocaleDateString()}</p>
          {mostrarProgreso(caso.estado)}
        </div>
      ))}
    </div>
  );
};

export default ListaCasosDoctor;
