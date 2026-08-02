import { DeferredSection } from "@/components/visual/DeferredSection";
import { Relacion, CanvasMaqueta, Asesores } from "./SenaExtras";
import { Equipo } from "./Equipo";
import { Blog } from "./Blog";
import { Galeria } from "./Galeria";

export function DeferredRelacion() {
  return <DeferredSection><Relacion /></DeferredSection>;
}
export function DeferredCanvasMaqueta() {
  return <DeferredSection><CanvasMaqueta /></DeferredSection>;
}
export function DeferredAsesores() {
  return <DeferredSection><Asesores /></DeferredSection>;
}
export function DeferredEquipo() {
  return <DeferredSection><Equipo /></DeferredSection>;
}
export function DeferredBlog() {
  return <DeferredSection><Blog /></DeferredSection>;
}
export function DeferredGaleria() {
  return <DeferredSection><Galeria /></DeferredSection>;
}
