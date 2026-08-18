import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Aviso, Boton, Seccion } from "../components/ui/Ui.jsx";
import api from "../lib/api.js";
import {
  BOCAS,
  FONDOS,
  filtrar,
  nombreBoca,
  nombreFondo,
  normalizar,
} from "../lib/catalogo.js";
import "./productos.css";

/**
 * Catálogo. Se filtra por los mismos dos ejes con los que el comprador
 * piensa su operación, en vez de obligarlo a leer seis nombres parecidos.
 */
export default function Productos() {
  const [modelos, setModelos] = useState([]);
  const [estado, setEstado] = useState("cargando");
  const [boca, setBoca] = useState(null);
  const [fondo, setFondo] = useState(null);

  useEffect(() => {
    let vigente = true;
    api
      .productos()
      .then((datos) => {
        if (!vigente) return;
        setModelos(datos.map(normalizar));
        setEstado("listo");
      })
      .catch(() => vigente && setEstado("error"));
    return () => {
      vigente = false;
    };
  }, []);

  const visibles = useMemo(() => filtrar(modelos, boca, fondo), [modelos, boca, fondo]);
  const hayFiltro = boca || fondo;

  return (
    <Seccion
      nivel="h1"
      eyebrow="Catálogo"
      titulo="Los seis modelos de serie"
      bajada="Todos comparten material, tejido y medidas. Cambian en cómo se cargan y cómo se descargan."
    >
      {estado === "cargando" && <Aviso>Cargando modelos…</Aviso>}
      {estado === "error" && (
        <Aviso tipo="error">No pudimos cargar el catálogo. Recargá la página.</Aviso>
      )}

      {estado === "listo" && (
        <>
          <div className="filtros">
            <GrupoFiltro
              titulo="Carga"
              opciones={BOCAS}
              valor={boca}
              alCambiar={setBoca}
            />
            <GrupoFiltro
              titulo="Descarga"
              opciones={FONDOS}
              valor={fondo}
              alCambiar={setFondo}
            />

            <p className="filtros__conteo" aria-live="polite">
              {visibles.length} de {modelos.length} modelos
              {hayFiltro && (
                <button
                  type="button"
                  className="filtros__limpiar"
                  onClick={() => {
                    setBoca(null);
                    setFondo(null);
                  }}
                >
                  Limpiar filtros
                </button>
              )}
            </p>
          </div>

          {visibles.length === 0 ? (
            <Aviso>
              Esa combinación no existe en la serie. Probá cambiando uno de los dos filtros.
            </Aviso>
          ) : (
            <ul className="catalogo">
              {visibles.map((m) => (
                <li key={m.id}>
                  <Link to={`/productos/${m.id}`} className="tarjeta">
                    <div className="tarjeta__fig">
                      <img src={m.imagen} alt="" width={310} height={360} loading="lazy" />
                    </div>
                    <div className="tarjeta__cuerpo">
                      <h3 className="tarjeta__nombre">{m.nombre}</h3>
                      <p className="tarjeta__tipo">{m.descripcion}</p>

                      <dl className="tarjeta__ejes">
                        <div>
                          <dt>Carga</dt>
                          <dd>{nombreBoca(m.boca)}</dd>
                        </div>
                        <div>
                          <dt>Descarga</dt>
                          <dd>{nombreFondo(m.fondo)}</dd>
                        </div>
                      </dl>

                      <span className="tarjeta__ver">Ver ficha técnica →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Seccion>
  );
}

/** Grupo de filtros excluyentes, con opción "Todas". */
function GrupoFiltro({ titulo, opciones, valor, alCambiar }) {
  return (
    <div className="filtros__grupo" role="group" aria-label={`Filtrar por ${titulo}`}>
      <span className="filtros__lb">{titulo}</span>
      <button
        type="button"
        className={`chip ${valor === null ? "chip--on" : ""}`}
        aria-pressed={valor === null}
        onClick={() => alCambiar(null)}
      >
        Todas
      </button>
      {opciones.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`chip ${valor === o.id ? "chip--on" : ""}`}
          aria-pressed={valor === o.id}
          onClick={() => alCambiar(valor === o.id ? null : o.id)}
        >
          {o.nombre}
        </button>
      ))}
    </div>
  );
}
