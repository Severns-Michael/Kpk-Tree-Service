import { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './FallingLeaves.module.css';

interface Leaf {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedY: number;
  speedX: number;
  swayAmount: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
  color: string;
  shape: number;
}

const COLORS = ['#c45e0a', '#a84f08', '#d97b2a', '#1e5631', '#2d7a44', '#b5520a'];
const LEAF_COUNT = 35;

function createLeaf(width: number, height: number, startFromTop = false): Leaf {
  return {
    x: Math.random() * width,
    y: startFromTop ? -20 - Math.random() * 100 : Math.random() * height,
    size: 8 + Math.random() * 14,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    speedY: 0.3 + Math.random() * 0.7,
    speedX: (Math.random() - 0.5) * 0.3,
    swayAmount: 20 + Math.random() * 40,
    swaySpeed: 0.005 + Math.random() * 0.01,
    swayOffset: Math.random() * Math.PI * 2,
    opacity: 0.15 + Math.random() * 0.35,
    color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? '#e87912',
    shape: Math.floor(Math.random() * 3),
  };
}

function drawLeaf(ctx: CanvasRenderingContext2D, leaf: Leaf) {
  ctx.save();
  ctx.translate(leaf.x, leaf.y);
  ctx.rotate((leaf.rotation * Math.PI) / 180);
  ctx.globalAlpha = leaf.opacity;
  ctx.fillStyle = leaf.color;

  const s = leaf.size;

  if (leaf.shape === 0) {
    // Maple-style leaf
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.5);
    ctx.quadraticCurveTo(s * 0.4, -s * 0.3, s * 0.5, -s * 0.6);
    ctx.quadraticCurveTo(s * 0.3, -s * 0.1, s * 0.6, 0);
    ctx.quadraticCurveTo(s * 0.3, s * 0.1, s * 0.3, s * 0.5);
    ctx.quadraticCurveTo(0, s * 0.3, -s * 0.3, s * 0.5);
    ctx.quadraticCurveTo(-s * 0.3, s * 0.1, -s * 0.6, 0);
    ctx.quadraticCurveTo(-s * 0.3, -s * 0.1, -s * 0.5, -s * 0.6);
    ctx.quadraticCurveTo(-s * 0.4, -s * 0.3, 0, -s * 0.5);
    ctx.fill();
  } else if (leaf.shape === 1) {
    // Oval leaf
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.25, s * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Stem
    ctx.strokeStyle = leaf.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.5);
    ctx.lineTo(0, s * 0.7);
    ctx.stroke();
  } else {
    // Oak-style leaf
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.5);
    ctx.bezierCurveTo(s * 0.5, -s * 0.4, s * 0.3, -s * 0.1, s * 0.4, s * 0.1);
    ctx.bezierCurveTo(s * 0.2, s * 0.15, s * 0.3, s * 0.4, s * 0.15, s * 0.5);
    ctx.quadraticCurveTo(0, s * 0.35, -s * 0.15, s * 0.5);
    ctx.bezierCurveTo(-s * 0.3, s * 0.4, -s * 0.2, s * 0.15, -s * 0.4, s * 0.1);
    ctx.bezierCurveTo(-s * 0.3, -s * 0.1, -s * 0.5, -s * 0.4, 0, -s * 0.5);
    ctx.fill();
  }

  ctx.restore();
}

export function FallingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leavesRef = useRef<Leaf[]>([]);
  const frameIdRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
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

      if (leavesRef.current.length === 0) {
        leavesRef.current = Array.from({ length: LEAF_COUNT }, () => createLeaf(w, h));
      }
    }

    resize();
    window.addEventListener('resize', resize);

    if (reducedMotion) {
      // Static scattered leaves
      if (leavesRef.current.length === 0) {
        leavesRef.current = Array.from({ length: LEAF_COUNT }, () => createLeaf(w, h));
      }
      ctx.clearRect(0, 0, w, h);
      for (const leaf of leavesRef.current) {
        drawLeaf(ctx, leaf);
      }
      return () => { window.removeEventListener('resize', resize); };
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 1;

      for (let i = 0; i < leavesRef.current.length; i++) {
        const leaf = leavesRef.current[i]!;

        // Sway side to side
        leaf.x += Math.sin(timeRef.current * leaf.swaySpeed + leaf.swayOffset) * 0.5 + leaf.speedX;
        leaf.y += leaf.speedY;
        leaf.rotation += leaf.rotationSpeed;

        // Reset when off screen
        if (leaf.y > h + 30) {
          leavesRef.current[i] = createLeaf(w, h, true);
        }
        // Wrap horizontally
        if (leaf.x > w + 30) leaf.x = -20;
        if (leaf.x < -30) leaf.x = w + 20;

        drawLeaf(ctx, leaf);
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
