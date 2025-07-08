// src/components/RedireccionPorRol.jsx
import { Navigate } from 'react-router-dom';

const RedireccionPorRol = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const rol = usuario?.rol;

  if (!rol) return <Navigate to="/" />;

  if (rol === 'doctor') return <Navigate to="/doctor/dashboard" />;
  if (rol === 'paciente') return <Navigate to="/paciente/dashboard" />;
  if (rol === 'disenador') return <Navigate to="/disenador/dashboard" />;
  if (rol === 'administrador') return <Navigate to="/admin/dashboard" />;

  return <Navigate to="/" />;
};

export default RedireccionPorRol;
