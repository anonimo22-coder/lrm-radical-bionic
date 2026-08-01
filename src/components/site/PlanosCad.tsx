import { Ruler, Component } from "lucide-react";
import pieza13 from "@/assets/pieza-13.png.asset.json";
import pieza15 from "@/assets/pieza-15.png.asset.json";
import pieza16 from "@/assets/pieza-16.png.asset.json";
import pieza17 from "@/assets/pieza-17.png.asset.json";
import pieza18 from "@/assets/pieza-18.png.asset.json";
import { Reveal } from "@/components/visual/Reveal";

const PARTS = [
  { img: pieza13.url, code: "PIEZA 13", name: "Eje de rotación del codo" },
  { img: pieza15.url, code: "PIEZA 15", name: "Cubierta lateral del codo" },
  { img: pieza16.url, code: "PIEZA 16", name: "Soporte del servomotor" },
  { img: pieza17.url, code: "PIEZA 17", name: "Piñón de transmisión" },
  { img: pieza18.url, code: "PIEZA 18", name: "Limitador de ángulo" },
];

export function PlanosCad() {
  return (
    <section id="cad" className="relative overflow-hidden border-t border-border bg-surface/30 py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal variant="blur" className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
              <Ruler className="size-3.5" strokeWidth={1.8} />
              ▸ Modelado CAD
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Ingeniería en <span className="text-gradient">cada milímetro.</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Planos técnicos del conjunto codo, modelados pieza por pieza para su fabricación
              con impresión 3D y polímeros reciclados.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <Component className="size-3.5 text-volt" strokeWidth={1.8} />
            Conjunto codo · Rev 1.0
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PARTS.map((p, i) => (
            <Reveal key={p.code} variant="up" delay={i * 80}>
              <figure className="group panel card-sheen h-full overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan hover:shadow-[0_24px_60px_-35px_var(--cyan)]">
                <div className="aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
                <figcaption className="border-t border-border p-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-cyan">
                    {p.code}
                  </div>
                  <div className="mt-1 text-sm font-medium">{p.name}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
