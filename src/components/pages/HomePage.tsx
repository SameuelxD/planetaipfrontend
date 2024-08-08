import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice'; 

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser()); 
      console.log('Usuario desconectado');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
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
