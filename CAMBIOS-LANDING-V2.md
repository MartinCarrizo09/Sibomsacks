# Cambios a la landing — feedback del cliente

> **Código a modificar:** carpeta `frontend/` (la que construye `Dockerfile`, sin sufijo).
> Es el servicio de Railway que el cliente revisó y eligió. **No** confundir con `frontend-v2/` (`Dockerfile.v2`), que es el otro servicio desplegado en paralelo.
>
> **Fuente:** 13 audios de WhatsApp en `audios cliente/`, transcriptos con Whisper (`faster-whisper`, modelo `medium`, español). Fecha: 2026-08-25.
> Las transcripciones textuales están en el anexo, al final.
>
> Todas las referencias de archivo y línea fueron verificadas contra `frontend/src/`.

---

## ✅ ESTADO: cambios aplicados el 2026-08-25

Aplicados sobre `frontend/` y verificados con `npm run build` (build limpio, sin errores).

| # | Cambio | Archivo |
|---|---|---|
| 1 | `Sibom Sacks SRL` → `Lindor Sacks S.R.L.` (footer + metadato) | `components/PiePagina.jsx` |
| 2 | `Sibom Sacks SRL` → `Lindor Sacks S.R.L.` (`author` + JSON-LD, con `alternateName: Sibom Sacks`) | `index.html` |
| 3 | `desde 2015` → `desde 2007` | `pages/SobreNosotros.jsx` |
| 4 | Renglón de desarrollo a medida | `pages/SobreNosotros.jsx` |
| 5 | Quitado "Apilado estable y seguro en depósito" | `pages/Beneficios.jsx` |
| 6 | Quitado "Apilado seguro y predecible" | `pages/Beneficios.jsx` |
| 7 | Quitado "Comportamiento estable a la intemperie" | `pages/Beneficios.jsx` |
| 8 | Quitado "Control en trasvases y derrames" | `pages/Beneficios.jsx` |
| 9 | Nueva sección "¿Necesitás apilar?" (compartimentado) | `pages/Beneficios.jsx` |
| 10 | `Ver los 6 modelos` → `Ver los distintos modelos` | `pages/Inicio.jsx` |
| 11 | Quitado "acopio prolongado a la intemperie" | `pages/Inicio.jsx` |
| 12 | Título → `Busquemos el modelo adecuado para tus necesidades` | `pages/Productos.jsx` |
| 13 | Nuevo bloque "Productos especiales" (compartimentado + SlingBag) | `pages/Productos.jsx` |
| 14 | Hero: nueva foto propia `heroPalets.webp` | `pages/Inicio.css` + `index.html` (preload) |
| 15 | Agricultura: foto del camión cabina blanca | `public/images/agricultura.webp` |
| 16 | SlingBag: foto de eslingas cargando barco | `public/images/slingbag.webp` |

### Sobre las listas de beneficios

Las listas de sector tenían 6 ítems (grilla pareja). Al quitar los puntos pedidos, se repusieron con frases que el cliente **ya aprobó** en otras listas, para no romper la grilla ni inventar contenido:

- Agricultura: entró `"Menos bultos por tonelada movida"`.
- Minería: entraron `"Minimiza pérdidas por roturas o derrames"` (la frase que él elogió textualmente) y `"Costura reforzada y tejido de alto gramaje"` (ya usada en el sector minería de la home).
- Ventajas: entró `"Aprovechamiento del volumen del camión"` — conserva la idea de espacio sin mencionar apilado.

### Nota sobre el hero

La foto original es **cuadrada** y tiene el **logo impreso en el centro**, justo donde el sitio renderiza el título "Sostenemos Toneladas". Para evitar que se pisaran, se recortó la **franja superior** de la foto (hilera de bolsones con sus asas, fondo oscuro a la izquierda) y se publicó en formato panorámico 2.6:1. El logo de la marca sigue presente en el header del sitio.

### Pendiente

- **Imagen de minería** — sigue la actual (`mineria.webp`, la de la eslinga azul). El cliente la descartó pero no mandó reemplazo.
- **Specs de los productos especiales** — el bloque quedó publicado con la descripción de los audios; falta medidas, capacidades y demás datos técnicos.
- **`Cliente desde 2015`** en un testimonio de Sobre Nosotros: se dejó **sin tocar**. Es la antigüedad de ese cliente puntual, no la fundación de la empresa.

---

## 0. Definición general

El cliente comparó los dos sitios desplegados y **eligió este** (`frontend/`).

> "De las dos páginas que pasaste me gusta más la segunda. La primera a lo mejor está muy bien armada, todo para que coticen, pero es más vistosa la segunda. Y aparte, el cliente nunca cotiza, siempre te llama y te pide."

**Implicancia:** el foco no es que el usuario cotice solo, sino que **llame o escriba** → priorizar contacto directo (WhatsApp / teléfono) por sobre el flujo de autocotización.

---

## 1. Identidad de la empresa

### 1.1 Footer — razón social (CRÍTICO, legal)

**Archivos:** [PiePagina.jsx:62](frontend/src/components/PiePagina.jsx#L62) y [PiePagina.jsx:15](frontend/src/components/PiePagina.jsx#L15) (`itemProp="name"`, metadato estructurado)

Hoy dice: `© {year} Sibom Sacks SRL. Todos los derechos reservados.`

**"Sibom Sacks" es el nombre de fantasía; "Lindor Sacks" es la razón social.** Son excluyentes: o va la razón social con el tipo societario, o va solo la marca.

> "No es Sibom Sacks, es Lindor Sacks. Sibom Sacks es el nombre de fantasía, Lindor Sacks es la razón social. Si ponemos SRL tenemos que poner Lindor Sacks; si no, ponemos solamente Sibom Sacks y sacamos el SRL. Uno u otro."

**Corrección a aplicar:**

| Línea | Hoy | Debe decir |
|---|---|---|
| 62 | `© {year} Sibom Sacks SRL. Todos los derechos reservados.` | `© {year} Lindor Sacks S.R.L. Todos los derechos reservados.` |
| 15 | `content="Sibom Sacks SRL"` | `content="Lindor Sacks S.R.L."` |

> ✅ **Confirmado por el cliente:** la razón social es **Lindor Sacks S.R.L.** Aplicado.

> 📌 **Nota:** el nombre de fantasía **se mantiene** en el resto del sitio ([Encabezado.jsx:72](frontend/src/components/Encabezado.jsx#L72) "SIBOM SACKS", logo, títulos). El cambio es **solo** en el footer / razón social.

---

### 1.2 Sobre Nosotros — año de fundación (dato erróneo)

**Archivo:** [SobreNosotros.jsx:75](frontend/src/pages/SobreNosotros.jsx#L75)

| Hoy | Debe decir |
|---|---|
| `Líderes en Big Bags desde 2015` | `Líderes en Big Bags desde 2007` |

> "Sobre nosotros, líderes en Big Bag desde 2007, no es 2015, 2007 arrancamos. Después esa hoja está perfecta."

> ⚠️ **Revisar también** [SobreNosotros.jsx:343](frontend/src/pages/SobreNosotros.jsx#L343), que dice `Cliente desde 2015` en un testimonio. Ese 2015 puede ser correcto (la antigüedad de ese cliente puntual) o puede ser un arrastre del error. **Confirmar.**

El resto de la página Sobre Nosotros queda **como está** (aprobada explícitamente: *"después esa hoja está perfecta"*).

---

### 1.3 "¿Por qué elegir Sibom Sacks?" — agregar renglón sobre desarrollo a medida

**Archivo:** [SobreNosotros.jsx:177-182](frontend/src/pages/SobreNosotros.jsx#L177-L182)

Texto actual (aprobado):

> "Nos diferenciamos por nuestro compromiso con la calidad, la innovación y el servicio personalizado."

El cliente lo valida y pide **un renglón más** que explique en qué consiste ese servicio personalizado:

> "Ahí donde dice 'por qué elegir Sibom Sacks' está perfecto. Y yo les pondría otro renglón más abajo siguiendo esa política […] desarrollando o ayudando a desarrollar el Big Bag necesario para su empresa. El servicio personalizado es para desarrollar el Big Bag que él necesita. Por eso nosotros no hacemos nada estándar, hacemos específicamente lo que necesita tu empresa."

**Propuesta de copy (renglón nuevo, debajo del actual):**

> "Desarrollamos junto a tu empresa el Big Bag que tu operación necesita: no partimos de un producto estándar, partimos de tu proceso."

---

## 2. Correcciones de contenido por responsabilidad legal

> Hay un criterio de fondo que atraviesa estos cuatro puntos: **el cliente no quiere que el sitio induzca al usuario a usar mal el producto**, porque genera responsabilidad ante un accidente o un reclamo. Es un pedido de fondo, no de estilo.
>
> Su razonamiento textual: *"si vos le decís 'sí, se puede apilar' y después se le cae y provoca un accidente, va a decir 'vos me dijiste'."*

### 2.1 Quitar "Apilado estable y seguro en depósito" — Agricultura

**Archivo:** [Beneficios.jsx:19](frontend/src/pages/Beneficios.jsx#L19)

**Eliminar el ítem:** `"Apilado estable y seguro en depósito"`

> "En los beneficios, en agricultura, el último punto lo sacaríamos: 'el apilado estable y seguro en depósito' no se pone. El Big Bag no es recomendable apilarlo. Que lo apile todo el mundo es otra cuestión, pero nosotros no tenemos que inducir a eso."

### 2.2 Quitar "Apilado seguro y predecible" — Ventajas del Big Bag

**Archivo:** [Beneficios.jsx:63](frontend/src/pages/Beneficios.jsx#L63)

**Eliminar el ítem:** `"Apilado seguro y predecible"`

> "Volvemos a lo mismo: donde dice 'ventajas del Big Bag', en el último punto dice 'apilado seguro y predecible', ese yo lo sacaría."

### 2.3 Quitar "Comportamiento estable a la intemperie" — Minería

**Archivo:** [Beneficios.jsx:35](frontend/src/pages/Beneficios.jsx#L35)

**Eliminar el ítem:** `"Comportamiento estable a la intemperie"`

> "El Big Bag no puede estar a la intemperie, porque el sol deteriora todo, por más que tenga tratamiento anti-UV. […] En la minería, que está a mucha altura, el sol es más fuerte y hay mucho viento, es peor. Yo no les incitaría a que dejen el bolsón a la intemperie mucho tiempo. El bolsón no es para estar a la intemperie."

### 2.4 Quitar "Control en trasvases y derrames" — Minería

**Archivo:** [Beneficios.jsx:34](frontend/src/pages/Beneficios.jsx#L34)

**Eliminar el ítem:** `"Control en trasvases y derrames"`

> "En minería, donde dice 'control de trasvases y derrames', ese explicame mejor qué quisiste poner ahí, porque no me queda claro."
>
> "Yo sacaría esa frase, porque no es control. Me gusta más acá donde dice 'minimiza pérdidas por roturas o derrames', eso está perfecto."

**Acción:** eliminar el ítem. La idea ya está bien expresada en **"Minimiza pérdidas por roturas o derrames"** (lista de ventajas generales), que el cliente aprueba explícitamente.

---

### 2.5 ⚠️ Inconsistencias derivadas — el mismo criterio, en lugares que el cliente no mencionó

Estos tres puntos **no** fueron señalados en los audios, pero contradicen directamente el criterio de 2.1–2.4. Los marco porque dejarlos haría que el sitio se corrija en una página y siga prometiendo lo mismo en otra.

**a) Texto del sector Agricultura en la home** — [Inicio.jsx:23-24](frontend/src/pages/Inicio.jsx#L23-L24)

> Hoy: *"Granos, semillas y fertilizantes. Barrera contra humedad y protección UV para **acopio prolongado a la intemperie**."*

Es exactamente lo que el cliente pidió no prometer (2.3), agravado por "prolongado".
**Propuesta:** *"Granos, semillas y fertilizantes. Barrera contra humedad y protección UV en la rafia."*

**b) Texto alternativo de la imagen de Minería** — [Inicio.jsx:61](frontend/src/pages/Inicio.jsx#L61)

> Hoy: `alt: "Big Bags en acopio a la intemperie junto a una pila de material"`

Queda resuelto al cambiar la foto (punto 4.3), pero hay que actualizar el `alt` junto con la imagen.

**c) Imagen del hero de la home** — [Inicio.css:52](frontend/src/pages/Inicio.css#L52)

> Hoy: `background: url("/images/slide3Apiladas.webp")`

La imagen principal del sitio es, por su propio nombre, **Big Bags apilados**. Coincide con el cambio de hero que el cliente ya pidió (punto 4.1), así que se resuelve junto con ese.

---

## 3. Nueva sección: apilado y Big Bag compartimentado

**Ubicación sugerida:** junto al CTA existente **"¿Querés mejorar tu operación?"** — [Beneficios.jsx:146](frontend/src/pages/Beneficios.jsx#L146), que el cliente aprueba explícitamente.

> "Acá al final, donde dice '¿querés mejorar tu operación?' y ponés eso, me parece perfecto. Ahí yo pondría también una ventana, una sola solapa, donde diga '¿querés apilar?' […] Para apilar los Big Bags hay que usar Big Bags compartimentados. No se recomienda apilar los Big Bags comunes porque no tienen forma y se caen. El Big Bag compartimentado es el que se puede apilar, porque mantiene la forma."

**Por qué importa:** esta sección resuelve el problema que abren los puntos 2.1 y 2.2. En vez de simplemente borrar toda mención al apilado, **se canaliza la consulta hacia el producto que sí lo soporta** — que además es el diferencial comercial de la empresa.

**Propuesta de copy (borrador):**

> **¿Necesitás apilar?**
>
> El Big Bag común no está pensado para apilarse: sin carga que le dé forma, pierde estabilidad. Para eso fabricamos el **Big Bag compartimentado**, que mantiene la forma y permite el apilado. Consultanos por tu caso.

> 📌 **Pendiente:** el cliente pidió trabajar juntos la redacción exacta — *"después lo manejamos bien el dialecto que ponemos"*. Este texto es un borrador a validar, no definitivo.

---

## 4. Catálogo de productos

### 4.1 "6 modelos" → "distintos modelos" (transversal)

**Archivos:** [Inicio.jsx:162](frontend/src/pages/Inicio.jsx#L162), [Inicio.jsx:12](frontend/src/pages/Inicio.jsx#L12)

El sitio afirma que son **6 modelos**. El cliente corrige: **seis son los comunes**, pero hay más (el compartimentado, el SlingBag).

> "Por eso yo te corregí donde dicen 'ver los modelos': no puede poner 'ver los seis modelos', hay que poner 'ver los distintos modelos', porque no son seis, son más de seis. Seis son los comunes."

| Archivo:línea | Hoy | Debe decir |
|---|---|---|
| [Inicio.jsx:162](frontend/src/pages/Inicio.jsx#L162) | `Ver los 6 modelos →` | `Ver los distintos modelos →` |
| [Inicio.jsx:12](frontend/src/pages/Inicio.jsx#L12) | `{ valor: "6", detalle: "Modelos de serie" }` | revisar: la cifra 6 sigue siendo válida como "de serie", pero conviene aclarar que hay especiales además |

### 4.2 Productos — cambiar el título de la página

**Archivo:** [Productos.jsx:42](frontend/src/pages/Productos.jsx#L42)

Cambio de enfoque: **no** "conocé nuestros productos" (centrado en la empresa), **sí** "buscá el que te sirve a vos" (centrado en el cliente).

> "Arranca la página la solapa como 'conocé nuestros productos' […] yo le pondría 'buscamos el producto adecuado para tus necesidades'. Es decir, para que él mire y diga 'yo necesito este'. No importa que vos conozcas nuestro producto, vos tenés que buscar el que te interese a vos."

| Hoy | Debe decir |
|---|---|
| `Conocé nuestros productos` | `Busquemos el modelo adecuado para tus necesidades` |

### 4.3 Productos — agregar bloque de productos especiales

**Archivo:** [Productos.jsx](frontend/src/pages/Productos.jsx)

> "En la solapa de productos me parece perfecto, están los seis, y abajo vamos a tener que agregar 'productos especiales' o algo así."

Agregar, **debajo** de la grilla de los 6 modelos de serie, una sección **"Productos especiales"** con:

**a) Big Bag compartimentado** — el diferencial comercial más fuerte de la empresa:

> "Ese es nuestro caballo de batalla, eso sabemos hacer nosotros. Ahí tenemos que trabajar con vos, a ver cómo lo plasmamos en la página y decir 'che loco, yo sé hacer Big Bag compartimentado, no todos lo saben hacer y nosotros sí'."

**b) SlingBag (eslingas de izaje)** — producto distinto del bolsón:

> "Una eslinga para levantar en el muelle, que se llaman SlingBag, que no son bolsones, son como esas eslingas para remolcar autos, pero largas. Es para levantar bolsas de 100 kilos que se van trabando entre ellas con la eslinga abajo. En los muelles se usa mucho."

> 📌 **Pendiente del cliente:** va a mandar **foto del SlingBag**. Falta también definir texto y specs de ambos productos.

---

## 5. Imágenes

### 5.1 Home — cambiar la imagen del hero

**Archivo:** [Inicio.css:52](frontend/src/pages/Inicio.css#L52) — `background: url("/images/slide3Apiladas.webp")`

> "Esa hoja de inicio le vamos a poner una foto que yo te mandé: están los Big Bags altos, parados sobre una tarima, azules, que dice 'asegurá tus productos' con el logo de Sibom Sacks en el medio. Esa hoja me gusta, que arranque así, porque la otra foto no es nuestra."

**Motivo doble:** la imagen actual **no es propia** (posible problema de derechos) y la nueva es de producto real con branding. **Motivo adicional:** la actual muestra bolsones apilados, en contra del criterio del punto 2.

> ⚙️ **Nota técnica:** el hero **no** es un `<img>`, es un `background` en CSS. El reemplazo se hace en [Inicio.css:52](frontend/src/pages/Inicio.css#L52), no en el JSX. Como la foto nueva tiene texto y logo incorporados, hay que verificar que el título superpuesto ("Sostenemos Toneladas") no tape el texto de la imagen — puede requerir ajustar el velo/opacidad o reubicar el texto.

> 📌 **Pendiente:** el cliente dijo *"ya te la voy a reenviar"*. Verificar si está en `imagenes originales/`.

### 5.2 Agricultura — cambiar la foto

**Archivo:** [Inicio.jsx:25](frontend/src/pages/Inicio.jsx#L25) (`/images/agricultura.webp`, `w: 800`, `h: 600`)

> "En agricultura me gusta más la foto que yo te pasé del camión, que se ve el camión con la cabina blanca que está más cerca y se ven los Big Bags arriba del camión. Esa me gusta más que la otra que está en medio del pasto."

**Acción:** reemplazar por la foto del camión con cabina blanca. Actualizar `w`/`h` y el `alt` de [Inicio.jsx:28](frontend/src/pages/Inicio.jsx#L28) (hoy: *"Big Bag izado con grúa sobre un cultivo"*).

### 5.3 Minería — buscar otra foto

**Archivo:** [Inicio.jsx:59](frontend/src/pages/Inicio.jsx#L59) (`/images/mineria.webp`, `w: 700`, `h: 434`)

> "Vamos a buscar una foto para la minería. Esa foto de la minería no, porque tiene esa eslinga azul que nosotros no usamos."

**Acción:** descartar la imagen actual. **No hay reemplazo definido todavía** → pendiente de que el cliente provea o de que aprobemos una alternativa. Actualizar también el `alt` ([Inicio.jsx:61](frontend/src/pages/Inicio.jsx#L61)), que hoy menciona "acopio a la intemperie".

---

## 6. Fuera del alcance de la landing

**Accesos ARCA (ex-AFIP)**

> "Por lo otro tampoco te hagas problema: yo tengo la clave, o sea, de todo lo que es AFIP, bueno, el ARCA ahora. Tengo la clave y código de ingreso, así que eso lo vemos también."

No es un cambio del sitio. Queda anotado como tema aparte a coordinar (probablemente facturación / certificados digitales).

> 🔒 **Nota:** no compartir credenciales por WhatsApp ni dejarlas en el repo.

---

## 7. Resumen accionable

### Se puede aplicar ya (sin depender de nadie)

| # | Cambio | Archivo:línea |
|---|---|---|
| 1 | `2015` → `2007` | [SobreNosotros.jsx:75](frontend/src/pages/SobreNosotros.jsx#L75) |
| 2 | Quitar "Apilado estable y seguro en depósito" | [Beneficios.jsx:19](frontend/src/pages/Beneficios.jsx#L19) |
| 3 | Quitar "Apilado seguro y predecible" | [Beneficios.jsx:63](frontend/src/pages/Beneficios.jsx#L63) |
| 4 | Quitar "Comportamiento estable a la intemperie" | [Beneficios.jsx:35](frontend/src/pages/Beneficios.jsx#L35) |
| 5 | Quitar "Control en trasvases y derrames" | [Beneficios.jsx:34](frontend/src/pages/Beneficios.jsx#L34) |
| 6 | `Ver los 6 modelos` → `Ver los distintos modelos` | [Inicio.jsx:162](frontend/src/pages/Inicio.jsx#L162) |
| 7 | Título → `Busquemos el modelo adecuado…` | [Productos.jsx:42](frontend/src/pages/Productos.jsx#L42) |
| 8 | Renglón de desarrollo a medida | [SobreNosotros.jsx:182](frontend/src/pages/SobreNosotros.jsx#L182) |
| 9 | Sacar "acopio prolongado a la intemperie" | [Inicio.jsx:23](frontend/src/pages/Inicio.jsx#L23) |

### Requiere confirmación del cliente

| # | Tema | Qué preguntar |
|---|---|---|
| 10 | Footer razón social | Ya sabemos que es **Lindor Sacks**. Falta: ¿**S.R.L.** o **S.A.C.S.**? |
| 11 | "Cliente desde 2015" en testimonio | ¿Es correcto o es arrastre del error de fundación? |
| 12 | Copy sección apilado / compartimentado | Validar redacción del borrador |

### Requiere material del cliente

| # | Tema | Qué falta |
|---|---|---|
| 13 | Imagen hero home | Foto de Big Bags azules sobre tarima con logo |
| 14 | Imagen agricultura | Foto del camión cabina blanca |
| 15 | Imagen minería | Reemplazo sin eslinga azul |
| 16 | Foto SlingBag | La va a mandar |
| 17 | Productos especiales | Texto y specs de compartimentado + SlingBag |

---

# Anexo — transcripciones textuales

*Transcripción automática con Whisper. Puede tener errores en nombres propios: "Cibonsax" / "Siobhan Sachs" = Sibom Sacks; "BigBug" / "Big Bang" = Big Bag; "linga" = eslinga. Se normalizaron esos nombres para que se lea; el resto es textual.*

### `WhatsApp Audio 2026-08-25 at 8.43.36 AM.ogg` (2:11) — mensaje general

> Hola Martín, buenas noches, ¿cómo estás? Bueno, Martín, mañana sí, en algún momento nos vamos a conectar. Yo hoy escuché tu mensaje, pero como no había visto la página ni la había corregido, un poco por vergüenza no te dije para conectarnos, porque no sabía qué decirte. Ahora sí, estuve toda la tarde mirando. Acá yo te voy a bombardear con un montón de mensajes, porque digo, ¿cómo escribimos? O sea, yo no sé, viste que ustedes en la juventud hoy se maneja de otra forma. Nosotros escribíamos todo, ¿viste? Agarré una hoja para escribir y después digo, ¿y cómo le transmito después esto? Entonces empecé a grabar audios. Te voy a dar un montón de audios, andá escuchando y fijate qué es lo que vamos viendo.
>
> De las dos páginas que pasaste me gusta más la segunda. La primera a lo mejor está muy bien armada, todo para que coticen el resto, pero digamos, es más vistosa la segunda. Y aparte, el cliente nunca cotiza, así que siempre te llama y te pide. O sea que me gustó más la segunda.
>
> Lo que sí, la hoja de inicio yo te la voy a cambiar. Esa hoja de inicio le vamos a poner una foto que yo te mandé, que ya te la voy a reenviar, está acá arriba, que están los Big Bags altos parados sobre una tarima, azules, que dice "asegurá tus productos" con el logo de Sibom Sacks en el medio. Esa hoja me gusta, que arranque así, porque la otra, la foto no es nuestra. Así que yo arrancaría con esa página de inicio y después las demás están todas bien. Viste que te voy corrigiendo las palabras, las frases, todo. Y sí, vamos a buscar una foto para la minería. Esa foto de la minería no, porque tiene esa eslinga azul que nosotros no usamos. Pero bueno, te tiro toda esa información para que vayas leyendo, así mañana o cuando vos hayas podido escuchar esos audios y después nos hablamos. Dale, abrazo grande.

### `3232.ogg` (0:58) — por qué elegir Sibom Sacks

> Ahí donde dice "por qué elegir Sibom Sacks" está perfecto: "nos diferenciamos por nuestro compromiso con la calidad, la innovación y el servicio personalizado". Y yo les pondría otro renglón más abajo siguiendo esa política, es decir, "nos diferenciamos por nuestro compromiso con la calidad, la innovación y el servicio personalizado desarrollando o ayudando a desarrollar el Big Bag necesario para su empresa", algo así. O sea, que el servicio personalizado es para desarrollar el Big Bag que él necesita. Por eso nosotros no hacemos nada estándar, hacemos específicamente lo que necesita tu empresa. A ver si ponemos otro renglón con esa idea.

### `54554.ogg` (1:00) — solapa productos y título de modelos

> En la solapa de productos me parece perfecto, están los seis, y abajo vamos a tener que agregar "productos especiales" o algo así, para poner el especial. Lo que sí, arranca la página la solapa como "conocé nuestros productos", más que yo le cambiaría el título, y en vez de poner "conocé nuestro producto" yo le pondría "buscamos el producto adecuado para tus necesidades". Es decir, para que él mire y diga "yo necesito este". No importa que vos conozcas nuestro producto, vos tenés que buscar el que te interese a vos. Entonces yo le cambiaría el título, es decir, "busquemos el modelo adecuado a tus necesidades", una cosa así, para que mire los modelos y elija cualquiera.

### `76767.ogg` (0:12) — año de fundación

> En la segunda solapa aparece "sobre nosotros, líderes en Big Bag desde 2015", no es 2015, 2007 arrancamos. Después esa hoja está perfecta.

### `7879.ogg` (0:23) — footer / razón social

> Al final de la página dice "2026 Sibom Sacks SRL, todos los derechos reservados". No es Sibom Sacks, es Lindor Sacks. O sea, Sibom Sacks es el nombre de fantasía, Lindor Sacks es la razón social. Si ponemos SRL tenemos que poner Lindor Sacks; si no, ponemos solamente Sibom Sacks y sacamos el SRL. Uno u otro.

### `54545.ogg` (0:17) — foto agricultura

> En agricultura me gusta más la foto que yo te pasé del camión, que se ve el camión con la cabina blanca que está más cerca y se ven los Big Bags arriba del camión. Esa me gusta más que la otra que está en medio del pasto.

### `WhatsApp Audio 2026-08-25 at 8.43.49 AM.ogg` (0:07) — foto de inicio

> Esta foto sería el inicio, con esta arrancaría la página.

### `WhatsApp Audio 2026-08-25 at 8.43.49 AM88.ogg` (0:38) — apilado en agricultura

> En los beneficios, en agricultura, el último punto lo sacaríamos: "el apilado estable y seguro en depósito" no se pone. El Big Bag no es recomendable apilarlo. Que lo apile todo el mundo es otra cuestión, pero nosotros no tenemos que inducir a eso. El Big Bag no tiene mucha estabilidad, y si vos le decís "no, sí se puede apilar" y después se le cae y provoca un accidente, va a decir "vos me dijiste". Por eso el último punto, el de "apilado estable y seguro en depósito", ese punto no estaría. Yo lo sacaría.

### `hg.ogg` (0:54) — minería: trasvases e intemperie

> En minería, donde dice "control de trasvases y derrames", ese explicame mejor qué quisiste poner ahí, porque eso no me queda claro. Y el de abajo, "comportamiento estable a la intemperie", yo sacaría. El Big Bag no puede estar a la intemperie, porque el sol deteriora todo, por más que tenga tratamiento anti-UV. Un bolsón más de dos o tres meses a la intemperie… pero todo en la minería, que está a mucha altura, el sol es más fuerte y hay mucho viento, es peor. Entonces yo no… volvimos a lo mismo del otro. Yo no les incitaría a ellos a que dejen el bolsón a la intemperie mucho tiempo, porque yo le digo que es bueno. No, no. Si vos lo querés dejar a la intemperie, dejalo, yo no te lo voy a poner, que tiene un comportamiento estable a la intemperie. El bolsón no es para estar a la intemperie.

### `hgnv.ogg` (0:17) — minería: control de derrames

> Hay un beneficio de minería donde decía "control de derrames", yo sacaría esa frase, porque no es control. Me gusta más acá donde dice "porque minimiza pérdidas por roturas o derrames", eso está perfecto.

### `jgjghjhj.ogg` (0:09) — ventajas del Big Bag

> Volvemos a lo mismo: donde dice "ventajas del Big Bag", en el último punto dice "apilado seguro y predecible", ese yo lo sacaría.

### `kjkjkjkj}.ogg` (1:49) — apilado, compartimentado y SlingBag

> Acá al final, donde dice "¿querés mejorar tu operación?" y ponés eso, me parece perfecto. Ahí yo pondría también una ventana, una sola solapa, donde diga "¿querés apilar?", hablando de la apilable, ¿no? Yo pondría "¿querés apilar Big Bags?". A ver, yo te tiro la idea, después lo manejamos bien el dialecto que ponemos, pero para apilar los Big Bags hay que usar Big Bags compartimentados. No se recomienda apilar los Big Bags comunes porque no tienen forma y se caen. El Big Bag compartimentado es el que se puede apilar, porque mantiene la forma.
>
> Entonces ese lo tenemos que poner como… tenemos que buscar la forma de que no son seis los modelos. Por eso yo te corregí donde dicen "ver los modelos": no puede poner "ver los seis modelos", hay que poner "ver los distintos modelos", porque no son seis, son más de seis. Seis son los comunes, pero después tenemos el bolsón especial, que es el compartimentado, que en eso tenemos que hacer hincapié nosotros, porque ese es nuestro caballo de batalla. Eso sabemos hacer nosotros. Entonces ahí tenemos que trabajar con vos, a ver cómo lo plasmamos eso en la página y decir "che loco, yo sé hacer Big Bag compartimentado, no todos lo saben hacer y nosotros sí". Entonces eso lo tenemos que poner.
>
> Y también una eslinga para levantar en el muelle, que se llaman SlingBag, que no son bolsones, sino que son como si fueran esas eslingas para remolcar los autos, pero largas y de forma. Entonces es para levantar bolsas de 100 kilos, que se van trabando entre ellas con la eslinga abajo. En los muelles se usa mucho eso para levantar. Ya te voy a pasar la foto de eso.

### `WhatsApp Audio 2026-08-25 at 8.43.37 AM.ogg` (0:13) — ARCA (fuera de alcance)

> Y por lo otro tampoco te hagas problema, pues yo tengo la clave, o sea, de todo lo que es AFIP —bueno, el ARCA ahora—. Yo tengo la clave y código de ingreso, así que eso lo vemos también.
