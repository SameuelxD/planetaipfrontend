import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './SignInPage.css';

interface SignInPageProps {
  onLoginSuccess: (user: any) => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      onLoginSuccess(user);
      console.log('Usuario logueado:', user);
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error de autenticación: ${error.message}`);
      } else {
        setError('Error desconocido');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label">Email:</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="login-input"
          type="email"
          required
        />
        <label className="login-label">Password:</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          className="login-input"
          type="password"
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignInPage;
