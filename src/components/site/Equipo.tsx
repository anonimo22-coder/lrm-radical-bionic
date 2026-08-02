import { useEffect, useState } from "react";

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
    border: "hover:border-cyan",
    ring: "group-hover:ring-glow-volt",
    grad: "from-cyan/25 via-transparent to-transparent",
    dot: "bg-cyan",
    chip: "border-cyan/30 bg-cyan/10 text-cyan",
    bar: "from-cyan to-volt",
  },
  eco: {
    text: "text-eco",
    border: "hover:border-eco",
    ring: "group-hover:ring-glow-eco",
    grad: "from-eco/25 via-transparent to-transparent",
    dot: "bg-eco",
    chip: "border-eco/30 bg-eco/10 text-eco",
    bar: "from-eco to-cyan",
  },
  volt: {
    text: "text-volt",
    border: "hover:border-volt",
    ring: "group-hover:ring-glow-volt",
    grad: "from-volt/25 via-transparent to-transparent",
    dot: "bg-volt",
    chip: "border-volt/30 bg-volt/10 text-volt",
    bar: "from-volt to-cyan",
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

export function Equipo() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const m = openIdx === null ? null : TEAM[openIdx];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIdx(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openIdx !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIdx]);

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
            ▸ Pasa el cursor o toca una tarjeta para abrir su perfil
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                className={`group panel card-sheen relative cursor-pointer p-6 transition-all duration-500 hover:-translate-y-2 focus:outline-none focus-visible:border-cyan ${a.border} ${a.ring}`}
              >
                <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${a.bar} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative mb-5 aspect-square overflow-hidden rounded-lg bg-navy">
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${a.grad} transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-6xl font-bold text-gradient transition-transform duration-500 group-hover:scale-110">
                      {mem.initials}
                    </span>
                  </div>
                  <div className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] backdrop-blur ${a.chip}`}>
                    <span className={`size-1 rounded-full ${a.dot} animate-pulse-dot`} />
                    {mem.kicker}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
                </div>

                <div className={`font-mono text-[10px] uppercase leading-relaxed tracking-widest ${a.text}`}>
                  {mem.role}
                </div>
                <div className="mt-1 font-display text-lg font-semibold">{mem.short}</div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mem.badges.map((b) => (
                    <span
                      key={b.label}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      <span aria-hidden>{b.icon}</span>
                      {b.label}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid transition-all duration-500 grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-muted-foreground">{mem.headline}</p>
                  </div>
                </div>

                <div className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold ${a.text}`}>
                  Ver perfil completo
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Panel lateral */}
      {m !== null && (
        <div className="fixed inset-0 z-[90] flex justify-end">
          <button
            aria-label="Cerrar perfil"
            onClick={() => setOpenIdx(null)}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={`Perfil de ${m.short}`}
            className="animate-drawer-in relative ml-auto flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-border bg-background shadow-[0_0_120px_-20px_var(--cyan)]"
          >
            <div className={`h-1 w-full bg-gradient-to-r ${accent[m.accent].bar}`} />
            <div className="relative overflow-hidden px-7 pb-6 pt-7">
              <div className={`pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gradient-to-br ${accent[m.accent].grad} blur-3xl`} />
              <button
                onClick={() => setOpenIdx(null)}
                aria-label="Cerrar"
                className="absolute right-5 top-5 grid size-9 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-cyan hover:text-cyan"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>

              <div className="relative flex items-center gap-4">
                <div className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-navy">
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <span className="relative font-display text-3xl font-bold text-gradient">
                    {m.initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className={`font-mono text-[10px] uppercase tracking-[0.25em] ${accent[m.accent].text}`}>
                    {m.role}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-bold leading-tight">{m.name}</h3>
                </div>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {m.badges.map((b) => (
                  <span
                    key={b.label}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${accent[m.accent].chip}`}
                  >
                    <span aria-hidden>{b.icon}</span>
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6 px-7 pb-10">
              <p className="font-display text-lg italic leading-snug text-foreground/90">
                «{m.headline}»
              </p>

              <div className="panel p-5">
                <div className={`font-mono text-[10px] uppercase tracking-[0.3em] ${accent[m.accent].text}`}>
                  Perfil
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </div>

              <div>
                <div className={`mb-3 font-mono text-[10px] uppercase tracking-[0.3em] ${accent[m.accent].text}`}>
                  Fortalezas
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {m.strengths.map((s, i) => (
                    <div
                      key={s.title}
                      className="panel animate-panel-in p-4 transition-transform hover:-translate-y-0.5"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${accent[m.accent].dot}`} />
                        <span className="text-sm font-semibold">{s.title}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel relative overflow-hidden p-5">
                <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${accent[m.accent].bar}`} />
                <div className={`font-mono text-[10px] uppercase tracking-[0.3em] ${accent[m.accent].text}`}>
                  ▸ Aporte al proyecto
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">{m.contribution}</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
