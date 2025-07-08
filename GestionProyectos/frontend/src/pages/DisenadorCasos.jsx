// src/pages/CasosDisenador.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  Divider,
  Chip
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

const CasosDisenador = () => {
  const [casos, setCasos] = useState([]);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (usuario?.id) {
      axios.get(`http://localhost:3001/api/casos/disenador/${usuario.id}`)
        .then(res => setCasos(res.data))
        .catch(err => console.error(err));
    }
  }, [usuario]);

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
        background: 'linear-gradient(to bottom right, #f3e5f5, #ede7f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 5,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: 4,
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar sx={{ bgcolor: '#7e57c2' }}>
              <DesignServicesIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" color="#7e57c2">
              Casos Asignados al Diseñador
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {casos.length === 0 ? (
            <Typography>No hay casos asignados.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Código</strong></TableCell>
                  <TableCell><strong>Notas</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                  <TableCell><strong>Archivo</strong></TableCell>
                  <TableCell><strong>Acción</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {casos.map((caso) => (
                  <TableRow key={caso.id}>
                    <TableCell>{caso.codigo}</TableCell>
                    <TableCell>{caso.notas_clinicas || 'Sin notas'}</TableCell>
                    <TableCell>
                      <Chip
                        label={caso.estado}
                        color={obtenerColorEstado(caso.estado)}
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
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<CloudUploadIcon />}
                        onClick={() => navigate(`/disenador/editar-archivo/${caso.id}`)}
                      >
                        Subir archivo
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default CasosDisenador;
