import { useEffect, useRef, useState } from "react";
import logoDark from "@/assets/logo-dark.png.asset.json";
import logoLight from "@/assets/logo-light.png.asset.json";

type Accent = "cyan" | "eco" | "ai" | "volt" | "alert";

type Item = {
  label: string;
  href: string;
  desc: string;
  accent: Accent;
  icon: React.ReactNode;
};

type MenuGroup = {
  label: string;
  href: string;
  tagline: string;
  items: Item[];
};

const accentText: Record<Accent, string> = {
  cyan: "text-cyan",
  eco: "text-eco",
  ai: "text-ai",
  volt: "text-volt",
  alert: "text-alert",
};
const accentBg: Record<Accent, string> = {
  cyan: "bg-cyan/10 group-hover/it:bg-cyan/20",
  eco: "bg-eco/10 group-hover/it:bg-eco/20",
  ai: "bg-ai/10 group-hover/it:bg-ai/20",
  volt: "bg-volt/10 group-hover/it:bg-volt/20",
  alert: "bg-alert/10 group-hover/it:bg-alert/20",
};
const accentBorder: Record<Accent, string> = {
  cyan: "hover:border-cyan/50",
  eco: "hover:border-eco/50",
  ai: "hover:border-ai/50",
  volt: "hover:border-volt/50",
  alert: "hover:border-alert/50",
};

const I = {
  hand: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 13V5a1.5 1.5 0 013 0v6m0-1V4a1.5 1.5 0 013 0v7m0-2a1.5 1.5 0 013 0v6a6 6 0 01-6 6h-1a6 6 0 01-6-6v-3a1.5 1.5 0 013 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" strokeLinecap="round" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cad: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 21h18M6 21V7l6-4 6 4v14M10 21v-6h4v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  news: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 5h13v14H6a2 2 0 01-2-2V5zM17 9h3v8a2 2 0 01-2 2M7 9h7M7 13h7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M10 3h4M10 3v6L5 19a2 2 0 002 2h10a2 2 0 002-2l-5-10V3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cal: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0112 0M16 6a3 3 0 010 6M18 20a6 6 0 00-3-5.2" strokeLinecap="round" />
    </svg>
  ),
  badge: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.5L7 22l5-2.5L17 22l-1.5-8.5" strokeLinejoin="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20.8 5.6a5 5 0 00-7.1 0L12 7.3l-1.7-1.7a5 5 0 10-7.1 7.1L12 21.5l8.8-8.8a5 5 0 000-7.1z" strokeLinejoin="round" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 4h9a3 3 0 013 3v13a2.5 2.5 0 00-2.5-2.5H4V4z" strokeLinejoin="round" />
      <path d="M20 4h-1a3 3 0 00-3 3v13" strokeLinejoin="round" />
    </svg>
  ),
  wave: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 12h3l2-6 3 13 3-9 2 4h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  recycle: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 19H4l3-5m10 5h3l-3-5M9.5 5l2.5-3 2.5 3M5 9l-1 4M20 9l1 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const MENUS: MenuGroup[] = [
  {
    label: "Tecnología",
    href: "#tecnologia",
    tagline: "Los sistemas que hacen posible el movimiento",
    items: [
      { label: "Prótesis", href: "#tecnologia", desc: "Arquitectura mecánica del brazo biónico.", accent: "cyan", icon: I.hand },
      { label: "IA adaptativa", href: "#tecnologia", desc: "Control mioeléctrico que aprende del usuario.", accent: "ai", icon: I.chip },
      { label: "Electrónica y energía", href: "#tecnologia", desc: "Batería, supercapacitor y carga solar híbrida.", accent: "volt", icon: I.bolt },
      { label: "Modelado CAD", href: "#tecnologia", desc: "Piezas del conjunto codo diseñadas al milímetro.", accent: "eco", icon: I.cad },
    ],
  },
  {
    label: "Investigación",
    href: "#investigacion",
    tagline: "Semillero HeroBots · rigor científico",
    items: [
      { label: "Problema y pregunta", href: "#investigacion", desc: "El vacío que buscamos resolver en Colombia.", accent: "alert", icon: I.flask },
      { label: "Objetivos", href: "#investigacion", desc: "General y específicos del proyecto investigativo.", accent: "cyan", icon: I.badge },
      { label: "Hipótesis", href: "#investigacion", desc: "Desempeño comparable a un costo radicalmente menor.", accent: "ai", icon: I.wave },
      { label: "Asesoría", href: "#investigacion", desc: "Acompañamiento académico del semillero.", accent: "eco", icon: I.users },
    ],
  },
  {
    label: "SENA",
    href: "#sena",
    tagline: "Formación empresarial y estructura organizacional",
    items: [
      { label: "Modelo Canvas", href: "#canvas", desc: "El modelo de negocio de LRM Robotics.", accent: "eco", icon: I.book },
      { label: "Maqueta comercial", href: "#canvas", desc: "La planta de manufactura circular, visualizada.", accent: "volt", icon: I.recycle },
      { label: "Talento humano", href: "#sena", desc: "Simulación académica del proceso de RR.HH.", accent: "cyan", icon: I.users },
      { label: "Asesoría y acompañamiento", href: "#asesoria", desc: "Instructores que impulsan el proyecto.", accent: "ai", icon: I.badge },
    ],
  },
  {
    label: "Equipo",
    href: "#equipo",
    tagline: "Las personas detrás del movimiento",
    items: [
      { label: "Integrantes", href: "#equipo", desc: "Cinco perfiles, un mismo propósito.", accent: "cyan", icon: I.users },
      { label: "Roles", href: "#equipo", desc: "Investigación, documentación, CAD y dirección.", accent: "volt", icon: I.badge },
      { label: "Aportes", href: "#equipo", desc: "Qué construye cada persona dentro de LRM.", accent: "ai", icon: I.cad },
      { label: "Usuario colaborador", href: "#equipo", desc: "La voz real que valida cada decisión.", accent: "eco", icon: I.heart },
    ],
  },
  {
    label: "Blog",
    href: "#blog",
    tagline: "Bitácora abierta del proyecto",
    items: [
      { label: "Noticias", href: "#blog", desc: "Lo último del desarrollo de LRM.", accent: "cyan", icon: I.news },
      { label: "Investigaciones", href: "#blog", desc: "Entrevistas y hallazgos con usuarios reales.", accent: "ai", icon: I.flask },
      { label: "Eventos", href: "#blog", desc: "Encuentros académicos como REDCOLSI.", accent: "eco", icon: I.cal },
      { label: "Bitácora CAD", href: "#blog", desc: "El diario del modelado de las primeras piezas.", accent: "volt", icon: I.cad },
    ],
  },
  {
    label: "Glosario",
    href: "#glosario",
    tagline: "Tecnología explicada en lenguaje humano",
    items: [
      { label: "Biomecatrónica", href: "#glosario", desc: "Donde el cuerpo y la máquina se encuentran.", accent: "cyan", icon: I.hand },
      { label: "Señales EMG", href: "#glosario", desc: "El lenguaje eléctrico de tus músculos.", accent: "volt", icon: I.wave },
      { label: "CAD e impresión 3D", href: "#glosario", desc: "Del modelo digital a la pieza real.", accent: "eco", icon: I.cad },
      { label: "IA adaptativa", href: "#glosario", desc: "Un sistema que mejora con cada uso.", accent: "ai", icon: I.chip },
    ],
  },
];

export function MegaNav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const active = MENUS.find((m) => m.label === open);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/80 shadow-[0_10px_40px_-30px_var(--cyan)] backdrop-blur-xl"
          : "border-transparent bg-background/50 backdrop-blur-md"
      }`}
      onMouseLeave={leave}
    >
      {/* hilo de luz superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />

      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 lg:flex lg:justify-between">
        <a href="#top" className="group flex min-w-0 items-center gap-3">
          <span className="relative grid size-9 shrink-0 place-items-center">
            <span className="absolute inset-0 rounded-full bg-cyan/25 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
            <img
              src={dark ? logoDark.url : logoLight.url}
              alt="LRM Robotics"
              className="relative size-9 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate font-display text-sm font-bold leading-none tracking-tight">
              LRM Robotics
            </span>
            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
              Move Beyond
            </span>
          </span>
        </a>

        {/* desktop */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {MENUS.map((m) => {
            const isOpen = open === m.label;
            return (
              <a
                key={m.label}
                href={m.href}
                onMouseEnter={() => enter(m.label)}
                onFocus={() => enter(m.label)}
                aria-expanded={isOpen}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {m.label}
                  <svg
                    viewBox="0 0 24 24"
                    className={`size-3 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span
                  className={`absolute inset-x-2 -bottom-px h-px origin-left bg-gradient-to-r from-cyan to-ai transition-transform duration-300 ${
                    isOpen ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Cambiar tema"
            className="grid size-9 place-items-center rounded-md border border-border bg-surface text-foreground transition-all hover:border-cyan hover:text-cyan"
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
            className="group relative hidden overflow-hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-block"
          >
            <span className="relative z-10">Contáctanos</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <button
            onClick={() => setMobile((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={mobile}
            className="grid size-9 place-items-center rounded-md border border-border bg-surface lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              {mobile ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* mega menú */}
      {active && (
        <div
          className="absolute inset-x-0 top-full hidden border-b border-border bg-background/95 backdrop-blur-2xl lg:block"
          onMouseEnter={() => enter(active.label)}
          onMouseLeave={leave}
        >
          <div className="animate-menu-in mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
            <div className="relative overflow-hidden rounded-xl border border-border bg-surface/60 p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-cyan/20 blur-3xl" />
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
                ▸ {active.label}
              </div>
              <p className="relative mt-3 font-display text-lg font-semibold leading-snug">
                {active.tagline}
              </p>
              <a
                href={active.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan"
              >
                Ir a la sección <span aria-hidden>→</span>
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {active.items.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  onClick={() => setOpen(null)}
                  className={`group/it flex items-start gap-3 rounded-lg border border-border bg-surface/40 p-4 transition-all hover:-translate-y-0.5 ${accentBorder[it.accent]}`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-md transition-all ${accentBg[it.accent]} ${accentText[it.accent]} group-hover/it:scale-110`}
                  >
                    {it.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{it.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      {it.desc}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* mobile */}
      {mobile && (
        <div className="animate-menu-in max-h-[75vh] overflow-y-auto border-t border-border bg-background/95 px-6 py-4 backdrop-blur-2xl lg:hidden">
          {MENUS.map((m) => {
            const isOpen = mobileOpen === m.label;
            return (
              <div key={m.label} className="border-b border-border/60 last:border-0">
                <button
                  onClick={() => setMobileOpen(isOpen ? null : m.label)}
                  className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold"
                >
                  {m.label}
                  <span className={`text-cyan transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div
                  className={`grid transition-all duration-400 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-1 pb-3">
                      {m.items.map((it) => (
                        <a
                          key={it.label}
                          href={it.href}
                          onClick={() => setMobile(false)}
                          className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                        >
                          <span className={`${accentText[it.accent]} shrink-0`}>{it.icon}</span>
                          <span className="min-w-0 truncate">{it.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <a
            href="#contacto"
            onClick={() => setMobile(false)}
            className="mt-4 block rounded-md bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Contáctanos
          </a>
        </div>
      )}
    </header>
  );
}
