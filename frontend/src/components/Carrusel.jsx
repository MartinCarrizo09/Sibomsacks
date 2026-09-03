import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Carrusel.css";

/*
  Carrusel de fotos de producto.

  Se apoya en scroll nativo con scroll-snap en vez de transformaciones en JS:
  así el gesto de deslizar en móvil es el del sistema, y sin JS las fotos
  siguen siendo navegables. Los botones y los puntos sólo empujan ese scroll.
*/

const Carrusel = ({ imagenes, etiqueta = "Fotos del producto" }) => {
  const pistaRef = useRef(null);
  const [activo, setActivo] = useState(0);

  const irA = useCallback((i) => {
    const pista = pistaRef.current;
    if (!pista) return;
    const slide = pista.children[i];
    if (slide) {
      pista.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
  }, []);

  // El indicador sigue al scroll real, así queda sincronizado tanto si el
  // usuario desliza con el dedo como si usa los botones.
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return;

    let cuadro = 0;
    const alScroll = () => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => {
        const centro = pista.scrollLeft + pista.clientWidth / 2;
        let masCerca = 0;
        let menorDist = Infinity;
        Array.from(pista.children).forEach((slide, i) => {
          const c = slide.offsetLeft + slide.offsetWidth / 2;
          const d = Math.abs(c - centro);
          if (d < menorDist) {
            menorDist = d;
            masCerca = i;
          }
        });
        setActivo(masCerca);
      });
    };

    pista.addEventListener("scroll", alScroll, { passive: true });
    return () => {
      cancelAnimationFrame(cuadro);
      pista.removeEventListener("scroll", alScroll);
    };
  }, []);

  const total = imagenes.length;

  return (
    <div className="carr" role="group" aria-roledescription="carrusel" aria-label={etiqueta}>
      <div className="carr__pista" ref={pistaRef}>
        {imagenes.map((img, i) => (
          <figure
            className="carr__slide"
            key={img.src}
            aria-label={`${i + 1} de ${total}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              loading={i === 0 ? "eager" : "lazy"}
            />
            <figcaption>{img.pie}</figcaption>
          </figure>
        ))}
      </div>

      <button
        type="button"
        className="carr__nav carr__nav--prev"
        onClick={() => irA(Math.max(0, activo - 1))}
        disabled={activo === 0}
        aria-label="Foto anterior"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <button
        type="button"
        className="carr__nav carr__nav--next"
        onClick={() => irA(Math.min(total - 1, activo + 1))}
        disabled={activo === total - 1}
        aria-label="Foto siguiente"
      >
        <span aria-hidden="true">›</span>
      </button>

      <ol className="carr__puntos">
        {imagenes.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              className={i === activo ? "is-activo" : ""}
              onClick={() => irA(i)}
              aria-label={`Ver ${img.pie}`}
              aria-current={i === activo ? "true" : undefined}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Carrusel;
