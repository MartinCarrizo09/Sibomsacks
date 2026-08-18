import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Aviso, Boton, Contenedor, Ficha, Seccion } from "../components/ui/Ui.jsx";
import api from "../lib/api.js";
import {
  alternativas,
  nombreBoca,
  nombreFondo,
  normalizar,
  resumenBoca,
  resumenFondo,
} from "../lib/catalogo.js";
import { whatsappCon } from "../lib/contacto.js";
import "./modelo.css";

/** Ficha técnica de un modelo, con su combinación explicada y alternativas. */
export default function Modelo() {
  const { id } = useParams();
  const [modelo, setModelo] = useState(null);
  const [todos, setTodos] = useState([]);
  const [estado, setEstado] = useState("cargando");

  useEffect(() => {
    let vigente = true;
    setEstado("cargando");

    Promise.all([api.producto(id), api.productos()])
      .then(([uno, lista]) => {
        if (!vigente) return;
        setModelo(normalizar(uno));
        setTodos(lista.map(normalizar));
        setEstado("listo");
      })
      .catch(() => vigente && setEstado("error"));

    return () => {
      vigente = false;
    };
  }, [id]);

  if (estado === "cargando") {
    return (
      <Seccion titulo="Cargando modelo…">
        <Aviso>Buscando la ficha técnica.</Aviso>
      </Seccion>
    );
  }

  if (estado === "error" || !modelo) {
    return (
      <Seccion
        eyebrow="Error"
        titulo="No encontramos este modelo"
        bajada="Puede que el enlace esté viejo o que el modelo ya no esté en catálogo."
        acciones={<Boton to="/productos" variante="contorno">Ver el catálogo</Boton>}
      >
        <Aviso tipo="error">No se pudo cargar el modelo solicitado.</Aviso>
      </Seccion>
    );
  }

  const otros = alternativas(todos, modelo);
  const mensaje = `Hola, me interesa el ${modelo.nombre} (${modelo.descripcion}). Quisiera pedir una cotización.`;

  return (
    <>
      {/* ---------- Cabecera del producto ---------- */}
      <section className="mod">
        <Contenedor>
          <nav className="miga" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link to="/productos">Modelos</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{modelo.nombre}</span>
          </nav>

          <div className="mod__grid">
            <div className="mod__figura">
              <img
                src={modelo.imagen}
                alt={`Big Bag ${modelo.nombre}: ${modelo.descripcion}`}
                width={310}
                height={360}
                fetchPriority="high"
              />
            </div>

            <div className="mod__info">
              <p className="etiqueta">Serie SS · Big Bag industrial</p>
              <h1 className="mod__nombre">{modelo.nombre}</h1>
              <p className="mod__tipo">{modelo.descripcion}</p>

              {/* Los dos ejes, explicados: es lo que define este modelo */}
              <ul className="ejes">
                <li>
                  <span className="etiqueta">Cómo se carga</span>
                  <b>{nombreBoca(modelo.boca)}</b>
                  <p>{resumenBoca(modelo.boca)}</p>
                </li>
                <li>
                  <span className="etiqueta">Cómo se descarga</span>
                  <b>{nombreFondo(modelo.fondo)}</b>
                  <p>{resumenFondo(modelo.fondo)}</p>
                </li>
              </ul>

              <div className="mod__acciones">
                <Boton href={whatsappCon(mensaje)} variante="primario" tamano="lg">
                  Cotizar este modelo
                </Boton>
                <Boton
                  to={`/contacto?modelo=${encodeURIComponent(modelo.nombre)}`}
                  variante="contorno"
                  tamano="lg"
                >
                  Pedir por formulario
                </Boton>
              </div>
            </div>
          </div>
        </Contenedor>
      </section>

      {/* ---------- Ficha técnica completa ---------- */}
      <Seccion tono="alt" id="ficha" eyebrow="Especificaciones" titulo="Ficha técnica">
        <div className="ficha-grid">
          <Ficha datos={modelo.fichaTecnica} />
          <aside className="nota">
            <h3>Se fabrica a medida</h3>
            <p>
              Las medidas de esta ficha son las de serie. Ajustamos dimensiones,
              gramaje, forro interior y color según tu operación y tu pallet.
            </p>
            <Boton href={whatsappCon(`Hola, necesito el ${modelo.nombre} con medidas a medida.`)} variante="secundario">
              Consultar medidas
            </Boton>
          </aside>
        </div>
      </Seccion>

      {/* ---------- Alternativas ---------- */}
      {otros.length > 0 && (
        <Seccion
          id="alternativas"
          eyebrow="Comparar"
          titulo="Modelos parecidos"
          bajada="Estos cambian en un solo aspecto respecto del que estás viendo."
        >
          <ul className="alts">
            {otros.map((o) => (
              <li key={o.id}>
                <Link to={`/productos/${o.id}`} className="alt">
                  <img src={o.imagen} alt="" width={310} height={360} loading="lazy" />
                  <div>
                    <span className="alt__cambia">Cambia la {o.cambia}</span>
                    <b>{o.nombre}</b>
                    <p>{o.descripcion}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Seccion>
      )}
    </>
  );
}
