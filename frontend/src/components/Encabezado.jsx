import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Encabezado.css";

const logo = "/images/icono.webp";

function Encabezado() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [entered, setEntered] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setMenuAbierto((v) => !v);
  const cerrarMenu = () => setMenuAbierto(false);

  useEffect(() => {
    setEntered(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú cuando cambia la ruta (click o navegación programática)
  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");

    const handleScroll = () => { if (mql.matches) setMenuAbierto(false); };
    const handlePointerDownOutside = (e) => {
      if (!mql.matches) return;
      const t = e.target;
      if (menuRef.current?.contains(t)) return;
      if (buttonRef.current?.contains(t)) return;
      setMenuAbierto(false);
    };
    const handleKeyDown = (e) => { if (mql.matches && e.key === "Escape") setMenuAbierto(false); };

    if (menuAbierto && mql.matches) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("pointerdown", handlePointerDownOutside);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleMqlChange = (e) => { if (!e.matches) setMenuAbierto(false); };
    mql.addEventListener?.("change", handleMqlChange) ?? mql.addListener(handleMqlChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("pointerdown", handlePointerDownOutside);
      document.removeEventListener("keydown", handleKeyDown);
      mql.removeEventListener?.("change", handleMqlChange) ?? mql.removeListener(handleMqlChange);
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""} ${entered ? "enter" : ""}`}>
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__left">
          <Link to="/inicio" className="navbar__logo" onClick={cerrarMenu}>
            <img src={logo} alt="Sibom Sacks Logo" width={103} height={92} />
            <span className="navbar__brand">SIBOM SACKS</span>
          </Link>
        </div>

        {/* Menú */}
        <div className="navbar__center">
          <nav
            id="navbar-menu"
            ref={menuRef}
            className={`navbar__menu ${menuAbierto ? "show" : ""}`}
            role="navigation"
            aria-label="Navegación principal"
          >
            <NavLink to="/inicio" end onClick={cerrarMenu}>
              Inicio <span className="underline" />
            </NavLink>
            <NavLink to="/sobre-nosotros" onClick={cerrarMenu}>
              Sobre Nosotros <span className="underline" />
            </NavLink>
            <NavLink to="/productos" onClick={cerrarMenu}>
              Productos <span className="underline" />
            </NavLink>
            <NavLink to="/beneficios" onClick={cerrarMenu}>
              Beneficios <span className="underline" />
            </NavLink>
            <NavLink to="/contacto" onClick={cerrarMenu}>
              Contacto <span className="underline" />
            </NavLink>

            {/* CTA mobile dentro del menú */}
            <Link to="/contacto" className="btn-cta btn-cta--mobile" onClick={cerrarMenu}>
              Cotizá tu pedido
            </Link>
          </nav>
        </div>

        {/* Botón hamburguesa + CTA desktop */}
        <div className="navbar__right">
          <Link to="/contacto" className="btn-cta btn-cta--desktop" onClick={cerrarMenu}>
            Cotizá tu pedido
          </Link>

          <button
            ref={buttonRef}
            className={`navbar__toggle ${menuAbierto ? "is-open" : ""}`}
            onClick={toggleMenu}
            aria-expanded={menuAbierto}
            aria-controls="navbar-menu"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="hb-line" />
            <span className="hb-line" />
            <span className="hb-line" />
          </button>
        </div>
      </div>

      {menuAbierto && <div className="navbar__overlay" onClick={cerrarMenu} aria-hidden="true" />}
    </header>
  );
}

export default Encabezado;
