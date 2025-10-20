import "./style.css";

class Evento {
  constructor(dia, hora, ubicacion) {
    this.dia = dia;
    this.hora = hora;
    this.ubicacion = ubicacion;
  }
}

class Clase extends Evento {
  constructor(dia, hora, ubicacion, estilo, nivel, profesor) {
    super(dia, hora, ubicacion);
    this.estilo = estilo;
    this.nivel = nivel;
    this.profesor = profesor;
  }
}

class Actividad extends Evento {
  constructor(dia, hora, ubicacion, tipo, banda, descripcion) {
    super(dia, hora, ubicacion);
    this.tipo = tipo;
    this.banda = banda;
    this.descripcion = descripcion;
  }
}

const salasClase = ["Be Hopper", "New Orleans", "Savoy"];
const salasActividades = ["Antiguo casino", "Parque", "Prado"];

const formulario = document.getElementById("formulario-registro");
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

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const horaOption = document.getElementById("hora");
  const hora = horaOption.value;

  const diaOption = document.getElementById("dia");
  const dia = diaOption.value;

  const actividad = seleccionActividad.value;

  switch (actividad) {
    case "Clase":
      const estiloOption = document.getElementById("clase-estilo");
      const nivelOption = document.getElementById("clase-nivel");
      const profesorInput = document.getElementById("clase-profesores");

      const profesor = profesorInput.value;
      const nivel = nivelOption.value;
      const estilo = estiloOption.value;

      const clase = new Clase(dia, hora);
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

      break;
  }
});
