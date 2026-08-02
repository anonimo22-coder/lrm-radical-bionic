import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoDark from "@/assets/logo-dark.png.asset.json";
import logoLight from "@/assets/logo-light.png.asset.json";
import lrmLogo from "@/assets/lrm-logo.png.asset.json";
import heroArm from "@/assets/hero-arm.jpg.asset.json";
import { MegaNav } from "@/components/site/MegaNav";
import { Equipo } from "@/components/site/Equipo";
import { Blog } from "@/components/site/Blog";
import { Galeria } from "@/components/site/Galeria";
import { PlanosCad } from "@/components/site/PlanosCad";
import { Relacion, CanvasMaqueta, Asesores } from "@/components/site/SenaExtras";
import { CursorFX } from "@/components/visual/CursorFX";
import { useMagnetic } from "@/components/visual/Reveal";
import Ferrofluid from "@/components/visual/Ferrofluid";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LRM Robotics — Move Beyond · Prótesis biónicas radicales" },
      {
        name: "description",
        content:
          "Prótesis biónicas de brazo desarrolladas con investigación, modelado CAD y economía circular. Semillero HeroBots · Soacha, Cundinamarca · Colombia.",
      },
      { property: "og:title", content: "LRM Robotics — Move Beyond · Prótesis biónicas radicales" },
      {
        property: "og:description",
        content:
          "Prótesis biónicas de brazo desarrolladas con investigación, modelado CAD y economía circular. Semillero HeroBots · Soacha, Cundinamarca · Colombia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroArm.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroArm.url },
      { name: "twitter:title", content: "LRM Robotics — Move Beyond · Prótesis biónicas radicales" },
      {
        name: "twitter:description",
        content:
          "Prótesis biónicas de brazo desarrolladas con investigación, modelado CAD y economía circular. Semillero HeroBots · Soacha, Cundinamarca · Colombia.",
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
        <div className="relative size-40 sm:size-48">
          <div className="absolute inset-0 rounded-full bg-cyan/25 blur-3xl animate-pulse-dot" />
          <img
            src={lrmLogo.url}
            alt="LRM Robotics"
            className="relative size-full object-contain animate-assemble drop-shadow-[0_0_25px_var(--cyan)]"
          />
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
/* La navegación vive en @/components/site/MegaNav */


/* ---------------------------------- hero --------------------------------- */
function Hero() {
  const magnetPrimary = useMagnetic<HTMLAnchorElement>(10);
  const magnetSecondary = useMagnetic<HTMLAnchorElement>(8);
  return (
    <section id="top" className="relative overflow-hidden bg-hero">
      {/* Ferrofluid — gota magnética reactiva al cursor (WebGL / ogl) */}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <Ferrofluid colorA="#0B4A6F" colorB="#67E8F9" blobs={7} scale={1.15} opacity={0.9} />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pt-20 pb-32 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-28">
        <div className="animate-assemble">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1">
            <span className="size-1.5 rounded-full bg-cyan animate-pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
              Biónica radical · Soacha · Colombia
            </span>
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Move <span className="text-gradient">Beyond</span>
            <span className="mt-3 block text-2xl font-medium text-muted-foreground sm:text-3xl">
              Tecnología humana sin límites ni desperdicios.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Investigamos y desarrollamos prótesis biónicas de brazo{" "}
            <span className="text-foreground">basadas en economía circular, modelado CAD e IA adaptativa</span>,
            desde <span className="text-foreground">HeroBots</span>, el semillero investigativo de la
            Institución Educativa Soacha Para Vivir Mejor, en Soacha, Cundinamarca. Nuestro proceso de
            formación empresarial se desarrolla con el <span className="text-foreground">SENA</span>.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              ref={magnetPrimary}
              href="#tecnologia"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--cyan)] transition-shadow hover:shadow-[0_16px_50px_-8px_var(--cyan)]"
            >
              Conoce nuestra tecnología
              <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              ref={magnetSecondary}
              href="#investigacion"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-cyan"
            >
              Ver la investigación
            </a>

          </div>
          <div className="mt-12 flex gap-8 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <div>
              <div className="text-cyan">▸ &lt; 300 ms</div>
              <div className="mt-1">Latencia EMG objetivo</div>
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

        {/* Logo protagonista — sin fondo, animación premium */}
        <div className="relative grid place-items-center">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/25 blur-[120px] animate-pulse-dot" />
            <div className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[80px]" />
          </div>
          <img
            src={lrmLogo.url}
            alt="Logotipo LRM Robotics"
            width={800}
            height={800}
            className="relative w-full max-w-[520px] object-contain animate-assemble drop-shadow-[0_0_40px_color-mix(in_oklab,var(--cyan)_60%,transparent)]"
          />
          <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            <span className="size-1.5 rounded-full bg-cyan animate-pulse-dot" />
            LRM · Move Beyond
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
              y superar los 425 días de espera. Es tiempo que las personas pierden esperando
              recuperar algo tan básico como abrir una puerta o abrazar a alguien.
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
      desc: "Prótesis diseñadas para fabricarse con polímeros reciclados (PET y HDPE) mediante impresión 3D.",
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
      desc: "Control por señales mioeléctricas (EMG) con latencia objetivo menor a 300 ms. Aprende del usuario.",
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
  return (
    <section id="tecnologia" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            02 · Nuestra propuesta
          </div>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Tres pilares. <span className="text-gradient">Un mismo propósito.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ingeniería con propósito social: cada componente propuesto para la prótesis LRM
            responde a una pregunta humana antes que a una técnica.
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
      </div>

    </section>
  );
}

/* --------------------------- investigación ------------------------------- */
function Investigacion() {
  const objectives = [
    {
      title: "Fundamentar el diseño con base en usuarios reales",
      desc: "Analizar las necesidades funcionales y contextuales de personas con amputación de miembro superior para orientar el diseño de la prótesis desde la experiencia del usuario.",
    },
    {
      title: "Categorizar las barreras del sistema de salud colombiano",
      desc: "Identificar y clasificar los obstáculos económicos, administrativos y tecnológicos que dificultan el acceso a prótesis funcionales en el país.",
    },
    {
      title: "Investigar los parámetros técnicos y biomecánicos",
      desc: "Estudiar los rangos articulares, cargas mecánicas y materiales requeridos para el diseño de una prótesis de brazo funcional y segura.",
    },
    {
      title: "Examinar la IA adaptativa y el sistema energético híbrido",
      desc: "Explorar arquitecturas de control mioeléctrico basadas en IA y evaluar la viabilidad de un sistema energético híbrido (batería + supercapacitor + solar).",
    },
  ];
  return (
    <section id="investigacion" className="border-y border-border bg-surface/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
              03 · Investigación
            </div>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Semillero <span className="text-gradient">HeroBots</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              LRM Robotics es un proyecto de investigación desarrollado en{" "}
              <span className="text-foreground">Soacha, Cundinamarca</span>, dentro del semillero
              HeroBots. Trabajamos con rigor científico para proponer una prótesis biónica de brazo
              ecosostenible y accesible.
            </p>

            {/* Asesor */}
            <div className="mt-8 panel p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                ▸ Asesor del proyecto
              </div>
              <div className="mt-3 font-display text-xl font-semibold">
                Jorge Ignacio Fiquitiva
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Todo el proceso investigativo ha sido guiado por nuestro asesor, cuyo
                acompañamiento ha sido fundamental para{" "}
                <span className="text-foreground">estructurar la investigación</span>,{" "}
                <span className="text-foreground">formular el problema</span>,{" "}
                <span className="text-foreground">construir la metodología</span>,{" "}
                <span className="text-foreground">fortalecer el rigor científico</span> y{" "}
                <span className="text-foreground">orientar el desarrollo tecnológico</span> del
                proyecto.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Problema */}
            <div className="panel p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                Problema de investigación
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                En Colombia, las personas con discapacidad motriz enfrentan enormes barreras para
                acceder a prótesis funcionales debido a altos costos, dependencia tecnológica
                extranjera, tiempos de espera superiores a{" "}
                <span className="text-foreground">425 días</span>, barreras económicas,
                obsolescencia programada, dependencia de importaciones y ausencia de modelos de
                economía circular en el sector.
              </p>
            </div>

            {/* Pregunta */}
            <div className="panel relative overflow-hidden p-6">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan via-primary to-transparent" />
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                Pregunta de investigación
              </div>
              <p className="mt-3 font-display text-base italic leading-relaxed text-foreground">
                «¿De qué manera una prótesis robótica ecosostenible asistida por inteligencia
                artificial optimiza la autonomía y accesibilidad frente al modelo convencional de
                suministro?»
              </p>
            </div>

            {/* Objetivo general */}
            <div className="panel p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                Objetivo general
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Diseñar conceptualmente una prótesis robótica de brazo ecosostenible, asistida por
                inteligencia artificial y fundamentada en principios de economía circular, que
                contribuya a mejorar la autonomía y accesibilidad de las personas con amputación
                de miembro superior en Colombia.
              </p>
            </div>

            {/* Objetivos específicos */}
            <div>
              <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                Objetivos específicos
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {objectives.map((o, i) => (
                  <div
                    key={i}
                    className="group panel p-5 transition-all hover:-translate-y-1 hover:border-cyan"
                  >
                    <div className="font-mono text-[10px] text-cyan">
                      0{i + 1}
                    </div>
                    <div className="mt-2 font-display text-sm font-semibold leading-snug">
                      {o.title}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {o.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hipótesis */}
            <div className="panel relative overflow-hidden p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-transparent" />
              <div className="relative">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                  ▸ Hipótesis
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  El desarrollo de una prótesis fabricada con materiales reciclados, IA adaptativa
                  y energía híbrida puede ofrecer un desempeño funcional{" "}
                  <span className="text-cyan">comparable al de dispositivos comerciales
                  importados</span>, reduciendo significativamente los costos y las barreras de
                  acceso para las personas con amputación de miembro superior en Colombia.
                </p>
              </div>
            </div>
          </div>
        </div>
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
    {
      year: "2025",
      label: "Nacimiento de la idea",
      desc: "La idea de LRM nace dentro del SENA como respuesta a una necesidad social real.",
    },
    {
      year: "2025",
      label: "Consolidación del proyecto",
      desc: "Consolidación del proyecto empresarial y desarrollo del marco conceptual.",
    },
    {
      year: "2026",
      label: "Desarrollo investigativo-empresarial",
      desc: "Modelo organizacional, estructura administrativa, documentación, fortalecimiento del modelo de negocio y desarrollo técnico.",
    },
    {
      year: "2027+",
      label: "Escalamiento",
      desc: "Expansión tecnológica, fortalecimiento de la investigación y nuevas líneas de innovación.",
    },
  ];
  const docs = [
    "Perfiles de cargo",
    "Manuales",
    "Procesos",
    "Formatos",
    "Diagramas",
    "Políticas",
    "Documentos administrativos",
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
              LRM Robotics es también nuestra apuesta empresarial dentro del SENA: una compañía
              privada e independiente en construcción, con modelo Canvas, misión, visión y una
              estructura administrativa propia.
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
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold">
                Simulación del proceso de selección y vinculación
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Ejercicio académico desarrollado dentro del SENA como evidencia del proceso de
                Recursos Humanos. No corresponde a una convocatoria ni a un proceso real de
                contratación.
              </p>
            </div>
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
        </div>

        {/* Documentación */}
        <div className="mt-10 panel p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                ▸ Documentación
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold">
                Repositorio documental del proceso
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Espacio preparado para incorporar posteriormente los documentos desarrollados
                durante nuestro proceso de Recursos Humanos y de estructuración empresarial.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Próximamente
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {docs.map((d) => (
              <div
                key={d}
                className="flex items-center justify-between rounded-md border border-dashed border-border bg-surface/40 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-cyan/40"
              >
                <span>{d}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-cyan/70">
                  —
                </span>
              </div>
            ))}
          </div>
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

/* -------------------- equipo y blog: componentes dedicados ---------------- */


/* -------------------------------- glosario ------------------------------- */
const GLOSSARY = [
  {
    term: "Señales EMG (mioeléctricas)",
    def: "Pequeñas señales eléctricas que producen tus músculos al contraerse. La prótesis las «escucha» para saber cuándo abrir o cerrar la mano.",
  },
  {
    term: "Economía circular",
    def: "Un modelo donde nada se desperdicia: los materiales usados vuelven a la cadena productiva. En LRM, plásticos reciclados están pensados para convertirse en piezas nuevas.",
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
    term: "Semillero de investigación",
    def: "Espacio académico donde estudiantes desarrollan proyectos de investigación con acompañamiento de un asesor. LRM pertenece al semillero HeroBots.",
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
            ¿Eres fundación, aliado académico o simplemente alguien que quiere aportar al proyecto?
            Escríbenos.
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
              Move Beyond · Soacha · Cundinamarca · Colombia
            </div>
          </div>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} · Semillero HeroBots · SENA
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
      <CursorFX />
      <MegaNav dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <Problema />
        <Tecnologia />
        <Investigacion />
        <Relacion />
        <Sena />
        <CanvasMaqueta />
        <Asesores />
        <Equipo />
        <Blog />
        <Galeria />
        <PlanosCad />
        <Glosario />
        <Contacto />
      </main>

      <Footer dark={dark} />
    </>
  );
}

