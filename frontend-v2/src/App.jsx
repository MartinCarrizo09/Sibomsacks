import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import { Aviso, Contenedor } from "./components/ui/Ui.jsx";
import BotonWhatsapp from "./components/BotonWhatsapp.jsx";
import Inicio from "./pages/Inicio.jsx";
import Placeholder from "./pages/Placeholder.jsx";

// El resto de las rutas se cargan por separado: la home no paga su peso.
const Productos = lazy(() => import("./pages/Productos.jsx"));
const Modelo = lazy(() => import("./pages/Modelo.jsx"));
const Beneficios = lazy(() => import("./pages/Beneficios.jsx"));
const Nosotros = lazy(() => import("./pages/Nosotros.jsx"));
const Contacto = lazy(() => import("./pages/Contacto.jsx"));

/** Al navegar, vuelve al tope de la página. */
function AlTope() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // los anclajes (#configurador) se manejan solos
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

function Cargando() {
  return (
    <Contenedor style={{ paddingBlock: "var(--e-8)" }}>
      <Aviso>Cargando…</Aviso>
    </Contenedor>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AlTope />
      <a href="#contenido" className="saltar">Saltar al contenido</a>
      <Header />

      <main id="contenido">
        <Suspense fallback={<Cargando />}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<Modelo />} />
            <Route path="/beneficios" element={<Beneficios />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route
              path="*"
              element={
                <Placeholder
                  eyebrow="Error 404"
                  titulo="No encontramos esta página"
                  bajada="Puede que el enlace esté viejo o mal escrito."
                />
              }
            />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <BotonWhatsapp />
    </BrowserRouter>
  );
}
