import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav>
            <div className="logo-container">
                <h2>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span>Punto</span>
                        <span className="green">Verde</span>
                    </Link>
                </h2>
            </div>

            {/* Muestra el botón de hamburguesa solo cuando el menú está cerrado */}
            {!menuOpen && (
                <div className="hamburger" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            )}

            {/* Muestra el botón de cerrar solo cuando el menú está abierto */}
            {menuOpen && (
                <button className="close-btn" onClick={toggleMenu}>X</button>
            )}

            <ul className={menuOpen ? 'active' : ''}>
                <li><Link to="#home" onClick={toggleMenu} className="menu-item">Inicio</Link></li>
                <li><Link to="#about" onClick={toggleMenu} className="menu-item">Mapa</Link></li>
                <li><Link to="#contact" onClick={toggleMenu} className="menu-item">SEDEMA</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
