import { useEffect, useState } from "react";
import {
  Camera,
  HandHeart,
  FlaskConical,
  Users,
  Cpu,
  Sparkles,
  Expand,
  X,
} from "lucide-react";
import DotField from "@/components/visual/DotField";
import { Reveal, useParallax } from "@/components/visual/Reveal";

type Slot = {
  id: string;
  title: string;
  caption: string;
  tag: string;
  accent: string;
  ring: string;
  icon: typeof Camera;
  span?: string;
};

const SLOTS: Slot[] = [
  {
    id: "usuario",
    title: "Usuario en prueba de ajuste",
    caption: "Registro fotográfico del acople del socket y la comodidad del usuario.",
    tag: "Validación",
    accent: "text-ai",
    ring: "group-hover:border-ai/50",
    icon: HandHeart,
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    id: "prototipo",
    title: "Prototipo impreso en 3D",
    caption: "Piezas del conjunto codo recién salidas de la impresora.",
    tag: "Producción",
    accent: "text-solar",
    ring: "group-hover:border-solar/50",
    icon: Cpu,
  },
  {
    id: "pruebas",
    title: "Pruebas de señal EMG",
    caption: "Captura de la actividad muscular durante los ensayos de control.",
    tag: "Investigación",
    accent: "text-cyan",
    ring: "group-hover:border-cyan/50",
    icon: FlaskConical,
  },
  {
    id: "eventos",
    title: "Encuentros académicos",
    caption: "Socialización del proyecto en escenarios como REDCOLSI.",
    tag: "Impacto social",
    accent: "text-eco",
    ring: "group-hover:border-eco/50",
    icon: Users,
  },
  {
    id: "equipo",
    title: "El equipo en taller",
    caption: "Sesiones de modelado, ensamble y documentación técnica.",
    tag: "Proceso",
    accent: "text-volt",
    ring: "group-hover:border-volt/50",
    icon: Sparkles,
  },
];

function Placeholder({ icon: Icon, accent }: { icon: typeof Camera; accent: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-surface/80 via-background to-surface/40" />
      <div className="relative flex flex-col items-center gap-3">
        <span className={`grid size-12 place-items-center rounded-xl border border-border bg-surface/70 ${accent}`}>
          <Icon className="size-5" strokeWidth={1.6} />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          Espacio reservado
        </span>
      </div>
    </div>
  );
}

export function Galeria() {
  const [open, setOpen] = useState<Slot | null>(null);
  const parallax = useParallax<HTMLDivElement>(26);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const hero = SLOTS[0];
  const rest = SLOTS.slice(1);

  return (
    <section id="impacto" className="relative overflow-hidden border-y border-border py-28">
      {/* Campo de puntos decorativo, reactivo al cursor */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <DotField dotSpacing={22} dotRadius={1.4} bulgeStrength={38} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal variant="blur" className="max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            <Camera className="size-3.5" strokeWidth={1.8} />
            06 · Galería
          </div>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            La tecnología <span className="text-gradient">cobra vida.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Registro visual del proyecto: personas, pruebas, prototipos y validaciones.
            Este espacio se irá poblando con las fotografías reales de cada avance.
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(0,200px)] gap-4 sm:grid-cols-3">
          {/* Fotografía principal */}
          <Reveal variant="scale" className={hero.span}>
            <button
              onClick={() => setOpen(hero)}
              data-cursor="hover"
              className={`group panel relative h-full w-full overflow-hidden text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_var(--cyan)] ${hero.ring}`}
            >
              <div ref={parallax} className="absolute inset-[-12%] will-change-transform">
                <Placeholder icon={hero.icon} accent={hero.accent} />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6">
                <span className={`font-mono text-[9px] uppercase tracking-[0.25em] ${hero.accent}`}>
                  {hero.tag}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold">{hero.title}</h3>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">{hero.caption}</p>
              </div>
              <span className="absolute right-4 top-4 grid size-8 place-items-center rounded-md border border-border bg-background/70 text-muted-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                <Expand className="size-4" strokeWidth={1.6} />
              </span>
            </button>
          </Reveal>

          {rest.map((s, i) => (
            <Reveal key={s.id} variant="up" delay={120 + i * 90}>
              <button
                onClick={() => setOpen(s)}
                data-cursor="hover"
                className={`group panel relative h-full w-full overflow-hidden text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_-40px_var(--cyan)] ${s.ring}`}
              >
                <Placeholder icon={s.icon} accent={s.accent} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent p-4">
                  <span className={`font-mono text-[9px] uppercase tracking-[0.25em] ${s.accent}`}>
                    {s.tag}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold">{s.title}</h3>
                </div>
                <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-md border border-border bg-background/70 text-muted-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                  <Expand className="size-3.5" strokeWidth={1.6} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-cyan animate-pulse-dot" />
          Galería en construcción · próximamente con material fotográfico real
        </Reveal>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[95] grid place-items-center bg-background/85 p-6 backdrop-blur-xl"
          onClick={() => setOpen(null)}
        >
          <div
            className="animate-panel-in panel relative w-full max-w-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9]">
              <Placeholder icon={open.icon} accent={open.accent} />
            </div>
            <div className="border-t border-border p-6">
              <span className={`font-mono text-[9px] uppercase tracking-[0.25em] ${open.accent}`}>
                {open.tag}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold">{open.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{open.caption}</p>
            </div>
            <button
              onClick={() => setOpen(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-md border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-cyan hover:text-cyan"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
