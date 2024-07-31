import '../../assets/css/navbar.css';
import Dog from '../../assets/Dog.webp';

function Navbar() {
  return (
    <nav>
      <div className="wrapper">
        <div className="logo"><a href="/">DogFood</a></div>
        <input type="radio" name="slider" id="menu-btn" />
        <input type="radio" name="slider" id="close-btn" />
        <img className="dog" src={Dog} alt="Dog" />
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
          <a className='navbar-start' href="/register">Comenzar ahora</a>
          <a className='navbar-start' href="/login">Iniciar sesión</a>

        </ul>
        <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
      </div>
    </nav>
  );
}

export default Navbar;
