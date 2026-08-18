import { Link } from "react-router-dom";
import "./ui.css";

/**
 * Primitivos de interfaz.
 *
 * Están juntos a propósito: son piezas chicas que casi siempre se usan
 * de a varias. Tenerlas en un solo archivo evita saltar entre ocho
 * archivos para maquetar una sección.
 */

/** Limita el ancho del contenido y aplica el margen lateral estándar. */
export function Contenedor({ children, className = "", ...props }) {
  return (
    <div className={`contenedor ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Sección con su espaciado vertical y, opcionalmente, encabezado.
 * `tono` controla el fondo: "claro" (por defecto), "alt" o "azul".
 */
export function Seccion({
  eyebrow,
  titulo,
  bajada,
  tono = "claro",
  id,
  children,
  acciones,
  // Cuando la sección ES el encabezado de la página, su título debe ser h1.
  nivel: Titulo = "h2",
}) {
  const tituloId = id ? `${id}-titulo` : undefined;
  return (
    <section className={`seccion seccion--${tono}`} id={id} aria-labelledby={tituloId}>
      <Contenedor>
        {(eyebrow || titulo || bajada) && (
          <header className="seccion__cabecera">
            <div>
              {eyebrow && <p className="etiqueta">{eyebrow}</p>}
              {titulo && (
                <Titulo id={tituloId} className="seccion__titulo">
                  {titulo}
                </Titulo>
              )}
              {bajada && <p className="seccion__bajada">{bajada}</p>}
            </div>
            {acciones && <div className="seccion__acciones">{acciones}</div>}
          </header>
        )}
        {children}
      </Contenedor>
    </section>
  );
}

/**
 * Botón / enlace. Usa `to` para navegación interna, `href` para externa,
 * y nada de eso para un botón real.
 */
export function Boton({
  children,
  to,
  href,
  variante = "primario",
  tamano = "md",
  className = "",
  ...props
}) {
  const clases = `boton boton--${variante} boton--${tamano} ${className}`;

  if (to) {
    return (
      <Link to={to} className={clases} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={clases} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={clases} {...props}>
      {children}
    </button>
  );
}

/** Ficha técnica: pares etiqueta/valor alineados. */
export function Ficha({ datos }) {
  return (
    <dl className="ficha">
      {datos.map((d) => (
        <div className="ficha__fila" key={d.etiqueta}>
          <dt>{d.etiqueta}</dt>
          <dd className="cifra">
            {d.valor}
            {d.unidad && <span className="ficha__unidad"> {d.unidad}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Aviso de estado: carga, error o vacío. */
export function Aviso({ tipo = "info", children }) {
  return (
    <p className={`aviso aviso--${tipo}`} role={tipo === "error" ? "alert" : "status"}>
      {children}
    </p>
  );
}
