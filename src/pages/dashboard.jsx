import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/molecules/NavBar';
import '../assets/css/dashboard.css';
import dog from '../assets/images/dog_orange.png';
import cross from '../assets/images/icons/cross.svg';
import Li from '../components/atoms/li';
import AuthContext from '../contexts/authcontext';

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const { user, token, loading} = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  useEffect(() => {
    if (!token) {
      console.log("Token is missing");
      return;
    }

    if (!user ) {
      console.log("user is missing");
      return;
    }

    const fetchPets = async () => {
      const userIdAsInt = parseInt(user.id);

      if (isNaN(userIdAsInt)) {
        return;
      }

      try {
        const response = await fetch(`https://finalprojectbreackbackend.onrender.com/pet/${userIdAsInt}`, {
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
  }, [user.id || '', token]); 

  useEffect(() => {
    if (!token) {
      console.log("Token is missing");
      return;
    }

    if (!user ) {
      console.log("user is missing");
      return;
    }

    const fetchOrders = async () => {
      const userIdAsInt = parseInt(user.id);

      if (isNaN(userIdAsInt)) {
        return;
      }

      try {
        const response = await fetch(`https://finalprojectbreackbackend.onrender.com/order/${userIdAsInt}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al obtener las mascotas: ${errorText}`);
        }

        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrders();
  }, [user.id || '', token]); 

  return (
    <> 
      <NavBar user={user}/>
      <main className='container'>
        <section className="content">
          <h2 className='title'>Tus mascotas</h2>
          <ul className="cards">
          {pets.length < 3 ? (
                <li>
                <a href="/pet/create" className="card">
                  <img src={dog} className="card__image" alt="Agregar nueva mascota" />
                  <div className="card__overlay">
                    <div className="card__header">
                      <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                    
                      <div className="card__header-text">
                        <div className='center-container'>
                          <img className="card__icon" src={cross} alt="Icono de cruz"/>  
                        </div>
                        <h3 className="card__title center">Agregar nueva mascota</h3> 
                      </div>
                    </div>
                  </div>
                </a>        
              </li>  
            ) : 
              null
            }


            {pets.length > 0 ? (
              pets.map(pet => (
                <Li key={pet.id} pet={pet}></Li>
              ))
            ) : 
              null}
          </ul>
        </section>
        <section className='orders'>
          <div className='order__header'>
            <h2 className='title'>Pedidos</h2>
            <a href='/order/create' className='btn-primary'>Nuevo pedido</a>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th><h1>Referencia</h1></th>
                <th><h1>Articulo</h1></th>
                <th><h1>Precio</h1></th>
                <th><h1>Estado de la orden</h1></th>
                <th><h1>Estado de pago</h1></th>
              </tr>
            </thead>
            <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.item}</td>
                  <td>{order.price}€</td>
                  <td>{order.order_status}</td>
                  <td>{order.payment_status}</td>
                </tr>
              ))
            ) : (
              <tr ><td colSpan="5" style={{ textAlign: 'center' }}>No tienes ordenes registradas.</td></tr>
            )}
            </tbody>
          </table>
        </section>
        {error && <p className="error">{error}</p>}
      </main>
    </>
  );
}

export default Dashboard;
