// src/App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Mapa from './pages/Mapa'; // Importa Mapa.js desde pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/mapa" element={<Mapa />} /> {/* Ruta para Mapa */}
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;

