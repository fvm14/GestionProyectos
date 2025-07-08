import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Menú inicial
import SelectorLogin from '../pages/SelectorLogin';

// Formularios
import LoginPaciente from '../pages/LoginPaciente';
import LoginDoctor from '../pages/LoginDoctor';
import LoginDisenador from '../pages/LoginDisenador';
import Register from '../pages/Register';

// Dashboards
import DoctorDashboard from '../pages/DoctorDashboard';
import PacienteDashboard from '../pages/PacienteDashboard';
import DisenadorDashboard from '../pages/DisenadorDashboard';
import AdminDashboard from '../pages/AdminDashboard';

// Doctor
import FormularioCrearCaso from '../pages/FormularioCrearCaso';
import DoctorCasos from '../pages/DoctorCasos';
import EditarCaso from '../pages/EditarCaso';
import VerCaso from '../pages/VerCaso';

// Paciente
import ListaCasosPaciente from '../pages/ListaCasosPaciente';
import VerCasoPaciente from '../pages/VerCasoPaciente';

// Diseñador
import CasosDisenador from '../pages/CasosDisenador';
import VerCasoDisenador from '../pages/VerCasoDisenador';
import EditarArchivoDisenador from '../pages/EditarArchivoDisenador';

import RedireccionPorRol from '../components/RedireccionPorRol';

const AppRouter = () => {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      try {
        const usuario = JSON.parse(stored);
        setRol(usuario.rol);
      } catch (e) {
        setRol(null);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirección según rol */}
        <Route path="/redirigir" element={<RedireccionPorRol />} />

        {/* Página inicial */}
        <Route path="/" element={<SelectorLogin />} />

        {/* Login y registro */}
        <Route path="/login/paciente" element={<LoginPaciente />} />
        <Route path="/login/doctor" element={<LoginDoctor />} />
        <Route path="/login/disenador" element={<LoginDisenador />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas Doctor */}
        <Route path="/doctor/dashboard" element={rol === 'doctor' ? <DoctorDashboard /> : <Navigate to="/login/doctor" />} />
        <Route path="/doctor/crear-caso" element={rol === 'doctor' ? <FormularioCrearCaso /> : <Navigate to="/login/doctor" />} />
        <Route path="/doctor/casos" element={rol === 'doctor' ? <DoctorCasos /> : <Navigate to="/login/doctor" />} />
        <Route path="/doctor/editar-caso/:id" element={rol === 'doctor' ? <EditarCaso /> : <Navigate to="/login/doctor" />} />
        <Route path="/doctor/ver-caso/:id" element={rol === 'doctor' ? <VerCaso /> : <Navigate to="/login/doctor" />} />

        {/* Rutas Paciente */}
        <Route path="/paciente/dashboard" element={rol === 'paciente' ? <PacienteDashboard /> : <Navigate to="/login/paciente" />} />
        <Route path="/paciente/solicitudes" element={rol === 'paciente' ? <ListaCasosPaciente /> : <Navigate to="/login/paciente" />} />
        <Route path="/paciente/ver-caso/:id" element={rol === 'paciente' ? <VerCasoPaciente /> : <Navigate to="/login/paciente" />} />

        {/* Rutas Diseñador */}
        <Route path="/disenador/dashboard" element={rol === 'disenador' ? <DisenadorDashboard /> : <Navigate to="/login/disenador" />} />
        <Route path="/disenador/casos" element={rol === 'disenador' ? <CasosDisenador /> : <Navigate to="/login/disenador" />} />
        <Route path="/disenador/ver-caso/:id" element={rol === 'disenador' ? <VerCasoDisenador /> : <Navigate to="/login/disenador" />} />
        <Route path="/disenador/editar-archivo/:id" element={rol === 'disenador' ? <EditarArchivoDisenador /> : <Navigate to="/login/disenador" />} />

        {/* Rutas Admin */}
        <Route path="/admin/dashboard" element={rol === 'administrador' ? <AdminDashboard /> : <Navigate to="/" />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
