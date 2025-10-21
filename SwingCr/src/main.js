import "./style.css";
import { Actividad } from "./modelo/Actividad.js";
import { Clase } from "./modelo/Clase.js";
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

const cargarEventos = () => {
  const eventosGuardados = localStorage.getItem(STORAGE);
  if (eventosGuardados) {
    return JSON.parse(eventosGuardados);
  } else {
    return [];
  }
};

const listaEventos = cargarEventos();

if (tablaClases) {
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
  const soloClases = [];
  const soloActividades = [];

  listaEventos.forEach((evento) => {
    if (evento.profesor != null) {
      soloClases.push(evento);
    } else {
      soloActividades.push(evento);
    }
  });
  soloClases.forEach((clase) => {
    const filaCorrecta = Array.from(cuerpoClase.querySelectorAll("tr")).find(
      (row) => row.querySelector("th")?.textContent === clase.hora
    ); //con ayuda de nuestro amigo confiable

    if (filaCorrecta) {
      let columna;
      switch (clase.dia) {
        case "Viernes":
          columna = 0;
          break;
        case "Sábado":
          columna = 1;
          break;
        case "Domingo":
          columna = 2;
          break;
      }
      const celdas = filaCorrecta.querySelectorAll("td");
      let tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-evento");

      let tituloTarjeta = document.createElement("div");
      tituloTarjeta.classList.add("tarjeta-evento__titulo");
      tituloTarjeta.textContent = clase.estilo;

      let ubicacionTarjeta = document.createElement("div");
      ubicacionTarjeta.classList.add("tarjeta-evento__ubicacion");
      ubicacionTarjeta.textContent = `Sala: ${clase.ubicacion}`;

      let nivelTarjeta = document.createElement("div");
      nivelTarjeta.classList.add("tarjeta-evento__nivel");
      nivelTarjeta.textContent = clase.nivel;

      //Datasets para encontrar el div
      tarjeta.dataset.dia = clase.dia;
      tarjeta.dataset.hora = clase.hora;

      tarjeta.appendChild(tituloTarjeta);
      tarjeta.appendChild(ubicacionTarjeta);
      tarjeta.appendChild(nivelTarjeta);

      const celdaUbicacion = celdas[columna];
      celdaUbicacion.appendChild(tarjeta);
    }
  });

  soloActividades.forEach((actividad) => {
    const filaCorrecta = Array.from(
      cuerpoActividades.querySelectorAll("tr")
    ).find((row) => row.querySelector("th")?.textContent === actividad.hora);

    if (filaCorrecta) {
      let columna;
      switch (actividad.dia) {
        case "Viernes":
          columna = 0;
          break;
        case "Sábado":
          columna = 1;
          break;
        case "Domingo":
          columna = 2;
          break;
      }
      const celdas = filaCorrecta.querySelectorAll("td");
      let tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-evento");

      let tituloTarjeta = document.createElement("div");
      tituloTarjeta.classList.add("tarjeta-evento__titulo");
      tituloTarjeta.textContent = actividad.tipo;

      let ubicacionTarjeta = document.createElement("div");
      ubicacionTarjeta.classList.add("tarjeta-evento__ubicacion");
      ubicacionTarjeta.textContent = `Ubicación: ${actividad.ubicacion}`;

      let bandaTarjeta = document.createElement("div");
      bandaTarjeta.classList.add("tarjeta-evento__banda");
      bandaTarjeta.textContent = `Banda: ${actividad.banda}`;

      tarjeta.dataset.dia = actividad.dia;
      tarjeta.dataset.hora = actividad.hora;

      tarjeta.appendChild(tituloTarjeta);
      tarjeta.appendChild(ubicacionTarjeta);
      tarjeta.appendChild(bandaTarjeta);

      const celdaUbicacion = celdas[columna];
      celdaUbicacion.appendChild(tarjeta);
    }
  });

  //Modal
  const modal = document.getElementById("modal-detalles");
  const modalCerrarBtn = document.getElementById("modal-cerrar");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalDia = document.getElementById("modal-dia");
  const modalHora = document.getElementById("modal-hora");
  const modalUbicacion = document.getElementById("modal-ubicacion");
  const modalEstilo = document.getElementById("modal-estilo");
  const modalNivel = document.getElementById("modal-nivel");
  const modalProfesor = document.getElementById("modal-profesor");
  const modalTipo = document.getElementById("modal-tipo");
  const modalBanda = document.getElementById("modal-banda");
  const modalDescripcion = document.getElementById("modal-descripcion");
  const modalDetallesClase = document.getElementById("modal-detalles-clase");
  const modalDetallesActividad = document.getElementById(
    "modal-detalles-actividad"
  );

  cuerpoClase.addEventListener("click", (event) => {
    const tarjetaClicada = event.target.closest(".tarjeta-evento");
    let eventoClick;
    if (tarjetaClicada) {
      const dia = tarjetaClicada.dataset.dia;
      const hora = tarjetaClicada.dataset.hora;

      eventoClick = listaEventos.find(
        (evento) => evento.dia === dia && evento.hora === hora
      );

      if (eventoClick) {
        modalDia.textContent = eventoClick.dia;
        modalHora.textContent = eventoClick.hora;
        modalUbicacion.textContent = eventoClick.ubicacion;
        modalTitulo.textContent = `Detalles de la Clase: ${eventoClick.estilo}`;

        modalEstilo.textContent = eventoClick.estilo;
        modalNivel.textContent = eventoClick.nivel;
        modalProfesor.textContent = eventoClick.profesor;

        modalDetallesClase.style.display = "block";
        modalDetallesActividad.style.display = "none";

        modal.classList.remove("oculto");
      }
    }
  });

  cuerpoActividades.addEventListener("click", (event) => {
    const tarjetaClicada = event.target.closest(".tarjeta-evento");
    if (tarjetaClicada) {
      const dia = tarjetaClicada.dataset.dia;
      const hora = tarjetaClicada.dataset.hora;

      const eventoClick = listaEventos.find(
        (evento) => evento.dia === dia && evento.hora === hora
      );

      if (eventoClick) {
      }
    }
  });

  modalCerrarBtn.addEventListener("click", () => {
    modal.classList.add("oculto");
  });
}

///////////////////////////////////////////////////////////////////////
else if (formulario) {
  const salasClase = ["Be Hopper", "New Orleans", "Savoy"];
  const salasActividades = ["Antiguo casino", "Parque", "Prado"];
  const diaSelect = document.getElementById("dia");
  const horaSelect = document.getElementById("hora");
  const seleccionActividad = document.getElementById("tipo-evento");
  const campoClase = document.getElementById("campos-clase");
  const campoActividades = document.getElementById("campos-actividad");
  const campoUbicacionesClases = document.getElementById("ubicaciones-clases");
  const campoUbicacionesActividades = document.getElementById(
    "ubicaciones-actividades"
  );

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
    listaEventos.push(evento);
    const eventosJSON = JSON.stringify(listaEventos);
    localStorage.setItem(STORAGE, eventosJSON);
    resetUbicaciones();
    marcarSalasOcupadas();
  });
}
