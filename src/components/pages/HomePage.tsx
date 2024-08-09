import React from 'react';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice'; 

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Se cerrará la sesión!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        dispatch(clearUser()); 
        Swal.fire('Desconectado', 'Has cerrado sesión con éxito.', 'success');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        Swal.fire('Error', 'No se pudo cerrar sesión. Intenta nuevamente.', 'error');
      }
    }
  };

  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default HomePage;
