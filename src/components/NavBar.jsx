import React, { useContext } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');}
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/inventory"
        className={({ isActive }) =>
          isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
        }
      >
        Inventory
      </NavLink>

      <NavLink
        to="/garage"
        className={({ isActive }) =>
          isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
        }
      >
        Garage
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
        }
      >
        About
      </NavLink>
       {/* Auth controls */}
       {user ? (
        <button onClick={handleLogout} className="navbar__link navbar__button">
          Logout
        </button>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          Login
        </NavLink>
      )}
    </nav>
  );
}

export default NavBar
