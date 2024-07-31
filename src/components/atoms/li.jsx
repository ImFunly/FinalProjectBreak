import React from 'react';
import dog from '../../assets/images/dog_orange.png';

function Li({ pet, children }) {
    return (
    <li>
        <div className="card">
            <img src={dog} className="card__image" alt="" />
            <div className="card__overlay">
                <div className="card__header">
                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                    <div className="card__header-text">
                        <h3 className="card__title">{pet.name}</h3>            
                    </div>
                </div>
                <span className="card__description">Peso: {pet.weight}kg</span>
                <span className="card__description">Raza: {pet.breed}</span>
                <span className="card__description">Sexo: {pet.sexo}</span>
            </div>
        </div>      
    </li>  
    );
}

export default Li;