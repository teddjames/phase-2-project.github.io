import React from 'react';
import Homepage from './Homepage';
import Inventory from './Inventory';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Auto-World</h1>
      <nav id="navBar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/inventory">Inventory</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
      
      {/* Main content */}
      <Homepage />
      <Inventory />
    </div>
  );
}

export default App;