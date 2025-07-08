import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListaCasosPaciente = () => {
  const [casos, setCasos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || usuario.rol !== 'paciente') {
      setMensaje('Acceso no autorizado');
      return;
    }

    axios.get(`http://localhost:3001/api/casos/paciente/${usuario.id}`)
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

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const casosActivos = casos.filter(c => c.estado !== 'entregado');
  const casosCompletados = casos.filter(c => c.estado === 'entregado');

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Mis Solicitudes</h2>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      {mensaje && <p>{mensaje}</p>}

      <h3>Solicitudes Activas</h3>
      {casosActivos.length === 0 && <p>No tienes solicitudes activas.</p>}
      {casosActivos.map(caso => (
        <div key={caso.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Código:</strong> {caso.codigo}</p>
          <p><strong>Estado:</strong> {caso.estado}</p>
          <p><strong>Fecha:</strong> {new Date(caso.fecha_creacion).toLocaleDateString()}</p>
          {mostrarProgreso(caso.estado)}
          <br />
          <button onClick={() => navigate(`/paciente/ver-caso/${caso.id}`)}>
            Ver detalles
          </button>
        </div>
      ))}

      <h3>Historial de Solicitudes</h3>
      {casosCompletados.length === 0 && <p>No tienes solicitudes completadas aún.</p>}
      {casosCompletados.map(caso => (
        <div key={caso.id} style={{ border: '1px solid #eee', padding: '1rem', marginBottom: '1rem', backgroundColor: '#f9f9f9' }}>
          <p><strong>Código:</strong> {caso.codigo}</p>
          <p><strong>Fecha:</strong> {new Date(caso.fecha_creacion).toLocaleDateString()}</p>
          <p><strong>Estado:</strong> {caso.estado}</p>
        </div>
      ))}
    </div>
  );
};

export default ListaCasosPaciente;
