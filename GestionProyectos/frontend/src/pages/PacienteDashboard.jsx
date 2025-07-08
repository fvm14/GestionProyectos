import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PacienteDashboard = () => {
  const [casos, setCasos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

    // ✅ Verifica que el usuario exista y sea paciente
    if (!usuarioGuardado || usuarioGuardado.rol !== 'paciente') {
      navigate('/login');
    } else {
      setUsuario(usuarioGuardado);

      fetch(`http://localhost:3001/api/casos/paciente/${usuarioGuardado.id}`)
        .then(res => res.json())
        .then(data => setCasos(data))
        .catch(err => console.error('Error al cargar casos del paciente:', err));
    }
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const obtenerColorEstado = (estado) => {
    switch (estado) {
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
        background: 'linear-gradient(to bottom right, #e3f2fd, #f1f8e9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 5,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={5}
          sx={{
            borderRadius: 4,
            p: 4,
            width: '100%',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#1976d2' }}>
                <AssignmentIndIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                Bienvenido, {usuario?.nombre || 'Paciente'}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Mis Casos Clínicos
            </Typography>

            {casos.length === 0 ? (
              <Typography>No tienes casos clínicos asignados.</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Código</strong></TableCell>
                    <TableCell><strong>Estado</strong></TableCell>
                    <TableCell><strong>Fecha</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {casos.map((caso) => (
                    <TableRow key={caso.id}>
                      <TableCell>{caso.codigo}</TableCell>
                      <TableCell>
                        <Chip
                          label={caso.estado}
                          color={obtenerColorEstado(caso.estado)}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{new Date(caso.fecha_creacion).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          startIcon={<VisibilityIcon />}
                          onClick={() => navigate(`/paciente/ver-caso/${caso.id}`)}
                        >
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PacienteDashboard;
