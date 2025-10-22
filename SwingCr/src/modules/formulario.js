import { Clase } from "../modelo/Clase";
import { Actividad } from "../modelo/Actividad";

const mostrarErrorCampo = (campoInput, mensaje) => {
  const formGroup = campoInput.closest(".formulario__grupo");

  let errorElement = formGroup.querySelector(".error-mensaje");
  if (!errorElement) {
    errorElement = document.createElement("p");
    errorElement.className = "error-mensaje";
    campoInput.parentNode.insertBefore(errorElement, campoInput.nextSibling);
  }

  if (mensaje) {
    errorElement.textContent = mensaje;
    errorElement.classList.remove("oculto");
    campoInput.classList.add("invalido");
    campoInput.classList.remove("valido");
  } else {
    errorElement.textContent = "";
    errorElement.classList.add("oculto");
    campoInput.classList.remove("invalido");
    campoInput.classList.add("valido"); //
  }
};

export function inicioFormulario(
  listaEventos,
  salasClase,
  STORAGE,
  horasActividades,
  horasClase,
  horasClaseViernes,
  horasActividadesViernes,
  horasActividadesDomingo
) {
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
  const seleccionBanda = document.getElementById("actividad-tipo");
  const campoBanda = document.getElementById("grupo-banda");

  diaSelect.addEventListener("change", () => {
    resetUbicaciones();
    marcarSalasOcupadas(
      diaSelect,
      horaSelect,
      seleccionActividad,
      salasClase,
      listaEventos
    );
  });

  horaSelect.addEventListener("change", () => {
    resetUbicaciones();
    marcarSalasOcupadas(
      diaSelect,
      horaSelect,
      seleccionActividad,
      salasClase,
      listaEventos
    );
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
        marcarSalasOcupadas(
          diaSelect,
          horaSelect,
          seleccionActividad,
          salasClase,
          listaEventos
        );
        break;
      case "Actividad":
        campoClase.classList.add("oculto");
        campoActividades.classList.remove("oculto");
        campoUbicacionesClases.classList.remove("oculto");
        campoUbicacionesActividades.classList.remove("oculto");
        resetUbicaciones();
        marcarSalasOcupadas(
          diaSelect,
          horaSelect,
          seleccionActividad,
          salasClase,
          listaEventos
        );
        break;

      default:
        campoClase.classList.add("oculto");
        campoActividades.classList.add("oculto");
        campoUbicacionesClases.classList.add("oculto");
        campoUbicacionesActividades.classList.add("oculto");

        break;
    }
  });

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
    let ubicacion;
    if (ubicacionOption) {
      ubicacion = ubicacionOption.value;
    }
    const actividad = seleccionActividad.value;

    let evento;
    let formularioCorrecto = true;
    if (!ubicacion) {
      let ubicacionDiv = document.getElementById("ubicaciones-clases");
      mostrarErrorCampo(ubicacionDiv, "Debes seleccionar una ubicacion");
      formularioCorrecto = false;
    }
    switch (actividad) {
      case "Clase":
        const estiloOption = document.getElementById("clase-estilo");
        const nivelOption = document.getElementById("clase-nivel");
        const profesorInput = document.getElementById("clase-profesores");

        const profesor = profesorInput.value;
        const nivel = nivelOption.value;
        const estilo = estiloOption.value;
        if (!horasClase.includes(hora)) {
          mostrarErrorCampo(
            horaOption,
            "Las clases solo pueden estar entre las 10:00 y las 20:00"
          );
          formularioCorrecto = false;
        }
        if (dia === "Viernes") {
          if (!horasClaseViernes.includes(hora)) {
            mostrarErrorCampo(horaOption, "Los viernes empezamos a las 20:00");
            formularioCorrecto = false;
          }
        }

        if (profesor.length < 3) {
          mostrarErrorCampo(
            profesorInput,
            "El nombre del profesor debe ser mayor de tres letras"
          );
          formularioCorrecto = false;
        }

        if (formularioCorrecto) {
          evento = new Clase(dia, hora, ubicacion, estilo, nivel, profesor);
        }

        break;
      case "Actividad":
        const tipoOption = document.getElementById("actividad-tipo");
        const tipo = tipoOption.value;

        if (dia === "Viernes") {
          if (!horasActividadesViernes.includes(hora)) {
            mostrarErrorCampo(horaOption, "Los viernes empezamos a las 20:00");
            formularioCorrecto = false;
          }
        }
        if (dia === "Domingo") {
          if (!horasActividadesDomingo.includes(hora)) {
            mostrarErrorCampo(
              horaOption,
              "Los domingos terminamos a las 20:00"
            );
            formularioCorrecto = false;
          }
        }

        let banda;
        if (tipo === "Concierto") {
          const bandaInput = document.getElementById("actividad-banda");
          banda = bandaInput.value;
          if (banda.length < 3) {
            mostrarErrorCampo(
              bandaInput,
              "El nombre de la banda debe contener mas de tres letras"
            );
            formularioCorrecto = false;
          }
        }

        const descripcionInput = document.getElementById(
          "actividad-descripcion"
        );
        const descripcion = descripcionInput.value;
        if (formularioCorrecto) {
          evento = new Actividad(
            dia,
            hora,
            ubicacion,
            tipo,
            banda,
            descripcion
          );
        }

        break;
    }
    if (formularioCorrecto) {
      resetFormulario(
        formulario,
        campoActividades,
        campoClase,
        campoUbicacionesActividades,
        campoUbicacionesClases
      );
      listaEventos.push(evento);
      const eventosJSON = JSON.stringify(listaEventos);
      localStorage.setItem(STORAGE, eventosJSON);
    }
  });
}

const resetFormulario = (
  formulario,
  campoActividades,
  campoClase,
  campoUbicacionesActividades,
  campoUbicacionesClases
) => {
  formulario.reset();
  campoClase.classList.add("oculto");
  campoActividades.classList.add("oculto");
  campoUbicacionesClases.classList.add("oculto");
  campoUbicacionesActividades.classList.add("oculto");
  const mensajesError = formulario.querySelectorAll(".error-mensaje");
  mensajesError.forEach((mensaje) => {
    mensaje.textContent = "";
    mensaje.classList.add("oculto");
  });

  const inputsValidados = formulario.querySelectorAll(".valido, .invalido");
  inputsValidados.forEach((input) => {
    input.classList.remove("valido", "invalido");
  });
};

const resetUbicaciones = () => {
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

const marcarSalasOcupadas = (
  diaSelect,
  horaSelect,
  seleccionActividad,
  salasClase,
  listaEventos
) => {
  const diaSeleccionado = diaSelect.value;
  const horaSeleccionada = horaSelect.value;

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
