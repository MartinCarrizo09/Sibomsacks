import { Link } from "react-router-dom";
import { Contenedor } from "../ui/Ui.jsx";
import { WHATSAPP_URL, TELEFONO, TELEFONO_LINK, HORARIO } from "../../lib/contacto.js";
import "./footer.css";

export default function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="pie" itemScope itemType="https://schema.org/Organization">
      <meta itemProp="name" content="Sibom Sacks SRL" />
      <Contenedor>
        <div className="pie__grid">
          <div className="pie__marca">
            <img src="/images/logo.webp" alt="Sibom Sacks" width={458} height={109} />
            <p>
              Fabricación de Big Bags industriales en rafia de polipropileno con
              tratamiento UV. Córdoba, Argentina.
            </p>
          </div>

          <nav className="pie__col" aria-labelledby="pie-nav">
            <h2 className="etiqueta" id="pie-nav">Navegación</h2>
            <Link to="/productos">Modelos</Link>
            <Link to="/beneficios">Beneficios</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>

          <div className="pie__col">
            <h2 className="etiqueta">Contacto</h2>
            <a href={TELEFONO_LINK} itemProp="telephone">{TELEFONO}</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <p className="pie__horario">{HORARIO}</p>
          </div>
        </div>

        <p className="pie__legal">
          © {anio} Sibom Sacks SRL. Todos los derechos reservados.
        </p>
      </Contenedor>
    </footer>
  );
}
