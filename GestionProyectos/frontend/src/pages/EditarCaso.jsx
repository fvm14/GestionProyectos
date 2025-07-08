// src/pages/EditarCaso.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  Alert,
  Avatar,
  Divider
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditarCaso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caso, setCaso] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [disenadores, setDisenadores] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const estados = ['diseño', 'revisión', 'aprobado', 'impresión', 'entregado'];

  useEffect(() => {
    axios.get(`http://localhost:3001/api/casos/${id}`)
      .then(res => setCaso({ ...res.data, nuevoArchivo: null }))
      .catch(console.error);

    axios.get('http://localhost:3001/api/auth/usuarios/pacientes')
      .then(res => setPacientes(res.data))
      .catch(console.error);

    axios.get('http://localhost:3001/api/auth/usuarios/disenadores')
      .then(res => setDisenadores(res.data))
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setCaso({ ...caso, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCaso({ ...caso, nuevoArchivo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('codigo', caso.codigo);
      formData.append('paciente_id', caso.paciente_id);
      formData.append('disenador_id', caso.disenador_id);
      formData.append('doctor_id', caso.doctor_id);
      formData.append('notas_clinicas', caso.notas_clinicas || '');
      formData.append('estado', caso.estado);

      if (caso.nuevoArchivo) {
        formData.append('archivo', caso.nuevoArchivo);
      }
      formData.append('archivo_existente', caso.archivo_diseno || '');

      await axios.put(`http://localhost:3001/api/casos/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMensaje('Caso actualizado correctamente');
      setTimeout(() => navigate('/doctor/casos'), 1500);
    } catch (err) {
      console.error(err);
      setMensaje('Error al actualizar el caso');
    }
  };

  if (!caso) return <p>Cargando...</p>;

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
        <Paper elevation={5} sx={{ borderRadius: 4, p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: '#1976d2', width: 64, height: 64, margin: '0 auto' }}>
              <EditNoteIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
              Editar Caso Clínico
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Modifica los datos del caso clínico
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              fullWidth
              label="Código"
              name="codigo"
              value={caso.codigo}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              select
              fullWidth
              label="Paciente"
              name="paciente_id"
              value={caso.paciente_id}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="">-- Selecciona paciente --</MenuItem>
              {pacientes.map(p => (
                <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Diseñador"
              name="disenador_id"
              value={caso.disenador_id}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="">-- Selecciona diseñador --</MenuItem>
              {disenadores.map(d => (
                <MenuItem key={d.id} value={d.id}>
                  {d.nombre} ({d.codigo || 'sin código'})
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Estado"
              name="estado"
              value={caso.estado}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            >
              {estados.map(est => (
                <MenuItem key={est} value={est}>{est}</MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Notas Clínicas"
              name="notas_clinicas"
              value={caso.notas_clinicas || ''}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Archivo de diseño:</Typography>
              <input type="file" name="archivo" onChange={handleFileChange} />
              {caso.archivo_diseno && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Archivo actual:{' '}
                  <a href={`http://localhost:3001/uploads/${caso.archivo_diseno}`} target="_blank" rel="noreferrer">
                    {caso.archivo_diseno}
                  </a>
                </Typography>
              )}
            </Box>

            <Button type="submit" variant="contained" fullWidth color="primary" size="large">
              Guardar Cambios
            </Button>

            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => navigate('/doctor/casos')}
              startIcon={<ArrowBackIcon />}
            >
              Regresar
            </Button>
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

export default EditarCaso;
