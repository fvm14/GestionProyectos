import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Box,
  Avatar,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const SelectorLogin = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f2f1 0%, #f1f8e9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Paper elevation={4} sx={{ padding: 5, borderRadius: 4, width: '100%', maxWidth: 500 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: '#4caf50', width: 64, height: 64, margin: '0 auto' }}>
            <MedicalServicesIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
            Sistema de Gestión Clínica
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Seleccione su tipo de usuario
          </Typography>
        </Box>

        <Stack spacing={2}>
          <Button
            variant="contained"
            startIcon={<PersonIcon />}
            color="primary"
            size="large"
            onClick={() => navigate('/login/paciente')}
            fullWidth
            sx={{ textTransform: 'none' }}
          >
            Soy Paciente
          </Button>

          <Button
            variant="contained"
            startIcon={<LocalHospitalIcon />}
            color="success"
            size="large"
            onClick={() => navigate('/login/doctor')}
            fullWidth
            sx={{ textTransform: 'none' }}
          >
            Soy Doctor
          </Button>

          <Button
            variant="contained"
            startIcon={<DesignServicesIcon />}
            color="secondary"
            size="large"
            onClick={() => navigate('/login/disenador')}
            fullWidth
            sx={{ textTransform: 'none' }}
          >
            Soy Diseñador de Prótesis
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SelectorLogin;
