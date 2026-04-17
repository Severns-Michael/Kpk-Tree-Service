import { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './TreeRings.module.css';

interface Ring {
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  color: string;
}

const GREEN = '#4a9e4a';
const ORANGE = '#e87912';
const RING_COUNT = 5;
const SPAWN_INTERVAL = 120; // frames between new rings

export function TreeRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringsRef = useRef<Ring[]>([]);
  const frameIdRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    if (reducedMotion) {
      // Draw static concentric rings
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, i * 60, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0
          ? `rgba(232, 121, 18, 0.08)`
          : `rgba(74, 158, 74, 0.08)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      return () => { window.removeEventListener('resize', resize); };
    }

    function spawnRing() {
      const maxR = Math.max(w, h) * 0.6;
      ringsRef.current.push({
        radius: 10,
        maxRadius: maxR,
        opacity: 0.2,
        speed: 0.4 + Math.random() * 0.3,
        color: ringsRef.current.length % 2 === 0 ? GREEN : ORANGE,
      });
      // Keep ring count limited
      if (ringsRef.current.length > RING_COUNT) {
        ringsRef.current.shift();
      }
    }

    // Start with a couple of rings
    spawnRing();

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      frameCountRef.current += 1;

      if (frameCountRef.current % SPAWN_INTERVAL === 0) {
        spawnRing();
      }

      const cx = w / 2;
      const cy = h / 2;

      for (let i = ringsRef.current.length - 1; i >= 0; i--) {
        const ring = ringsRef.current[i]!;

        ring.radius += ring.speed;

        // Fade out as it expands
        const progress = ring.radius / ring.maxRadius;
        ring.opacity = Math.max(0, 0.2 * (1 - progress));

        if (ring.radius > ring.maxRadius) {
          ringsRef.current.splice(i, 1);
          continue;
        }

        const rgb = ring.color === GREEN
          ? '74, 158, 74'
          : '232, 121, 18';

        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb}, ${String(ring.opacity)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      frameIdRef.current = requestAnimationFrame(animate);
    }

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
