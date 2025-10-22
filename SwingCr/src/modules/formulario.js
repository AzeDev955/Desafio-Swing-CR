import { Clase } from "../modelo/Clase";
import { Actividad } from "../modelo/Actividad";
const formulario = document.getElementById("formulario-registro");
const diaSelect = document.getElementById("dia");
const horaSelect = document.getElementById("hora");
const seleccionActividad = document.getElementById("tipo-evento");
const campoClase = document.getElementById("campos-clase");
const campoActividades = document.getElementById("campos-actividad");
const campoUbicacionesClases = document.getElementById("ubicaciones-clases");
const campoUbicacionesActividades = document.getElementById(
  "ubicaciones-actividades"
);

export function inicioFormulario(
  listaEventos,
  salasClase,
  horasClase,
  horasActividades,
  STORAGE
) {
  const marcarSalasOcupadas = () => {
    const diaSeleccionado = diaSelect.value;
    const horaSeleccionada = horaSelect.value;
    const actividadSeleccionada = seleccionActividad.value;

    if (diaSeleccionado && horaSeleccionada && seleccionActividad) {
      let arrayDiaHora = [];
      listaEventos.forEach((evento) => {
        let diaHoraUbicacion = [evento.dia, evento.hora, evento.ubicacion];
        arrayDiaHora.push(diaHoraUbicacion);
      });
      let salasOcupadas = [];
      arrayDiaHora.forEach((evento) => {
        let diaEvento = evento[0];
        let horaEvento = evento[1];
        let ubicacionEvento = evento[2];
        if (diaEvento == diaSeleccionado && horaEvento == horaSeleccionada) {
          if (salasClase.includes(ubicacionEvento)) {
            salasOcupadas.push(ubicacionEvento);
          }
        }
      });
      if (salasOcupadas.length > 0) {
        salasOcupadas.forEach((sala) => {
          const fila = document.getElementById(sala);
          if (fila) {
            fila.classList.add("ocupado");
            const inputFila = fila.querySelector("input[type='radio']");
            if (inputFila) {
              inputFila.disabled = true;
            }
          }
        });
      }
    }
  };

  const resetUbicaciones = () => {
    const diaSeleccionado = diaSelect.value;
    const horaSeleccionada = horaSelect.value;
    const actividadSeleccionada = seleccionActividad.value;
    const filasRadio = document.querySelectorAll(
      "#contenedor-ubicaciones .radio-fila"
    );
    filasRadio.forEach((fila) => {
      fila.classList.remove("ocupado");
      const inputRadio = fila.querySelector("input[type='radio']");
      if (inputRadio) {
        inputRadio.disabled = false;
      }
    });
  };
  diaSelect.addEventListener("change", () => {
    resetUbicaciones();
    marcarSalasOcupadas();
  });

  horaSelect.addEventListener("change", () => {
    resetUbicaciones();
    marcarSalasOcupadas();
  });

  seleccionActividad.addEventListener("change", () => {
    const valor = seleccionActividad.value;
    switch (valor) {
      case "Clase":
        campoClase.classList.remove("oculto");
        campoActividades.classList.add("oculto");
        campoUbicacionesClases.classList.remove("oculto");
        campoUbicacionesActividades.classList.add("oculto");
        resetUbicaciones();
        marcarSalasOcupadas();
        break;
      case "Actividad":
        campoClase.classList.add("oculto");
        campoActividades.classList.remove("oculto");
        campoUbicacionesClases.classList.remove("oculto");
        campoUbicacionesActividades.classList.remove("oculto");
        resetUbicaciones();
        marcarSalasOcupadas();
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

        const descripcionInput = document.getElementById(
          "actividad-descripcion"
        );
        const descripcion = descripcionInput.value;

        evento = new Actividad(dia, hora, ubicacion, tipo, banda, descripcion);
        break;
    }
    formulario.reset();
    listaEventos.push(evento);
    const eventosJSON = JSON.stringify(listaEventos);
    localStorage.setItem(STORAGE, eventosJSON);
  });
}
