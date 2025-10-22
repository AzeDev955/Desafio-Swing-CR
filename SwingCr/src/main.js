import "./style.css";
import { inicioFormulario } from "./modules/formulario.js";
import { iniciarTablas } from "./modules/render.js";
import { cargarTarjetas } from "./modules/render.js";
import { manejarModal } from "./modules/modal.js";
import { manejarDragAndDrop } from "./modules/dragDrop.js";

const salasClase = ["Be Hopper", "New Orleans", "Savoy"];
const salasActividades = ["Antiguo casino", "Parque", "Prado"];
const dias = ["Viernes", "Sábado", "Domingo"];
let horasClase = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

let horasActividades = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "00:00",
];
const STORAGE = "eventosCR";

const formulario = document.getElementById("formulario-registro");
const tablaClases = document.getElementById("tabla-clases");

export function cargarEventos(STORAGE) {
  const eventosGuardados = localStorage.getItem(STORAGE);
  if (eventosGuardados) {
    return JSON.parse(eventosGuardados);
  } else {
    return [];
  }
}

const listaEventos = cargarEventos();

if (tablaClases) {
  iniciarTablas(horasClase, horasActividades, dias);
  cargarTarjetas(listaEventos, STORAGE);
  manejarModal(listaEventos);
  manejarDragAndDrop(listaEventos, STORAGE);
} else if (formulario) {
  inicioFormulario(listaEventos, salasClase, STORAGE);
}
