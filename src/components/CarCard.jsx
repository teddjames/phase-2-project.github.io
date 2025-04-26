import React from 'react';

function CarCard({ car, inGarage = false, onLike, onAdd, onRemove }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={`${car.make} ${car.model}`} />
      <h3>{car.year} {car.make} {car.model}</h3>
      <p>${car.price.toLocaleString()}</p>
      <div className="actions">
        <button onClick={() => onLike(car.id)} className='like-btn'>♥ {car.likes}</button>
        <button
  className={`car-button ${inGarage ? 'remove-from-garage' : 'add-to-garage'}`}
  onClick={() => inGarage ? onRemove(car.id) : onAdd(car.id)}
>
  {inGarage ? 'Remove from Garage' : 'Add to Garage'}
</button>
      </div>
    </div>
  );
}

export default CarCard;