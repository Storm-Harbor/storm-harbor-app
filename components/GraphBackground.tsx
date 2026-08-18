"use client";

import {useEffect, useRef} from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

export function GraphBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = {x: -1000, y: -1000, active: false};
    let nodes: Node[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let running = true;

    const createNodes = () => {
      const count = Math.min(82, Math.max(30, Math.floor((width * height) / 18000)));
      nodes = Array.from({length: count}, (_, index) => ({
        x: ((index * 97.13) % 100) / 100 * width,
        y: ((index * 53.71 + 17) % 100) / 100 * height,
        vx: ((index % 7) - 3) * 0.035 + 0.04,
        vy: ((index % 5) - 2) * 0.028 - 0.015,
        radius: index % 9 === 0 ? 2.4 : 1.25,
        phase: index * 0.63,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      createNodes();
      if (reducedMotion.matches) draw(0, false);
    };

    const draw = (time: number, update = true) => {
      context.clearRect(0, 0, width, height);

      if (update) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;

          if (pointer.active) {
            const dx = pointer.x - node.x;
            const dy = pointer.y - node.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 180 && distance > 0) {
              node.x += (dx / distance) * 0.035;
              node.y += (dy / distance) * 0.035;
            }
          }
        }
      }

      for (let index = 0; index < nodes.length; index += 1) {
        const source = nodes[index];
        for (let targetIndex = index + 1; targetIndex < nodes.length; targetIndex += 1) {
          const target = nodes[targetIndex];
          const distance = Math.hypot(source.x - target.x, source.y - target.y);
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.24;
            context.beginPath();
            context.moveTo(source.x, source.y);
            context.lineTo(target.x, target.y);
            context.strokeStyle = `rgba(86, 139, 239, ${opacity})`;
            context.lineWidth = 0.75;
            context.stroke();
          }
        }
      }

      for (const node of nodes) {
        const pulse = 1 + Math.sin(time * 0.001 + node.phase) * 0.18;
        context.beginPath();
        context.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        context.fillStyle = node.radius > 2 ? "rgba(132, 167, 239, .78)" : "rgba(82, 133, 229, .62)";
        context.fill();
      }
    };

    const animate = (time: number) => {
      if (!running || reducedMotion.matches) return;
      draw(time);
      frame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => { pointer.active = false; };
    const onVisibilityChange = () => {
      running = !document.hidden;
      if (running && !reducedMotion.matches) frame = window.requestAnimationFrame(animate);
      else window.cancelAnimationFrame(frame);
    };
    const onMotionChange = () => {
      window.cancelAnimationFrame(frame);
      if (reducedMotion.matches) draw(0, false);
      else frame = window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, {passive: true});
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionChange);
    resize();
    if (!reducedMotion.matches) frame = window.requestAnimationFrame(animate);

    return () => {
      running = false;
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />;
}
