import { Helmet } from "react-helmet-async";

/*
  Meta tags por ruta.

  El index.html trae los tags por defecto (los que ve un crawler que no ejecuta
  JS). Este componente los pisa cuando React monta, para que cada página tenga
  su propio título, descripción y canonical: sin esto las seis rutas compiten
  entre sí en Google con el mismo título y ninguna posiciona.

  El foco es Córdoba: es donde está la planta y donde se puede competir de
  verdad. Las búsquedas nacionales genéricas quedan como objetivo de fondo.
*/

const BASE = "https://www.sibomsacks.com.ar";
const OG_IMG = `${BASE}/images/og-sibomsacks.jpg`;

const Seo = ({
  titulo,
  descripcion,
  ruta = "/",
  imagen = OG_IMG,
  tipo = "website",
  noIndex = false,
  children,
}) => {
  const url = `${BASE}${ruta === "/" ? "/" : ruta}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{titulo}</title>
      <meta name="description" content={descripcion} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={tipo} />
      <meta property="og:site_name" content="Sibom Sacks" />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:image" content={imagen} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titulo} />
      <meta name="twitter:description" content={descripcion} />
      <meta name="twitter:image" content={imagen} />

      {children}
    </Helmet>
  );
};

export default Seo;
