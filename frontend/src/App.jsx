import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";
import ScrollToTop from "./components/ScrollToTop";

// La portada se carga con el bundle inicial porque es la entrada del sitio.
import Inicio from "./pages/Inicio";

// El resto se divide por ruta: cada página descarga solo su código.
const SobreNosotros = lazy(() => import("./pages/SobreNosotros"));
const Productos = lazy(() => import("./pages/Productos"));
const Beneficios = lazy(() => import("./pages/Beneficios"));
const Contacto = lazy(() => import("./pages/Contacto"));
const ProductoDetalle = lazy(() => import("./pages/DetalleProductos"));

import "./App.css";

function Cargando() {
  return (
    <p className="ruta-cargando" role="status">
      Cargando…
    </p>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Encabezado />
        <main className="main-layout">
          <Suspense fallback={<Cargando />}>
            <Routes>
            <Route path="/" element={<Navigate to="/inicio" replace />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/beneficios" element={<Beneficios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
            </Routes>
          </Suspense>
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
      <img src="/images/whatsapp.webp" alt="WhatsApp" width={96} height={96} loading="lazy" />
    </a>
  );
}

export default App;