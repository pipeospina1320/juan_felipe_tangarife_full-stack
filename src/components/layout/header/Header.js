import { useLocation } from 'react-router-dom';
import './style.css';

export default function Header() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <header>
      {/* <h1 className="header-title">SPOTI</h1> */}
      <nav>
        <ul className="nav-left-section">
          <li>
            <a className={location.pathname === '/' ? 'active' : ''} href="/">
              Buscar
            </a>
          </li>
          <li>
            <a className={location.pathname === '/my-albums' ? 'active' : ''} href="/my-albums">
              Mis albumes
            </a>
          </li>
          <span>|</span>
          <li>
            <a href="/login">
              <span className="logut">Cerrar sesión</span>
              <img className="logout-img" src={'/assets/exit.svg'} alt="Logo" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
