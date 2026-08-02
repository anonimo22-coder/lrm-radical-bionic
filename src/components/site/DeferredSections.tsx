import { DeferredSection } from "@/components/visual/DeferredSection";
import { Relacion, CanvasMaqueta, Asesores } from "./SenaExtras";
import { Equipo } from "./Equipo";
import { Blog } from "./Blog";
import { Galeria } from "./Galeria";
import { PlanosCad } from "./PlanosCad";

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
export function DeferredPlanosCad() {
  return <DeferredSection><PlanosCad /></DeferredSection>;
}
