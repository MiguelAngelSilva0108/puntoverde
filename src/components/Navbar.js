// src/components/Navbar.js
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

            {!menuOpen && (
                <div className="hamburger" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            )}

            {menuOpen && (
                <button className="close-btn" onClick={toggleMenu}>X</button>
            )}

            <ul className={menuOpen ? 'active' : ''}>
                <li><Link to="/" onClick={toggleMenu} className="menu-item">Inicio</Link></li>
                <li><Link to="/mapa" onClick={toggleMenu} className="menu-item">Mapa</Link></li> {/* Actualiza el enlace */}
                <li><Link to="#contact" onClick={toggleMenu} className="menu-item">SEDEMA</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
