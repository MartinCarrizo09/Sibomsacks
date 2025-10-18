import React from "react";
import "./Beneficios.css";
import { useNavigate } from "react-router-dom";

const Beneficios = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contacto");
  };

  // --- HERO: beneficios por sector (sin detalles de producto) ---
  const beneficiosAgricultura = [
    "Protección de la carga frente al clima",
    "Menos mermas durante cosecha y traslado",
    "Flujo de trabajo más ordenado en campaña",
    "Cargas y descargas más ágiles",
    "Identificación clara de lotes",
    "Apilado estable y seguro en depósito",
  ];

  const beneficiosIndustria = [
    "Dosificación precisa en procesos",
    "Menos polvo ambiental en la línea",
    "Mejor aprovechamiento del espacio",
    "Integración simple con tu operación",
    "Trazabilidad práctica por etiqueta",
    "Buenas prácticas de higiene y orden",
  ];

  const beneficiosMineria = [
    "Soporta materiales de alta exigencia",
    "Maniobras de izaje seguras",
    "Control en trasvases y derrames",
    "Comportamiento estable a la intemperie",
    "Cierres confiables para el traslado",
    "Menos bultos por tonelada movida",
  ];

  // --- Columna izquierda: ¿Por qué Big Bags? (sin specs) ---
  const porque = [
    "Acelera operaciones de carga y descarga",
    "Reduce manipulaciones y tiempos muertos",
    "Aprovecha mejor el espacio en almacén y transporte",
    "Minimiza pérdidas por roturas o derrames",
    "Se adapta a distintos materiales y procesos",
    "Facilita la identificación y la trazabilidad",
    "Mejora condiciones de seguridad en planta",
    "Ordena la logística y simplifica inventarios",
    "Escala fácil con la demanda",
  ];

  // --- Ventajas (beneficios, no características) ---
  const ventajas = [
    "Menor costo por tonelada operada",
    "Mayor eficiencia en movimientos",
    "Orden y limpieza en áreas de trabajo",
    "Reducción de tiempos de cambio",
    "Menor daño al producto",
    "Trazabilidad clara por bulto",
    "Aplicable a múltiples rubros",
    "Mejor relación volumen/espacio",
    "Apilado seguro y predecible",
    "Flujo continuo de trabajo",
  ];

  // --- Métricas (impacto operativo) ---
  const metrics = [
    { value: "↑30%", label: "Aprovechamiento de espacio" },
    { value: "−25%", label: "Tiempos de carga/descarga" },
    { value: "≤1%", label: "Tasa de roturas en operación" },
  ];

  return (
    <>
      {/* HERO con 3 tarjetas */}
      <section className="hero-section" style={{ marginTop: 0 }}>
        <div className="hero-card agricultura-bg">
          <div className="hero-content animate-left">
            <h2 className="hero-title">Agricultura</h2>
            <ul className="beneficios-list">
              {beneficiosAgricultura.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-card industria-bg">
          <div className="hero-content animate-up">
            <h2 className="hero-title">Industria</h2>
            <ul className="beneficios-list">
              {beneficiosIndustria.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-card mineria-bg">
          <div className="hero-content animate-right">
            <h2 className="hero-title">Minería</h2>
            <ul className="beneficios-list">
              {beneficiosMineria.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Beneficios / Ventajas */}
      <section className="beneficios-container pt-4 pb-5">
        <div className="container">
          <div className="row g-4">
            {/* Columna izquierda */}
            <div className="col-lg-4 mb-4">
              <div className="sticky-content">
                <div className="mb-4">
                  <span className="custom-badge">Beneficios Clave</span>
                  <h2 className="custom-title">¿Por qué Big Bags?</h2>
                </div>

                <div className="mb-4">
                  {porque.map((item, idx) => (
                    <div key={idx} className="porque-item">
                      <div className="porque-icon" />
                      <span className="porque-text">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA (sin mencionar modelos, gramajes ni bocas) */}
                {/* Micro‑métrica arriba para rellenar visualmente la columna */}

                <div className="cta-box">
                  <div className="cta-decoration-1" />
                  <div className="cta-decoration-2" />
                  <div className="cta-content">
                    <h5 className="cta-title">¿Querés mejorar tu operación?</h5>
                    <p className="cta-text">
                      Evaluamos tu proceso y te proponemos la solución de
                      embalaje que mejor impacto tenga en tiempos, costos y
                      seguridad.
                    </p>
                    <button className="cta-button" onClick={handleContactClick}>
                      Recibir asesoramiento
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="col-lg-8">
              <div className="mb-5">
                <span className="custom-badge-alt">
                  Impacto en la operación
                </span>
                <h2 className="custom-title">Ventajas del Big Bag</h2>
                <p className="description-text">
                  Enfocá tu operación en mover más volumen con menos esfuerzo:
                  menos manipuleos, mayor orden y mejor uso del espacio en
                  planta y en transporte.
                </p>
              </div>

              <div className="row g-4">
                {ventajas.map((ventaja, index) => (
                  <div key={index} className="col-md-6">
                    <div className="ventaja-card">
                      <div className="ventaja-gradient" />
                      <div className="ventaja-icon" />
                      <span className="ventaja-text">{ventaja}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats (impacto) - con emojis y alineadas a la base */}
              <div className="row g-4 mt-5 stats-row align-items-end">
                <div className="col-md-4">
                  <div className="stats-card">
                    <div className="stats-icon space" />
                    <h3 className="stats-number">↑30%</h3>
                    <p className="stats-text">Aprovechamiento de espacio</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="stats-card">
                    <div className="stats-icon time" />
                    <h3 className="stats-number">−25%</h3>
                    <p className="stats-text">Tiempos de carga/descarga</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="stats-card">
                    <div className="stats-icon shield" />
                    <h3 className="stats-number">≤1%</h3>
                    <p className="stats-text">Tasa de roturas en operación</p>
                  </div>
                </div>
              </div>
            </div>
            {/* /col derecha */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Beneficios;
