import React from 'react';
import Homepage from './Homepage';
import Inventory from './Inventory';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

function App() {
  return (
    <div>
      <h1>Auto-World</h1>
      <NavBar />
      
      {/* Main content */}
      <Homepage />
    </div>
  );
}

export default App;