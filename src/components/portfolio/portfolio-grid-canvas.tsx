'use client';

import { useEffect, useRef } from 'react';

const GRID_SIZE = 48;

export function PortfolioGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mediaQuery = window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)');

    if (!canvas || mediaQuery.matches) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const drawGrid = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.strokeStyle = 'rgba(24, 24, 27, 0.06)';
      context.lineWidth = 1;

      for (let x = 0; x <= width; x += GRID_SIZE) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y <= height; y += GRID_SIZE) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    };

    drawGrid();
    window.addEventListener('resize', drawGrid);

    return () => {
      window.removeEventListener('resize', drawGrid);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden h-full w-full opacity-70 md:block"
    />
  );
}
