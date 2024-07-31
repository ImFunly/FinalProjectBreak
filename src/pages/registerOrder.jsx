import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/authcontext';
import NavBar from '../components/molecules/NavBar';
import PetSelector from '../components/molecules/petSelector';
import dog from '../assets/images/box_dog.png';
import '../assets/css/form.css';

function registerPet() {
    const { user, token, loading } = useContext(AuthContext);
    const customer_id = user?.id || '';
    const [step, setStep] = useState(1);
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('24');
    const [order_status, setOrderStatus] = useState('En progreso');
    const [payment_status, setPaymentStatus] = useState('Pagado');
    const [shipping_address, setShippingAddress] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [selectedPetId, setSelectedPetId] = useState('');
  
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    useEffect(() => {
      if (!token) {
        console.log("El token no se ha encontrado");
        return;
      }
  
      if (!customer_id ) {
        console.log("El user no se ha encontrado");
        return;
      }
  
      const fetchPets = async () => {
        const userIdAsInt = parseInt(customer_id, 10);
  
        if (isNaN(userIdAsInt)) {
          setError("El ID del usuario es inválido.");
          return;
        }
  
        try {
          const response = await fetch(`http://localhost:5000/pet/${userIdAsInt}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al obtener las mascotas: ${errorText}`);
          }
  
          const data = await response.json();
          setPets(data.pets || []);
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchPets();
    }, [customer_id, token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/order/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_id, price, shipping_address, item, payment_status, order_status})
            });
    
            if (!!response?.ok) {
                setItem('');
                setPrice('');
                setOrderStatus('');
                setPaymentStatus('');
                setShippingAddress('');
                setSelectedPetId('');  
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

    const handleNext = () => {
        if (step === 1 && !selectedPetId) {
            setError("Debes seleccionar una mascota para continuar.");
            return;
        }
        
        setError(''); 
        setStep(prevStep => prevStep + 1);
    };

    const handlePrevious = () => {
        setStep(prevStep => prevStep - 1);
    };

    return (
        <>
            <NavBar user={user}/>
            <h2>Estas generando un nuevo pedido</h2>
            <section className='container__form'>
                <img src={dog} />
                <form onSubmit={handleSubmit} className='content__form'>
                {step === 1 && (
                        <>
                            <label className='label'>Elije tu mascota</label>
                            <PetSelector pets={pets} selectedPetId={selectedPetId} setSelectedPetId={setSelectedPetId} setItem={setItem}/>
                            <button 
                                type="button" 
                                onClick={handleNext}
                                disabled={!selectedPetId}
                            >
                                Siguiente
                            </button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                        <h3>El precio total de tu pedido es 24.00€</h3>
                            <label className='label'>Dirección de envío</label>
                            <input 
                                type="text" 
                                placeholder='Ej: Av 36c diagonal 42'
                                value={shipping_address} 
                                onChange={(e) => setShippingAddress(e.target.value)} 
                                required 
                            />
                            <div className='footer_buttom'>
                                <button type="button" onClick={handlePrevious}>Anterior</button>
                                <button type="submit">Generar orden</button>
                            </div>
                        </>
                    )}
                </form>
                {error && <p>{error}</p>}
            </section>
        </>
    );
}

export default registerPet;