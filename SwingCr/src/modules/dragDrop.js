import { cargarEventos } from "../main";

const STORAGE = "eventosCR";
let listaEventos = cargarEventos(STORAGE);

let tarjetaDrag = null; // Tarjeta que se está arrastrando

const inicioDrag = (listaEventos) => {
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

const obtenerEventoTarjeta = (tarjeta, listaEventos) => {
  const { dia, hora, ubicacion } = tarjeta.dataset;
  return listaEventos.find(
    (e) => e.dia === dia && e.hora === hora && e.ubicacion === ubicacion
  );
};

const manejoDropActividad = (e) => {
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
  const eventoTarjeta = obtenerEventoTarjeta(tarjetaArrastrada, listaEventos);
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

    inicioDrag(listaEventos);
  } else {
    return;
  }
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
const manejoDragLeave = () => {
  if (tarjetaDrag) {
    tarjetaDrag.classList.remove("dragging");
  }
};
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
  const eventoTarjeta = obtenerEventoTarjeta(tarjetaArrastrada, listaEventos);
  const ubicacionARevisar = eventoTarjeta.ubicacion;

  const eventoEnUbicacion = listaEventos.some(
    (evento) =>
      evento.dia === newDia &&
      evento.hora === newHora &&
      evento.ubicacion === ubicacionARevisar
  );

  if (
    !eventoEnUbicacion &&
    !celdaDestino.classList.contains("hora_no_usable")
  ) {
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

    inicioDrag(listaEventos);
  } else {
    return;
  }
}

export function manejarDragAndDrop(listaEventos) {
  inicioDrag(listaEventos);
}
