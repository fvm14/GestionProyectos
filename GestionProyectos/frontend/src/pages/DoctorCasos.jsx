// src/pages/DoctorCasos.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Avatar,
  Alert,
  IconButton,
  Chip
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DoctorCasos = () => {
  const [casos, setCasos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario?.id) {
      fetch(`http://localhost:3001/api/casos/doctor/${usuario.id}`)
        .then(res => res.json())
        .then(data => setCasos(data))
        .catch(() => setError('Error al obtener los casos'));
    }
  }, []);

  const handleBuscar = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  const casosFiltrados = casos.filter(caso =>
    caso.codigo.toLowerCase().includes(busqueda) ||
    (caso.nombre_paciente && caso.nombre_paciente.toLowerCase().includes(busqueda)) ||
    (caso.estado && caso.estado.toLowerCase().includes(busqueda))
  );

  const getColorEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'diseño':
        return 'info';
      case 'revisión':
        return 'warning';
      case 'aprobado':
        return 'success';
      case 'rechazado':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #e3f2fd, #f1f8e9)',
        py: 5
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={5} sx={{ p: 4, borderRadius: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => navigate('/doctor/dashboard')}>
              <ArrowBackIcon />
            </IconButton>
            <Avatar sx={{ bgcolor: '#1976d2', ml: 2 }}>
              <AssignmentIcon />
            </Avatar>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold' }}>
              Casos Clínicos Creados
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Buscar por código, paciente o estado"
            variant="outlined"
            value={busqueda}
            onChange={handleBuscar}
            sx={{ mb: 3 }}
          />

          {error && <Alert severity="error">{error}</Alert>}

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Código</strong></TableCell>
                  <TableCell><strong>Paciente</strong></TableCell>
                  <TableCell><strong>Diseñador</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                  <TableCell><strong>Fecha</strong></TableCell>
                  <TableCell align="center"><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {casosFiltrados.length > 0 ? (
                  casosFiltrados.map(caso => (
                    <TableRow key={caso.id}>
                      <TableCell>{caso.codigo}</TableCell>
                      <TableCell>{caso.nombre_paciente || 'No disponible'}</TableCell>
                      <TableCell>{caso.nombre_disenador || 'No disponible'}</TableCell>
                      <TableCell>
                        <Chip
                          label={caso.estado || 'Sin estado'}
                          color={getColorEstado(caso.estado)}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{new Date(caso.fecha_creacion).toLocaleString()}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => navigate(`/doctor/ver-caso/${caso.id}`)}
                          title="Ver caso"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => navigate(`/doctor/editar-caso/${caso.id}`)}
                          title="Editar caso"
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No se encontraron casos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default DoctorCasos;
