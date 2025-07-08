import { useNavigate } from 'react-router-dom';

const useCerrarSesion = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return cerrarSesion;
};

export default useCerrarSesion;
