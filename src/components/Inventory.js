import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';

function Inventory({ garage=[], addToGarage, removeFromGarage }) {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
      fetch(`http://localhost:3000/inventory`)
      .then(r => r.json())
      .then(data => setAllCars(data))
      .catch(error => console.error(error))
     }, [])

  useEffect(() => {
    let results = allCars;
    
    if (searchTerm) {
      results = results.filter(car => 
        `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (minPrice) {
      results = results.filter(car => car.price >= Number(minPrice));
    }
    
    if (maxPrice) {
      results = results.filter(car => car.price <= Number(maxPrice));
    }
    
    setFilteredCars(results);
  }, [searchTerm, minPrice, maxPrice, allCars]);

  //like Feature
  /*useEffect(() => {
      fetch(`http://localhost:3000/inventory`)
      .then(r => r.json())
      .then(data => setAllCars(data))
      .catch(error => console.error(error))
     }, [])*/

      
     function handleLike(carId){
      const carToUpdate = allCars.find(car => car.id === carId);
      if (!carToUpdate) return;
    
      const updatedLikes = carToUpdate.likes + 1;
    
      //Updates state
      setAllCars(prevCars =>
        prevCars.map(car =>
          car.id === carId ? { ...car, likes: updatedLikes } : car
        )
      );
    
      // PATCH Request for the updated car
      fetch(`http://localhost:3000/inventory/${carId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: updatedLikes })
      })
        .then(r => r.json())
        .then(updatedCar => {
          setAllCars(prevCars =>
            prevCars.map(car =>
              car.id === updatedCar.id ? updatedCar : car
            )
          );
        })
        .catch(error => console.error(error));
    }
  //Add to Garage feature
  
  
  return (
    <div className="inventory">
      <h2>Our Inventory</h2>
      
      {/* Search/Filter Bar */}
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search makes or models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="price-filters">
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="price-input"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="price-input"
          />
        </div>
      </div>
      
      {/* Car Grid */}
      <div className="car-grid">
          {filteredCars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              inGarage={garage.some(item => item.id === car.id || item.originalId === car.id)}
              onLike={handleLike}
              onAdd={() => addToGarage(car.id)}
              onRemove={() => removeFromGarage(car.id)}
            />
          ))}
      </div>
    </div>
  );
}

export default Inventory;