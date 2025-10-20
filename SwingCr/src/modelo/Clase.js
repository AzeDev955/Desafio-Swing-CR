import { Evento } from "./Evento.js";

export class Clase extends Evento {
  constructor(dia, hora, ubicacion, estilo, nivel, profesor) {
    super(dia, hora, ubicacion);
    this.estilo = estilo;
    this.nivel = nivel;
    this.profesor = profesor;
  }
}
