import { useRef, useEffect, useState } from 'react';

interface TransparentLogoProps {
  src: string;
  alt: string;
  className?: string;
  color?: string;
  threshold?: number;
}

export function TransparentLogo({
  src,
  alt,
  className,
  color = '#e87912',
  threshold = 140,
}: TransparentLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Parse the target color
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);

      for (let i = 0; i < data.length; i += 4) {
        const brightness =
          (data[i]! * 0.299) + (data[i + 1]! * 0.587) + (data[i + 2]! * 0.114);

        if (brightness > threshold) {
          // Light pixel (white background) → fully transparent
          data[i + 3] = 0;
        } else {
          // Dark pixel (artwork) → target color, darker = more opaque
          const alpha = Math.min(255, ((threshold - brightness) / threshold) * 255);
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = Math.round(alpha);
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setLoaded(true);
    };
    img.src = src;
  }, [src, color, threshold]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label={alt}
      style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
    />
  );
}
