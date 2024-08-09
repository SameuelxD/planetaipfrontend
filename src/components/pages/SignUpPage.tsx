import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth } from '../../firebase'; 
import './SignUpPage.css';

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            Swal.fire({
                title: 'Éxito',
                text: 'Registro exitoso',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            Swal.fire({
                title: 'Error',
                text: `Error de registro: ${errorMessage}`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Regístrate</h2>
            <form className="signup-form" onSubmit={handleSignUp}>
                <label className="signup-label">Email:</label>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Ingrese su email"
                    className="signup-input"
                    type="email"
                    required
                />
                <label className="signup-label">Contraseña:</label>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Ingrese su contraseña"
                    className="signup-input"
                    type="password"
                    required
                />
                <button className="signup-button" type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default SignUpPage;
