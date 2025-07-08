import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  Avatar,
  Alert,
  Button
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VerCasoPaciente = () => {
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
        <Paper elevation={5} sx={{ borderRadius: 4, p: 4, minHeight: '80vh', bgcolor: '#ffffff' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: '#1976d2', width: 64, height: 64, margin: '0 auto' }}>
              <AssignmentIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: '#1976d2' }}>
              Detalles del Caso Clínico
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography sx={{ mb: 1 }}><strong>Código:</strong> {caso.codigo}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Notas clínicas:</strong></Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
            {caso.notas_clinicas || 'Sin notas'}
          </Typography>
          <Typography sx={{ mb: 2 }}><strong>Estado:</strong> {caso.estado}</Typography>

          {caso.archivo_diseno && (
            <Typography sx={{ mt: 2 }}>
              <strong>Archivo de diseño:</strong>{' '}
              <a
                href={`http://localhost:3001/uploads/${caso.archivo_diseno}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver archivo
              </a>
            </Typography>
          )}

          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 4 }}
            startIcon={<ArrowBackIcon />}
            fullWidth
            onClick={() => navigate('/paciente/dashboard')}
          >
            Regresar
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerCasoPaciente;
