import { Evento } from "./Evento.js";

export class Actividad extends Evento {
  constructor(dia, hora, ubicacion, tipo, banda, descripcion) {
    super(dia, hora, ubicacion);
    this.tipo = tipo;
    this.banda = banda;
    this.descripcion = descripcion;
  }
}
