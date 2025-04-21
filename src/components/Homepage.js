import React,{ useState,useEffect } from 'react';
import carData from '../data/carData.json'

function Homepage() {
   const [cars, setCars] = useState([
       { id: 1, make: 'Toyota', model: 'Camry', year: 2022, price: 24999, image: 'https://via.placeholder.com/300x200?text=Toyota+Camry', likes: 0 },
       { id: 2, make: 'Honda', model: 'Civic', year: 2023, price: 22999, image: 'https://via.placeholder.com/300x200?text=Honda+Civic', likes: 0 },
       { id: 3, make: 'Ford', model: 'Mustang', year: 2021, price: 34999, image: 'https://via.placeholder.com/300x200?text=Ford+Mustang', likes: 0 }
     ]);

    useEffect(() => {
        const savedLikes = JSON.parse(localStorage.getItem('carLikes')) || {};
        setCars(carData.featured.map(car => ({
          ...car,
          likes: savedLikes[car.id] || 0
        })));
      }, []);
    
      const handleLike = (carId) => {
        setCars(prevCars => {
          const updatedCars = prevCars.map(car => 
            car.id === carId ? { ...car, likes: car.likes + 1 } : car
          );
          
          // Save to localStorage
          const likesToSave = {};
          updatedCars.forEach(car => {
            likesToSave[car.id] = car.likes;
          });
          localStorage.setItem('carLikes', JSON.stringify(likesToSave));
          
          return updatedCars;
        });
      };
    
  return (
    <div className="homepage">
      <h2>Welcome to Auto-World</h2>
      <p className="subtitle">Your trusted car dealership</p>
      <div className="featured-section">
        <h3>Featured Vehicles</h3>
        {/* We'll add FeaturedCars here later */}
        <div className='featured-gird'>
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
                            {/*<span className='like-count'>{car.likes}</span>*/}
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