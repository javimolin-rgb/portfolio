# Arquitectura

```
/                          Marco de formatos · Índice (10 proyectos) · A escala · Presentación · Contacto
/trabajo/<proyecto>/       Caso: campo de color, título al ancho de su formato, bloques propios, siguiente proyecto
/sobre-mi/                 Bio, experiencia, formación, qué hago y con qué (teléfono solo aquí)
/404
```

**Por qué así.** Diez proyectos de un mismo año no necesitan filtros ni categorías: un índice tipográfico los muestra todos en una pantalla y cada uno tiene su página, con URL propia para compartir. Los proyectos chicos (Gamer Week, sandalias) tienen casos cortos; los grandes (Día del Niño, Campeones Sin Límites, Toys"R"Us) cuentan proceso, escala y montaje.

**Orden del índice:** Día del Niño · Campeones Sin Límites · Toys"R"Us · New Romantic y moda · Ventas Privadas y Days · Me fascinan las sandalias · Ripley Beauty · Gamer Week · Fiestas Patrias y gift cards · Activaciones en tienda. Primero los proyectos con más dirección de arte y escala; al final, los de producción diaria.

## Componentes
- `FormatFrame` — marco de formatos de la portada (momento firma).
- `ProjectIndex` — índice con cambio de color de página.
- `ScaleRow` — piezas en su proporción real sobre una base común.
- `Blocks` — biblioteca de bloques de caso (DESIGN.md §8).
- `Figure` — imagen AVIF/WebP responsiva o loop de video con pausa.

## Verificación hecha
- Capturas en 1440 × 900 y 390 × 844 de todas las páginas.
- axe-core (WCAG 2 A y AA) sin infracciones en portada, dos casos y Sobre mí.
- JavaScript total en portada: ~4,6 KB, sin librerías.

# Pendientes (no se inventó nada para cubrirlos)
- **Experimentación con IA:** no hay proyectos documentados. KESHI, VOLT y PAPEL siguen fuera hasta decidir si se muestran como ejercicios.
- **Foto personal** para Sobre mí (el diseño funciona sin ella; se puede sumar al lado de la bio).
- **Rol de Regina Latife** en Campeones Sin Límites.
- **Mesones de Toys"R"Us:** confirmar que la gráfica instalada es tuya (hoy no se muestran en el caso web).
- **Videos en alta** de sandalias y lanzamientos (se usan los comprimidos).
- **Deportista menor de edad:** se excluyeron el key visual y el tótem de mano de una deportista de 17 años (también se sacaron de la presentación).
- **Dominio propio:** hoy apunta a `javimolin-rgb.github.io/portfolio/`.
- **Astro:** el sitio usa Astro 5; ya existe Astro 7. La migración puede hacerse después sin tocar el diseño.
