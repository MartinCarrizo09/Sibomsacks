/**
 * Lógica del catálogo.
 *
 * Los 6 modelos no son 6 productos distintos: son la combinación de dos
 * decisiones independientes del comprador.
 *
 *        BOCA (cómo se carga)      x      FONDO (cómo se descarga)
 *   válvula / pollera / boca abierta        válvula / fondo ciego
 *
 * 3 x 2 = 6. Modelar esto explícitamente permite que el usuario elija por
 * su operación en vez de leer seis nombres casi idénticos.
 */

export const BOCAS = [
  {
    id: "valvula",
    nombre: "Válvula de carga",
    resumen: "Manga superior cerrada. Evita contaminación y pérdida de material al llenar.",
  },
  {
    id: "pollera",
    nombre: "Pollera de cierre",
    resumen: "Faldón que se ata sobre la boca. Buen equilibrio entre hermeticidad y velocidad.",
  },
  {
    id: "boca-abierta",
    nombre: "Boca abierta",
    resumen: "Sin restricción superior. La carga más rápida, para material que no requiere sellado.",
  },
];

export const FONDOS = [
  {
    id: "valvula",
    nombre: "Válvula de descarga",
    resumen: "Manga inferior. Permite vaciar de forma controlada y dosificada.",
  },
  {
    id: "ciego",
    nombre: "Fondo ciego",
    resumen: "Base cerrada. Se vacía volcando el bolsón; más económico y resistente.",
  },
];

/**
 * Mapa id de modelo -> combinación, según los datos del backend.
 * (id_tipo 1..6 en caracteristicasGenerales)
 */
const COMBINACIONES = {
  1: { boca: "valvula", fondo: "valvula" },
  2: { boca: "pollera", fondo: "valvula" },
  3: { boca: "boca-abierta", fondo: "valvula" },
  4: { boca: "valvula", fondo: "ciego" },
  5: { boca: "pollera", fondo: "ciego" },
  6: { boca: "boca-abierta", fondo: "ciego" },
};

/** Imagen de cada modelo, por id_tipo. */
const IMAGENES = {
  1: "valvuladecargaydescarga",
  2: "polleradecierrrevalvuladedescarga",
  3: "bocaabiertavalvuladedescarga",
  4: "valvuladecargafondociego",
  5: "polleradecierrefondociego",
  6: "bocaabiertafondociego",
};

/** Normaliza un producto del backend a la forma que usa la interfaz. */
export function normalizar(producto) {
  const tipo = producto.caracteristicasGenerales?.id_tipo ?? producto.id;
  const combo = COMBINACIONES[tipo] ?? {};
  return {
    id: producto.id,
    tipo,
    nombre: producto.nombre,
    descripcion: producto.caracteristicasGenerales?.tipo ?? "",
    boca: combo.boca,
    fondo: combo.fondo,
    imagen: `/images/${IMAGENES[tipo] ?? "logo"}.webp`,
    fichaTecnica: [
      { etiqueta: "Material", valor: producto.material },
      { etiqueta: "Tejido", valor: producto.tipoTejido },
      { etiqueta: "Costura", valor: producto.tipoCostura },
      { etiqueta: "Forro interior", valor: producto.forroInterior },
      { etiqueta: "Dimensiones internas", valor: producto.dimensionesInternas, unidad: "cm" },
      { etiqueta: "Altura", valor: producto.altura, unidad: "cm" },
      { etiqueta: "Pallet recomendado", valor: producto.paletaRecomendada, unidad: "cm" },
      { etiqueta: "Color", valor: producto.color },
    ].filter((f) => f.valor !== null && f.valor !== undefined && f.valor !== ""),
  };
}

/** Busca el modelo que corresponde a una combinación de boca y fondo. */
export function buscarModelo(modelos, boca, fondo) {
  return modelos.find((m) => m.boca === boca && m.fondo === fondo) ?? null;
}

/** Nombre legible de una opción a partir de su id. */
export const nombreBoca = (id) => BOCAS.find((b) => b.id === id)?.nombre ?? "—";
export const nombreFondo = (id) => FONDOS.find((f) => f.id === id)?.nombre ?? "—";
export const resumenBoca = (id) => BOCAS.find((b) => b.id === id)?.resumen ?? "";
export const resumenFondo = (id) => FONDOS.find((f) => f.id === id)?.resumen ?? "";

/**
 * Filtra por boca y fondo. `null` en cualquiera de los dos significa
 * "cualquiera", que es el estado inicial del catálogo.
 */
export function filtrar(modelos, boca, fondo) {
  return modelos.filter(
    (m) => (!boca || m.boca === boca) && (!fondo || m.fondo === fondo)
  );
}

/**
 * Modelos que se diferencian del actual en un solo eje.
 * Es la comparación que le sirve al comprador: "esto mismo, pero
 * descargando de otra forma".
 */
export function alternativas(modelos, modelo) {
  if (!modelo) return [];
  return modelos
    .filter((m) => m.id !== modelo.id)
    .filter((m) => m.boca === modelo.boca || m.fondo === modelo.fondo)
    .map((m) => ({
      ...m,
      cambia: m.boca === modelo.boca ? "descarga" : "carga",
    }));
}
