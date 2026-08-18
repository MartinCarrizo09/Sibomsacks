import { useMemo, useState } from "react";
import { Boton, Ficha } from "./ui/Ui.jsx";
import { BOCAS, FONDOS, buscarModelo } from "../lib/catalogo.js";
import { whatsappCon } from "../lib/contacto.js";
import "./configurador.css";

/**
 * Configurador de modelo.
 *
 * El comprador no elige "MODELO SS 4": elige cómo carga y cómo descarga,
 * que es como piensa su operación. El modelo es el resultado.
 */
export default function Configurador({ modelos }) {
  const [boca, setBoca] = useState("valvula");
  const [fondo, setFondo] = useState("valvula");

  const modelo = useMemo(() => buscarModelo(modelos, boca, fondo), [modelos, boca, fondo]);

  const bocaSel = BOCAS.find((b) => b.id === boca);
  const fondoSel = FONDOS.find((f) => f.id === fondo);

  const mensajeWhatsapp = modelo
    ? `Hola, me interesa el ${modelo.nombre} (${modelo.descripcion}). Quisiera pedir una cotización.`
    : "Hola, quisiera pedir una cotización de Big Bags.";

  return (
    <div className="cfg">
      <div className="cfg__opciones">
        <Eje
          numero="01"
          titulo="¿Cómo lo cargás?"
          descripcion="La boca superior del bolsón."
          nombre="boca"
          opciones={BOCAS}
          valor={boca}
          alCambiar={setBoca}
        />
        <Eje
          numero="02"
          titulo="¿Cómo lo descargás?"
          descripcion="El fondo del bolsón."
          nombre="fondo"
          opciones={FONDOS}
          valor={fondo}
          alCambiar={setFondo}
        />
      </div>

      {/* El resultado se anuncia a lectores de pantalla al cambiar */}
      <div className="cfg__resultado" aria-live="polite">
        {modelo ? (
          <article className="resultado">
            <div className="resultado__figura">
              <img
                src={modelo.imagen}
                alt={`Big Bag ${modelo.nombre}: ${modelo.descripcion}`}
                width={310}
                height={360}
              />
            </div>

            <div className="resultado__cuerpo">
              <p className="etiqueta">Tu configuración</p>
              <h3 className="resultado__nombre">{modelo.nombre}</h3>
              <p className="resultado__tipo">{modelo.descripcion}</p>

              <ul className="resultado__combo">
                <li>
                  <span className="etiqueta">Carga</span>
                  {bocaSel?.nombre}
                </li>
                <li>
                  <span className="etiqueta">Descarga</span>
                  {fondoSel?.nombre}
                </li>
              </ul>

              <Ficha datos={modelo.fichaTecnica.slice(0, 5)} />

              <div className="resultado__acciones">
                <Boton to={`/productos/${modelo.id}`} variante="secundario">
                  Ver ficha completa
                </Boton>
                <Boton href={whatsappCon(mensajeWhatsapp)} variante="primario">
                  Cotizar este modelo
                </Boton>
              </div>
            </div>
          </article>
        ) : (
          <p className="aviso">Esa combinación no está disponible.</p>
        )}
      </div>
    </div>
  );
}

/** Un eje de decisión: grupo de opciones excluyentes. */
function Eje({ numero, titulo, descripcion, nombre, opciones, valor, alCambiar }) {
  return (
    <fieldset className="eje">
      <legend className="eje__legend">
        <span className="eje__numero">{numero}</span>
        <span>
          <span className="eje__titulo">{titulo}</span>
          <span className="eje__desc">{descripcion}</span>
        </span>
      </legend>

      <div className="eje__opciones">
        {opciones.map((o) => (
          <label key={o.id} className={`opcion ${valor === o.id ? "opcion--activa" : ""}`}>
            <input
              type="radio"
              name={nombre}
              value={o.id}
              checked={valor === o.id}
              onChange={() => alCambiar(o.id)}
            />
            <span className="opcion__nombre">{o.nombre}</span>
            <span className="opcion__resumen">{o.resumen}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
