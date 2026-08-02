import { Renderer, Program, Mesh, Triangle, Color } from "ogl";
import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

/**
 * Ferrofluid — blob metálico de metaballs reactivo al cursor.
 * Render 100% GPU (ogl). Pausa el rAF fuera de pantalla y respeta
 * prefers-reduced-motion.
 */
const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;
uniform float uScale;
uniform float uBlobs;
out vec4 fragColor;

const float PI = 6.28318530718;

float hash(float n) { return fract(sin(n) * 43758.5453123); }

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);

  vec2 m = (uMouse - 0.5 * uResolution) / uResolution.y;
  m /= max(uScale, 0.0001);
  m.y = -m.y;

  float t = uTime * 0.45;
  float field = 0.0;

  // núcleo principal, atraído suavemente hacia el cursor
  vec2 core = mix(vec2(0.0), m, 0.22);
  field += 0.085 / (dot(uv - core, uv - core) + 0.0025);

  // satélites orbitando: la "gota" ferrofluida
  for (int i = 0; i < 9; i++) {
    if (float(i) >= uBlobs) break;
    float fi = float(i);
    float seed = hash(fi + 1.0);
    float ang = t * (0.35 + seed * 0.6) + fi * PI / uBlobs;
    float rad = 0.22 + 0.18 * sin(t * (0.5 + seed) + fi);
    vec2 p = core + vec2(cos(ang), sin(ang)) * rad;
    p += (m - p) * 0.10 * seed;
    float r = 0.016 + 0.020 * seed;
    field += r / (dot(uv - p, uv - p) + 0.0022);
  }

  // púas magnéticas: modulación radial tipo ferrofluido
  float a = atan(uv.y - core.y, uv.x - core.x);
  field *= 1.0 + 0.10 * sin(a * 9.0 + t * 1.6);

  float mask = smoothstep(0.85, 1.35, field);
  float rim = smoothstep(0.75, 1.05, field) - smoothstep(1.05, 1.9, field);

  vec3 col = mix(uColorA, uColorB, clamp(field * 0.35, 0.0, 1.0));
  col += uColorB * rim * 0.9;

  float halo = smoothstep(0.18, 0.95, field) * 0.35;
  float alpha = clamp(mask + halo, 0.0, 1.0) * uOpacity;
  fragColor = vec4(col * alpha, alpha);
}
`;

type FerrofluidProps = {
  colorA?: string;
  colorB?: string;
  blobs?: number;
  scale?: number;
  opacity?: number;
  className?: string;
};

export default function Ferrofluid({
  colorA = "#0B4A6F",
  colorB = "#67E8F9",
  blobs = 7,
  scale = 1.15,
  opacity = 0.9,
  className = "",
}: FerrofluidProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ colorA, colorB, blobs, scale, opacity });
  propsRef.current = { colorA, colorB, blobs, scale, opacity };

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.cssText = "display:block;width:100%;height:100%;background:transparent";

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const p = propsRef.current;
    const ca = new Color(p.colorA);
    const cb = new Color(p.colorB);
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uMouse: { value: [ctn.offsetWidth / 2, ctn.offsetHeight / 2] },
        uColorA: { value: [ca.r, ca.g, ca.b] },
        uColorB: { value: [cb.r, cb.g, cb.b] },
        uOpacity: { value: p.opacity },
        uScale: { value: p.scale },
        uBlobs: { value: p.blobs },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    const resize = () => {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      program.uniforms.uResolution.value = [
        gl.canvas.width / renderer.dpr,
        gl.canvas.height / renderer.dpr,
      ];
    };
    window.addEventListener("resize", resize);
    resize();

    const target = { x: ctn.offsetWidth / 2, y: ctn.offsetHeight / 2 };
    const current = { x: target.x, y: target.y };
    const onMove = (e: MouseEvent) => {
      const rect = ctn.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(ctn);

    let raf = 0;
    const update = (t: number) => {
      raf = requestAnimationFrame(update);
      if (!visible) return;
      const c = propsRef.current;
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      program.uniforms.uTime.value = reduce ? 0 : t * 0.001;
      program.uniforms.uMouse.value = [current.x, current.y];
      const a = new Color(c.colorA);
      const b = new Color(c.colorB);
      program.uniforms.uColorA.value = [a.r, a.g, a.b];
      program.uniforms.uColorB.value = [b.r, b.g, b.b];
      program.uniforms.uOpacity.value = c.opacity;
      program.uniforms.uScale.value = c.scale;
      program.uniforms.uBlobs.value = Math.min(Math.max(Math.round(c.blobs), 1), 9);
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={ctnDom} className={`relative size-full ${className}`} />;
}
