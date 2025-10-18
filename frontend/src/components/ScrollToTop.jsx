// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si hay hash, dejamos que el navegador maneje el scroll a la ancla
    if (hash) {
      return;
    }

    // Desactivar restauración automática del navegador
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToTop = () => {
      // Guardar comportamientos originales
      const html = document.documentElement;
      const body = document.body;
      const prevHtmlBehavior = html.style.scrollBehavior;
      const prevBodyBehavior = body.style.scrollBehavior;

      // Forzar scroll instantáneo
      html.style.scrollBehavior = "auto";
      body.style.scrollBehavior = "auto";

      // Función para hacer el scroll
      const performScroll = () => {
        // Scroll de la ventana principal
        window.scrollTo(0, 0);
        
        // Scroll del elemento scrolling (fallback)
        const scroller = document.scrollingElement || html;
        scroller.scrollTop = 0;
        scroller.scrollLeft = 0;

        // Scroll del contenedor principal si existe
        const main = document.querySelector(".main-layout");
        if (main) {
          main.scrollTop = 0;
          main.scrollLeft = 0;
        }

        // Cualquier otro contenedor con scroll
        const appContainer = document.querySelector(".app-container");
        if (appContainer) {
          appContainer.scrollTop = 0;
          appContainer.scrollLeft = 0;
        }
      };

      // Ejecutar scroll inmediatamente
      performScroll();

      // Ejecutar en el siguiente frame para asegurar que funcione
      const raf1 = requestAnimationFrame(() => {
        performScroll();
        
        // Y una vez más por si acaso
        const raf2 = requestAnimationFrame(() => {
          performScroll();
        });

        // Restaurar comportamientos después de un momento
        setTimeout(() => {
          html.style.scrollBehavior = prevHtmlBehavior || "";
          body.style.scrollBehavior = prevBodyBehavior || "";
        }, 100);

        return () => {
          cancelAnimationFrame(raf2);
        };
      });

      return () => {
        cancelAnimationFrame(raf1);
        html.style.scrollBehavior = prevHtmlBehavior || "";
        body.style.scrollBehavior = prevBodyBehavior || "";
      };
    };

    // Ejecutar con un pequeño delay para asegurar que el DOM esté listo
    const timeoutId = setTimeout(scrollToTop, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, hash]);

  return null;
}