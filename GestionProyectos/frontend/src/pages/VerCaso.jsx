// src/pages/VerCaso.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Alert,
  Avatar,
  Button
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VerCaso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caso, setCaso] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/casos/${id}`)
      .then(res => setCaso(res.data))
      .catch(() => setError('Error al obtener los datos del caso'));
  }, [id]);

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!caso) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>Cargando...</Typography>
      </Container>
    );
  }

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
              <VisibilityIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
              Detalles del Caso Clínico
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography><strong>Código:</strong> {caso.codigo}</Typography>
          <Typography><strong>Paciente:</strong> {caso.nombre_paciente || 'No disponible'}</Typography>
          <Typography><strong>Diseñador:</strong> {caso.nombre_disenador || 'No disponible'}</Typography>
          <Typography><strong>Estado:</strong> {caso.estado}</Typography>
          <Typography><strong>Notas clínicas:</strong></Typography>
          <Typography sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
            {caso.notas_clinicas || 'Sin notas'}
          </Typography>
          <Typography>
            <strong>Fecha de creación:</strong> {new Date(caso.fecha_creacion).toLocaleString()}
          </Typography>

          {caso.archivo_diseno && (
            <Typography sx={{ mt: 2 }}>
              <strong>Archivo de diseño:</strong>{' '}
              <a
                href={`http://localhost:3001/uploads/${caso.archivo_diseno}`}
                target="_blank"
                rel="noreferrer"
              >
                Descargar diseño
              </a>
            </Typography>
          )}

          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 4 }}
            startIcon={<ArrowBackIcon />}
            fullWidth
            onClick={() => navigate('/doctor/casos')}
          >
            Regresar
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerCaso;
