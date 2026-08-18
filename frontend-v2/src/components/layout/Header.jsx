import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Boton, Contenedor } from "../ui/Ui.jsx";
import "./header.css";

const RUTAS = [
  { a: "/", texto: "Inicio", exacta: true },
  { a: "/productos", texto: "Modelos" },
  { a: "/beneficios", texto: "Beneficios" },
  { a: "/nosotros", texto: "Nosotros" },
  { a: "/contacto", texto: "Contacto" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  const botonRef = useRef(null);

  // Cerrar al cambiar de página
  useEffect(() => setAbierto(false), [pathname]);

  // Con el menú abierto: bloquear el scroll de fondo y cerrar con Escape
  useEffect(() => {
    if (!abierto) return;

    const alPresionar = (e) => {
      if (e.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus(); // el foco vuelve al botón que lo abrió
      }
    };
    document.addEventListener("keydown", alPresionar);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <header className="cabecera">
      <Contenedor className="cabecera__interior">
        <Link to="/" className="marca" aria-label="Sibom Sacks, ir al inicio">
          <img src="/images/logo.webp" alt="" width={458} height={109} />
        </Link>

        <nav
          id="menu-principal"
          className={`menu ${abierto ? "menu--abierto" : ""}`}
          aria-label="Navegación principal"
        >
          {RUTAS.map((r) => (
            <NavLink key={r.a} to={r.a} end={r.exacta} className="menu__link">
              {r.texto}
            </NavLink>
          ))}
          <Boton to="/contacto" variante="primario" className="menu__cta">
            Pedir cotización
          </Boton>
        </nav>

        <Boton to="/contacto" variante="primario" className="cabecera__cta">
          Pedir cotización
        </Boton>

        <button
          ref={botonRef}
          className="hamburguesa"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-principal"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        >
          <span className={`hamburguesa__caja ${abierto ? "is-x" : ""}`}>
            <span /><span /><span />
          </span>
        </button>
      </Contenedor>

      {abierto && (
        <div className="cabecera__velo" onClick={() => setAbierto(false)} aria-hidden="true" />
      )}
    </header>
  );
}
