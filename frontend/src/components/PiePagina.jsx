import "../components/PiePagina.css";

const year = new Date().getFullYear();

const WHATSAPP_TEL = "5493516622764";
const WHATSAPP_MSG =
  "Hola, me gustaría recibir asesoramiento sobre Big Bags. Los contacto desde la web. ¡Gracias!";

function PiePagina() {
  const whatsappHref = `https://wa.me/${WHATSAPP_TEL}?text=${encodeURIComponent(
    WHATSAPP_MSG
  )}`;

  return (
    <footer
      className="footer"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content="Lindor Sacks S.R.L." />

      <div className="footer__in">
        <h2 className="sr-only">Datos de contacto</h2>

        <div className="footer__marca">
          <span className="footer__lockup">
            <img
              className="footer__ico"
              src="/images/icono.webp"
              alt=""
              width={103}
              height={92}
            />
            <span className="footer__nombre">
              Sibom Sacks
              <small className="footer__claim-marca">Soluciones textiles</small>
            </span>
          </span>
          <p className="footer__claim">
            Contenedores flexibles fabricados en Córdoba, para todo el país.
          </p>
        </div>

        <ul className="footer__datos">
          <li
            itemProp="contactPoint"
            itemScope
            itemType="https://schema.org/ContactPoint"
          >
            <span className="footer__rubro">Teléfono</span>
            <address className="not-italic">
              <a
                href="tel:+543511155081014"
                className="footer__dato"
                itemProp="telephone"
              >
                (0351) 155 081 014
              </a>
            </address>
          </li>

          <li>
            <span className="footer__rubro">WhatsApp</span>
            <a
              href={whatsappHref}
              className="footer__dato"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribinos ahora
            </a>
          </li>

          <li>
            <span className="footer__rubro">Horario</span>
            <p className="footer__dato footer__dato--plano">
              Lunes a viernes,{" "}
              <time dateTime="08:00">8:00 a 15:30 hs.</time>
            </p>
          </li>
        </ul>
      </div>

      <div className="footer__legal">
        <p>© {year} Lindor Sacks S.R.L. Todos los derechos reservados.</p>
        <p>Córdoba, Argentina · Desde 2007</p>
      </div>
    </footer>
  );
}

export default PiePagina;

