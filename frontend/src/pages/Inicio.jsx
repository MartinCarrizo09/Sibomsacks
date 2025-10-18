import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Inicio.css";

function Inicio() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);

  // Detecta mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Instancia ÚNICA del Carousel + cleanup
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || !window.bootstrap?.Carousel) return;

    // Si ya había una instancia, la limpiamos
    const prev = window.bootstrap.Carousel.getInstance(el);
    if (prev) prev.dispose();

    const inst = new window.bootstrap.Carousel(el, {
      interval: 8000,
      ride: false,       // nada de data-ride, lo controlamos por JS
      pause: false,
      touch: true,
      wrap: true,
      keyboard: true,
    });

    const onSlid = (e) => setActiveSlide(e.to ?? 0);
    el.addEventListener("slid.bs.carousel", onSlid);

    inst.cycle(); // arrancar

    return () => {
      el.removeEventListener("slid.bs.carousel", onSlid);
      try { inst.dispose(); } catch {}
    };
  }, []);

  // Dispose explícito al navegar desde el botón del hero
  const teardownCarousel = useCallback(() => {
    const el = carouselRef.current;
    const inst = el ? window.bootstrap?.Carousel?.getInstance(el) : null;
    if (inst) {
      try { inst.dispose(); } catch {}
    }
  }, []);

  // Animaciones
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const slideData = [
    {
      img: "/images/slide1MaquinadeCoser.png",
      title: "Fabricamos Big Bags industriales de máxima resistencia",
      text: "Soluciones de embalaje confiables para transporte y almacenamiento seguro de productos a granel.",
      btn: "Ver catálogo",
      link: "/productos",
    },
    {
      img: "/images/Slide2BBags.png",
      title: "Optimizá tu logística con nuestros Big Bags certificados",
      text: "Diseñados para mejorar la eficiencia en el transporte y reducir costos operativos.",
      btn: "Explorar productos",  
      link: "/productos",
    },
    {
      img: "/images/slide3Apiladas.png",
      title: "Big Bags resistentes para agricultura, industria y minería",
      text: "Calidad garantizada para proteger su carga y maximizar la seguridad en cada envío.",
      btn: "Solicitar cotización",
      link: "/contacto",
    },
  ];

  const cardData = [
    {
      img: "/images/agricultura.jpg",
      alt: "Big Bags para Agricultura",
      title: "Agricultura",
      text: "Big Bags ideales para almacenar y transportar granos, semillas y fertilizantes de manera segura.",
      link: "/beneficios",
    },
    {
      img: "/images/industry.jpg",
      alt: "Big Bags para Industria",
      title: "Industria",
      text: "Soluciones resistentes y reutilizables para materiales a granel, reduciendo costos de embalaje.",
      link: "/beneficios",
    },
    {
      img: "/images/mineria.jpg",
      alt: "Big Bags para Minería",
      title: "Minería",
      text: "Big Bags diseñados para cargas pesadas, garantizando seguridad y resistencia en entornos extremos.",
      link: "/beneficios",
    },
  ];

  const certData = [
    {
      img: "/images/logoCertFlex.png",
      alt: "Certificación EFIBCA Big Bags",
      title: "Test de rendimiento para contenedores flexibles",
      text: "Certificación internacional EFIBCA Standard 006, en conjunto con laboratorios de Alemania y Escocia.",
    },
    {
      img: "/images/certInti.png",
      alt: "Certificado de calibración INTI",
      title: "Certificado de Calibración INTI",
      text: "Cumplimiento ISO 7500-1 + ANEXO A, validado por el Instituto Nacional de Tecnología Industrial.",
    },
    {
      img: "/images/certInal.png",
      alt: "Certificación INAL Big Bags alimentos",
      title: "Apto para productos alimenticios",
      text: "Certificación I.N.A.L. Nº 870/08, garantizando inocuidad en el transporte de alimentos.",
    },
  ];

  const empresaData = [
    { src: "/images/egran.png", alt: "Cliente Egran" },
    { src: "/images/caima.png", alt: "Cliente Caima" },
    { src: "/images/plasticosbv.png", alt: "Cliente Plásticos BV" },
    { src: "/images/pirquitas.jpeg", alt: "Cliente Pirquitas" },
    { src: "/images/biofarma.jpg", alt: "Cliente Biofarma" },
    { src: "/images/donadelmo.png", alt: "Cliente Don Adelmo" },
    { src: "/images/tapi.png", alt: "Cliente Tapi" },
    { src: "/images/cerrito.png", alt: "Cliente Cerrito" },
  ];

  const inViewOrImmediate = (isForMobileImmediate = false) =>
    isForMobileImmediate && isMobile
      ? { animate: "show" }
      : { whileInView: "show", viewport: { once: true, amount: 0.2 } };

  return (
    <>
      {/* HERO / CARRUSEL */}
      <section className="hero-carousel-full">
        <div
          id="heroCarousel"
          ref={carouselRef}
          className="carousel slide"
          data-bs-touch="true"
          /* importante: SIN data-bs-ride y SIN data-bs-interval */
        >
          <div className="carousel-indicators custom-indicators">
            {slideData.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner">
            {slideData.map((slide, idx) => (
              <div
                key={idx}
                className={`carousel-item hero-slide ${idx === 0 ? "active" : ""}`}
                style={{ backgroundImage: `url('${slide.img}')` }}
              >
                <div className="overlay" />
                <div className="carousel-caption text-start">
                  <motion.h1
                    key={`h1-${idx}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={activeSlide === idx ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    key={`p-${idx}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={activeSlide === idx ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {slide.text}
                  </motion.p>
                  <motion.div
                    key={`btn-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeSlide === idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <Link to={slide.link} className="hero-btn" onClick={teardownCarousel}>
                      {slide.btn}
                    </Link>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARDS INFORMATIVAS */}
      <motion.section
        className="informacion py-5 text-center"
        variants={fadeUp}
        initial="hidden"
        {...inViewOrImmediate(true)}
      >
        <motion.h2 variants={cardVariant}>
          Big Bags de alta resistencia para potenciar su negocio con seguridad y confianza.
        </motion.h2>

        <motion.div 
          className="imagenes-contenedor mt-4"
          variants={staggerContainer}
          initial="hidden"
          {...inViewOrImmediate(true)}
        >
          {cardData.map((card, idx) => (
            <motion.div
              key={idx}
              className="imagen-item shadow"
              variants={cardVariant}
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={card.link}>
                <img src={card.img} alt={card.alt} />
                <div className="info fijo">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <span className="beneficios-btn">Ver beneficios</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CERTIFICACIONES */}
      <motion.section
        className="Certificados py-5"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.h2 className="text-center mb-4" variants={cardVariant}>
            Certificaciones
          </motion.h2>

          <motion.div
            className="cert-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {certData.map((cert, idx) => (
              <motion.article
                key={idx}
                className="cert-card"
                variants={cardVariant}
                whileHover={{ scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="cert-logo">
                  <img src={cert.img} alt={cert.alt} />
                </div>
                <div className="cert-body">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-text">{cert.text}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* EMPRESAS */}
      <motion.section
        className="Empresas py-5"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 className="text-center mb-4" variants={cardVariant}>
          Empresas que confían en nosotros
        </motion.h2>

        <motion.div
          className="Empresas-Content d-flex flex-wrap justify-content-center gap-4 align-items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {empresaData.map((empresa, idx) => (
            <motion.div
              key={idx}
              className="empresa-item normal"
              variants={cardVariant}
              whileHover={{ scale: 1.15, y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -3, 0],
                transition: {
                  duration: 3 + idx * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.3,
                },
              }}
            >
              <img src={empresa.src} alt={empresa.alt} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </>
  );
}

export default Inicio;
