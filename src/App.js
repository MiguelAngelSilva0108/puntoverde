import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
//import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importamos Router, Routes y Route

function App() {
  return (
    <Router> {/* Envolvemos todo con Router */}
      <div className="App">
        <Navbar />
        <header className="App-header">
          <Routes> {/* Usamos Routes para definir nuestras rutas */}
            <Route path="/" element={<Home />} /> {/* Ruta para Home */}
          </Routes>
        </header>
        {/*<Footer >*/}
      </div>
    </Router>
  );
}

export default App;
