import { useState, useEffect, useContext, useRef } from 'react';
import '../../assets/css/navbar.css';
import Dog from '../../assets/Dog.webp';
import AuthContext from '../../contexts/authcontext';

function Navbar({ user }) {
  const { logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className="wrapper">
        <div className="logo"><a href="/">DogFood</a></div>
        <input type="radio" name="slider" id="menu-btn" />
        <input type="radio" name="slider" id="close-btn" />
        <img className="dog" src={Dog} alt="Dog" />
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
          <li><a href="/">Panel</a></li>
          <li>
            <div className="profile" onClick={toggleDropdown}>
              {user ? (<p>{user.name}</p>) : (<p>Sin nombre</p>)}
              <div className="icon">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </div>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <button onClick={logout}>Cerrar sesión</button>
              </div>
            )}
          </li>
        </ul>
        <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
      </div>
    </nav>
  );
}

export default Navbar;
