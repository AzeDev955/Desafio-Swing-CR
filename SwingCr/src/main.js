import "./style.css";

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
