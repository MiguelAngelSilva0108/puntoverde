// src/components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <nav style={{ padding: '1em', backgroundColor: '#333', color: '#fff' }}>
      <h2>MyApp</h2>
      <ul style={{ listStyleType: 'none', display: 'flex', gap: '1em' }}>
        <li><a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
        <li><a href="#about" style={{ color: '#fff', textDecoration: 'none' }}>About</a></li>
        <li><a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
