import React from 'react';

function CarCard({ car, inGarage = false, onLike, onAdd, onRemove }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={`${car.make} ${car.model}`} />
      <h3>{car.year} {car.make} {car.model}</h3>
      <p>${car.price.toLocaleString()}</p>
      <div className="actions">
        <button onClick={() => onLike(car.id)} className='like-btn'>♥ {car.likes}</button>
        {inGarage ? (
          <button onClick={() => onRemove(car.id)} className='remove-from-garage'>Remove from Garage</button>
        ) : (
          <button onClick={() => onAdd(car.id)} className='add-to-garage'>Add to Garage</button>
        )}
      </div>
    </div>
  );
}

export default CarCard;