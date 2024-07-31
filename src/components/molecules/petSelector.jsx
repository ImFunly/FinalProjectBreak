import React, { useState, useEffect } from 'react';
import eatDog1 from '../../assets/images/eatDog1.png';
import chicken from '../../assets/images/icons/chicken.svg';
import turkey from '../../assets/images/icons/turkey.svg';
import ox from '../../assets/images/icons/ox.svg';
import salmon from '../../assets/images/icons/salmon.svg';
import carrot from '../../assets/images/icons/carrot.svg';
import potato from '../../assets/images/icons/potato.svg';
import pumpkin from '../../assets/images/icons/pumpkin.svg';

const PetSelector = ({ pets, selectedPetId, setSelectedPetId, setItem }) => {
    const [selectedPetWeight, setSelectedPetWeight] = useState(null);

    useEffect(() => {
        const selectedPet = pets.find(pet => pet.id === Number(selectedPetId));
        if (selectedPet) {
            setSelectedPetWeight(selectedPet.weight);
            updateItemBasedOnWeight(selectedPet.weight)
        } else {
            setSelectedPetWeight(null);
        }
    }, [selectedPetId, pets]);

    const handleSelectChange = (event) => {
        const petId = event.target.value;
        setSelectedPetId(petId);
    };

    const updateItemBasedOnWeight = (weight) => {
        if (weight >= 1 && weight <= 25) {
            setItem('Pollo, Pavo, Buey, Salmón');
        } else if (weight >= 26 && weight <= 60) {
            setItem('Pollo, Zanahoria, Patata, Calabaza');
        } else {
            setItem('Consulta a un profesional');
        }
    };

    const renderWeightMessage = (weight) => {
        if (weight >= 1 && weight <= 25) {

            return (
                <div className='content__food'>
                    <h3>Te recomendamos este producto para tu mascota</h3>
                    <img src={eatDog1} alt='Comida' className='header'/>
                    <div className='eat__list'>
                        <div className='icon__list'><img src={chicken} alt='Pollo' />Pollo  67%</div>
                        <div className='icon__list'><img src={turkey} alt='Pavo' />Pavo  65,8%</div>
                    </div>
                    <div className='eat__list2 bottom'>
                        <div className='icon__list'><img src={ox} alt='Buey' />Buey  65%</div>
                        <div className='icon__list'><img src={salmon} alt='Salmón' />Salmón  40,3%</div>
                    </div>
                </div>
            );
        } else if (weight >= 26 && weight <= 60) {

            return (
                <div className='content__food'>
                    <h3>Te recomendamos este producto para tu mascota</h3>
                    <img src={eatDog1} alt='Comida' className='header'/>
                    <div className='eat__list'>
                        <div className='icon__list'><img src={chicken} alt='Pollo' />Pollo  67%</div>
                        <div className='icon__list'><img src={carrot} alt='Zanahoria' />Zanahoria fresca</div>
                    </div>
                    <div className='eat__list2 bottom'>
                        <div className='icon__list'><img src={potato} alt='Patata' />Patata fresca</div>
                        <div className='icon__list'><img src={pumpkin} alt='Calabaza' />Calabaza</div>
                    </div>
                </div>
            );
        } else {
            return <p>Debes tener cuidado, llama a un profesional para que vea tu mascota.</p>;
        }
    };

    return (
        <div>
            <select onChange={handleSelectChange} value={selectedPetId} className='selectpet'>
                <option value="">Selecciona tu mascota</option>
                {pets.length > 0 ? (
                    pets.map(pet => (
                        <option key={pet.id} value={pet.id}>{pet.name}</option>
                    ))
                ) : (
                    <option disabled>No tienes mascotas registradas.</option>
                )}
            </select>

            {selectedPetWeight != null && renderWeightMessage(selectedPetWeight)}
        </div>
    );
};

export default PetSelector;
