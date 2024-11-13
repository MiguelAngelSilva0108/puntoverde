import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Home />
      </header>
      <Footer />
    </div>
  );
}

export default App;
