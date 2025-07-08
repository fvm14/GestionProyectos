// src/pages/EditarArchivoDisenador.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Alert,
  Avatar,
  Divider,
  IconButton,
  Input,
} from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const EditarArchivoDisenador = () => {
  const { id } = useParams();
  const [caso, setCaso] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/casos/${id}`)
      .then(res => setCaso(res.data))
      .catch(() => setError('Error al cargar el caso'));
  }, [id]);

  const handleArchivoChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) return;

    const formData = new FormData();
    formData.append('codigo', caso.codigo);
    formData.append('paciente_id', caso.paciente_id);
    formData.append('disenador_id', caso.disenador_id);
    formData.append('doctor_id', caso.doctor_id);
    formData.append('estado', caso.estado);
    formData.append('notas_clinicas', caso.notas_clinicas);
    formData.append('archivo', archivo);
    formData.append('archivo_existente', caso.archivo || '');

    try {
      await axios.put(`http://localhost:3001/api/casos/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setExito('Archivo actualizado correctamente');
      setTimeout(() => navigate('/disenador/dashboard'), 1500);
    } catch (err) {
      setError('Error al subir el archivo');
    }
  };

  if (!caso) return (
    <Container sx={{ mt: 5 }}>
      <Typography>Cargando...</Typography>
    </Container>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f3e5f5, #ede7f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 5,
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ borderRadius: 4, p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => navigate('/disenador/dashboard')}>
              <ArrowBackIcon />
            </IconButton>
            <Avatar sx={{ bgcolor: '#7e57c2', ml: 2 }}>
              <DesignServicesIcon />
            </Avatar>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold', color: '#7e57c2' }}>
              Subir nuevo archivo
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {exito && <Alert severity="success" sx={{ mb: 2 }}>{exito}</Alert>}

          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Código del caso:</strong> {caso.codigo}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Input
              type="file"
              inputProps={{ accept: '.pdf,.stl,.jpg,.png' }}
              onChange={handleArchivoChange}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 3 }}
              fullWidth
            >
              Actualizar Archivo
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditarArchivoDisenador;
