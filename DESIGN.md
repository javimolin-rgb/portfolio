# DESIGN.md — Javi Molin, portfolio

Memoria de dirección de arte. Antes de agregar una página, un proyecto o un componente, lee esto. Si una decisión nueva contradice este documento, actualiza el documento en el mismo cambio y explica por qué.

> **Cambio de dirección (septiembre–octubre 2026).** La primera versión, "Temporadas", usaba una grotesca de ancho extremo y pintaba cada página con el color de su campaña. Javi la encontró grotesca y desordenada. Esta versión, **Galería blanca**, deja que el color viva solo en las piezas.

---

## 1. Concepto: Galería blanca

**El trabajo es lo único que tiene color.** El sitio es una sala blanca con placas neutras: cada pieza se cuelga sobre su placa, completa, y el resto (texto, navegación, rótulos) se retira a un segundo plano.

- Una serif fina para los títulos y una sans neutra para todo lo demás, sin estiramientos.
- Una sola grilla, alineada a la izquierda, con mucho aire.
- Un solo momento con movimiento: el **marco de formatos** de la portada, donde una pieza real cambia de proporción (pendón, story, post, gift card, lienzo, sticker). Es la idea de Javi en una imagen: la misma campaña resiste el cambio de escala.

## 2. Personalidad

Precisa, tranquila, segura. Se nota el oficio (medidas reales, originales, formatos) sin decorarlo. Nunca corporativa, nunca estridente.

## 3. Principios

1. **El trabajo manda.** Piezas grandes, completas, sin sombras ni esquinas redondeadas.
2. **Color solo en las piezas.** Fondo, texto y placas son neutros. La paleta de un proyecto aparece como contenido (bloque `swatches`), nunca como fondo de página.
3. **Orden visible.** Mismo margen, misma grilla, mismos espacios entre secciones en todas las páginas.
4. **Menos cosas, mejor puestas.** Si un rótulo, una línea o un número no ayuda a entender, se quita.
5. **Movimiento con causa.** Solo el marco de formatos se mueve solo, y se puede pausar.
6. **Verdad.** No se inventan clientes, métricas, roles ni resultados. Lo que es propuesta se rotula como propuesta; lo que es de otro, se acredita.

## 4. Tipografía

| Rol | Familia | Uso |
|---|---|---|
| Títulos | **Instrument Serif** 400 (OFL) | Nombre, títulos de caso y sección, nombres de proyecto, correo |
| Texto | **Mona Sans** 400/500, ancho normal (OFL) | Párrafos, rótulos, navegación, botones |

| Token | Tamaño |
|---|---|
| `--t-hero` | 3 → 6,5 rem (solo el nombre en la portada) |
| `--t-display` | 2,75 → 5,5 rem (título de caso, Sobre mí) |
| `--t-h2` | 1,875 → 2,875 rem |
| `--t-lead` | 1,0625 → 1,25 rem |
| `--t-body` | 1 rem |
| `--t-small` | 0,8125 rem |

- La serif nunca va en cursiva ni en negrita; la jerarquía la da el tamaño.
- **Prohibido:** mayúsculas espaciadas, monoespaciada, cadenas "A · B · C", flechas "→", una palabra del título en otro color o cursiva.

## Acciones (lo que el visitante puede hacer)

Cada pantalla deja claro el siguiente paso con botones, no con enlaces escondidos:

| Dónde | Acciones |
|---|---|
| Barra | Proyectos, Sobre mí y el botón **Contacto** |
| Portada | **Ver proyectos** (principal) y **Descargar CV** |
| Índice | Toda la tarjeta abre el proyecto |
| Final de cada caso | Anterior, **Todos los proyectos**, Siguiente |
| Pie (todas las páginas) | **Escribir un correo** (principal), **Descargar CV**, LinkedIn |

Botón principal: fondo tinta, texto blanco. Secundario: borde gris, texto tinta. Radio 6 px, alto 46 px.

## 5. Color

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#FFFFFF` | Fondo |
| `--plate` | `#F3F3F1` | Placa detrás de portadas, pasos de proceso y pieza principal del caso |
| `--ink` | `#1C1C1A` | Texto y líneas principales |
| `--ink-2` | `#72726C` | Texto secundario, navegación inactiva |
| `--rule` | `#E4E4E0` | Filetes y subrayados en reposo |

Los campos `field`, `ink` y `alt` de cada proyecto y el `surface` de cada bloque quedan en los datos, pero esta dirección no los usa: todas las superficies se resuelven a blanco (ver `.s-*` en `global.css`).

## 6. Imágenes

- **Piezas completas**, siempre en su proporción (`object-fit: contain` o caja con la proporción exacta). Nunca se recortan piezas gráficas.
- **Fotos** (montaje, tienda, estudio) sí se recortan, con punto focal definido en los datos.
- Sin sombras, sin bordes, sin esquinas redondeadas. Las piezas completas llevan un filete interior casi invisible (1 px, tinta al 7 %) para que las claras no se pierdan en el blanco.
- Formatos: AVIF + WebP con `srcset`, anchos 480–2400 px. Lazy loading salvo la primera imagen visible. `width` y `height` siempre declarados.
- **Exclusiones permanentes:** niños o menores reconocibles (incluidos modelos de campaña y deportistas menores de 18), documentos personales, KV de agencias como trabajo propio, stickers con caras reales.
- Créditos visibles en el caso: fotos de montaje MacroMKT; fotos de modelos y deportistas, material de campaña; concepto gráfico Toys"R"Us, agencia ODN.

## 7. Composición y grilla

- Márgenes `clamp(1.25rem, 4vw, 4rem)`; medianil `clamp(1rem, 2vw, 2rem)`.
- Dos proporciones de columnas, siempre las mismas: 7/5 (texto + dato, frase + marco) y 1/1 (índice).
- Todo alineado a la izquierda. Las secciones se separan con espacio (`--section`) y, cuando cambia el tema, con un filete `--rule` sobre el título.
- Índice: dos columnas de placas 4:3. Las piezas gráficas se ven completas con aire alrededor; las fotos de montaje llenan la placa.

## 8. Biblioteca de bloques para casos

| Bloque | Cuándo |
|---|---|
| `bleed` | Foto de montaje o pieza protagonista a todo el ancho de la columna |
| `scale` | Varias piezas del proyecto alineadas en una base común, a escala real, con medida |
| `sequence` | Proceso real con orden (planta → 3D → montaje). Solo aquí se numeran pasos |
| `anatomy` | Una pieza anotada por zonas (sistema de una invitación) |
| `row` | Familia de piezas a la misma altura; en móvil, carrusel horizontal con scroll nativo |
| `pair` | Dos piezas en diálogo (general / clientas; frente / volumen) |
| `swatches` | Paleta del proyecto a todo el ancho |
| `statement` | Una frase del proyecto en el cuerpo de la portada |
| `notes` | Contexto y decisiones, texto a dos columnas |
| `video` | Loop sin sonido, con control de pausa |

## 9. Navegación

- Barra fija arriba, blanca translúcida: "Javi Molin" a la izquierda; Proyectos y Sobre mí en gris y el botón Contacto a la derecha.
- Portada: nombre, rol y acciones + marco de formatos → proyectos → presentación breve → contacto.
- Cada caso empieza con un enlace a Todos los proyectos y termina con Anterior / Todos los proyectos / Siguiente.
- Sin menú hamburguesa: en móvil caben los tres enlaces.

## 10. Botones y enlaces

- Enlaces subrayados con filete `--rule` que pasa a tinta al pasar el mouse.
- Controles del marco de formatos: una barra de seis segmentos (el activo en tinta) y un botón Pausar; `aria-pressed`.
- Las acciones son botones (ver la tabla de Acciones); el resto son enlaces de texto.

## 11. Motion

| Momento | Qué | Duración |
|---|---|---|
| Marco de formatos | La caja cambia de proporción y la pieza cambia por fundido | 700 ms `ease-in-out`; avanza cada 3,2 s; pausa al pasar el mouse, al enfocar y con botón |
| Índice | La portada crece 2 % al pasar el mouse | 600 ms `ease-out` |
| Cambio de página | View Transitions nativas: el nombre del proyecto pasa del índice al título del caso | 450 ms |

- Nada de aparición "fade-up" por sección.
- `prefers-reduced-motion`: el marco no avanza solo y las transiciones se desactivan.

## 12. Responsive

- **≥ 900 px:** frase y marco lado a lado; índice en dos columnas; casos con texto 7/5.
- **< 900 px:** frase arriba, marco cuadrado debajo; todo en una columna salvo grillas de piezas.
- **< 700 px:** índice en una columna; `row` y `scale` pasan a carrusel con scroll nativo; objetivos táctiles ≥ 44 px.

## 13. Accesibilidad

- HTML semántico: `header`, `nav`, `main`, `article`, `figure/figcaption`, un `h1` por página.
- Contraste AA: tinta 16:1 y texto secundario 5,3:1 sobre blanco.
- Foco visible: contorno de 2 px en la tinta, desplazado 3 px.
- Alt descriptivo en cada pieza (qué es y para qué formato).
- Todo lo que se mueve solo puede pausarse; los videos no tienen sonido y tienen control.
- Enlace "Saltar al contenido".

## 14. Rendimiento y SEO

- Astro estático, JS solo en el marco de formatos y los videos (sin librerías).
- Dos familias, subconjunto latino, `font-display: swap`, precarga.
- Imágenes AVIF/WebP responsivas; la primera pantalla sin lazy.
- `title`, `description`, Open Graph y Twitter por página; `sitemap.xml`, `robots.txt`, favicon SVG, JSON-LD `Person`.

## 15. Evitar

Fondos de color por proyecto, tipografías estiradas, varias familias, tarjetas con sombra, gradientes, esquinas redondeadas, fondo crema, monoespaciada, mayúsculas espaciadas, numeración fuera de procesos reales, fade-up por sección, parallax, cursor personalizado, métricas inventadas.

## 16. Tecnología

- **Astro 5**, CSS propio con custom properties (sin framework CSS), TypeScript para los datos.
- Datos de proyectos en `src/data/projects.ts`; imágenes fuente en `src/assets/work/<proyecto>/`; videos en `public/video/`.
- View Transitions entre documentos (`@view-transition { navigation: auto }`), sin router de cliente.
- Despliegue en GitHub Pages con la Action oficial de Astro.
