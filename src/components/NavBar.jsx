import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
  <div className='navBar'>
    <nav>
      <NavLink
        to="/"
      >Home
      </NavLink>
      <NavLink
        to="/inventory"
      >
        Inventory
      </NavLink>
      <NavLink
        to="/about"
      >
        About
      </NavLink>
    </nav>
  </div>
  )
}

export default NavBar;
