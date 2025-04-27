import React,{ useState,useEffect } from 'react';
import NavBar from './NavBar';

function Homepage() {
  // Set an empty state first
   const [cars, setCars] = useState([]);

  //Use useEffect to fetch the data from the json-server, instead of hardcoding it

  useEffect(() => {
    fetch(`http://localhost:3000/featured`)
    .then(r => r.json())
    .then(data => setCars(data))
    .catch(error => console.error(error))
   }, [])
    
   function handleLike(carId){
    const carToUpdate = cars.find(car => car.id === carId);
    if (!carToUpdate) return;
  
    const updatedLikes = carToUpdate.likes + 1;
  
    //Updates state
    setCars(prevCars =>
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
        setCars(prevCars =>
          prevCars.map(car =>
            car.id === updatedCar.id ? updatedCar : car
          )
        );
      })
      .catch(error => console.error(error));
  }
   
  return (
        <div className="homepage">
          <h2 className='heading'>Welcome to Auto-World</h2>
          <p className="subtitle">Your trusted car dealership</p>
          <h3 className='featured'>Featured Vehicles</h3>
          <div className="featured-section">
            {/* We'll add FeaturedCars here later */}
            <div className='featured-grid'>
                {
                    cars.map(car => (
                        <div key={car.id} className='featured-card'>
                            <img src={car.image} alt={`${car.make} ${car.model}`}/>
                            <h3>{car.year} {car.make} {car.model}</h3>
                            <p>${car.price.toLocaleString()}</p>
                            <div className='like-section'>
                                <button 
                                    className='like-btn'
                                    onClick={()=>handleLike(car.id)}
                                    >
                                ♥ {car.likes}
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
          </div>
        </div>
  );
}

export default Homepage;