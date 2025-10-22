import "./style.css";
import { Actividad } from "./modelo/Actividad.js";
import { Clase } from "./modelo/Clase.js";
import { inicioFormulario } from "./modules/formulario.js";
import { iniciarTablas } from "./modules/render.js";
import { cargarTarjetas } from "./modules/render.js";

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
  iniciarTablas(horasClase, horasActividades, dias);
  cargarTarjetas(listaEventos, STORAGE);
  //Modal/////////////////////////////////////////////////////////////////////////
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
      const tipo = tarjetaClicada.dataset.tipo;
      const ubicacionTarjeta = tarjetaClicada.dataset.ubicacion;
      if (tipo === "clase") {
        eventoClick = listaEventos.find(
          (evento) =>
            evento.dia === dia &&
            evento.hora === hora &&
            evento.nivel != null &&
            ubicacionTarjeta === evento.ubicacion
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
    }
  });

  cuerpoActividades.addEventListener("click", (event) => {
    const tarjetaClicada = event.target.closest(".tarjeta-evento");
    if (tarjetaClicada) {
      const dia = tarjetaClicada.dataset.dia;
      const hora = tarjetaClicada.dataset.hora;
      const tipo = tarjetaClicada.dataset.tipo;
      const ubicacionTarjeta = tarjetaClicada.dataset.ubicacion;
      if (tipo === "actividad") {
        const eventoClick = listaEventos.find(
          (evento) =>
            evento.dia === dia &&
            evento.hora === hora &&
            evento.nivel == null &&
            ubicacionTarjeta === evento.ubicacion
        );

        if (eventoClick) {
          modalDia.textContent = eventoClick.dia;
          modalHora.textContent = eventoClick.hora;
          modalUbicacion.textContent = eventoClick.ubicacion;
          modalTitulo.textContent = `Detalles de la Actividad: ${eventoClick.tipo}`;

          modalTipo.textContent = eventoClick.tipo;
          modalBanda.textContent = eventoClick.banda;
          modalDescripcion.textContent = eventoClick.descripcion;

          modalDetallesClase.style.display = "none";
          modalDetallesActividad.style.display = "block";

          modal.classList.remove("oculto");
        }
      }
    }
  });

  modalCerrarBtn.addEventListener("click", () => {
    modal.classList.add("oculto");
  });

  //Drag n drop///////////////////////////////////////////////////////////////////
  const obtenerEventoTarjeta = (tarjeta) => {
    const { dia, hora, ubicacion } = tarjeta.dataset;
    return listaEventos.find(
      (e) => e.dia === dia && e.hora === hora && e.ubicacion === ubicacion
    );
  };

  const actualizarEventoEnLista = (
    oldDia,
    oldHora,
    oldUbicacion,
    newDia,
    newHora
  ) => {
    const eventoIndex = listaEventos.findIndex(
      (evento) =>
        evento.dia === oldDia &&
        evento.hora === oldHora &&
        evento.ubicacion === oldUbicacion
    );

    if (eventoIndex !== -1) {
      listaEventos[eventoIndex] = {
        ...listaEventos[eventoIndex], // Mantener todas las propiedades existentes, sacado del que te cuento porque no habia manera
        dia: newDia,
        hora: newHora,
      };

      const eventosJSON = JSON.stringify(listaEventos);
      localStorage.setItem(STORAGE, eventosJSON);
      return true;
    }
    return false;
  };

  const inicioDrag = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-evento");
    const celdasClase = document.querySelectorAll("#tabla-clases td");
    const celdasActividad = document.querySelectorAll("#tabla-actividades td");

    tarjetas.forEach((tarjeta) => {
      tarjeta.addEventListener("dragstart", manejoDragstart);
    });

    celdasClase.forEach((celda) => {
      celda.addEventListener("dragover", manejoDragOver);
      celda.addEventListener("drop", manejoDropClase);
      celda.addEventListener("dragenter", manejoDragEnter);
      celda.addEventListener("dragleave", manejoDragLeave);
    });

    celdasActividad.forEach((celda) => {
      celda.addEventListener("dragover", manejoDragOver);
      celda.addEventListener("drop", manejoDropActividad);
      celda.addEventListener("dragenter", manejoDragEnter);
      celda.addEventListener("dragleave", manejoDragLeave);
    });
  };

  let tarjetaDrag = null;

  const manejoDragstart = (e) => {
    tarjetaDrag = e.currentTarget;
    e.dataTransfer.setData("text/plain", tarjetaDrag.dataset.tipo);
    tarjetaDrag.classList.add("dragging");
  };

  const manejoDragOver = (e) => {
    e.preventDefault();
  };

  const manejoDragEnter = (e) => {
    e.preventDefault();
  };

  function manejoDragLeave(e) {
    if (tarjetaDrag) {
      tarjetaDrag.classList.remove("dragging");
    }
  }

  function manejoDropClase(e) {
    e.preventDefault();

    const celdaDestino = e.currentTarget;
    const tarjetaArrastrada = tarjetaDrag;

    const tipo = e.dataTransfer.getData("text/plain");
    if (tipo !== "clase") {
      return;
    }

    const newDia = celdaDestino.dataset.dia;
    const newHora = celdaDestino.dataset.hora;
    const oldDia = tarjetaArrastrada.dataset.dia;
    const oldHora = tarjetaArrastrada.dataset.hora;
    const eventoTarjeta = obtenerEventoTarjeta(tarjetaArrastrada);
    const ubicacionARevisar = eventoTarjeta.ubicacion;

    const eventoEnUbicacion = listaEventos.some(
      (evento) =>
        evento.dia === newDia &&
        evento.hora === newHora &&
        evento.ubicacion === ubicacionARevisar
    );

    if (!eventoEnUbicacion) {
      tarjetaArrastrada.classList.remove("dragging");
      celdaDestino.appendChild(tarjetaArrastrada);

      tarjetaArrastrada.dataset.dia = newDia;
      tarjetaArrastrada.dataset.hora = newHora;

      actualizarEventoEnLista(
        oldDia,
        oldHora,
        ubicacionARevisar,
        newDia,
        newHora
      );

      inicioDrag();
    } else {
      return;
    }
  }
  inicioDrag();
  function manejoDropActividad(e) {
    e.preventDefault();

    const celdaDestino = e.currentTarget;
    const tarjetaArrastrada = tarjetaDrag;

    const tipo = e.dataTransfer.getData("text/plain");
    if (tipo !== "actividad") {
      return;
    }

    const newDia = celdaDestino.dataset.dia;
    const newHora = celdaDestino.dataset.hora;
    const oldDia = tarjetaArrastrada.dataset.dia;
    const oldHora = tarjetaArrastrada.dataset.hora;
    const eventoTarjeta = obtenerEventoTarjeta(tarjetaArrastrada);
    const ubicacionARevisar = eventoTarjeta.ubicacion;

    let claseOcupada = false;

    if (salasClase.includes(ubicacionARevisar)) {
      claseOcupada = listaEventos.some(
        (evento) =>
          evento.dia === newDia &&
          evento.hora === newHora &&
          evento.ubicacion === ubicacionARevisar
      );
    }

    if (!claseOcupada) {
      tarjetaArrastrada.classList.remove("dragging");
      celdaDestino.appendChild(tarjetaArrastrada);

      tarjetaArrastrada.dataset.dia = newDia;
      tarjetaArrastrada.dataset.hora = newHora;

      actualizarEventoEnLista(
        oldDia,
        oldHora,
        ubicacionARevisar,
        newDia,
        newHora
      );

      inicioDrag();
    } else {
      return;
    }
  }
} else if (formulario) {
  inicioFormulario(listaEventos, salasClase, STORAGE);
}
