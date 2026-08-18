import { Seccion, Boton } from "../components/ui/Ui.jsx";

/**
 * Página aún sin contenido. Mantiene la estructura y el diseño del sitio
 * para que llenarla sea solo reemplazar el children.
 */
export default function Placeholder({ eyebrow, titulo, bajada }) {
  return (
    <Seccion
      eyebrow={eyebrow}
      titulo={titulo}
      bajada={bajada}
      acciones={<Boton to="/" variante="contorno">Volver al inicio</Boton>}
    >
      <p style={{ color: "var(--tinta-3)" }}>
        Sección en construcción.
      </p>
    </Seccion>
  );
}
