import React from 'react';
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
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useTheme } from '@mui/material/styles';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const cerrarSesion = useCerrarSesion();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f1f8e9 0%, #e3f2fd 100%)',
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
                <Avatar sx={{ bgcolor: '#4caf50', width: 100, height: 100, margin: '0 auto' }}>
                  <LocalHospitalIcon fontSize="large" />
                </Avatar>
                <Typography
                  variant={isMobile ? 'h5' : 'h4'}
                  sx={{ mt: 2, fontWeight: 600 }}
                >
                  ¡Bienvenido Doctor!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Seleccione una acción para comenzar
                </Typography>
              </Box>
            </Grid>

            {/* Sección derecha */}
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/doctor/crear-caso')}
                >
                  CREAR NUEVO CASO CLÍNICO
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/doctor/casos')}
                >
                  VER MIS CASOS ASIGNADOS
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

export default DoctorDashboard;
