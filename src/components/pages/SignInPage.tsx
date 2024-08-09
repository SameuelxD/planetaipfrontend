import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth } from '../../firebase';
import './SignInPage.css';

interface SignInPageProps {
  onLoginSuccess: (user: any) => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      onLoginSuccess(user);
      Swal.fire({
        title: 'Éxito',
        text: 'Inicio de sesión exitoso',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      Swal.fire({
        title: 'Error',
        text: `Error de autenticación: ${errorMessage}`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onLoginSuccess(user);
      Swal.fire({
        title: 'Éxito',
        text: 'Inicio de sesión exitoso con Google',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      Swal.fire({
        title: 'Error',
        text: `Error de autenticación: ${errorMessage}`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="login-container">
      <img
        src="https://lh3.googleusercontent.com/p/AF1QipM8fkRetyhveYklnznQkzc1nbrLwMqza_u7OPPU=s1360-w1360-h1020"
        alt="Logo"
        className="login-image"
      />
      <h2 className="login-title">Iniciar sesión</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label">Email:</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Ingrese su email"
          className="login-input"
          type="email"
          required
        />
        <label className="login-label">Contraseña:</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Ingrese su contraseña"
          className="login-input"
          type="password"
          required
        />
        <button className="login-button" type="submit">Iniciar sesión</button>
      </form>
      <div className="google-login-container">
        <div className="google-login-label">Iniciar sesión con</div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQExly8Xk3GWUOkmUGETvVobduKHck3ivnVA&s"
          alt="Google logo"
          onClick={handleGoogleLogin}
          className="google-login-logo"
        />
      </div>
    </div>
  );
};

export default SignInPage;
