// src/pages/CasosDisenador.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CasosDisenador = () => {
  const [casos, setCasos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (usuario?.id) {
      axios.get(`http://localhost:3001/api/casos/disenador/${usuario.id}`)
        .then(res => setCasos(res.data))
        .catch(() => setError('Error al obtener los casos asignados'));
    }
  }, [usuario]);

  const handleBuscar = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  const casosFiltrados = casos.filter(caso =>
    caso.codigo?.toLowerCase().includes(busqueda) ||
    caso.estado?.toLowerCase().includes(busqueda) ||
    caso.notas_clinicas?.toLowerCase().includes(busqueda)
  );

  const getColorEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'diseño':
        return 'info';
      case 'revisión':
        return 'warning';
      case 'aprobado':
        return 'success';
      case 'impresión':
        return 'secondary';
      case 'entregado':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f3e5f5, #ede7f6)',
        py: 5
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={5} sx={{ p: 4, borderRadius: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => navigate('/disenador/dashboard')}>
              <ArrowBackIcon />
            </IconButton>
            <Avatar sx={{ bgcolor: '#7e57c2', ml: 2 }}>
              <DesignServicesIcon />
            </Avatar>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold', color: '#7e57c2' }}>
              Casos Asignados
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Buscar por código, estado o notas"
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
                  <TableCell><strong>Notas</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                  <TableCell><strong>Archivo</strong></TableCell>
                  <TableCell align="center"><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {casosFiltrados.length > 0 ? (
                  casosFiltrados.map(caso => (
                    <TableRow key={caso.id}>
                      <TableCell>{caso.codigo}</TableCell>
                      <TableCell>{caso.notas_clinicas || 'Sin notas'}</TableCell>
                      <TableCell>
                        <Chip
                          label={caso.estado || 'Sin estado'}
                          color={getColorEstado(caso.estado)}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {caso.archivo_diseno ? (
                          <a
                            href={`http://localhost:3001/uploads/${caso.archivo_diseno}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Ver archivo
                          </a>
                        ) : (
                          'No disponible'
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          title="Ver caso"
                          onClick={() => navigate(`/disenador/ver-caso/${caso.id}`)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          title="Subir nuevo archivo"
                          onClick={() => navigate(`/disenador/editar-archivo/${caso.id}`)}
                        >
                          <CloudUploadIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
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

export default CasosDisenador;
