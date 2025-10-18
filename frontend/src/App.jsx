import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";
import ScrollToTop from "./components/ScrollToTop";

// Páginas
import Inicio from "./pages/Inicio";
import SobreNosotros from "./pages/SobreNosotros";
import Productos from "./pages/Productos";
import Beneficios from "./pages/Beneficios";
import Contacto from "./pages/Contacto";
import ProductoDetalle from "./pages/DetalleProductos";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Encabezado />
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" replace />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/beneficios" element={<Beneficios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
          </Routes>
        </main>
        <PiePagina />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

function WhatsAppButton() {
  const DEFAULT_WA_MSG =
    "Hola, me gustaría recibir asesoramiento sobre Big Bags. Los contacto desde la web. ¡Gracias!";
  const PHONE = "5493516622764";
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(DEFAULT_WA_MSG)}`;

  return (
    <a
      href={href}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <img src="/images/whatsapp.png" alt="WhatsApp" loading="lazy" />
    </a>
  );
}

export default App;