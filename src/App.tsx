import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { MapPage } from './pages/MapPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Navbar /> 
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
            </>
          } />
          <Route path="/map" element={<MapPage />} />
        </Routes>
        
        <footer className="bg-slate-950 py-6 text-center text-slate-600 text-sm border-t border-slate-900 mt-auto">
          <p>© 2026 EV Chargers. Todos los derechos reservados.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;