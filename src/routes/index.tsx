import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoDark from "@/assets/logo-dark.png.asset.json";
import logoLight from "@/assets/logo-light.png.asset.json";
import heroArm from "@/assets/hero-arm.jpg.asset.json";
import pieza13 from "@/assets/pieza-13.png.asset.json";
import pieza15 from "@/assets/pieza-15.png.asset.json";
import pieza16 from "@/assets/pieza-16.png.asset.json";
import pieza17 from "@/assets/pieza-17.png.asset.json";
import pieza18 from "@/assets/pieza-18.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LRM Robotics — Move Beyond · Prótesis biónicas radicales" },
      {
        name: "description",
        content:
          "Prótesis biónicas de brazo fabricadas con materiales reciclados e impresión 3D. Tecnología humana sin límites ni desperdicios. Proyecto Semillero HeroBots · SENA",
      },
      { property: "og:title", content: "LRM Robotics — Move Beyond · Prótesis biónicas radicales" },
      {
        property: "og:description",
        content:
          "Prótesis biónicas de brazo fabricadas con materiales reciclados e impresión 3D. Tecnología humana sin límites ni desperdicios. Proyecto Semillero HeroBots · SENA",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroArm.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroArm.url },
      { name: "twitter:title", content: "LRM Robotics — Move Beyond · Prótesis biónicas radicales" },
      {
        name: "twitter:description",
        content:
          "Prótesis biónicas de brazo fabricadas con materiales reciclados e impresión 3D. Tecnología humana sin límites ni desperdicios. Proyecto Semillero HeroBots · SENA",
      },
    ],
  }),
  component: Index,
});

/* ----------------------------- theme toggle ------------------------------ */
function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

/* ------------------------------ intro splash ----------------------------- */
function IntroSplash({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => onDone(), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);
  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-700 ${
        phase >= 2 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent animate-scan" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative size-32">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-cyan">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.4"
            />
            <path
              d="M20 80 L20 20 L50 20 M50 20 Q70 20 70 40 Q70 55 50 55 L60 80 M75 80 L75 20 L85 40 L85 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-circuit"
            />
          </svg>
          <div className="absolute inset-0 rounded-full bg-cyan/20 blur-2xl animate-pulse-dot" />
        </div>
        <div
          className={`font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground transition-all duration-500 ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-cyan">▸</span> LRM system online
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- nav ---------------------------------- */
const NAV = [
  { href: "#tecnologia", label: "Tecnología" },
  { href: "#investigacion", label: "Investigación" },
  { href: "#sena", label: "SENA" },
  { href: "#equipo", label: "Equipo" },
  { href: "#blog", label: "Blog" },
  { href: "#glosario", label: "Glosario" },
];

function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={dark ? logoDark.url : logoLight.url}
            alt="LRM Robotics"
            className="h-9 w-9 object-contain"
          />
          <div className="hidden sm:block">
            <div className="font-display text-sm font-bold leading-none tracking-tight">
              LRM Robotics
            </div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
              Move Beyond
            </div>
          </div>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Cambiar tema"
            className="grid size-9 place-items-center rounded-md border border-border bg-surface text-foreground transition-colors hover:border-cyan"
          >
            {dark ? (
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <a
            href="#contacto"
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] sm:inline-block"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ---------------------------------- hero --------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 pt-20 pb-32 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-28">
        <div className="animate-assemble">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1">
            <span className="size-1.5 rounded-full bg-cyan animate-pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
              Biónica radical · Colombia
            </span>
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Move <span className="text-gradient">Beyond</span>
            <span className="mt-3 block text-2xl font-medium text-muted-foreground sm:text-3xl">
              Tecnología humana sin límites ni desperdicios.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Desarrollamos prótesis biónicas de brazo{" "}
            <span className="text-foreground">impresas en 3D con materiales reciclados</span>,
            controladas por señales musculares e impulsadas por energía solar. Existimos para
            devolverle movimiento y dignidad a las personas.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#tecnologia"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--cyan)] transition-transform hover:scale-[1.02]"
            >
              Conoce nuestra tecnología
              <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-cyan"
            >
              ¿Eres una fundación? Sé parte del cambio
            </a>
          </div>
          <div className="mt-12 flex gap-8 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <div>
              <div className="text-cyan">▸ &lt; 300 ms</div>
              <div className="mt-1">Latencia EMG</div>
            </div>
            <div>
              <div className="text-cyan">▸ 100%</div>
              <div className="mt-1">PET · HDPE reciclado</div>
            </div>
            <div>
              <div className="text-cyan">▸ Solar</div>
              <div className="mt-1">Carga híbrida</div>
            </div>
          </div>
        </div>

        <div className="relative animate-assemble [animation-delay:200ms]">
          <div className="absolute -inset-10 rounded-full bg-cyan/25 blur-[100px]" />
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-navy panel glow-cyan">
            <img
              src={heroArm.url}
              alt="Prótesis biónica LRM con circuitos iluminados en azul"
              width={1600}
              height={1600}
              className="size-full object-cover animate-float"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-cyan">
              <span>▸ LRM-A1 · Prototipo activo</span>
              <span className="animate-pulse-dot">◉ REC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- problema -------------------------------- */
function Problema() {
  const stats = [
    { n: "425+", label: "Días de espera promedio", sub: "Más de un año sin autonomía." },
    { n: "$30–100M", label: "Costo en COP", sub: "Fuera del alcance de la mayoría." },
    { n: "1 de cada 3", label: "Personas sin acceso", sub: "A prótesis de calidad en LATAM." },
  ];
  return (
    <section className="relative border-y border-border bg-surface/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
              01 · El problema
            </div>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Detrás de cada cifra <br />
              hay una vida en pausa.
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              En Colombia, acceder a una prótesis biónica puede costar hasta 100 millones de pesos
              y tomar más de un año. Es tiempo que las personas pierden esperando recuperar algo
              tan básico como abrir una puerta o abrazar a alguien.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group panel p-6 transition-all hover:-translate-y-1 hover:border-cyan"
              >
                <div className="text-gradient font-display text-4xl font-bold">{s.n}</div>
                <div className="mt-3 text-sm font-semibold">{s.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ tecnologia ------------------------------- */
function Tecnologia() {
  const pillars = [
    {
      n: "01",
      title: "Manufactura Circular",
      desc: "Prótesis fabricadas con polímeros reciclados (PET y HDPE) mediante impresión 3D.",
      analogy:
        "Es como darle una segunda vida a las botellas de plástico: en vez de terminar en la basura, se convierten en el brazo de alguien.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 19H4l3-5m10 5h3l-3-5M9.5 5l2.5-3 2.5 3M5 9l-1 4M20 9l1 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      n: "02",
      title: "Soberanía Energética",
      desc: "Sistema híbrido con batería + supercapacitor y paneles solares flexibles integrados.",
      analogy:
        "El supercapacitor es como un balde grande que se llena al instante; la batería, un tanque que dura todo el día. El sol los mantiene siempre listos.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      n: "03",
      title: "IA Adaptativa",
      desc: "Control por señales mioeléctricas (EMG) con latencia menor a 300 ms. Aprende del usuario.",
      analogy:
        "Escuchamos el «lenguaje eléctrico» que tus músculos ya usan para moverse; la IA lo traduce en movimiento real, más preciso con cada uso.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 10h4v4h-4z" strokeLinecap="round" />
        </svg>
      ),
    },
  ];
  const parts = [
    { img: pieza13.url, code: "PIEZA 13", name: "Eje de rotación del codo" },
    { img: pieza15.url, code: "PIEZA 15", name: "Cubierta lateral del codo" },
    { img: pieza16.url, code: "PIEZA 16", name: "Soporte del servomotor" },
    { img: pieza17.url, code: "PIEZA 17", name: "Piñón de transmisión" },
    { img: pieza18.url, code: "PIEZA 18", name: "Limitador de ángulo" },
  ];
  return (
    <section id="tecnologia" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            02 · Nuestra solución
          </div>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Tres pilares. <span className="text-gradient">Un mismo propósito.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ingeniería con propósito social: cada componente de la prótesis LRM responde a una
            pregunta humana antes que a una técnica.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.n}
              className="group panel relative overflow-hidden p-8 transition-all hover:-translate-y-1 hover:border-cyan hover:shadow-[0_20px_60px_-20px_var(--cyan)]"
            >
              <div className="absolute right-4 top-4 font-mono text-[10px] text-muted-foreground">
                {p.n}
              </div>
              <div className="mb-6 grid size-12 place-items-center rounded-lg bg-cyan/10 text-cyan transition-transform group-hover:scale-110">
                {p.icon}
              </div>
              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <div className="mt-6 rounded-md border border-dashed border-cyan/30 bg-cyan/5 p-4">
                <div className="font-mono text-[9px] uppercase tracking-widest text-cyan">
                  Analogía
                </div>
                <p className="mt-1 text-xs leading-relaxed text-foreground/80">{p.analogy}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Technical renders */}
        <div className="mt-24">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                ▸ Planos técnicos
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold">
                Ingeniería en cada milímetro
              </h3>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
              CONJUNTO CODO · REV 1.0
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {parts.map((p) => (
              <figure
                key={p.code}
                className="group panel overflow-hidden transition-all hover:border-cyan"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="border-t border-border p-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-cyan">
                    {p.code}
                  </div>
                  <div className="mt-1 text-sm font-medium">{p.name}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- investigación ------------------------------- */
function Investigacion() {
  const objectives = [
    "Fundamentar el diseño de la prótesis con base en usuarios reales.",
    "Categorizar las barreras del sistema de salud colombiano.",
    "Investigar los parámetros técnicos y biomecánicos.",
    "Examinar el sistema de inteligencia artificial adaptativa.",
    "Determinar la viabilidad del sistema energético híbrido.",
  ];
  return (
    <section id="investigacion" className="border-y border-border bg-surface/40 py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            03 · Investigación
          </div>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Semillero <span className="text-gradient">HeroBots</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            <span className="text-foreground">
              «LRM: Biónica radical, tecnología humana sin Límites ni Desperdicios.»
            </span>{" "}
            Un proyecto desarrollado dentro del{" "}
            <span className="text-foreground">Programa Ondas de Minciencias</span>, donde
            jóvenes investigadores exploran soluciones reales a problemas colombianos.
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-cyan/40 bg-cyan/10 px-5 py-3 text-sm font-semibold text-cyan transition-colors hover:bg-cyan hover:text-primary-foreground"
          >
            Conoce más del proyecto con HeroBots →
          </a>
        </div>
        <ol className="space-y-3">
          {objectives.map((o, i) => (
            <li
              key={i}
              className="group panel flex items-start gap-4 p-5 transition-all hover:border-cyan"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-md border border-cyan/30 bg-cyan/5 font-mono text-xs text-cyan">
                0{i + 1}
              </div>
              <p className="pt-2 text-sm leading-relaxed">{o}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------- SENA / HR flow ---------------------------- */
const STEPS = [
  "Requisición y perfilamiento",
  "Publicación y recepción de HV",
  "Preselección y filtrado",
  "Pruebas y entrevistas",
  "Verificación de antecedentes",
  "Selección final y oferta",
  "Exámenes médicos de ingreso",
  "Firma del contrato",
  "Afiliaciones a seguridad social",
  "Conformación de hoja de vida",
  "Incorporación a nómina y bienestar",
];

function Sena() {
  const [active, setActive] = useState(0);
  const timeline = [
    { year: "2024", label: "Idea inicial", desc: "Nace LRM en el aula del semillero." },
    { year: "2025", label: "Prototipo actual", desc: "Codo funcional impreso y IA en pruebas." },
    { year: "2026", label: "Alianzas EPS", desc: "Escalamiento con fundaciones y salud." },
    { year: "2027+", label: "Nuevas fronteras", desc: "Prótesis para animales y otras regiones." },
  ];
  return (
    <section id="sena" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
              04 · Proyecto SENA
            </div>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Empresa, formación y <span className="text-gradient">talento humano</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              LRM Robotics es también nuestra apuesta productiva dentro del SENA: constitución
              empresarial, modelo Canvas, misión, visión y un proceso riguroso de vinculación de
              personas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Misión", "Visión", "Canvas", "Presupuesto"].map((x) => (
              <div
                key={x}
                className="panel px-4 py-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                {x}
              </div>
            ))}
          </div>
        </div>

        {/* HR flow */}
        <div className="mt-16 panel p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">
              Simulación de selección y vinculación
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan">
              11 etapas · RR.HH.
            </span>
          </div>
          <div className="relative overflow-x-auto pb-4">
            <div className="flex min-w-max items-stretch gap-3">
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group relative w-56 shrink-0 rounded-lg border p-4 text-left transition-all ${
                    active === i
                      ? "border-cyan bg-cyan/10 shadow-[0_10px_30px_-10px_var(--cyan)]"
                      : "border-border bg-surface hover:border-cyan/40"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-cyan/30" />
                  </div>
                  <div className="mt-3 text-sm font-semibold leading-snug">{s}</div>
                  {i < STEPS.length - 1 && (
                    <span className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-cyan sm:block">
                      →
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Buscamos perfiles como <span className="text-foreground">Analista Estadístico</span>,{" "}
            <span className="text-foreground">Diseñador Industrial</span> e{" "}
            <span className="text-foreground">Investigador</span>, evaluando trabajo en equipo,
            pensamiento crítico y creatividad. La vinculación termina con la conformación de un
            equipo diverso y multidisciplinar.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h3 className="mb-8 font-display text-xl font-semibold">
            Crecimiento y proyección
          </h3>
          <div className="relative grid gap-6 sm:grid-cols-4">
            <div className="absolute left-4 right-4 top-6 hidden h-px bg-gradient-to-r from-cyan/50 via-cyan/20 to-transparent sm:block" />
            {timeline.map((t, i) => (
              <div key={i} className="panel relative p-5">
                <div className="mb-3 grid size-3 place-items-center rounded-full bg-cyan glow-cyan" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                  {t.year}
                </div>
                <div className="mt-1 font-semibold">{t.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- equipo -------------------------------- */
const TEAM = [
  {
    name: "Yuliana Marín",
    role: "Analista Estadística",
    bio: "Traduce datos en decisiones: valida hipótesis, mide impacto y guía el proyecto con evidencia.",
    initials: "YM",
  },
  {
    name: "Kevin Olivera",
    role: "Diseñador",
    bio: "Da forma tangible a la biónica: piezas, ensambles y la estética visual de la marca.",
    initials: "KO",
  },
  {
    name: "Angie Romero",
    role: "Integrante del equipo",
    bio: "Aporta en investigación y desarrollo del proyecto desde el semillero HeroBots.",
    initials: "AR",
  },
  {
    name: "Juan Lasso",
    role: "Integrante del equipo",
    bio: "Contribuye en desarrollo técnico y experimentación con el prototipo LRM.",
    initials: "JL",
  },
];

function Equipo() {
  return (
    <section id="equipo" className="border-y border-border bg-surface/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            05 · Equipo
          </div>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Personas detrás <span className="text-gradient">del movimiento.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un equipo joven del SENA que decidió que la tecnología también puede ser un acto de
            cuidado.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <article
              key={m.name}
              className="group panel relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:border-cyan"
            >
              <div className="relative mb-6 aspect-square overflow-hidden rounded-lg bg-navy">
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-6xl font-bold text-gradient">
                    {m.initials}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                {m.role}
              </div>
              <div className="mt-1 font-display text-lg font-semibold">{m.name}</div>
              <p className="mt-3 max-h-0 overflow-hidden text-sm text-muted-foreground transition-all duration-500 group-hover:max-h-32">
                {m.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- blog --------------------------------- */
const POSTS = [
  {
    date: "May 2025",
    tag: "Prototipo",
    title: "Ensamble del primer codo funcional LRM-A1",
    excerpt:
      "Terminamos la primera versión mecánica del codo con las piezas 11 a 18. Rango de movimiento 0°–135°.",
  },
  {
    date: "Abr 2025",
    tag: "Investigación",
    title: "Barreras del sistema de salud: primeros hallazgos",
    excerpt:
      "Entrevistamos a 12 personas con amputación transhumeral en Cali. Los tiempos superan los 14 meses.",
  },
  {
    date: "Mar 2025",
    tag: "Comunidad",
    title: "Aliados fundacionales: convocatoria abierta",
    excerpt:
      "Invitamos a fundaciones y EPS a co-diseñar el piloto 2026. Escríbenos si quieres sumarte.",
  },
];

function Blog() {
  return (
    <section id="blog" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
              06 · Blog y noticias
            </div>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Bitácora del proyecto</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="group panel overflow-hidden transition-all hover:-translate-y-1 hover:border-cyan"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 rounded border border-cyan/40 bg-background/70 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-cyan backdrop-blur">
                  {p.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.date}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan">
                  Leer más
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- glosario ------------------------------- */
const GLOSSARY = [
  {
    term: "Señales EMG (mioeléctricas)",
    def: "Pequeñas señales eléctricas que producen tus músculos al contraerse. La prótesis las «escucha» para saber cuándo abrir o cerrar la mano.",
  },
  {
    term: "Economía circular",
    def: "Un modelo donde nada se desperdicia: los materiales usados vuelven a la cadena productiva. En LRM, plásticos reciclados se convierten en piezas nuevas.",
  },
  {
    term: "Supercapacitor",
    def: "Un componente que almacena energía y la libera muy rápido. Imagínalo como un balde grande que se llena al instante.",
  },
  {
    term: "Impresión 3D (FDM)",
    def: "Fabricación por capas usando filamento plástico fundido. Permite crear piezas complejas de forma económica y local.",
  },
  {
    term: "IA adaptativa",
    def: "Inteligencia artificial que aprende de cada persona: entre más la usas, mejor entiende tus movimientos.",
  },
  {
    term: "Latencia",
    def: "El tiempo entre que piensas moverte y la prótesis responde. Menos de 300 ms se siente casi natural.",
  },
  {
    term: "Programa Ondas · Minciencias",
    def: "Iniciativa colombiana que apoya investigación científica en niños, niñas y jóvenes desde el aula.",
  },
  {
    term: "Modelo Canvas",
    def: "Herramienta visual para diseñar el modelo de negocio: quién es el cliente, qué se ofrece y cómo se sostiene.",
  },
];

function Glosario() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="glosario" className="border-y border-border bg-surface/40 py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            07 · Glosario
          </div>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Palabras técnicas, <span className="text-gradient">explicadas simple.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Porque la tecnología solo tiene sentido si cualquier persona puede entenderla.
          </p>
        </div>
        <div className="space-y-2">
          {GLOSSARY.map((g, i) => {
            const isOpen = open === i;
            return (
              <div
                key={g.term}
                className={`panel overflow-hidden transition-all ${
                  isOpen ? "border-cyan" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display font-semibold">{g.term}</span>
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full border border-cyan/40 text-cyan transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {g.def}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- contacto ------------------------------- */
function Contacto() {
  const emails = [
    "lrmrobotics@gmail.com",
    "servicioalclientelrmrobotics@gmail.com",
    "gerenciagenerallrmrobotics@gmail.com",
    "recursoshumanoslrmrobotics@gmail.com",
  ];
  return (
    <section id="contacto" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            08 · Contacto
          </div>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Construyamos <span className="text-gradient">movimiento juntos.</span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            ¿Eres fundación, EPS, aliado o simplemente alguien que quiere aportar? Escríbenos.
          </p>

          <div className="mt-10 space-y-3">
            {emails.map((e) => (
              <a
                key={e}
                href={`mailto:${e}`}
                className="group flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3 font-mono text-sm text-foreground transition-colors hover:border-cyan hover:text-cyan"
              >
                <span className="size-1.5 rounded-full bg-cyan animate-pulse-dot" />
                {e}
              </a>
            ))}
            <a
              href="tel:+573177916757"
              className="group flex items-center gap-3 rounded-md border border-cyan/40 bg-cyan/5 px-4 py-3 font-mono text-sm text-cyan transition-colors hover:bg-cyan hover:text-primary-foreground"
            >
              <span>▸</span> +57 317 791 6757
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            window.location.href = `mailto:lrmrobotics@gmail.com?subject=${encodeURIComponent(
              `Contacto web — ${String(f.get("name") ?? "")}`,
            )}&body=${encodeURIComponent(String(f.get("message") ?? ""))}`;
          }}
          className="panel space-y-4 p-6 sm:p-8"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
            ▸ Nuevo mensaje
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Nombre
              </span>
              <input
                required
                name="name"
                maxLength={100}
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-cyan"
                placeholder="Tu nombre"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Correo
              </span>
              <input
                required
                type="email"
                name="email"
                maxLength={255}
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-cyan"
                placeholder="tucorreo@ejemplo.com"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Mensaje
            </span>
            <textarea
              required
              name="message"
              maxLength={1000}
              rows={5}
              className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-cyan"
              placeholder="Cuéntanos cómo podemos colaborar."
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--cyan)] transition-transform hover:scale-[1.01]"
          >
            Contáctanos →
          </button>
        </form>
      </div>
    </section>
  );
}

/* --------------------------------- footer -------------------------------- */
function Footer({ dark }: { dark: boolean }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
          <img
            src={dark ? logoDark.url : logoLight.url}
            alt="LRM Robotics"
            className="h-8 w-8"
          />
          <div>
            <div className="font-display text-sm font-bold">LRM Robotics</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Move Beyond · Cali · Colombia
            </div>
          </div>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} · Semillero HeroBots · SENA · Minciencias
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- page --------------------------------- */
function Index() {
  const { dark, toggle } = useTheme();
  const [intro, setIntro] = useState(true);
  return (
    <>
      {intro && <IntroSplash onDone={() => setIntro(false)} />}
      <Nav dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <Problema />
        <Tecnologia />
        <Investigacion />
        <Sena />
        <Equipo />
        <Blog />
        <Glosario />
        <Contacto />
      </main>
      <Footer dark={dark} />
    </>
  );
}
