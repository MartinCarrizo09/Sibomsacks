import React, { useEffect, useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaIndustry,
  FaUsers,
  FaBoxOpen,
  FaCheck,
  FaQuoteLeft,
} from "react-icons/fa";
import "./SobreNosotros.css";
import { useNavigate } from "react-router-dom";

const SobreNosotros = () => {
  const navigate = useNavigate();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  // Contador animado
  const useCounter = (target, visible) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!visible) return;
      const duration = 2000;
      const steps = 60;
      const stepValue = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }, [target, visible]);
    return count;
  };

  // Intersection Observer para stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const count10 = useCounter(10, statsVisible);
  const count65 = useCounter(65, statsVisible);
  const count30 = useCounter(30, statsVisible);

  return (
    <>
      {/* HERO */}
      <section
        className="sn-hero-section text-white position-relative overflow-hidden"
        style={{ marginTop: 0 }}
      >
        <div className="sn-hero-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="sn-particle" />
          ))}
        </div>

        <div className="container position-relative">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-8 d-flex flex-column justify-content-center text-center">
              <div className="sn-hero-badge mb-3">
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                  Líderes en Big Bags desde 2007
                </span>
              </div>

              <h1
                className="display-4 fw-bold mb-4 sn-hero-title"
                style={{ marginTop: 0 }}
              >
                Conectando industrias con
                <span className="text-warning d-block">
                  soluciones de embalaje
                </span>
                <span className="sn-text-gradient">seguras y eficientes</span>
              </h1>

              <p className="lead mb-4 fs-5">
                En Sibom Sacks trabajamos para impulsar la productividad de
                nuestros clientes, brindando Big Bags confiables y un servicio
                cercano que marca la diferencia.
              </p>

              {/* CTAS centrados y con mayor tamaño (sin cambiar el estilo base) */}
              <div className="sn-cta-group">
                <button
                  className="btn sn-cta-primary btn-lg fw-bold px-5 py-3"
                  onClick={() => navigate("/contacto")}
                >
                  Solicitar Cotización
                </button>

                <button
                  className="btn sn-cta-ghost btn-lg px-4 py-3"
                  onClick={() => navigate("/productos")}
                >
                  Ver productos{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-5 bg-light position-relative" ref={statsRef}>
        <div className="container">
          <div className="row text-center justify-content-center g-4">
            <div className="col-md-4 col-sm-6">
              <div className="sn-stats-card p-4 rounded-4 bg-white sn-shadow-hover h-100">
                <div className="sn-stats-icon mb-3">
                  <div className="sn-icon-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center">
                    <FaIndustry className="text-primary fs-3" />
                  </div>
                </div>
                <h2 className="display-3 fw-bold text-primary mb-2 sn-counter">
                  {count10}
                </h2>
                <p className="text-muted fs-5 mb-0">Años de experiencia</p>
                <div className="sn-stats-bar" />
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="sn-stats-card p-4 rounded-4 bg-white sn-shadow-hover h-100">
                <div className="sn-stats-icon mb-3">
                  <div className="sn-icon-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center">
                    <FaUsers className="text-success fs-3" />
                  </div>
                </div>
                <h2 className="display-3 fw-bold text-primary mb-2 sn-counter">
                  {count65}
                </h2>
                <p className="text-muted fs-5 mb-0">Clientes satisfechos</p>
                <div className="sn-stats-bar" />
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="sn-stats-card p-4 rounded-4 bg-white sn-shadow-hover h-100">
                <div className="sn-stats-icon mb-3">
                  <div className="sn-icon-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center">
                    <FaBoxOpen className="text-warning fs-3" />
                  </div>
                </div>
                <h2 className="display-3 fw-bold text-primary mb-2 sn-counter">
                  {count30}+
                </h2>
                <p className="text-muted fs-5 mb-0">
                  Profesionales capacitados
                </p>
                <div className="sn-stats-bar" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold text-dark mb-3">
                ¿Por qué elegir Sibom Sacks?
              </h2>
              <p className="lead text-muted">
                Nos diferenciamos por nuestro compromiso con la calidad, la
                innovación y el servicio personalizado.
              </p>
              <p className="lead text-muted">
                Desarrollamos junto a tu empresa el Big Bag que tu operación
                necesita: no partimos de un producto estándar, partimos de tu
                proceso.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {/* Tarjeta 1 */}
            <div className="col-lg-6 col-md-6">
              <div className="sn-feature-card p-4 h-100 rounded-4 bg-gradient-subtle border-0 shadow-sm">
                <div className="sn-feature-icon mb-4">
                  <div className="sn-icon-wrapper bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center">
                    <FaMapMarkerAlt className="text-primary fs-2" />
                  </div>
                </div>
                <h3 className="h4 text-dark mb-3 fw-bold">
                  Siempre cerca tuyo
                </h3>
                <p className="text-muted mb-4 lh-lg">
                  Estamos a tu disposición para ofrecerte soluciones de embalaje 
                  personalizadas y adaptadas a sus necesidades específicas.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" />
                    Atención personalizada
                  </li>
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" />
                    Respuesta rápida
                  </li>
                  <li>
                    <FaCheck className="text-success me-2" />
                    Soporte técnico
                  </li>
                </ul>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="col-lg-6 col-md-6">
              <div className="sn-feature-card p-4 h-100 rounded-4 bg-gradient-subtle border-0 shadow-sm">
                <div className="sn-feature-icon mb-4">
                  <div className="sn-icon-wrapper bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center">
                    <FaIndustry className="text-success fs-2" />
                  </div>
                </div>
                <h3 className="h4 text-dark mb-3 fw-bold">
                  Instalaciones de primer nivel
                </h3>
                <p className="text-muted mb-4 lh-lg">
                  Contamos con instalaciones de producción propias y alianzas
                  estratégicas que garantizan calidad y disponibilidad.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" />
                    Producción propia
                  </li>
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" />
                    Alianzas estratégicas
                  </li>
                  <li>
                    <FaCheck className="text-success me-2" />
                    Control de calidad
                  </li>
                </ul>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="col-lg-6 col-md-6">
              <div className="sn-feature-card p-4 h-100 rounded-4 bg-gradient-subtle border-0 shadow-sm">
                <div className="sn-feature-icon mb-4">
                  <div className="sn-icon-wrapper bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center">
                    <FaUsers className="text-warning fs-2" />
                  </div>
                </div>
                <h3 className="h4 text-dark mb-3 fw-bold">
                  Compromiso Total
                </h3>
                <p className="text-muted mb-4 lh-lg">
                  Contamos con un equipo altamente capacitado y comprometido con la excelencia en cada proyecto.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" />
                    Personal capacitado
                  </li>
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" />
                    Experiencia comprobada
                  </li>
                  <li>
                    <FaCheck className="text-success me-2" />
                    Servicio confiable
                  </li>
                </ul>
              </div>
            </div>

            {/* Tarjeta 4 */}
            <div className="col-lg-6 col-md-6">
              <div className="sn-feature-card p-4 h-100 rounded-4 bg-gradient-subtle border-0 shadow-sm">
                <div className="sn-feature-icon mb-4">
                  <div className="sn-icon-wrapper bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center">
                    <FaBoxOpen className="text-info fs-2" />
                  </div>
                </div>
                <h3 className="h4 text-dark mb-3 fw-bold">
                  Calidad superior garantizada
                </h3>
                <p className="text-muted mb-4 lh-lg">
                  Ofrecemos soluciones de embalaje de máxima calidad y
                  resistencia, diseñadas para superar sus expectativas.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" />
                    Materiales premium
                  </li>
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" />
                    Durabilidad probada
                  </li>
                  <li>
                    <FaCheck className="text-success me-2" />
                    Garantía de calidad
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold text-dark mb-3">
                Lo que dicen nuestros clientes
              </h2>
            </div>
          </div>

          <div className="row g-4">
            {/* Testimonio 1 */}
            <div className="col-md-4">
              <div className="sn-testimonial-card p-4 rounded-4 bg-white shadow-sm h-100">
                <FaQuoteLeft className="text-primary mb-3 fs-3" />
                <p className="text-muted mb-4">
                  "Excelente calidad en sus productos y un servicio al cliente
                  excepcional."
                </p>
                <div className="d-flex align-items-center">
                  <div className="sn-testimonial-avatar bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3">
                    <FaUsers className="text-primary" />
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold">Industria Alimentaria</h6>
                    <small className="text-muted">Cliente desde 2015</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="col-md-4">
              <div className="sn-testimonial-card p-4 rounded-4 bg-white shadow-sm h-100">
                <FaQuoteLeft className="text-primary mb-3 fs-3" />
                <p className="text-muted mb-4">
                  "Nos ayudaron a optimizar la logística con soluciones de
                  embalaje eficientes."
                </p>
                <div className="d-flex align-items-center">
                  <div className="sn-testimonial-avatar bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3">
                    <FaIndustry className="text-success" />
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold">Sector Industrial</h6>
                    <small className="text-muted">Cliente desde 2018</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonio 3 */}
            <div className="col-md-4">
              <div className="sn-testimonial-card p-4 rounded-4 bg-white shadow-sm h-100">
                <FaQuoteLeft className="text-primary mb-3 fs-3" />
                <p className="text-muted mb-4">
                  "Materiales resistentes y un equipo siempre dispuesto a
                  brindar soporte."
                </p>
                <div className="d-flex align-items-center">
                  <div className="sn-testimonial-avatar bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3">
                    <FaBoxOpen className="text-warning" />
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold">Logística y Transporte</h6>
                    <small className="text-muted">Cliente desde 2020</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SobreNosotros;
