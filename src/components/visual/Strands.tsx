import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const MAX_STRANDS = 12;
const MAX_COLORS = 8;

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[${MAX_COLORS}];
uniform int uColorCount;
uniform int uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;
out vec4 fragColor;
const float PI = 3.14159265;

vec3 samplePalette(float t) {
  t = fract(t);
  float scaled = t * float(uColorCount);
  int idx = int(floor(scaled));
  float blend = fract(scaled);
  int nextIdx = idx + 1;
  if (nextIdx >= uColorCount) nextIdx = 0;
  return mix(uColors[idx], uColors[nextIdx], blend);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);
  float e = 0.06 + uIntensity * 0.94;
  float env = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);
  vec3 col = vec3(0.0);
  for (int i = 0; i < ${MAX_STRANDS}; i++) {
    if (i >= uStrandCount) break;
    float fi = float(i);
    float ph = fi * 1.7 * uSpread;
    float freq = (2.0 + fi * 0.35) * uWaviness;
    float spd = 1.4 + fi * 1.2;
    float tt = uTime * uSpeed;
    float w = sin(uv.x * freq + tt * spd + ph) * 0.60
            + sin(uv.x * freq * 1.1 - tt * spd * 0.7 + ph * 1.7) * 0.40;
    float amp = (0.1 + 0.02 * e) * env * uAmplitude;
    float y = w * amp;
    float d = abs(uv.y - y);
    float thick = (0.001 + 0.05 * e) * (0.35 + env) * uThickness;
    float g = thick / (d + thick * 0.45);
    g = g * g;
    float h = fi / float(uStrandCount) + uv.x * 0.30 + uTime * 0.04;
    col += samplePalette(h) * g * env;
  }
  col *= 0.45 + 0.7 * e;
  col = 1.0 - exp(-col * uGlow);
  float gray = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(gray), col, uSaturation), 0.0);
  float lum = max(max(col.r, col.g), col.b);
  float alpha = clamp(lum, 0.0, 1.0) * uOpacity;
  fragColor = vec4(col * uOpacity, alpha);
}
`;

type StrandsProps = {
  colors?: string[];
  count?: number;
  speed?: number;
  amplitude?: number;
  waviness?: number;
  thickness?: number;
  glow?: number;
  taper?: number;
  spread?: number;
  intensity?: number;
  saturation?: number;
  opacity?: number;
  scale?: number;
  className?: string;
};

const buildPalette = (colors: string[]) => {
  const filled = colors.length ? colors : ["#ffffff"];
  const padded: number[][] = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    const c = new Color(filled[i] ?? filled[filled.length - 1]);
    padded.push([c.r, c.g, c.b]);
  }
  return padded;
};

export default function Strands({
  colors = ["#06B6D4", "#3B82F6", "#A5F3FC"],
  count = 3,
  speed = 0.35,
  amplitude = 1,
  waviness = 1,
  thickness = 0.6,
  glow = 2.2,
  taper = 3,
  spread = 1,
  intensity = 0.5,
  saturation = 1.2,
  opacity = 0.55,
  scale = 1.5,
  className = "",
}: StrandsProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const propsRef = useRef({
    colors, count, speed, amplitude, waviness, thickness, glow, taper, spread, intensity, saturation, opacity, scale,
  });
  propsRef.current = {
    colors, count, speed, amplitude, waviness, thickness, glow, taper, spread, intensity, saturation, opacity, scale,
  };

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";
    gl.canvas.style.display = "block";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const p = propsRef.current;
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uColors: { value: buildPalette(p.colors) },
        uColorCount: { value: Math.min(p.colors.length, MAX_COLORS) },
        uStrandCount: { value: Math.min(p.count, MAX_STRANDS) },
        uSpeed: { value: p.speed },
        uAmplitude: { value: p.amplitude },
        uWaviness: { value: p.waviness },
        uThickness: { value: p.thickness },
        uGlow: { value: p.glow },
        uTaper: { value: p.taper },
        uSpread: { value: p.spread },
        uIntensity: { value: p.intensity },
        uOpacity: { value: p.opacity },
        uScale: { value: p.scale },
        uSaturation: { value: p.saturation },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    const resize = () => {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      program.uniforms.uResolution.value = [ctn.offsetWidth, ctn.offsetHeight];
    };
    window.addEventListener("resize", resize);
    resize();

    // Pausa el render cuando la sección no está visible: mantiene los 60 FPS.
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(ctn);

    let animateId = 0;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      if (!visible) return;
      const c = propsRef.current;
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uColors.value = buildPalette(c.colors);
      program.uniforms.uColorCount.value = Math.min(c.colors.length, MAX_COLORS);
      program.uniforms.uStrandCount.value = Math.min(Math.max(Math.round(c.count), 1), MAX_STRANDS);
      program.uniforms.uSpeed.value = c.speed;
      program.uniforms.uAmplitude.value = c.amplitude;
      program.uniforms.uWaviness.value = c.waviness;
      program.uniforms.uThickness.value = c.thickness;
      program.uniforms.uGlow.value = c.glow;
      program.uniforms.uTaper.value = c.taper;
      program.uniforms.uSpread.value = c.spread;
      program.uniforms.uIntensity.value = c.intensity;
      program.uniforms.uOpacity.value = c.opacity;
      program.uniforms.uScale.value = c.scale;
      program.uniforms.uSaturation.value = c.saturation;
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      io.disconnect();
      window.removeEventListener("resize", resize);
      if (gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={ctnDom} className={`relative size-full ${className}`} />;
}
