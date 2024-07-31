import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/authcontext';
import NavBar from '../components/molecules/NavBar';
import dog from '../assets/images/dog_orange.png';
import '../assets/css/form.css';

function registerPet() {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [breed, setBreed] = useState('');
    const [sexo, setSexo] = useState('');
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const user_id = user?.id || '';
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://finalprojectbreackbackend.onrender.com/pet/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id , name, weight, breed, sexo })
            });
    
            if (!!response?.ok) {
                setName('');
                setWeight('')
                setBreed('')
                setSexo('')
                navigate('/')
                return true;
            } else {
                const data = await response.json();
                setError(data.error || 'Error al registrar tu mascota')
                throw new Error(data.error || 'Error al registrar tu mascota');
            }
        } catch (error) {
            console.error('Error al registrar mascota:', error);
            throw error;
        }
    };

    return (
        <>
            <NavBar user={user}/>
            <h2>Registra tu mascota</h2>
            <section className='container__form'>
                <img src={dog} />
                <form onSubmit={handleSubmit} className='content__form'>
                    <input
                        type="text"
                        placeholder="Nombre de tu mascota"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Peso de tu mascota KG"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Raza de tu mascota"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Sexo de tu mascota"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        required
                    />
                    <button type="submit">Guardar mascota</button>
                </form>
            </section>
            {error && <p>{error}</p>}
        </>
    );
}

export default registerPet;