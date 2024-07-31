import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/authcontext';
import { useContext } from 'react';
import '../assets/css/form.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginUser(email, password);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <section className='container__form'>
                <form onSubmit={handleSubmit} className='content__form'>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Iniciar sesión</button>
                </form>
            </section>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;