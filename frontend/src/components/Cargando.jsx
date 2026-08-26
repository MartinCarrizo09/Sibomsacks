/**
 * Pantalla de carga del sitio.
 * Un Big Bag que se llena de amarillo de abajo hacia arriba: el mismo icono
 * que usa la barra de indicadores del hero.
 */
import "./Cargando.css";

// Cuerpo, asas de izaje y tarima. Igual al icono de "modelos de serie".
const BOLSON =
  "M5.7 6.4 C5.2 10.6 5.05 15.2 5.25 19.1 L18.75 19.1 C18.95 15.2 18.8 10.6 18.3 6.4 " +
  "C14.15 5.4 9.85 5.4 5.7 6.4 Z M7.5 6.15 L7.5 3.5 C7.5 2.6 8.22 1.9 9.1 1.9 " +
  "C9.98 1.9 10.7 2.6 10.7 3.5 L10.7 5.75 M13.3 5.75 L13.3 3.5 C13.3 2.6 14.02 1.9 14.9 1.9 " +
  "C15.78 1.9 16.5 2.6 16.5 3.5 L16.5 6.15 M11.35 5.6 L11.35 4.3 C11.35 3.6 11.9 3.05 12.6 3.05 " +
  "C13.3 3.05 13.85 3.6 13.85 4.3 L13.85 5.6 M3.3 19.1 L20.7 19.1 L20.7 21.9 L3.3 21.9 Z " +
  "M8.1 19.1 L8.1 21.9 M15.9 19.1 L15.9 21.9";

function Cargando({ texto = "Cargando" }) {
  return (
    <div className="cargando" role="status" aria-live="polite">
      <span className="cargando__bolson" aria-hidden="true">
        <svg className="cargando__base" viewBox="0 0 24 24">
          <path d={BOLSON} />
        </svg>
        <svg className="cargando__carga" viewBox="0 0 24 24">
          <path d={BOLSON} />
        </svg>
      </span>
      <span className="cargando__txt">{texto}</span>
    </div>
  );
}

export default Cargando;
