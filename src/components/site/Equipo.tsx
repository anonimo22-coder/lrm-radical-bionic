import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Accent = "cyan" | "eco" | "volt";

type Member = {
  name: string;
  short: string;
  role: string;
  kicker: string;
  initials: string;
  accent: Accent;
  headline: string;
  bio: string;
  strengths: { title: string; desc: string }[];
  contribution: string;
  badges: { label: string; icon: string }[];
};

const accent = {
  cyan: {
    text: "text-cyan",
    border: "hover:border-cyan/60 focus-visible:border-cyan",
    grad: "from-cyan/20 via-transparent to-transparent",
    dot: "bg-cyan",
    chip: "border-cyan/30 bg-cyan/10 text-cyan",
    bar: "from-cyan to-volt",
    glow: "shadow-[0_0_80px_-20px_var(--cyan)]",
    line: "bg-gradient-to-r from-cyan to-volt",
    badge: "border-cyan/40 bg-cyan/10 text-cyan",
  },
  eco: {
    text: "text-eco",
    border: "hover:border-eco/60 focus-visible:border-eco",
    grad: "from-eco/20 via-transparent to-transparent",
    dot: "bg-eco",
    chip: "border-eco/30 bg-eco/10 text-eco",
    bar: "from-eco to-cyan",
    glow: "shadow-[0_0_80px_-20px_var(--eco)]",
    line: "bg-gradient-to-r from-eco to-cyan",
    badge: "border-eco/40 bg-eco/10 text-eco",
  },
  volt: {
    text: "text-volt",
    border: "hover:border-volt/60 focus-visible:border-volt",
    grad: "from-volt/20 via-transparent to-transparent",
    dot: "bg-volt",
    chip: "border-volt/30 bg-volt/10 text-volt",
    bar: "from-volt to-cyan",
    glow: "shadow-[0_0_80px_-20px_var(--volt)]",
    line: "bg-gradient-to-r from-volt to-cyan",
    badge: "border-volt/40 bg-volt/10 text-volt",
  },
} satisfies Record<Accent, Record<string, string>>;

export const TEAM: Member[] = [
  {
    name: "Yuliana Alexandra Marín",
    short: "Yuliana Marín",
    role: "Liderazgo · Visión e impacto social",
    kicker: "Visionaria",
    initials: "YM",
    accent: "eco",
    headline: "Imagina el futuro de la prótesis y después construye el plan para alcanzarlo.",
    bio: "Impulsa la innovación de LRM Robotics desde una convicción simple: la tecnología solo vale si transforma vidas. Explora tendencias, formula conceptos nuevos y los aterriza en planes ejecutables, uniendo creatividad funcional con una organización impecable. Su liderazgo es un motor de motivación para el equipo, y su brújula ética —honestidad, respeto y solidaridad— define el propósito de cada decisión del proyecto.",
    strengths: [
      { title: "Innovación con propósito", desc: "Convierte la curiosidad en conceptos aplicables al diseño de la prótesis." },
      { title: "Estructura y organización", desc: "Ordena ideas dispersas en planes claros con tiempos y responsables." },
      { title: "Empatía profunda", desc: "Sitúa el factor humano en el centro de cada decisión técnica." },
      { title: "Visión de futuro", desc: "Proyecta el impacto del proyecto más allá del entregable inmediato." },
    ],
    contribution:
      "Orienta la dirección estratégica y el propósito social del proyecto, articulando la investigación con el impacto que LRM busca generar en personas con discapacidad de miembro superior en Colombia.",
    badges: [
      { label: "Impacto Social", icon: "❤️" },
      { label: "Investigación", icon: "🧠" },
      { label: "Documentación", icon: "📄" },
    ],
  },
  {
    name: "Angie Yulieth Romero",
    short: "Angie Romero",
    role: "Escritora técnica · Analista documental",
    kicker: "Metodológica",
    initials: "AR",
    accent: "cyan",
    headline: "Transforma la complejidad técnica en documentación clara, coherente y verificable.",
    bio: "Es la voz escrita y el ancla metodológica de LRM Robotics. Convierte procesos complejos en documentos estructurados que cualquier lector —académico, aliado o usuario— puede entender sin perder rigor. Frente a la lluvia de ideas, aporta enfoque analítico y coherencia; su curiosidad constante mantiene la documentación del proyecto actualizada y a la vanguardia. Escucha con profundidad y construye un entorno de trabajo armonioso basado en respeto y tolerancia.",
    strengths: [
      { title: "Redacción estratégica", desc: "Estándar editorial alto en informes, formatos y comunicación del proyecto." },
      { title: "Coherencia documental", desc: "Garantiza que cada proceso y mensaje mantenga una línea lógica única." },
      { title: "Análisis y enfoque", desc: "Aterriza la conversación técnica con rigor y estructura." },
      { title: "Aprendizaje continuo", desc: "Actualiza métodos y referencias para sostener la calidad investigativa." },
    ],
    contribution:
      "Consolida la documentación científica y administrativa del proyecto: estructura los informes de investigación, sostiene la trazabilidad del proceso y asegura la coherencia de la narrativa técnica de LRM.",
    badges: [
      { label: "Documentación", icon: "📄" },
      { label: "Investigación", icon: "🧠" },
    ],
  },
  {
    name: "Kevin Olivera",
    short: "Kevin Olivera",
    role: "Ingeniería · Modelado CAD",
    kicker: "Constructor",
    initials: "KO",
    accent: "volt",
    headline: "Diseña y programa soluciones prácticas que se traducen en movimiento real.",
    bio: "Es el motor técnico y creativo que convierte problemas del entorno en soluciones digitales funcionales. Modela en CAD las piezas de la prótesis, explora nuevas herramientas y códigos, y resuelve con agilidad los retos de diseño y programación. No desarrolla por la tecnología en sí: desarrolla para facilitar el día a día de las personas. Reservado pero sumamente efectivo, deja que el correcto funcionamiento de sus entregables hable por él.",
    strengths: [
      { title: "Modelado 3D y CAD", desc: "Traduce requerimientos biomecánicos en geometrías fabricables." },
      { title: "Programación aplicada", desc: "Resuelve la lógica del sistema con criterio analítico e independiente." },
      { title: "Creatividad técnica", desc: "Explora herramientas nuevas para mantener el diseño a la vanguardia." },
      { title: "Tecnología con propósito", desc: "Mide cada solución por su utilidad real para el usuario final." },
    ],
    contribution:
      "Lleva la prótesis del concepto al modelo digital: diseña las piezas del conjunto del codo, define tolerancias y valida que cada componente sea imprimible en 3D con materiales reciclados.",
    badges: [
      { label: "CAD", icon: "📐" },
      { label: "Ingeniería", icon: "⚙" },
    ],
  },
  {
    name: "Juan Martín Lasso",
    short: "Juan Lasso",
    role: "Ingeniería · Dirección tecnológica",
    kicker: "Estratega",
    initials: "JL",
    accent: "volt",
    headline: "Integra investigación, diseño y producción en una sola arquitectura de procesos.",
    bio: "Es la columna vertebral operativa y metodológica de LRM Robotics. Analiza los flujos internos, detecta fallas y diseña estructuras lógicas que transforman el caos en sistemas organizados. Se mueve con naturalidad en entornos digitales y usa la tecnología como herramienta para planificar y supervisar el proyecto completo. Su sentido del deber y su disciplina son la garantía de que cada entregable cumpla su propósito.",
    strengths: [
      { title: "Arquitectura de procesos", desc: "Crea metodologías de trabajo claras y replicables para todo el equipo." },
      { title: "Dirección tecnológica", desc: "Articula investigación, diseño y producción bajo una misma visión." },
      { title: "Planificación", desc: "Convierte objetivos amplios en rutas de ejecución medibles." },
      { title: "Trazabilidad", desc: "Documenta el porqué de cada decisión técnica del proyecto." },
    ],
    contribution:
      "Lidera la integración de las áreas del proyecto y define los estándares metodológicos con los que se investiga, se diseña y se documenta la prótesis LRM.",
    badges: [
      { label: "Ingeniería", icon: "⚙" },
      { label: "Documentación", icon: "📄" },
      { label: "Investigación", icon: "🧠" },
    ],
  },
  {
    name: "Danna Gabriela Vela Medellín",
    short: "Danna Vela",
    role: "Usuario colaborador · Participante del proceso investigativo",
    kicker: "La voz del usuario",
    initials: "DV",
    accent: "eco",
    headline: "Aporta la experiencia real que valida cada decisión de diseño de la prótesis.",
    bio: "Su participación en el proceso investigativo convierte la teoría en criterio. A través de una entrevista semiestructurada, Danna compartió su experiencia cotidiana con una discapacidad física congénita en extremidad superior y señaló con claridad qué debe priorizar una prótesis para ser realmente útil: comodidad, facilidad de uso y mantenimiento sencillo. También expuso las barreras económicas y de desplazamiento que impiden el acceso, y valoró positivamente el uso de materiales reciclables siempre que su funcionamiento y durabilidad estén verificados.",
    strengths: [
      { title: "Validación con usuario real", desc: "Contrasta las hipótesis técnicas con la vida cotidiana." },
      { title: "Criterios de diseño", desc: "Comodidad, facilidad de uso y mantenimiento sencillo como prioridades." },
      { title: "Barreras de acceso", desc: "Evidencia los costos de desplazamiento y aprendizaje, no solo del dispositivo." },
      { title: "Responsabilidad ética", desc: "Advierte sobre no generar expectativas sin funcionamiento verificado." },
    ],
    contribution:
      "Participa como usuario colaborador dentro del proceso investigativo: su testimonio orienta las prioridades funcionales del diseño y sostiene la validación conceptual del proyecto. No integra el equipo técnico.",
    badges: [
      { label: "Usuario", icon: "👤" },
      { label: "Investigación", icon: "🧠" },
      { label: "Impacto Social", icon: "❤️" },
    ],
  },
];

function MemberModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const a = accent[member.accent];
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      style={{ animation: "fadeIn 150ms ease both" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Perfil de ${member.short}`}
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background ${a.glow}`}
        style={{ animation: "modalIn 200ms cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* Top accent line */}
        <div className={`h-[3px] w-full rounded-t-2xl ${a.line}`} />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:border-cyan hover:text-cyan"
        >
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-6 pb-5 pt-6">
          <div className="flex gap-5">
            {/* Photo placeholder */}
            <div className="shrink-0">
              <div className="relative size-24 sm:size-28 overflow-hidden rounded-xl border-2 border-dashed border-border bg-surface/60">
                {/* Grid background */}
                <div className="absolute inset-0 bg-grid opacity-20" />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${a.grad}`} />
                {/* Initials fallback */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-gradient leading-none">
                    {member.initials}
                  </span>
                  <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-muted-foreground/50">
                    foto próx.
                  </span>
                </div>
                {/* Bottom line */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
              </div>
            </div>

            {/* Name / role / kicker */}
            <div className="min-w-0 flex-1 pt-1">
              <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] ${a.chip}`}>
                <span className={`size-1.5 rounded-full ${a.dot} animate-pulse-dot`} />
                {member.kicker}
              </div>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold leading-tight">
                {member.name}
              </h3>
              <p className={`mt-1 font-mono text-[10px] uppercase leading-relaxed tracking-widest ${a.text}`}>
                {member.role}
              </p>
              {/* Badges */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {member.badges.map((b) => (
                  <span
                    key={b.label}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${a.badge}`}
                  >
                    <span aria-hidden>{b.icon}</span>
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Headline quote */}
          <blockquote className="mt-5 rounded-lg border border-border/50 bg-surface/40 px-5 py-3.5">
            <p className={`font-display text-sm italic leading-relaxed ${a.text}`}>
              «{member.headline}»
            </p>
          </blockquote>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-border/50" />

        {/* Body */}
        <div className="space-y-5 px-6 py-5">
          {/* Bio */}
          <div>
            <div className={`mb-2 font-mono text-[9px] uppercase tracking-[0.3em] ${a.text}`}>
              Perfil
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
          </div>

          {/* Strengths */}
          <div>
            <div className={`mb-3 font-mono text-[9px] uppercase tracking-[0.3em] ${a.text}`}>
              Fortalezas
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {member.strengths.map((s) => (
                <div key={s.title} className="rounded-lg border border-border/60 bg-surface/50 p-3.5">
                  <div className="flex items-center gap-2">
                    <span className={`size-1.5 shrink-0 rounded-full ${a.dot}`} />
                    <span className="text-sm font-semibold leading-tight">{s.title}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution */}
          <div className="relative overflow-hidden rounded-lg border border-border/60 bg-surface/40 p-4">
            <div className={`absolute inset-y-0 left-0 w-[3px] rounded-l-lg ${a.line}`} />
            <div className={`pl-3 font-mono text-[9px] uppercase tracking-[0.3em] ${a.text}`}>
              Aporte al proyecto
            </div>
            <p className="mt-2 pl-3 text-sm leading-relaxed text-foreground/90">{member.contribution}</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.96) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
      `}</style>
    </div>,
    document.body,
  );
}

export function Equipo() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const m = openIdx === null ? null : TEAM[openIdx];

  return (
    <section id="equipo" className="relative overflow-hidden border-y border-border bg-surface/40 py-28">
      <div className="pointer-events-none absolute inset-0 aurora opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            05 · Equipo
          </div>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Personas detrás <span className="text-gradient">del movimiento.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un equipo de investigadores del semillero <span className="text-eco">HeroBots</span>, en
            Soacha, Cundinamarca, dedicado a la investigación, la documentación, el modelado CAD y el
            diseño conceptual de la prótesis LRM, con formación empresarial en el{" "}
            <span className="text-volt">SENA</span>.
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            ▸ Haz clic en una tarjeta para ver el perfil completo
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TEAM.map((mem, i) => {
            const a = accent[mem.accent];
            return (
              <article
                key={mem.name}
                tabIndex={0}
                role="button"
                aria-label={`Ver perfil de ${mem.short}`}
                onClick={() => setOpenIdx(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpenIdx(i))}
                className={`group panel card-sheen relative cursor-pointer p-5 transition-all duration-200 hover:-translate-y-1.5 focus:outline-none ${a.border}`}
              >
                {/* Top gradient bar on hover */}
                <div className={`absolute inset-x-0 top-0 h-[2px] rounded-t-[inherit] bg-gradient-to-r ${a.bar} opacity-0 transition-opacity duration-200 group-hover:opacity-100`} />

                {/* Avatar */}
                <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-navy">
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${a.grad} opacity-0 transition-opacity duration-200 group-hover:opacity-100`} />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-5xl font-bold text-gradient transition-transform duration-200 group-hover:scale-105">
                      {mem.initials}
                    </span>
                  </div>
                  <div className={`absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.15em] backdrop-blur ${a.chip}`}>
                    <span className={`size-1 rounded-full ${a.dot} animate-pulse-dot`} />
                    {mem.kicker}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
                </div>

                {/* Info */}
                <div className={`font-mono text-[9px] uppercase leading-relaxed tracking-widest ${a.text}`}>
                  {mem.role}
                </div>
                <div className="mt-1 font-display text-base font-semibold leading-snug">{mem.short}</div>

                {/* Badges */}
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {mem.badges.map((b) => (
                    <span
                      key={b.label}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/70 px-1.5 py-0.5 text-[9px] text-muted-foreground"
                    >
                      <span aria-hidden>{b.icon}</span>
                      {b.label}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className={`mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-semibold ${a.text}`}>
                  Ver perfil
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {m !== null && (
        <MemberModal member={m} onClose={() => setOpenIdx(null)} />
      )}
    </section>
  );
}
