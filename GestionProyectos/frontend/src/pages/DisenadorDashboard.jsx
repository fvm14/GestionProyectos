import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCerrarSesion from '../hooks/useCerrarSesion';
import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Box,
  Avatar,
  Grid,
  useMediaQuery
} from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { useTheme } from '@mui/material/styles';

const DisenadorDashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const cerrarSesion = useCerrarSesion();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const datosUsuario = JSON.parse(localStorage.getItem('usuario'));
    if (!datosUsuario || datosUsuario.rol !== 'disenador') {
      navigate('/login/disenador');
    } else {
      setUsuario(datosUsuario);
    }
  }, [navigate]);

  if (!usuario) return <p>Cargando...</p>;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            minHeight: '60vh',
            padding: isMobile ? 4 : 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid
            container
            spacing={6}
            alignItems="center"
            justifyContent="space-around"
            direction={isMobile ? 'column' : 'row'}
          >
            {/* Sección izquierda */}
            <Grid item xs={12} md={5}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: '#7e57c2', width: 100, height: 100, margin: '0 auto' }}>
                  <DesignServicesIcon fontSize="large" />
                </Avatar>
                <Typography
                  variant={isMobile ? 'h5' : 'h4'}
                  sx={{ mt: 2, fontWeight: 600, color: '#7e57c2' }}
                >
                  Panel del Diseñador
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Bienvenido, <strong>{usuario.nombre}</strong>. Aquí puedes gestionar tus casos clínicos asignados.
                </Typography>
              </Box>
            </Grid>

            {/* Sección derecha */}
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    backgroundColor: '#7e57c2',
                    '&:hover': {
                      backgroundColor: '#6a1b9a',
                    }
                  }}
                  onClick={() => navigate('/disenador/casos')}
                >
                  VER CASOS ASIGNADOS
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  fullWidth
                  onClick={cerrarSesion}
                >
                  CERRAR SESIÓN
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default DisenadorDashboard;
