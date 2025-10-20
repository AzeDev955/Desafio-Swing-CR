import "./style.css";
import { Actividad } from "./modelo/Actividad.js";
import { Clase } from "./modelo/Clase.js";

const STORAGE = "eventosCR";
const horasClase = [
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

const horasActividades = [
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

const tablaClases = document.getElementById("tabla-clases");
let cuerpoClase;
if (tablaClases) {
  cuerpoClase = tablaClases.querySelector("tbody");
}

const tablaActividades = document.getElementById("tabla-actividades");

let cuerpoActividades;
if (tablaActividades) {
  cuerpoActividades = tablaActividades.querySelector("tbody");
}

horasClase.forEach((hora) => {
  let nuevaFila = document.createElement("tr");
  let nuevoTh = document.createElement("th");
  nuevoTh.textContent = hora;
  nuevaFila.appendChild(nuevoTh);
  for (let i = 0; i < 3; i++) {
    let nuevoTd = document.createElement("td");
    nuevaFila.appendChild(nuevoTd);
  }
  cuerpoClase.appendChild(nuevaFila);
});

horasActividades.forEach((hora) => {
  let nuevaFila = document.createElement("tr");
  let nuevoTh = document.createElement("th");
  nuevoTh.textContent = hora;
  nuevaFila.appendChild(nuevoTh);
  for (let i = 0; i < 3; i++) {
    let nuevoTd = document.createElement("td");
    nuevaFila.appendChild(nuevoTd);
  }
  cuerpoActividades.appendChild(nuevaFila);
});
const cargarEventos = () => {
  const eventosGuardados = localStorage.getItem(STORAGE);
  if (eventosGuardados) {
    return JSON.parse(eventosGuardados);
  } else {
    return [];
  }
};

const listaEventos = cargarEventos();
const soloClases = [];
const soloActividades = [];

listaEventos.forEach((evento) => {
  if (evento instanceof Clase) {
    soloClases.push(evento);
  } else {
    soloActividades.push(evento);
  }
});

soloClases.forEach((clase) => {
  let tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta-evento");

  let tituloTarjeta = document.createElement("div");
  tituloTarjeta.classList.add("tarjeta-evento__titulo");
  tituloTarjeta.textContent = clase.estilo;

  let ubicacionTarjeta = document.createElement("div");
  ubicacionTarjeta.classList.add("tarjeta-evento__ubicacion");
  ubicacionTarjeta.textContent = clase.ubicacion;

  tarjeta.appendChild(tituloTarjeta);
  tarjeta.appendChild(ubicacionTarjeta);

  const filaCorrecta = cuerpoClase.querySelector(
    `tr th:first-child[textContent='${clase.hora}']`
  ); //con ayuda de nuestro amigo confiable

  if (filaCorrecta) {
    let columna;
    switch (clase.dia) {
      case "Viernes":
        columna = 0;
        break;
      case "Sabado":
        columna = 1;
        break;
      case "Domingo":
        columna = 2;
        break;
    }
    const celdas = filaCorrecta.querySelectorAll("td");
    const celdaUbicacion = celdas[columna];
    celdaUbicacion.appendChild(tarjeta);
  }
});

const salasClase = ["Be Hopper", "New Orleans", "Savoy"];
const salasActividades = ["Antiguo casino", "Parque", "Prado"];

const formulario = document.getElementById("formulario-registro");
const seleccionActividad = document.getElementById("tipo-evento");
const campoClase = document.getElementById("campos-clase");
const campoActividades = document.getElementById("campos-actividad");
const campoUbicacionesClases = document.getElementById("ubicaciones-clases");
const campoUbicacionesActividades = document.getElementById(
  "ubicaciones-actividades"
);

seleccionActividad.addEventListener("change", () => {
  const valor = seleccionActividad.value;
  switch (valor) {
    case "Clase":
      campoClase.classList.remove("oculto");
      campoActividades.classList.add("oculto");
      campoUbicacionesClases.classList.remove("oculto");
      campoUbicacionesActividades.classList.add("oculto");
      break;
    case "Actividad":
      campoClase.classList.add("oculto");
      campoActividades.classList.remove("oculto");
      campoUbicacionesClases.classList.remove("oculto");
      campoUbicacionesActividades.classList.remove("oculto");
      break;

    default:
      campoClase.classList.add("oculto");
      campoActividades.classList.add("oculto");
      campoUbicacionesClases.classList.add("oculto");
      campoUbicacionesActividades.classList.add("oculto");
      break;
  }
});

const seleccionBanda = document.getElementById("actividad-tipo");
const campoBanda = document.getElementById("grupo-banda");

seleccionBanda.addEventListener("change", () => {
  if (seleccionBanda.value === "Concierto") {
    campoBanda.classList.remove("oculto");
  } else {
    campoBanda.classList.add("oculto");
  }
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const horaOption = document.getElementById("hora");
  const hora = horaOption.value;

  const diaOption = document.getElementById("dia");
  const dia = diaOption.value;

  const ubicacionOption = document.querySelector(
    "input[name='ubicacion']:checked"
  );
  let ubicacion = "";
  if (ubicacionOption) {
    ubicacion = ubicacionOption.value;
  }
  const actividad = seleccionActividad.value;
  let evento;
  switch (actividad) {
    case "Clase":
      const estiloOption = document.getElementById("clase-estilo");
      const nivelOption = document.getElementById("clase-nivel");
      const profesorInput = document.getElementById("clase-profesores");

      const profesor = profesorInput.value;
      const nivel = nivelOption.value;
      const estilo = estiloOption.value;

      evento = new Clase(dia, hora, ubicacion, estilo, nivel, profesor);
      break;
    case "Actividad":
      const tipoOption = document.getElementById("actividad-tipo");
      const tipo = tipoOption.value;

      let banda = "";
      if (tipo === "Concierto") {
        const bandaInput = document.getElementById("actividad-banda");
        banda = bandaInput.value;
      }

      const descripcionInput = document.getElementById("actividad-descripcion");
      const descripcion = descripcionInput.value;

      evento = new Actividad(dia, hora, ubicacion, tipo, banda, descripcion);
      break;
  }
  listaEventos.push(evento);
  const eventosJSON = JSON.stringify(listaEventos);
  localStorage.setItem(STORAGE, eventosJSON);
});
