import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Homepage from './Homepage';
import Garage from './Garage';
import Inventory from './Inventory';
import AboutUs from './AboutUs';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './protectedRoute';
import Login from './LoginLogout';
import SignUp from './signUp';

function App() {
  const [featured, setFeatured] = useState([]);
  const [garage, setGarage] = useState([]);
  const [ allInventoryCars,setAllInventoryCars] = useState([]);

  // Load featured cars
  useEffect(() => {
    fetch('http://localhost:3000/featured')
      .then(r => r.json())
      .then(setFeatured)
      .catch(error => console.error('Error fetching featured:', error));
  }, []);
//load Inventory cars
  useEffect(() => {
    fetch('http://localhost:3000/inventory')
      .then(r => r.json())
      .then(setAllInventoryCars)
      .catch(error => console.error('Error fetching inventory:', error));
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
  
    // PATCH the backend 
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
  

  // Add to garage: POST new record with new car data
  function handleAddToGarage(id) {
    // Check if car is already in garage (by originalId or id)
    if (garage.some(c => c.originalId === id || c.id === id)) return;
  
    // Try to find car in featured first, then inventory
    let car = featured.find(c => c.id === id);
    if (!car) {
      car = allInventoryCars.find(c => c.id === id); // You'll need allInventoryCars state in App.js
    }
    if (!car) return;
  
    const carToSave = {
      ...car,
      originalId: car.id, // Preserve original ID
      id: Date.now() // Give it a new unique ID for garage
    };
  
    fetch('http://localhost:3000/garage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carToSave)
    })
      .then(r => r.json())
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
    <AuthProvider>
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

      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/*Protected route */}
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <Inventory 
              allCars={allInventoryCars}
              garage={garage}
              addToGarage={handleAddToGarage}
              removeFromGarage={handleRemoveFromGarage}
            />
          </ProtectedRoute>
        }
      />

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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </AuthProvider>
);
}

export default App;