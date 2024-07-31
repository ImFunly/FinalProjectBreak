import logo from '../../assets/Dog.webp';

function Navbar() {
  return (
    <footer>
        <div className="footer">
            <div className="row">
              <img className="logo" src={logo} alt="" />
            </div>
            <div className="row">
            <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-instagram"></i></a>
                <a href="#"><i className="fa fa-youtube"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
            </div>
            <div className="row">
            <ul>
                <li><a href="mail:Samux7421x@hotmail.com">Contacto</a></li>
                <li><a href="/register">Registrarse</a></li>
                <li><a href="/login">Iniciar sesión</a></li>
                </ul>
            </div>
            <div className="row">
            Proyecto final © 2024 || Diseñado por: Samuel Pérez 
            </div>
        </div>
    </footer>
  );
}

export default Navbar;
