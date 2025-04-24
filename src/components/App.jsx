import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Homepage from './Homepage';
import Garage from './Garage';
import Inventory from './Inventory';
import AboutUs from './AboutUs';

function App() {
  const [featured, setFeatured] = useState([]);
  const [garage, setGarage] = useState([]);

  // Load featured cars
  useEffect(() => {
    fetch('http://localhost:3000/featured')
      .then(r => r.json())
      .then(setFeatured)
      .catch(console.error);
  }, []);

  // Load garage cars
  useEffect(() => {
    fetch('http://localhost:3000/garage')
      .then(r => r.json())
      .then(setGarage)
      .catch(console.error);
  }, []);

  // Like handler
  function handleLike(id) {
    console.log('Sending like for car', id);
    const car = featured.find(c => c.id === id);
    if (!car) return;
    const updated = { ...car, likes: car.likes + 1 };
    setFeatured(f => f.map(c => c.id === id ? updated : c));

    fetch(`http://localhost:3000/featured/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: updated.likes })
    })
      .then(r => {
        if (!r.ok) {
          console.error(`PATCH like failed: ${r.status}`);
          return null;
        }
        return r.json();
      })
      .then(saved => {
        if (saved) {
          setFeatured(f => f.map(c => c.id === saved.id ? saved : c));
        }
      })
      .catch(console.error);
  }

  function handleAddToGarage(id) {

    if (garage.find(c => c.id === id)) return;
    const car = featured.find(c => c.id === id);
    if (!car) return;

    fetch('http://localhost:3000/garage', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ ...car, id: car.id })
    })
    .then(r => r.json())
    .then(newCar => setGarage(g => [...g, newCar]))
    .catch(console.error);
  }

  

  // Remove from garage
  function handleRemoveFromGarage(id) {
    fetch(`http://localhost:3000/garage/${id}`, {
       method: 'DELETE' 
      })
      .then(() => setGarage(g => g.filter(c => c.id !== id)))
      .catch(console.error);
  }
  

  // Build a Set of IDs currently in garage
  const garageIds = new Set(garage.map(c => c.id));

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              cars={featured}
              onLike={handleLike}
              onAdd={handleAddToGarage}
              onRemove={handleRemoveFromGarage}
              garageIds={garageIds}
            />
          }
        />
        <Route path="/inventory" element={<Inventory />} />
        <Route
          path="/garage"
          element={
            <Garage
              garage={garage}
              onLike={handleLike}
              onRemove={handleRemoveFromGarage}
            />
          }
        />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;

