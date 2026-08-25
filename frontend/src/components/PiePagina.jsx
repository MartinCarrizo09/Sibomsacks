import "../components/PiePagina.css";
import { FaMobileAlt, FaWhatsapp, FaClock } from "react-icons/fa";

const year = new Date().getFullYear();

const WHATSAPP_TEL = "5493516622764";
const WHATSAPP_MSG =
  "Hola, me gustaría recibir asesoramiento sobre Big Bags. Los contacto desde la web. ¡Gracias!";

function PiePagina() {
  const whatsappHref = `https://wa.me/${WHATSAPP_TEL}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <footer className="footer" role="contentinfo" itemScope itemType="https://schema.org/Organization">
      <meta itemProp="name" content="Lindor Sacks S.R.L." />

      <div className="container text-white py-4">
        <h2 className="sr-only">Datos de contacto</h2>

        <div className="row text-center justify-content-center g-4 small-footer">

          {/* Teléfono móvil */}
          <div className="col-12 col-sm-4" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <FaMobileAlt className="icono-footer" aria-hidden="true" />
            <h3 className="footer-titulo">Teléfono</h3>
            <address className="mb-0 not-italic">
              <a href="tel:+543511155081014" className="footer-link" itemProp="telephone">
                (0351) 155 081 014
              </a>
            </address>
          </div>

          {/* WhatsApp */}
          <div className="col-12 col-sm-4">
            <FaWhatsapp className="icono-footer" aria-hidden="true" />
            <h3 className="footer-titulo">WhatsApp</h3>
            <p className="mb-0">
              <a
                href={whatsappHref}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribinos ahora
              </a>
            </p>
          </div>

          {/* Horario */}
          <div className="col-12 col-sm-4">
            <FaClock className="icono-footer" aria-hidden="true" />
            <h3 className="footer-titulo">Horario</h3>
            <p className="mb-0">Lunes a viernes</p>
            <time className="mb-0 d-block" dateTime="08:00">
              8:00 a 15:30 hs.
            </time>
          </div>
        </div>
      </div>

      <div className="footer-copy text-center mt-3">
        <p className="mb-0">© {year} Lindor Sacks S.R.L. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default PiePagina;
