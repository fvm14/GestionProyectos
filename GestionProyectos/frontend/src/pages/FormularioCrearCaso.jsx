// src/pages/FormularioCrearCaso.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Avatar,
  Alert,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Stack
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const FormularioCrearCaso = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [disenadores, setDisenadores] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [form, setForm] = useState({
    codigo: '',
    paciente_id: '',
    disenador_id: '',
    doctor_id: '',
    notas_clinicas: ''
  });

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario?.rol === 'doctor') {
      setForm(prev => ({ ...prev, doctor_id: usuario.id }));
    }

    axios.get('http://localhost:3001/api/auth/usuarios/pacientes')
      .then(res => setPacientes(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:3001/api/auth/usuarios/disenadores')
      .then(res => setDisenadores(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.codigo || !form.paciente_id || !form.disenador_id || !form.doctor_id) {
      return setMensaje('Faltan campos obligatorios');
    }

    try {
      const res = await axios.post('http://localhost:3001/api/casos', form);
      setMensaje(res.data.mensaje);
      setForm({ ...form, codigo: '', paciente_id: '', disenador_id: '', notas_clinicas: '' });
    } catch (error) {
      setMensaje('Error al registrar el caso');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #e3f2fd, #f1f8e9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 5,
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ borderRadius: 4, padding: 4 }}>

          {/* Botón Regresar */}
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/doctor/casos')}
            sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold', textTransform: 'none' }}
          >
            Regresar
          </Button>

          {/* Encabezado */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: '#1976d2', width: 64, height: 64, margin: '0 auto' }}>
              <AssignmentIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
              Crear Nuevo Caso Clínico
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Complete todos los campos para registrar un nuevo caso
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <Table>
              <TableBody>

                <TableRow>
                  <TableCell component="th">
                    <Typography fontWeight="bold">Código del Caso *</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="codigo"
                      value={form.codigo}
                      onChange={handleChange}
                      placeholder="Ej: C0001"
                      fullWidth
                      required
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Paciente *</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      name="paciente_id"
                      value={form.paciente_id}
                      onChange={handleChange}
                      fullWidth
                      required
                    >
                      <MenuItem value="">-- Selecciona paciente --</MenuItem>
                      {pacientes.map(p => (
                        <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Diseñador *</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      name="disenador_id"
                      value={form.disenador_id}
                      onChange={handleChange}
                      fullWidth
                      required
                    >
                      <MenuItem value="">-- Selecciona diseñador --</MenuItem>
                      {disenadores.map(d => (
                        <MenuItem key={d.id} value={d.id}>
                          {d.nombre} ({d.codigo || 'sin código'})
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Notas Clínicas</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="notas_clinicas"
                      value={form.notas_clinicas}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ pt: 3 }}>
                    <Button type="submit" variant="contained" color="primary" size="large">
                      Crear Caso Clínico
                    </Button>
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </form>

          {mensaje && (
            <Alert sx={{ mt: 3 }} severity={mensaje.includes('Error') ? 'error' : 'success'}>
              {mensaje}
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default FormularioCrearCaso;
