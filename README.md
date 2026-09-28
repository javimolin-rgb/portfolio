# Javi Molin, portfolio

Portfolio de María Javiera Molin, Diseñadora Integral UC. Sitio estático hecho con [Astro](https://astro.build).

- **Dirección de arte:** [`DESIGN.md`](DESIGN.md). Léelo antes de cambiar algo visual.
- **Auditoría y direcciones exploradas:** [`docs/`](docs/).

## Trabajar en local

```bash
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # genera dist/
npm run preview  # revisa el build
```

Requiere Node 20 o superior.

## Dónde está cada cosa

```
src/data/projects.ts     Proyectos, textos, bloques de cada caso, marco de formatos y banda "a escala"
src/assets/work/<slug>/  Imágenes fuente de cada proyecto (se optimizan solas a AVIF/WebP)
public/video/            Loops de video (.mp4, sin sonido)
public/cv/               CV en PDF
src/components/          Marco de formatos, índice, bloques, figura
src/pages/               Inicio, casos (trabajo/[slug]), Sobre mí, 404
src/styles/global.css    Tokens de color, tipografía y superficies
```

## Agregar un proyecto

1. Crea `src/assets/work/mi-proyecto/` y pon ahí las imágenes (JPG o PNG, lado mayor hasta 2400 px).
2. En `src/data/projects.ts`, copia un proyecto completo y cambia `slug`, textos, colores (`field` y `ink`, con contraste AA) y `format` (el formato emblemático define el ancho del título).
3. Arma el caso con bloques (`notes`, `row`, `scale`, `sequence`, `anatomy`, `pair`, `grid`, `stack`, `statement`, `bleed`). Ver DESIGN.md §8.
4. Videos: `public/video/nombre.mp4` y una imagen de póster con `video: 'nombre'` en la pieza.

## Publicar

El workflow `.github/workflows/deploy.yml` publica en GitHub Pages en cada push a `main`. En el repositorio: *Settings → Pages → Source: GitHub Actions*.

Queda en `https://javimolin-rgb.github.io/portfolio/`. Para un dominio propio, cambia `site` y `base` en `astro.config.mjs` y la URL de `public/robots.txt`.

## Fuentes

Anybody y Mona Sans, ambas con licencia SIL Open Font License (ver `src/fonts/`).
