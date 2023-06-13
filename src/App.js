import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Inicio from './components/Inicio.jsx';
import Menu from './components/menu.jsx';
import Autos from './components/autos/Autos.jsx';
import './App.css';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/autos" element={<Autos />} />
            <Route path="*" element={<Navigate to="/Inicio" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
