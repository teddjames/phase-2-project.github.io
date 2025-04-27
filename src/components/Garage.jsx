import React from 'react';
import CarCard from '../components/CarCard';

function Garage({ garage = [], onLike, onRemove }) {
  console.log("Rendering garage with cars:" ,garage);
  return (
    <div className="garage">
      <header>
        <h2 className="garage-heading">Your Garage</h2>
      </header>
      <div className="garage-content">
        {garage.length === 0 ? (
          <p className="empty-message">Your garage is empty. Start adding some vintage cars!</p>
        ) : (
          <div className="car-grid">
            {garage.map(car => (
              <CarCard
                key={car.id}
                car={car}
                inGarage={true}
                onLike={onLike}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Garage;