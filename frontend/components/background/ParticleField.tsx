"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  alpha: number;
}

/**
 * Subtle drifting particles rendered on canvas. Purely decorative — respects
 * prefers-reduced-motion by rendering a single static frame instead.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const count = Math.min(60, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 22000));
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 1.6 + 0.4,
      vy: Math.random() * 0.15 + 0.03,
      drift: Math.random() * 0.4 - 0.2,
      alpha: Math.random() * 0.4 + 0.15,
    }));

    let frameId: number;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 225, 255, ${p.alpha})`;
        ctx.fill();

        if (!reduceMotion) {
          p.y -= p.vy;
          p.x += p.drift * 0.05;
          if (p.y < -10) {
            p.y = canvas.offsetHeight + 10;
            p.x = Math.random() * canvas.offsetWidth;
          }
        }
      }
      frameId = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      if (!canvas || !ctx) return;
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
