import React, { useState, useEffect } from 'react';

function Inventory() {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [ cart,setCart ] = useState([])

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
      const carToUpdate = cars.find(car => car.id === carId);
      if (!carToUpdate) return;
    
      const updatedLikes = carToUpdate.likes + 1;
    
      //Updates state
      setAllCars(prevCars =>
        prevCars.map(car =>
          car.id === carId ? { ...car, likes: updatedLikes } : car
        )
      );
    
      // PATCH Request for the updated car
      fetch(`http://localhost:3000/featured/${carId}`, {
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
  //Add to cart feature
  const handleToggleCart = (car) => {
    const isInCart = cart.some(item => item.id === car.id);
  
    let updatedCart;
    if (isInCart) {
      updatedCart = cart.filter(item => item.id !== car.id);
      console.log('Removed from in cart')
    } else {
      updatedCart = [...cart, car];
      console.log("Added to cart")
    }
  
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
              <p className="price">${car.price.toLocaleString()}</p>
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
                  className={`car-button ${cart.some(item => item.id === car.id) ? 'remove-from-cart-btn' : 'add-to-cart-btn'}`}
                  onClick={()=>handleToggleCart(car)}
              >
              <span className='add-to-cart'>
                { cart.some(item => item.id === car.id) ? 'Remove from cart' : 'Add to cart'}
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