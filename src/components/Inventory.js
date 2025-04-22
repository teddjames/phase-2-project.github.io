import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

function Inventory() {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Initialize cars and load likes
    useEffect(() => {
      fetch(`http://localhost:3000/inventory`)
      .then(r => r.json())
      .then(data => setAllCars(data))
      .catch(error => console.error(error))
     }, [])

  // Filter cars based on search/filters
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
//like feature
  const handleLike = (carId) => {
    setAllCars(prevCars => {
      const updatedCars = prevCars.map(car => 
        car.id === carId ? { ...car, likes: car.likes + 1 } : car
      );
      
      // Update localStorage
      const likesToSave = {};
      updatedCars.forEach(car => {
        likesToSave[car.id] = car.likes;
      });
      localStorage.setItem('carLikes', JSON.stringify(likesToSave));
      
      return updatedCars;
    });
  };

  return (
    <div className="inventory">
      <NavBar />
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
          <div key={car.id} className="car-card">
            <img 
              src={car.image} 
              alt={`${car.year} ${car.make} ${car.model}`} 
              className="car-image"
            />
            <div className="car-details">
              <h3>{car.year} {car.make} {car.model}</h3>
              <p className="price">${car.price.toLocaleString()}</p>
              <div className="like-container">
                <button 
                  onClick={() => handleLike(car.id)}
                  className="like-btn"
                  aria-label="Like this vehicle"
                >
                  ♥ {car.likes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;