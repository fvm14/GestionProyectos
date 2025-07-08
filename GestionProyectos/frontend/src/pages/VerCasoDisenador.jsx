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
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VerCasoDisenador = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caso, setCaso] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/casos/${id}`)
      .then(res => setCaso(res.data))
      .catch(() => setError('Error al obtener el caso clínico'));
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
        <Typography>Cargando caso...</Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%)',
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
            <Avatar sx={{ bgcolor: '#7e57c2', width: 64, height: 64, margin: '0 auto' }}>
              <DesignServicesIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: '#7e57c2' }}>
              Detalle del Caso Clínico
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography sx={{ mb: 1 }}><strong>Código:</strong> {caso.codigo}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Paciente:</strong> {caso.paciente_nombre || caso.paciente_id}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Diseñador:</strong> {caso.disenador_nombre || caso.disenador_id}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Estado:</strong> {caso.estado}</Typography>

          <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Notas Clínicas:</Typography>
          <Typography
            sx={{
              border: '1px solid #ccc',
              borderRadius: 1,
              padding: 1,
              backgroundColor: '#f9f9f9',
              whiteSpace: 'pre-wrap',
              mb: 2
            }}
          >
            {caso.notas_clinicas || 'Sin notas registradas'}
          </Typography>

          {caso.archivo && (
            <Typography sx={{ mt: 2 }}>
              <strong>Archivo de diseño:</strong>{' '}
              <a
                href={`http://localhost:3001/uploads/${caso.archivo}`}
                target="_blank"
                rel="noreferrer"
              >
                Ver archivo
              </a>
            </Typography>
          )}

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            fullWidth
            sx={{ mt: 4 }}
            onClick={() => navigate('/disenador/casos')}
          >
            Regresar
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerCasoDisenador;
