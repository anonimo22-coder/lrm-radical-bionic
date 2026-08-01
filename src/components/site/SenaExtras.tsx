import { useRef, useState } from "react";
import canvasImg from "@/assets/modelo-canvas.jpeg.asset.json";
import maquetaImg from "@/assets/maqueta-lrm.jpeg.asset.json";

/* --------------------------- relación HeroBots ⇄ SENA --------------------------- */
export function Relacion() {
  const cards = [
    {
      tag: "Semillero de investigación",
      title: "HeroBots",
      accentText: "text-eco",
      chip: "border-eco/30 bg-eco/10 text-eco",
      bar: "from-eco to-cyan",
      desc: "Semillero investigativo de la Institución Educativa Soacha Para Vivir Mejor. Es el espacio científico donde nace y se sostiene LRM Robotics: allí se formula el problema de investigación, se construye la metodología, se estudian los parámetros biomecánicos y se valida el diseño con usuarios reales.",
      bullets: ["Pregunta y objetivos de investigación", "Metodología y rigor científico", "Modelado CAD y validación con usuario"],
    },
    {
      tag: "Proceso de formación",
      title: "SENA",
      accentText: "text-volt",
      chip: "border-volt/30 bg-volt/10 text-volt",
      bar: "from-volt to-ai",
      desc: "Es el proceso de formación empresarial que le da estructura organizacional al proyecto. Allí se desarrolla el modelo de negocio, la documentación administrativa y la simulación de los procesos de una empresa real.",
      bullets: ["Modelo de negocio y Canvas", "Estructura administrativa y documental", "Simulación académica de RR.HH."],
    },
  ];

  return (
    <section id="relacion" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 aurora opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            ▸ Cómo se articula el proyecto
          </div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Dos procesos, <span className="text-gradient">un mismo proyecto.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            LRM Robotics avanza sobre dos vías complementarias y con el mismo peso: la investigación
            científica del semillero HeroBots —de la Institución Educativa Soacha Para Vivir Mejor— y
            la formación empresarial del SENA. HeroBots no pertenece al SENA: son procesos distintos
            que se articulan en un solo proyecto.

        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {cards.map((c, i) => (
            <div key={c.title} className={i === 1 ? "order-3 lg:order-none" : ""}>
              <article className="panel card-sheen relative h-full overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-1">
                <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${c.bar}`} />
                <span className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${c.chip}`}>
                  {c.tag}
                </span>
                <h3 className={`mt-4 font-display text-2xl font-bold ${c.accentText}`}>{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                <ul className="mt-5 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                      <span className={`mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r ${c.bar}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
          <div className="order-2 hidden items-center justify-center lg:flex">
            <div className="relative grid size-14 place-items-center rounded-full border border-border bg-surface">
              <span className="absolute inset-0 rounded-full bg-cyan/20 blur-xl" />
              <span className="relative font-display text-lg font-bold text-gradient">+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- canvas + maqueta ------------------------------- */
type Visual = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  src: string;
  alt: string;
  chip: string;
  bar: string;
  points: { label: string; text: string }[];
};

const VISUALS: Visual[] = [
  {
    id: "canvas",
    tag: "Modelo de negocio",
    title: "Modelo Canvas",
    desc: "La estructura económica y estratégica de LRM Robotics condensada en un solo lienzo: aliados, actividades clave, propuesta de valor, segmentos y costos.",
    src: canvasImg.url,
    alt: "Modelo Canvas de LRM Robotics con socios clave, propuesta de valor, segmentos y estructura de costos",
    chip: "border-eco/30 bg-eco/10 text-eco",
    bar: "from-eco to-cyan",
    points: [
      { label: "Propuesta de valor", text: "Prótesis biónica accesible fabricada con materiales reciclados." },
      { label: "Segmento", text: "Personas con amputación de miembro superior, estratos 1 a 3." },
      { label: "Territorio", text: "Soacha, Cundinamarca y zonas rurales cercanas." },
      { label: "Costo estimado", text: "Producción proyectada cercana a $620.000 – $650.000 COP por unidad." },
    ],
  },
  {
    id: "maqueta",
    tag: "Planta de manufactura",
    title: "Maqueta comercial",
    desc: "La visualización tridimensional de la planta LRM: una fábrica pensada como circuito circular, donde el residuo plástico entra por un extremo y sale convertido en movimiento.",
    src: maquetaImg.url,
    alt: "Render tridimensional de la planta de LRM Robotics con zonas de producción, laboratorio de IA y experiencia de usuario",
    chip: "border-volt/30 bg-volt/10 text-volt",
    bar: "from-volt to-ai",
    points: [
      { label: "Producción circular", text: "Zona de reciclaje y transformación del material en filamento." },
      { label: "Laboratorio de IA", text: "Entrenamiento y calibración del control mioeléctrico adaptativo." },
      { label: "Laboratorio de electrónica", text: "Ensamble de sensores, controladores y sistema energético." },
      { label: "Centro de experiencia", text: "Espacio de ajuste, acompañamiento y validación con el usuario." },
      { label: "Energía solar", text: "Zona de captación que alimenta la operación de la planta." },
    ],
  },
];

function VisualBlock({ v, onZoom }: { v: Visual; onZoom: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setT({
      x: ((e.clientX - r.left) / r.width - 0.5) * -18,
      y: ((e.clientY - r.top) / r.height - 0.5) * -18,
    });
  };

  return (
    <article className="panel card-sheen group relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-r ${v.bar}`} />
      <div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={() => setT({ x: 0, y: 0 })}
        onClick={onZoom}
        role="button"
        tabIndex={0}
        aria-label={`Ampliar ${v.title}`}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onZoom())}
        className="relative aspect-[16/10] cursor-zoom-in overflow-hidden bg-navy"
      >
        <img
          src={v.src}
          alt={v.alt}
          loading="lazy"
          className="absolute inset-0 size-full scale-110 object-cover transition-transform duration-500 ease-out group-hover:scale-125"
          style={{ transform: `translate3d(${t.x}px, ${t.y}px, 0) scale(1.12)` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
        <span className={`absolute left-4 top-4 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur ${v.chip}`}>
          {v.tag}
        </span>
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-medium backdrop-blur transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" strokeLinecap="round" />
          </svg>
          Ampliar
        </span>
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="font-display text-xl font-semibold">{v.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
        <div className="mt-5 grid gap-2.5">
          {v.points.map((p) => (
            <div key={p.label} className="flex items-start gap-3 rounded-md border border-border/70 bg-surface/40 p-3 transition-colors hover:border-cyan/40">
              <span className={`mt-1 size-1.5 shrink-0 rounded-full bg-gradient-to-r ${v.bar}`} />
              <span className="min-w-0 text-xs leading-relaxed">
                <span className="font-semibold">{p.label}</span>
                <span className="text-muted-foreground"> — {p.text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function CanvasMaqueta() {
  const [zoom, setZoom] = useState<Visual | null>(null);

  return (
    <section id="canvas" className="border-y border-border bg-surface/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            ▸ Evidencias empresariales
          </div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            El negocio y la planta, <span className="text-gradient">visualizados.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dos entregables del proceso de formación empresarial que traducen la estrategia de LRM
            Robotics en imágenes concretas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {VISUALS.map((v) => (
            <VisualBlock key={v.id} v={v} onZoom={() => setZoom(v)} />
          ))}
        </div>
      </div>

      {zoom && (
        <div className="fixed inset-0 z-[95] grid place-items-center p-4 sm:p-8">
          <button
            aria-label="Cerrar imagen"
            onClick={() => setZoom(null)}
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
          />
          <div className="animate-panel-in relative max-h-full w-full max-w-5xl overflow-hidden rounded-xl border border-border bg-background">
            <button
              onClick={() => setZoom(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-md border border-border bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:border-cyan hover:text-cyan"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            <img src={zoom.src} alt={zoom.alt} className="max-h-[80vh] w-full object-contain" />
            <div className="border-t border-border px-6 py-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
                {zoom.tag}
              </div>
              <div className="mt-1 font-display text-lg font-semibold">{zoom.title}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------------------------- asesores ---------------------------------- */
export function Asesores() {
  const advisors = [
    {
      name: "Jorge Ignacio Fiquitiva",
      role: "Asesor de investigación · Semillero HeroBots",
      period: "Acompañamiento investigativo",
      chip: "border-cyan/30 bg-cyan/10 text-cyan",
      bar: "from-cyan to-volt",
      desc: "Ha guiado todo el proceso científico del proyecto: la estructuración de la investigación, la formulación del problema, la construcción de la metodología y el fortalecimiento del rigor con el que se sustenta LRM Robotics.",
    },
    {
      name: "Efrén Camilo Vera Lozano",
      role: "Instructor SENA · Etapa 2025",
      period: "2025",
      chip: "border-eco/30 bg-eco/10 text-eco",
      bar: "from-eco to-cyan",
      desc: "Acompañó la etapa inicial del proyecto empresarial durante 2025, orientando la consolidación de la idea de negocio y las primeras bases de la estructura organizacional de LRM Robotics.",
    },
    {
      name: "Fredy Enrique Fetecua Peña",
      role: "Instructor SENA · Etapa actual",
      period: "Actualidad",
      chip: "border-volt/30 bg-volt/10 text-volt",
      bar: "from-volt to-ai",
      desc: "Acompaña la etapa actual del proceso de formación empresarial, fortaleciendo el modelo de negocio, la documentación administrativa y la proyección organizacional del proyecto.",
    },
  ];

  return (
    <section id="asesoria" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            ▸ Asesoría y acompañamiento
          </div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Quienes <span className="text-gradient">guían el proceso.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            El avance de LRM Robotics se apoya en el acompañamiento académico del semillero y de los
            instructores del proceso de formación empresarial.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {advisors.map((a) => (
            <article
              key={a.name}
              className="panel card-sheen group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan/60"
            >
              <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${a.bar} opacity-50 transition-opacity duration-500 group-hover:opacity-100`} />
              <span className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${a.chip}`}>
                {a.period}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{a.name}</h3>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {a.role}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
