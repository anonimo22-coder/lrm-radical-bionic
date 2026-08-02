import { useEffect, useRef, useId, memo } from "react";

const TWO_PI = Math.PI * 2;

type DotFieldProps = {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  bulgeStrength?: number;
  glowRadius?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
};

/**
 * Campo de puntos reactivo al cursor. Decorativo: se usa puntualmente,
 * nunca como fondo global. Pausa el rAF cuando no está en pantalla.
 */
const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 16,
  cursorRadius = 420,
  bulgeStrength = 46,
  glowRadius = 170,
  gradientFrom = "rgba(56, 189, 248, 0.32)",
  gradientTo = "rgba(255, 255, 255, 0.12)",
  glowColor = "rgba(56, 189, 248, 0.20)",
  className = "",
}: DotFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const rawId = useId();
  const glowId = `df-glow-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const propsRef = useRef({ dotRadius, dotSpacing, cursorRadius, bulgeStrength, gradientFrom, gradientTo });
  propsRef.current = { dotRadius, dotSpacing, cursorRadius, bulgeStrength, gradientFrom, gradientTo };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Dot = { ax: number; ay: number; sx: number; sy: number };
    let dots: Dot[] = [];
    let size = { w: 0, h: 0 };
    const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
    let engagement = 0;
    let glowOpacity = 0;
    let visible = true;
    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const buildDots = () => {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(size.w / step);
      const rows = Math.floor(size.h / step);
      const padX = (size.w % step) / 2;
      const padY = (size.h % step) / 2;
      const next: Dot[] = new Array(Math.max(rows * cols, 0));
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ax = padX + c * step + step / 2;
          const ay = padY + r * step + step / 2;
          next[i++] = { ax, ay, sx: ax, sy: ay };
        }
      }
      dots = next;
    };

    const doResize = () => {
      const rect = wrap.getBoundingClientRect();
      size = { w: rect.width, h: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 120);
    };

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    let lastSpeedTime = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      if (now - lastSpeedTime > 20) {
        lastSpeedTime = now;
        const dx = mouse.prevX - mouse.x;
        const dy = mouse.prevY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        mouse.speed += (dist - mouse.speed) * 0.5;
        if (mouse.speed < 0.001) mouse.speed = 0;
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
      }
      const p = propsRef.current;
      engagement += (Math.min(mouse.speed / 5, 1) - engagement) * 0.06;
      if (engagement < 0.001) engagement = 0;
      glowOpacity += (engagement - glowOpacity) * 0.08;
      const glowEl = glowRef.current;
      if (glowEl) {
        glowEl.setAttribute("cx", String(mouse.x));
        glowEl.setAttribute("cy", String(mouse.y));
        glowEl.style.opacity = String(glowOpacity);
      }

      ctx.clearRect(0, 0, size.w, size.h);
      const grad = ctx.createLinearGradient(0, 0, size.w, size.h);
      grad.addColorStop(0, p.gradientFrom);
      grad.addColorStop(1, p.gradientTo);
      ctx.fillStyle = grad;
      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const rad = p.dotRadius / 2;

      ctx.beginPath();
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = mouse.x - d.ax;
        const dy = mouse.y - d.ay;
        const distSq = dx * dx + dy * dy;
        if (distSq < crSq && engagement > 0.01) {
          const dist = Math.sqrt(distSq);
          const t = 1 - dist / cr;
          const push = t * t * p.bulgeStrength * engagement;
          const angle = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
        } else {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }
        ctx.moveTo(d.sx + rad, d.sy);
        ctx.arc(d.sx, d.sy, rad, 0, TWO_PI);
      }
      ctx.fill();
    };

    doResize();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative size-full ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <svg className="pointer-events-none absolute inset-0 size-full">
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowId})`}
          style={{ opacity: 0, willChange: "opacity" }}
        />
      </svg>
    </div>
  );
});

export default DotField;
