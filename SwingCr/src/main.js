import "./style.css";

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
const cuerpoClase = tablaClases.querySelector("tbody");

const tablaActividades = document.getElementById("tabla-actividades");
const cuerpoActividades = tablaActividades.querySelector("tbody");

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
const seleccionActividad = document.getElementById("tipo-evento");
const campoClase = document.getElementById("campos-clase");
const campoActividades = document.getElementById("campos-actividad");

seleccionActividad.addEventListener("change", () => {
  const valor = seleccionActividad.value;
  switch (valor) {
    case "Clase":
      campoClase.classList.remove("oculto");
      campoActividades.classList.add("oculto");
      break;
    case "Actividad":
      campoClase.classList.add("oculto");
      campoActividades.classList.remove("oculto");
      break;

    default:
      campoClase.classList.add("oculto");
      campoActividades.classList.add("oculto");
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
