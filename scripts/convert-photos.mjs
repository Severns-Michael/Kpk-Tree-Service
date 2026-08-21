// Converts photos/*.heic to optimized WebP in src/assets/gallery/
// plus small JPEG previews in photos/previews/ for review.
// Run: node scripts/convert-photos.mjs
import { readdir, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import convert from 'heic-convert';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'photos');
const outDir = path.join(root, 'src', 'assets', 'gallery');
const previewDir = path.join(srcDir, 'previews');

await mkdir(outDir, { recursive: true });
await mkdir(previewDir, { recursive: true });

const files = (await readdir(srcDir))
  .filter((f) => /\.(heic|heif)$/i.test(f))
  .sort();

let i = 0;
for (const file of files) {
  i += 1;
  const name = `work-${i}`;
  const heic = await readFile(path.join(srcDir, file));
  const jpeg = Buffer.from(
    await convert({ buffer: heic, format: 'JPEG', quality: 0.95 })
  );

  const image = sharp(jpeg).rotate(); // .rotate() applies EXIF orientation
  const webpOut = path.join(outDir, `${name}.webp`);
  const info = await image
    .clone()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(webpOut);

  await image
    .clone()
    .resize({ width: 500, height: 500, fit: 'inside' })
    .jpeg({ quality: 70 })
    .toFile(path.join(previewDir, `${name}.jpg`));

  console.log(`${file} -> ${name}.webp (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
}
console.log(`Converted ${i} photos.`);
