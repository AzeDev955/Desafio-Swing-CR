import { cargarEventos } from "../main";
const STORAGE = "eventosCR";
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
const modalBandaParrafo = document.getElementById("modal-banda-p");
const modalDescripcion = document.getElementById("modal-descripcion");
const modalDetallesClase = document.getElementById("modal-detalles-clase");
const modalDetallesActividad = document.getElementById(
  "modal-detalles-actividad"
);
const modalBorrarBtn = document.getElementById("modal-borrar-btn");

const manejarClickTabla = (event) => {
  const tarjetaClicada = event.target.closest(".tarjeta-evento");
  if (tarjetaClicada) {
    const eventoIdString = tarjetaClicada.dataset.id;
    if (!eventoIdString) return;

    const eventoId = parseInt(eventoIdString);
    modal.dataset.eventoId = eventoId;

    const listaActual = cargarEventos(STORAGE);
    const eventoEncontrado = listaActual.find((e) => e.id === eventoId);

    if (eventoEncontrado) {
      modalDia.textContent = eventoEncontrado.dia;
      modalHora.textContent = eventoEncontrado.hora;
      modalUbicacion.textContent = eventoEncontrado.ubicacion;

      if (eventoEncontrado.profesor !== undefined) {
        modalTitulo.textContent = `Detalles Clase: ${eventoEncontrado.estilo}`;
        modalEstilo.textContent = eventoEncontrado.estilo;
        modalNivel.textContent = eventoEncontrado.nivel;
        modalProfesor.textContent = eventoEncontrado.profesor;
        modalDetallesClase.style.display = "block";
        modalDetallesActividad.style.display = "none";

        modalBandaParrafo.style.display = "none";
      } else {
        modalTitulo.textContent = `Detalles Actividad: ${eventoEncontrado.tipo}`;
        modalTipo.textContent = eventoEncontrado.tipo;
        modalDescripcion.textContent =
          eventoEncontrado.descripcion || "Sin descripción";

        if (eventoEncontrado.tipo === "Concierto" && eventoEncontrado.banda) {
          modalBanda.textContent = eventoEncontrado.banda;
          modalBandaParrafo.style.display = "block";
        } else {
          modalBandaParrafo.style.display = "none";
        }
        modalDetallesClase.style.display = "none";
        modalDetallesActividad.style.display = "block";
      }
      modal.classList.remove("oculto");
    }
  }
};

const adjuntarListenersModal = () => {
  const cuerpoClase = document.querySelector("#tabla-clases tbody");
  const cuerpoActividades = document.querySelector("#tabla-actividades tbody");

  if (cuerpoClase) {
    cuerpoClase.removeEventListener("click", manejarClickTabla);
    cuerpoClase.addEventListener("click", manejarClickTabla);
  }
  if (cuerpoActividades) {
    cuerpoActividades.removeEventListener("click", manejarClickTabla);
    cuerpoActividades.addEventListener("click", manejarClickTabla);
  }
};

export function manejarModal() {
  if (modalCerrarBtn) {
    modalCerrarBtn.addEventListener("click", () =>
      modal.classList.add("oculto")
    );
  }

  adjuntarListenersModal();

  modalCerrarBtn.addEventListener("click", () => {
    modal.classList.add("oculto");
  });

  modalBorrarBtn.addEventListener("click", () => {
    const idToDelete = parseInt(modal.dataset.eventoId);
    let listaEventosActualizada = cargarEventos(STORAGE);

    const eventoIndex = listaEventosActualizada.findIndex(
      (evento) => evento.id === idToDelete
    );

    if (eventoIndex !== -1) {
      listaEventosActualizada.splice(eventoIndex, 1);
      localStorage.setItem(STORAGE, JSON.stringify(listaEventosActualizada));
      modal.classList.add("oculto");
      const tarjetaParaBorrar = document.querySelector(
        `.tarjeta-evento[data-id='${idToDelete}']`
      );
      if (tarjetaParaBorrar) {
        tarjetaParaBorrar.remove();
      }
    }
  });
}
