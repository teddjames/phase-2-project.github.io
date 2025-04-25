import React from 'react';
import CarCard from '../components/CarCard';

function Homepage({ cars = [], onLike, onAdd, onRemove, garageIds }) {
  return (
    <div className="homepage">
      <h2>Welcome to Drive Up</h2>
      <h3>Featured Vehicles</h3>
      <div className="featured-grid">
        {cars.map(car => (
          <CarCard
            key={car.id}
            car={car}
            inGarage={garageIds.has(car.id)}
            onLike={onLike}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}

export default Homepage;