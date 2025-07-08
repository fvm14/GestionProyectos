// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', form);
      const { token, usuario } = res.data;

      // Guardar en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      setMensaje(`Bienvenido ${usuario.nombre}, Rol: ${usuario.rol}`);

      // Redireccionar según el rol
      switch (usuario.rol) {
        case 'doctor':
          navigate('/doctor');
          break;
        case 'paciente':
          navigate('/paciente');
          break;
        case 'diseñador':
          navigate('/disenador');
          break;
        case 'administrador':
          navigate('/admin');
          break;
        default:
          navigate('/login');
      }

    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Ingresar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      <br />
      <button onClick={() => navigate('/register')}>Registrarse</button>
    </div>
  );
};

export default Login;
