# DESIGN.md — Javi Molin, portfolio

Memoria de dirección de arte. Antes de agregar una página, un proyecto o un componente, lee esto. Si una decisión nueva contradice este documento, actualiza el documento en el mismo cambio y explica por qué.

---

## 1. Concepto: Temporadas

**Una idea, todos los formatos.** Javi diseña sistemas que sobreviven al cambio de escala: la misma campaña vive en un lienzo de 5 × 1 m, un pendón de 2 m, un story y un sticker de 12 cm. El sitio convierte eso en su mecánica:

- **La tipografía se ajusta al formato.** El nombre y los títulos usan una grotesca con eje de ancho extremo. Un proyecto cuyo formato emblemático es vertical tiene título angosto; uno de gran formato horizontal, título ancho.
- **Cada proyecto es una temporada.** Llega con el color de su campaña, que ocupa la página entera. La base del sitio es neutra: el color es del proyecto, la voz es de Javi.

**Tesis que rechaza:** hero con rol + grilla de tarjetas + "About / Skills / Contact".

## 2. Personalidad

Segura, enérgica, editada. Tiene oficio de campaña (medidas reales, originales, formatos) y criterio de dirección de arte (color, escala, fotografía). Nunca corporativa, nunca juguetona sin motivo.

**Test antes de publicar:** ¿alguien que sale después de la primera pantalla podría describirla una hora después? Tiene que recordar "el nombre que se estiraba con la pieza" y "los colores de cada campaña", no "un portfolio limpio".

## 3. Principios

1. **El trabajo manda.** Las piezas se ven completas, grandes y sin marcos. Nada de tarjetas, sombras ni bordes redondeados alrededor del trabajo.
2. **Color a escala de página.** Un proyecto pinta toda la superficie o no pinta nada. Nunca acentos sueltos.
3. **La escala informa.** Cuando la medida real importa, se muestra en proporción verdadera y rotulada.
4. **Cada caso elige su composición.** Hay una biblioteca de bloques; ningún caso usa la misma secuencia que otro.
5. **Movimiento con causa.** Se mueve lo que responde a una acción o explica el concepto. Todo tiene pausa o se detiene solo.
6. **Verdad.** No se inventan clientes, métricas, roles ni resultados. Lo que es propuesta se rotula como propuesta; lo que es de otro, se acredita.

## 4. Tipografía

| Rol | Familia | Uso |
|---|---|---|
| Display | **Anybody** (variable, `wdth` 50–150, `wght` 100–900), OFL | Nombre, títulos de proyecto, índice, cifras de escala |
| Texto | **Mona Sans** (variable, `wdth` 75–125, `wght` 200–900), OFL | Párrafos, rótulos, navegación, botones |

Ambas se sirven desde el propio sitio (`@fontsource-variable`), solo el subconjunto latino.

### Ancho según formato
`--stretch` = `clamp(50%, 100% + 60 × log2(ancho/alto), 150%)`

| Formato | Proporción | Ancho |
|---|---|---|
| Pendón 100 × 200 cm | 0,5 | 50 % |
| Story 9:16 | 0,56 | 50 % |
| Post 1:1 · sticker | 1 | 100 % |
| Gift card 3:2 | 1,5 | 135 % |
| Lienzo 500 × 100 cm | 5 | 150 % |

Cada proyecto declara su formato emblemático en los datos; el título del proyecto usa ese ancho en el índice y en el caso.

### Escala (fluida, `clamp`)
| Token | Tamaño | Familia / peso | Interlínea |
|---|---|---|---|
| `--t-name` | 14vw → máx. 15rem | Anybody 800 | 0,86 |
| `--t-display` | 3,25rem → 10rem | Anybody 800 | 0,88 |
| `--t-index` | 2,25rem → 6rem | Anybody 750 | 0,92 |
| `--t-h3` | 1,5rem → 2,25rem | Anybody 700, ancho 100 % | 1,05 |
| `--t-lead` | 1,25rem → 1,625rem | Mona Sans 450 | 1,4 |
| `--t-body` | 1,0625rem | Mona Sans 400 | 1,55 |
| `--t-small` | 0,875rem | Mona Sans 500 | 1,4 |

- Medida de lectura: 60–68 caracteres.
- Tracking: display `-0.02em`; texto `0`; nunca mayúsculas con tracking amplio.
- **Prohibido:** rótulos en mayúsculas espaciadas sobre los títulos, monoespaciada decorativa, cadenas "A · B · C", flechas "→" pegadas a los links, una palabra del título en otro color o en cursiva.

## 5. Color

Base neutra, ni crema ni negro teñido:

| Token | Valor | Uso |
|---|---|---|
| `--ground` | `#EAEAE6` | Fondo del sitio |
| `--ink` | `#101010` | Texto y líneas principales |
| `--ink-2` | `#56564F` | Texto secundario (6,1:1 sobre `--ground`) |
| `--rule` | `rgb(16 16 16 / .16)` | Separadores |

Cada proyecto aporta un par **campo / tinta**, tomado de su propia campaña:

| Proyecto | Campo | Tinta |
|---|---|---|
| Día del Niño | `#FFCD00` | `#101010` |
| Campeones Sin Límites | `#E4007C` | `#FFFFFF` |
| Toys"R"Us | `#E2231A` | `#FFFFFF` |
| Moda (New Romantic) | `#D9CDBB` | `#101010` |
| Ventas Privadas | `#141414` | `#FFFFFF` (acento `#EC008C`) |
| Motion y señalética | `#5B21B6` | `#FFFFFF` |
| Ripley Beauty | `#F4C9D6` | `#2B1B22` |
| Fiestas Patrias | `#1E3A8A` | `#FFFFFF` |
| Activaciones | `#FF5F1F` | `#101010` |

Reglas:
- Estrategia **Drenched por proyecto**: el campo cubre la página del caso y, en el índice, toda la portada mientras el proyecto está activo.
- El texto sobre campo usa siempre la tinta del par (verificada ≥ 4,5:1). El texto secundario sobre campo usa la misma tinta, diferenciado por tamaño y peso; nunca un gris ni opacidad (en fucsia y rojo la opacidad bajaría del mínimo AA).
- Una pieza roja no va sobre campo rojo: si la pieza se confunde con el campo, el bloque cambia a `--ground` o a un tono del mismo proyecto.
- Selección de texto, foco y caret usan la tinta vigente.

## 6. Imágenes

- **Piezas completas**, siempre en su proporción (`object-fit: contain` o caja con la proporción exacta). Nunca se recortan piezas gráficas.
- **Fotos** (montaje, tienda, estudio) sí se recortan, con punto focal definido en los datos.
- Sin sombras, sin bordes, sin esquinas redondeadas. Si una pieza clara se pierde sobre el fondo, se separa con un filete de 1 px `--rule`, no con sombra.
- Formatos: AVIF + WebP con `srcset`, anchos 480–2400 px. Lazy loading salvo la primera imagen visible. `width` y `height` siempre declarados.
- **Exclusiones permanentes:** niños o menores reconocibles (incluidos modelos de campaña y deportistas menores de 18), documentos personales, KV de agencias como trabajo propio, stickers con caras reales.
- Créditos visibles en el caso: fotos de montaje MacroMKT; fotos de modelos y deportistas, material de campaña; concepto gráfico Toys"R"Us, agencia ODN.

## 7. Composición y grilla

- Grilla de 12 columnas; márgenes `clamp(1rem, 4vw, 3.5rem)`; medianil `clamp(1rem, 2vw, 1.5rem)`.
- Alineación a la izquierda. El centrado solo en la pieza aislada del marco de formatos.
- Ritmo: bloque denso → bloque de aire → imagen a sangre. Más espacio sobre un título que debajo.
- Espaciado base 8 px: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192`.
- Secciones separadas por espacio y cambio de campo, no por líneas ni cajas.

## 8. Biblioteca de bloques para casos

| Bloque | Cuándo |
|---|---|
| `bleed` | Foto de montaje o pieza protagonista a sangre |
| `scale` | Varias piezas del proyecto alineadas en una base común, a escala real, con medida |
| `sequence` | Proceso real con orden (planta → 3D → montaje). Solo aquí se numeran pasos |
| `anatomy` | Una pieza anotada por zonas (sistema de una invitación) |
| `row` | Familia de piezas a la misma altura; en móvil, carrusel horizontal con scroll nativo |
| `pair` | Dos piezas en diálogo (general / clientas; frente / volumen) |
| `swatches` | Paleta del proyecto a todo el ancho |
| `statement` | Una frase del proyecto en display, sobre el campo |
| `notes` | Contexto y decisiones, texto a dos columnas |
| `video` | Loop sin sonido, con control de pausa |

## 9. Navegación

- Barra mínima fija arriba: "Javi Molin" (inicio) a la izquierda; Trabajo, Sobre mí y Contacto a la derecha. Hereda la tinta del campo vigente.
- Portada: marco de formatos → índice de proyectos → a escala → presentación breve → contacto.
- Los títulos con ancho extremo llevan `data-fit`: si una línea no cabe en su columna, un script de 1 KB los achica lo justo (nunca los corta ni los parte).
- Cada caso termina con el siguiente proyecto, mostrado como el inicio de su propia temporada (campo + título).
- Sin menú hamburguesa: en móvil caben los tres enlaces con texto.

## 10. Botones y enlaces

- Enlaces de texto subrayados (`text-underline-offset: .2em`, grosor 1 px; 2 px al pasar el mouse).
- Controles del marco de formatos: texto plano con indicador de estado (subrayado grueso), `aria-pressed`.
- Sin botones "pill" ni botones gigantes. El único CTA grande es el correo en el cierre, en Anybody.

## 11. Motion

Curvas (no se inventan otras):
`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` · `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`

| Momento | Qué | Duración |
|---|---|---|
| Marco de formatos (el momento firma) | La caja cambia de proporción y el nombre cambia de ancho y de cuerpo a la vez: condensado y alto para formatos verticales, extendido y bajo para los horizontales; con el lienzo (5:1) el nombre ocupa todo el ancho de la página | 700 ms `ease-in-out`; avanza cada 3,2 s; pausa al pasar el mouse, al enfocar y con botón |
| Índice → campo de color | La página toma el color del proyecto | 360 ms `ease` |
| Tira del índice | Las tres miniaturas de cada proyecto suben 4 px en cascada al pasar el mouse | 240 ms `ease-out` |
| Cambio de página | View Transitions nativas: el título del índice se convierte en el título del caso | 450 ms |
| Hover de enlaces | Grosor del subrayado | 160 ms |

- Nada de aparición "fade-up" en cada sección. El contenido está visible por defecto.
- `prefers-reduced-motion`: el marco no avanza solo, los cambios son instantáneos y las transiciones de página se desactivan.

## 12. Responsive

- **≥ 1100 px:** nombre y marco lado a lado; índice con título (8 col.) y cliente + tira de tres miniaturas (4 col.); casos a 12 columnas.
- **600–1099 px:** nombre arriba a todo el ancho, marco debajo; índice en una columna con la tira debajo del título.
- **< 768 px:** nombre a todo el ancho con salto de línea fijo (Javi / Molin); marco a ancho completo con altura máxima de 60 svh; índice en filas con miniatura debajo; `row` y `scale` pasan a carrusel horizontal con scroll nativo e indicación visible de que hay más; objetivos táctiles ≥ 44 px.

## 13. Accesibilidad

- HTML semántico: `header`, `nav`, `main`, `article`, `figure/figcaption`, un `h1` por página.
- Contraste AA verificado en cada par campo/tinta.
- Foco visible: contorno de 2 px en la tinta vigente, desplazado 3 px.
- Alt descriptivo en cada pieza (qué es y para qué formato).
- Todo lo que se mueve solo puede pausarse; los videos no tienen sonido y tienen control.
- Enlace "Saltar al contenido".

## 14. Rendimiento y SEO

- Astro estático, JS solo en el marco de formatos, el índice y los videos (< 6 KB en total, sin librerías).
- Fuentes: subconjunto latino, `font-display: swap`, precarga de la display.
- Imágenes AVIF/WebP responsivas; la primera pantalla sin lazy.
- `title`, `description`, Open Graph y Twitter por página; `sitemap.xml`, `robots.txt`, favicon SVG, JSON-LD `Person`.
- Nombre en metadatos: **María Javiera Molin — Diseñadora Integral**.

## 15. Evitar

Tarjetas iguales, gradientes decorativos, sombras en el trabajo, esquinas redondeadas, fondo crema, monoespaciada decorativa, mayúsculas espaciadas, numeración 01/02/03 fuera de procesos reales, fade-up por sección, parallax, cursor personalizado, scroll secuestrado, WebGL decorativo, métricas inventadas.

## 16. Tecnología

- **Astro 5**, CSS propio con custom properties (sin framework CSS), TypeScript para los datos.
- Datos de proyectos en `src/data/projects.ts`; imágenes fuente en `src/assets/work/<proyecto>/`; videos en `public/video/`.
- View Transitions entre documentos (`@view-transition { navigation: auto }`), sin router de cliente.
- Despliegue en GitHub Pages con la Action oficial de Astro.
