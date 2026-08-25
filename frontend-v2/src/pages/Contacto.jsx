import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Aviso, Boton, Contenedor } from "../components/ui/Ui.jsx";
import api from "../lib/api.js";
import { TELEFONO, TELEFONO_LINK, HORARIO, WHATSAPP_URL } from "../lib/contacto.js";
import "./contacto.css";

const VACIO = {
  empresa: "",
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
  id_provincia: "",
  id_sector: "",
  mensaje: "",
};

/** Reglas de validación. Devuelve el mensaje de error o null si está bien. */
const REGLAS = {
  nombre: (v) => (!v.trim() ? "Ingresá tu nombre." : null),
  apellido: (v) => (!v.trim() ? "Ingresá tu apellido." : null),
  correo: (v) => {
    if (!v.trim()) return "Ingresá tu correo electrónico.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()))
      return "Revisá el correo: parece que falta el @ o el dominio.";
    return null;
  },
  id_provincia: (v) => (!v ? "Elegí tu provincia." : null),
  id_sector: (v) => (!v ? "Elegí tu sector." : null),
  mensaje: (v) => {
    if (!v.trim()) return "Contanos qué necesitás.";
    if (v.trim().length < 15)
      return "Escribí un poco más para que podamos cotizarte bien.";
    return null;
  },
};

function validarTodo(datos) {
  const errores = {};
  for (const [campo, regla] of Object.entries(REGLAS)) {
    const error = regla(datos[campo]);
    if (error) errores[campo] = error;
  }
  return errores;
}

export default function Contacto() {
  const [params] = useSearchParams();
  const modeloPrevio = params.get("modelo");

  const [datos, setDatos] = useState(() => ({
    ...VACIO,
    // Si llega desde la ficha de un modelo, el mensaje ya viene empezado.
    mensaje: modeloPrevio
      ? `Hola, me interesa el ${modeloPrevio}. Necesito cotización para `
      : "",
  }));

  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [intentado, setIntentado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null); // "exito" | "error"

  const [provincias, setProvincias] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [listasOk, setListasOk] = useState(true);

  const avisoRef = useRef(null);

  useEffect(() => {
    let vigente = true;
    Promise.all([api.provincias(), api.sectores()])
      .then(([p, s]) => {
        if (!vigente) return;
        setProvincias(p);
        setSectores(s);
      })
      .catch(() => vigente && setListasOk(false));
    return () => {
      vigente = false;
    };
  }, []);

  // El resultado del envío recibe el foco para que se anuncie y se vea.
  useEffect(() => {
    if (resultado) avisoRef.current?.focus();
  }, [resultado]);

  const cambiar = (campo) => (e) => {
    const valor = e.target.value;
    setDatos((prev) => ({ ...prev, [campo]: valor }));
    // Solo se revalida en vivo lo que ya estaba marcado como error:
    // corregir no debe generar mensajes nuevos mientras se escribe.
    if (errores[campo]) {
      const error = REGLAS[campo]?.(valor) ?? null;
      setErrores((prev) => ({ ...prev, [campo]: error }));
    }
  };

  const alSalir = (campo) => () => {
    setTocados((prev) => ({ ...prev, [campo]: true }));
    // Antes del primer envío solo se valida al salir del campo.
    if (!REGLAS[campo]) return;
    const error = REGLAS[campo](datos[campo]);
    setErrores((prev) => ({ ...prev, [campo]: error }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    setIntentado(true);
    setResultado(null);

    const nuevos = validarTodo(datos);
    if (Object.keys(nuevos).length > 0) {
      setErrores(nuevos);
      // El foco va al primer campo con problema, no al aviso general.
      document.getElementById(Object.keys(nuevos)[0])?.focus();
      return;
    }

    setEnviando(true);
    try {
      await api.enviarContacto({
        ...datos,
        id_provincia: Number(datos.id_provincia),
        id_sector: Number(datos.id_sector),
      });
      setResultado("exito");
      setDatos(VACIO);
      setErrores({});
      setTocados({});
      setIntentado(false);
    } catch {
      setResultado("error");
    } finally {
      setEnviando(false);
    }
  };

  const props = (campo, requerido = false) => ({
    id: campo,
    name: campo,
    value: datos[campo],
    onChange: cambiar(campo),
    onBlur: alSalir(campo),
    "aria-required": requerido || undefined,
    "aria-invalid": errores[campo] ? true : undefined,
    "aria-describedby": errores[campo] ? `${campo}-error` : undefined,
    className: errores[campo] ? "control control--mal" : "control",
  });

  return (
    <section className="cto">
      <Contenedor className="cto__grid">
        {/* ---------- Formulario ---------- */}
        <div className="cto__form">
          <p className="etiqueta">Contacto</p>
          <h1>Pedí tu cotización</h1>
          <p className="cto__bajada">
            Contanos qué vas a transportar y en qué volumen. Te respondemos con
            medidas, plazos y precio. Solo lleva un minuto.
          </p>

          {resultado === "exito" ? (
            <div className="exito" tabIndex={-1} ref={avisoRef} role="status">
              <h2>Recibimos tu consulta</h2>
              <p>
                Te vamos a responder al correo que dejaste, dentro del horario de
                atención ({HORARIO}). Si es urgente, escribinos por WhatsApp.
              </p>
              <div className="exito__acciones">
                <Boton href={WHATSAPP_URL} variante="primario">
                  Escribir por WhatsApp
                </Boton>
                <Boton to="/productos" variante="contorno">
                  Seguir viendo modelos
                </Boton>
              </div>
            </div>
          ) : (
            <form onSubmit={enviar} noValidate>
              <p className="ayuda" id="ayuda-form">
                Los campos con <span aria-hidden="true">*</span>
                <span className="sr-only">asterisco</span> son obligatorios.
              </p>

              {!listasOk && (
                <Aviso tipo="error">
                  No pudimos cargar las provincias y sectores. Recargá la página o
                  escribinos por WhatsApp.
                </Aviso>
              )}

              {/* --- Quién sos --- */}
              <fieldset className="grupo">
                <legend>Quién sos</legend>

                <div className="fila fila--2">
                  <Campo etiqueta="Nombre" campo="nombre" requerido errores={errores}>
                    <input type="text" autoComplete="given-name" {...props("nombre", true)} />
                  </Campo>
                  <Campo etiqueta="Apellido" campo="apellido" requerido errores={errores}>
                    <input type="text" autoComplete="family-name" {...props("apellido", true)} />
                  </Campo>
                </div>

                <Campo
                  etiqueta="Empresa"
                  campo="empresa"
                  pista="Si consultás a título personal, dejalo vacío."
                  errores={errores}
                >
                  <input type="text" autoComplete="organization" {...props("empresa")} />
                </Campo>
              </fieldset>

              {/* --- Cómo te contactamos --- */}
              <fieldset className="grupo">
                <legend>Cómo te contactamos</legend>

                <div className="fila fila--2">
                  <Campo etiqueta="Correo electrónico" campo="correo" requerido errores={errores}>
                    <input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="nombre@empresa.com"
                      {...props("correo", true)}
                    />
                  </Campo>
                  <Campo
                    etiqueta="Teléfono"
                    campo="telefono"
                    pista="Opcional. Acelera la respuesta."
                    errores={errores}
                  >
                    <input
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="(0351) 155 000 000"
                      {...props("telefono")}
                    />
                  </Campo>
                </div>
              </fieldset>

              {/* --- Tu operación --- */}
              <fieldset className="grupo">
                <legend>Tu operación</legend>

                <div className="fila fila--2">
                  <Campo etiqueta="Provincia" campo="id_provincia" requerido errores={errores}>
                    <select {...props("id_provincia", true)}>
                      <option value="">Elegí una provincia</option>
                      {provincias.map((p) => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                      ))}
                    </select>
                  </Campo>
                  <Campo etiqueta="Sector" campo="id_sector" requerido errores={errores}>
                    <select {...props("id_sector", true)}>
                      <option value="">Elegí un sector</option>
                      {sectores.map((s) => (
                        <option key={s.id} value={s.id}>{s.nombre}</option>
                      ))}
                    </select>
                  </Campo>
                </div>

                <Campo
                  etiqueta="Qué necesitás"
                  campo="mensaje"
                  requerido
                  pista="Qué material vas a cargar, cuántos bolsones y para cuándo."
                  errores={errores}
                >
                  <textarea rows={5} {...props("mensaje", true)} />
                </Campo>
              </fieldset>

              {/* Aviso de error del envío, anunciado por lector de pantalla */}
              <div role="status" aria-live="polite">
                {resultado === "error" && (
                  <div tabIndex={-1} ref={avisoRef}>
                    <Aviso tipo="error">
                      No pudimos enviar tu consulta. Probá de nuevo en unos minutos
                      o escribinos por WhatsApp.
                    </Aviso>
                  </div>
                )}
                {intentado && Object.keys(errores).some((k) => errores[k]) && (
                  <Aviso tipo="error">
                    Revisá los campos marcados antes de enviar.
                  </Aviso>
                )}
              </div>

              <Boton
                type="submit"
                tamano="lg"
                variante="primario"
                disabled={enviando}
                className="cto__enviar"
              >
                {enviando ? "Enviando…" : "Enviar consulta"}
              </Boton>
            </form>
          )}
        </div>

        {/* ---------- Canales alternativos ---------- */}
        <aside className="cto__aside">
          <div className="tarjeta-cto">
            <h2>¿Preferís hablar?</h2>
            <p>Si necesitás una respuesta rápida, estos son los canales directos.</p>
            <ul className="canales">
              <li>
                <span className="etiqueta">WhatsApp</span>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Escribinos ahora
                </a>
              </li>
              <li>
                <span className="etiqueta">Teléfono</span>
                <a href={TELEFONO_LINK}>{TELEFONO}</a>
              </li>
              <li>
                <span className="etiqueta">Horario</span>
                <p>{HORARIO}</p>
              </li>
            </ul>
          </div>

          <div className="tarjeta-cto tarjeta-cto--tip">
            <h2>¿No sabés qué modelo pedir?</h2>
            <p>
              Elegí cómo cargás y cómo descargás, y el sitio te dice cuál de
              los modelos corresponde.
            </p>
            <Boton to="/#configurador" variante="secundario">
              Ir al configurador
            </Boton>
          </div>
        </aside>
      </Contenedor>
    </section>
  );
}

/** Campo de formulario: etiqueta asociada, pista y error, todo enlazado. */
function Campo({ etiqueta, campo, requerido, pista, errores, children }) {
  const error = errores[campo];
  return (
    <div className="campo">
      <label htmlFor={campo}>
        {etiqueta}
        {requerido && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {pista && !error && <p className="campo__pista">{pista}</p>}
      {error && (
        <p className="campo__error" id={`${campo}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
