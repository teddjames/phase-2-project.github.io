import React from 'react';
import CarCard from '../components/CarCard';

function Garage({ garage = [], onLike, onRemove }) {
  return (
    <div className="garage">
      <header>
        <h2>Your Garage</h2>
      </header>
      <div className="garage-grid">
        {garage.length === 0 ? (
          <p>Your garage is empty.</p>
        ) : (
          garage.map(car => (
            <CarCard
              key={car.id}
              car={car}
              inGarage={true}
              onLike={onLike}
              onRemove={onRemove}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Garage;
