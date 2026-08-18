import { useReducedMotion } from "framer-motion";

/**
 * Variantes de animación que respetan "reducir movimiento" del sistema.
 *
 * El CSS del sitio ya contempla prefers-reduced-motion, pero framer-motion
 * escribe estilos inline que el CSS no puede frenar. Este hook devuelve
 * variantes sin desplazamiento cuando el usuario pidió menos movimiento.
 */
export function useMotionSafe() {
  const reducir = useReducedMotion();

  const fadeUp = reducir
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
      };

  const cardVariant = reducir
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      };

  const staggerContainer = reducir
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
      };

  /** Animación de flotación continua de los logos de clientes. */
  const flotar = (indice) =>
    reducir
      ? undefined
      : {
          y: [0, -3, 0],
          transition: {
            duration: 3 + indice * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: indice * 0.3,
          },
        };

  /** Escala de hover/tap; sin efecto si se pidió reducir movimiento. */
  const escala = (valor) => (reducir ? undefined : valor);

  return { reducir, fadeUp, cardVariant, staggerContainer, flotar, escala };
}

export default useMotionSafe;
