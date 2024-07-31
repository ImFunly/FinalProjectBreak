import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/authcontext';
import '../assets/css/form.css'; 


function Register() {

  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


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
    <>
    <h2>Registrarse</h2>
    <section className='container__form'>
    <form onSubmit={handleSubmit} className='content__form'>
    <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        <input
            type="text"
            placeholder="Telefono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
        />   
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
        <button type="submit">Registrarse</button>
    </form>
    {error && <p>{error}</p>}
</section>
</>
  );}

export default Register