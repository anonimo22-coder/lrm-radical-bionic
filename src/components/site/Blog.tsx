import { useEffect, useState } from "react";

type Accent = "volt" | "eco" | "ai";

type Post = {
  cat: string;
  accent: Accent;
  date: string;
  read: string;
  title: string;
  excerpt: string;
  kicker: string;
  body: string[];
  facts: { k: string; v: string }[];
};

const accent = {
  volt: { text: "text-volt", chip: "border-volt/30 bg-volt/10 text-volt", bar: "from-volt to-cyan", dot: "bg-volt", border: "hover:border-volt" },
  eco: { text: "text-eco", chip: "border-eco/30 bg-eco/10 text-eco", bar: "from-eco to-cyan", dot: "bg-eco", border: "hover:border-eco" },
  ai: { text: "text-ai", chip: "border-ai/30 bg-ai/10 text-ai", bar: "from-ai to-volt", dot: "bg-ai", border: "hover:border-ai" },
} satisfies Record<Accent, Record<string, string>>;

const POSTS: Post[] = [
  {
    cat: "Bitácora técnica",
    accent: "volt",
    date: "2025",
    read: "4 min",
    title: "Primeras piezas modeladas en CAD: el conjunto del codo",
    excerpt:
      "El paso del boceto al modelo tridimensional. Cinco piezas del mecanismo de codo pasaron de idea a geometría fabricable.",
    kicker: "De la idea al milímetro",
    body: [
      "El modelado CAD marca el momento en que la prótesis deja de ser un concepto y empieza a existir como geometría medible. En esta primera etapa el equipo concentró el trabajo en el conjunto del codo, la articulación que define el rango de movimiento y soporta la mayor carga mecánica del brazo.",
      "Se modelaron cinco componentes: el pin de rotación del codo (pieza 13), la tapa lateral con patrón hexagonal de ventilación (pieza 15), el soporte del servomotor (pieza 16), el piñón de transmisión (pieza 17) y el limitador de ángulo que controla la hiperextensión (pieza 18). Cada una nació de una pregunta funcional antes que estética: cómo gira, cuánto resiste, dónde disipa calor y hasta dónde debe detenerse.",
      "El criterio transversal fue la fabricabilidad. Todas las piezas se diseñaron pensando en impresión 3D con materiales reciclados, lo que obliga a trabajar con tolerancias realistas, espesores que soporten la impresión por capas y geometrías que no dependan de soportes complejos. El patrón hexagonal de la tapa lateral, por ejemplo, no es decorativo: reduce material, aligera el conjunto y ventila el servomotor.",
      "La bitácora también registra los descartes. Varias versiones del piñón se rehicieron al detectar que el módulo del engranaje no daba margen para la contracción del material impreso. Documentar esos errores es parte del método: la trazabilidad del diseño es tan valiosa como el diseño final.",
      "El siguiente paso es la validación física de las piezas impresas y el ensamble del mecanismo completo del codo, con mediciones de resistencia y de recorrido angular reales frente a los valores calculados en el modelo digital.",
    ],
    facts: [
      { k: "Piezas modeladas", v: "5 (13, 15, 16, 17, 18)" },
      { k: "Conjunto", v: "Articulación de codo" },
      { k: "Fabricación", v: "Impresión 3D · material reciclado" },
      { k: "Estado", v: "Modelado completado · validación en curso" },
    ],
  },
  {
    cat: "Investigación",
    accent: "ai",
    date: "2025",
    read: "5 min",
    title: "Escuchar antes de diseñar: la entrevista con Danna Vela",
    excerpt:
      "Una entrevista semiestructurada reordenó las prioridades del proyecto. Comodidad y mantenimiento por encima de la estética.",
    kicker: "La voz que corrige la hipótesis",
    body: [
      "Ningún dato técnico reemplaza la experiencia de quien vive con una discapacidad física. Por eso el equipo aplicó una entrevista semiestructurada a Danna Gabriela Vela Medellín, participante del proceso investigativo y usuario colaborador del proyecto, con una discapacidad congénita en extremidad superior.",
      "La primera conclusión desarmó una suposición común: la estética no encabeza la lista. Al pedirle ordenar prioridades para una prótesis ideal, Danna señaló la comodidad, la facilidad de uso y el mantenimiento sencillo como los factores decisivos. Un dispositivo impecable a la vista pero incómodo o difícil de mantener simplemente se deja de usar.",
      "La segunda conclusión apunta al acceso. La barrera no es únicamente el precio del dispositivo: también pesan los desplazamientos, los tiempos y los costos indirectos que implica acceder a un servicio de rehabilitación o adaptación, especialmente desde municipios como Soacha y zonas rurales cercanas.",
      "Sobre el uso de materiales reciclados, la respuesta fue favorable pero condicionada: se valora positivamente el enfoque sostenible siempre que el funcionamiento, la durabilidad y la seguridad estén verificados. La advertencia es ética además de técnica —no generar expectativas sobre un dispositivo cuyo desempeño no esté comprobado.",
      "Estos hallazgos se incorporaron directamente a los criterios de diseño de LRM: piezas de reemplazo sencillas, ensamble comprensible para el usuario, curva de aprendizaje corta y ensayos de resistencia y seguridad como requisito previo a cualquier prueba con usuarios.",
    ],
    facts: [
      { k: "Instrumento", v: "Entrevista semiestructurada" },
      { k: "Prioridad 1", v: "Comodidad y facilidad de uso" },
      { k: "Barrera principal", v: "Costo económico y desplazamiento" },
      { k: "Condición", v: "Materiales reciclados con seguridad verificada" },
    ],
  },
  {
    cat: "Evento académico",
    accent: "eco",
    date: "2025",
    read: "4 min",
    title: "REDCOLSI: llevar la investigación fuera del aula",
    excerpt:
      "La participación en el encuentro de semilleros puso el proyecto frente a pares y evaluadores externos por primera vez.",
    kicker: "Sustentar frente a pares",
    body: [
      "La Red Colombiana de Semilleros de Investigación (REDCOLSI) reúne proyectos de todo el país para someterlos a la evaluación de pares académicos. Para el semillero HeroBots, participar significó exponer el proyecto LRM fuera del entorno donde nació y contrastarlo con criterios externos.",
      "La preparación fue tan formativa como el evento. Obligó a ordenar el problema de investigación, la pregunta, los objetivos y la hipótesis en una estructura defendible, y a explicar el proyecto en pocos minutos ante personas sin contexto previo. Ese ejercicio de síntesis reveló los puntos donde la argumentación aún era débil.",
      "En la sustentación, las preguntas más exigentes se concentraron en la validación: cómo se comprueba la resistencia de un material reciclado, cómo se mide el desempeño frente a una prótesis comercial y cómo se garantiza la seguridad del usuario. Ninguna cuestionó la pertinencia social del proyecto; todas apuntaron al método.",
      "La retroalimentación se tradujo en acciones concretas: reforzar el marco teórico, precisar los indicadores de medición y documentar con mayor rigor cada iteración del diseño. El evento también permitió conocer otros semilleros que trabajan sobre tecnologías de asistencia, abriendo posibilidades de intercambio y trabajo conjunto.",
      "La experiencia consolidó una idea que atraviesa a LRM Robotics: un proyecto de innovación social solo se sostiene si su rigor investigativo resiste la mirada de la comunidad académica.",
    ],
    facts: [
      { k: "Escenario", v: "Encuentro de semilleros REDCOLSI" },
      { k: "Semillero", v: "HeroBots · Soacha, Cundinamarca" },
      { k: "Foco de la evaluación", v: "Método y validación" },
      { k: "Resultado", v: "Marco teórico e indicadores reforzados" },
    ],
  },
];

export function Blog() {
  const [open, setOpen] = useState<number | null>(null);
  const p = open === null ? null : POSTS[open];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="blog" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
            06 · Blog
          </div>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Bitácora <span className="text-gradient">abierta.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Documentamos el proceso mientras ocurre: diseño, investigación con usuarios y vida
            académica del semillero.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {POSTS.map((post, i) => {
            const a = accent[post.accent];
            return (
              <article
                key={post.title}
                className={`group panel card-sheen flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 ${a.border}`}
              >
                <div className={`h-[2px] w-full bg-gradient-to-r ${a.bar} opacity-40 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative aspect-[16/9] overflow-hidden bg-navy">
                  <div className="absolute inset-0 bg-grid opacity-30 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className={`font-mono text-5xl font-bold opacity-20 ${a.text}`}>
                      0{i + 1}
                    </span>
                  </div>
                  <span className={`absolute left-4 top-4 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur ${a.chip}`}>
                    {post.cat}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span>{post.date}</span>
                    <span className={`size-1 rounded-full ${a.dot}`} />
                    <span>{post.read} de lectura</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <button
                    onClick={() => setOpen(i)}
                    className={`mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold ${a.text}`}
                  >
                    Leer más
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {p !== null && (
        <div className="fixed inset-0 z-[90] grid place-items-center p-4 sm:p-8">
          <button
            aria-label="Cerrar artículo"
            onClick={() => setOpen(null)}
            className="absolute inset-0 bg-background/75 backdrop-blur-sm"
          />
          <article
            role="dialog"
            aria-modal="true"
            aria-label={p.title}
            className="animate-panel-in relative max-h-full w-full max-w-3xl overflow-y-auto rounded-xl border border-border bg-background shadow-[0_40px_120px_-30px_var(--cyan)]"
          >
            <div className={`sticky top-0 z-10 h-1 w-full bg-gradient-to-r ${accent[p.accent].bar}`} />
            <button
              onClick={() => setOpen(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-cyan hover:text-cyan"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="px-6 py-8 sm:px-10">
              <span className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${accent[p.accent].chip}`}>
                {p.cat}
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight">{p.title}</h3>
              <p className={`mt-3 font-display text-lg italic ${accent[p.accent].text}`}>{p.kicker}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.facts.map((f) => (
                  <div key={f.k} className="panel p-3">
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                      {f.k}
                    </div>
                    <div className="mt-1 text-sm font-medium">{f.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-5">
                {p.body.map((par, i) => (
                  <p
                    key={i}
                    className="animate-panel-in text-[15px] leading-relaxed text-muted-foreground"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {par}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
