import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Link,
  Avatar,
  Box
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const LoginPaciente = () => {
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

      if (usuario.rol !== 'paciente') {
        setMensaje('No tienes permiso para acceder como paciente');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      navigate('/paciente/dashboard');
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ padding: 5, borderRadius: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: '#2196f3', width: 64, height: 64, margin: '0 auto' }}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
              Ingreso para Pacientes
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Correo electrónico"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Contraseña"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                fullWidth
              />
              {mensaje && <Alert severity="error">{mensaje}</Alert>}
              <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                Ingresar
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              <Link component={RouterLink} to="/" underline="hover">
                ← Volver a seleccionar tipo de usuario
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPaciente;
