import React, { useState, useEffect } from 'react';

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

  //like feature
  useEffect(() => {
      fetch(`http://localhost:3000/featured`)
      .then(r => r.json())
      .then(data => setAllCars(data))
      .catch(error => console.error(error))
     }, [])
      
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
  function handleToggleGarage(car){
    const isInGarage = garage.some(item => item.id === car.id);
  
    if (isInGarage) {
      removeFromGarage(car.id);
    } else {
      addToGarage(car.id);
    }
  
  };
  
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
          <div key={car.id} className="car-card">
            <img 
              src={car.image} 
              alt={`${car.year} ${car.make} ${car.model}`} 
              className="car-image"
            />
            
            <div className="car-details">
              <h3>{car.year} {car.make} {car.model}</h3>
              {/* Confirm what the .toLocaleString() does */}
              <p className="price">${car.price}</p>
              <div className="like-container">
                <button 
                  onClick={() => handleLike(car.id)}
                  className="like-btn"
                  aria-label="Like this vehicle"
                >
                  ♥ {car.likes}
                </button>
                { /*Add to cart feature */}
              <button 
                  className={`car-button ${garage.some(item => item.id === car.id) ? 'remove-from-garage-btn' : 'add-to-garage-btn'}`}
                  onClick={()=>handleToggleGarage(car)}
              >
              <span className='add-to-garage'>
                { garage.some(item => item.id === car.id) ? 'Remove from Garage' : 'Add to Garage'}
              </span>
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