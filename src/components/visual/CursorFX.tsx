import { useEffect, useRef, useState } from "react";

/**
 * Cursor personalizado: un punto que sigue al puntero al instante y un anillo
 * que lo persigue con easing. Se adhiere a elementos interactivos (hover
 * inteligente). Solo transform/opacity → 60 FPS.
 */
export function CursorFX() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let opacity = 0;
    let raf = 0;
    let idle = 0;

    const startLoop = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      opacity = 1;
      idle = 0;
      const hit = (e.target as HTMLElement | null)?.closest(
        "a, button, [role='button'], input, textarea, summary, [data-cursor='hover']",
      );
      targetScale = hit ? 1.9 : 1;
      startLoop();
    };
    const onLeave = () => {
      opacity = 0;
      startLoop();
    };

    const loop = () => {
      raf = 0;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (targetScale - scale) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = String(opacity);
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        ringRef.current.style.opacity = String(opacity * (targetScale > 1.2 ? 0.9 : 0.55));
      }
      idle++;
      const settled = Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1 && Math.abs(targetScale - scale) < 0.01;
      if (!settled || idle < 10) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    startLoop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden lg:block" aria-hidden>
      <div
        ref={ringRef}
        className="absolute left-0 top-0 size-9 rounded-full border border-cyan/60 opacity-0 [transition:opacity_300ms_ease] will-change-transform"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-cyan opacity-0 shadow-[0_0_12px_var(--cyan)] will-change-transform"
      />
    </div>
  );
}
