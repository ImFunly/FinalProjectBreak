import NavBar from '../components/molecules/NavBarLanding';
import Footer from '../components/molecules/Footer';
import '../assets/css/landing.css';

function Dashboard() {
  return (
    <> 
      <NavBar/>
      <main>
        <section className="section-hero">
            <div className="hero-text">
              <h1 >Pon comida de verdad en el bol de tu perro</h1>
              <p>Una dieta completa y equilibrada. Elaborada por nutricionistas</p>
              <a href='/register' className='hero-button'>Crea tu menu</a>
            </div>
            <div className='hero-image'>
              <img src="https://dogfydiet.com/images/featured/perro-comiendo-dogfy.gif" alt="" />
            </div>
        </section>
      </main>
      <Footer /> 
         </>
  );
}

export default Dashboard;
