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
      .catch(error => console.error('Error fetching featured:', error));
  }, []);

  // Load garage cars
  useEffect(() => {
    fetch('http://localhost:3000/garage')
      .then(r => r.json())
      .then(setGarage)
      .catch(error => console.error('Error fetching garage:', error));
  }, []);

  // Like handler: PATCH /featured/:id
  function handleLike(id) {
    let car = featured.find(c => c.id === id);
    const fromFeatured = !!car;
  
    if (!car) {
      car = garage.find(c => c.id === id || c.originalId === id);
      if (!car) return;
    }
  
    const updated = { ...car, likes: car.likes + 1 };
  
    // PATCH the backend (either featured or garage)
    const endpoint = fromFeatured ? `featured/${id}` : `garage/${car.id}`;
  
    fetch(`http://localhost:3000/${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: updated.likes })
    })
      .then(r => {
        if (!r.ok) throw new Error(`PATCH failed: ${r.status}`);
        return r.json();
      })
      .then(data => {
        // Update featured if the car exists there
        setFeatured(prev =>
          prev.map(c => c.id === data.id ? { ...c, likes: data.likes } : c)
        );
  
        // Update garage if the car exists there
        setGarage(prev =>
          prev.map(c =>
            c.id === data.id || c.originalId === data.id
              ? { ...c, likes: data.likes }
              : c
          )
        );
      })
      .catch(error => console.error('Error updating like:', error));
  }
  

  // Add to garage: POST new record with car data
  function handleAddToGarage(id) {
    if (garage.find(c => c.originalId === id)) return;
  
    const car = featured.find(c => c.id === id);
    if (!car) return;
  
    const carToSave = {
      ...car,
      originalId: car.id, 
      id: car.id        
    };
  
    fetch('http://localhost:3000/garage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carToSave)
    })
      .then(r => {
        if (!r.ok) throw new Error(`POST failed: ${r.status}`);
        return r.json();
      })
      .then(data => setGarage(prev => [...prev, data]))
      .catch(error => console.error('Error adding to garage:', error));
  }
  

  function handleRemoveFromGarage(id) {
    console.log("Trying to remove car ID:", id);
    fetch(`http://localhost:3000/garage/${id}`, { method: 'DELETE' })
      .then(r => {
        if (!r.ok) throw new Error(`DELETE failed: ${r.status}`);
        setGarage(prev => prev.filter(c => c.id !== id));
      })
      .catch(error => console.error('Error removing from garage:', error));
  }
  
  const garageIds = new Set(garage.map(c => c.originalId));

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
              garageIds={garageIds}
              onRemove={handleRemoveFromGarage}
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