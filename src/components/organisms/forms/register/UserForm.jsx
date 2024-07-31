import React, { useState, useContext } from 'react';
import AuthContext from '../../../../contexts/authcontext';
import FormField from '../../../molecules/FormField';
import Button from '../../../atoms/button';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import '../../../../assets/css/register.css'; 
import { useNavigate } from 'react-router-dom';


function UserForm() {
    const { register } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await register(name, email, phone, password);
            setSuccess('Registro exitoso');
            setError('');
        } catch (err) {
            setError(err.message || 'Error en el registro');
            setSuccess('');
        }
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
             {success && <p>{success}</p>}
             {error && <p>{error}</p>}
            <FormField id="name" type="text" label="Nombre:" value={name} onChange={(e) => setName(e.target.value)} />
            <FormField id="phone" type="tel" label="Teléfono:" value={phone} onChange={(e) => setPhone(e.target.value)} icon={faFlag} />
            <FormField id="email" type="email" label="Correo Electrónico:" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormField id="password" type="password" label="Contraseña:" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit">Registrar</Button>
        </form>
    );
}

export default UserForm;
