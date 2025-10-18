import "../components/PiePagina.css";
import { FaMobileAlt, FaEnvelope, FaClock } from "react-icons/fa";

const year = new Date().getFullYear();

function PiePagina() {
  return (
    <footer className="footer" role="contentinfo" itemScope itemType="https://schema.org/Organization">
      <div className="container text-white py-4">
        <div className="row text-center justify-content-center g-4 small-footer">

          {/* Teléfono móvil */}
          <div className="col-6 col-md-3" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <FaMobileAlt className="icono-footer" aria-hidden="true" />
            <h6 className="fw-bold mt-2">Móvil</h6>
            <address className="mb-0 not-italic">
              <a href="tel:+54351155081014" className="link-light d-block" itemProp="telephone">
                (0351) 155 081 014
              </a>
              {/* Eliminá esta línea si es placeholder */}
              {/* <a href="tel:+54NNNNNNNNNNN" className="link-light d-block">(NNNN) NNN NNN NNN</a> */}
            </address>
          </div>

          {/* Email */}
          <div className="col-6 col-md-3" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <FaEnvelope className="icono-footer" aria-hidden="true" />
            <h6 className="fw-bold mt-2">E-mail</h6>
            <address className="mb-0 not-italic">
              <a href="mailto:contacto@empresaindustrial.com" className="link-light d-block" itemProp="email">
                contacto@empresaindustrial.com
              </a>
              <a href="mailto:logistica@empresaindustrial.com" className="link-light d-block" itemProp="email">
                logistica@empresaindustrial.com
              </a>
            </address>
          </div>

          {/* Horario */}
          <div className="col-6 col-md-3">
            <FaClock className="icono-footer" aria-hidden="true" />
            <h6 className="fw-bold mt-2">Horario</h6>
            <p className="mb-0">Lunes a Viernes</p>
            <time className="mb-0 d-block" dateTime="08:00-15:30">
              8:00 a 15:30 hs.
            </time>
          </div>
        </div>
      </div>

      <div className="footer-copy text-center mt-3">
        <p className="mb-0 small">© {year} Sibom Sacks SRL. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default PiePagina;
