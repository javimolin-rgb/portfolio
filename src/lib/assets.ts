import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/work/**/*.{jpg,png}', { eager: true });

const map = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const key = path.replace('../assets/work/', '').replace(/\.(jpg|png)$/, '');
  map.set(key, mod.default);
}

export function asset(ref: string): ImageMetadata {
  const img = map.get(ref);
  if (!img) throw new Error(`Imagen no encontrada: ${ref}`);
  return img;
}

export const ratioOf = (ref: string) => {
  const i = asset(ref);
  return i.width / i.height;
};

export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
