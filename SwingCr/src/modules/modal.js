export function manejarModal() {
  const tablaClases = document.getElementById("tabla-clases");
  const tablaActividades = document.getElementById("tabla-actividades");
  const cuerpoClase = tablaClases.querySelector("tbody");
  const cuerpoActividades = tablaActividades.querySelector("tbody");
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

  const eventosActualizados = JSON.parse(localStorage.getItem("eventosCR")); //prueba para ver si se actualiza constantemente el modal asi. Funciona asi!

  cuerpoClase.addEventListener("click", (event) => {
    const tarjetaClicada = event.target.closest(".tarjeta-evento");
    let eventoClick;
    if (tarjetaClicada) {
      const dia = tarjetaClicada.dataset.dia;
      const hora = tarjetaClicada.dataset.hora;
      const tipo = tarjetaClicada.dataset.tipoEvento;
      const ubicacionTarjeta = tarjetaClicada.dataset.ubicacion;

      if (tipo === "clase") {
        eventoClick = eventosActualizados.find(
          (evento) =>
            evento.dia === dia &&
            evento.hora === hora &&
            evento.profesor !== null &&
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
      const tipo = tarjetaClicada.dataset.tipoEvento;
      const ubicacionTarjeta = tarjetaClicada.dataset.ubicacion;
      if (tipo === "actividad") {
        const eventoClick = eventosActualizados.find(
          (evento) =>
            evento.dia === dia &&
            evento.hora === hora &&
            evento.tipo !== null &&
            ubicacionTarjeta === evento.ubicacion
        );

        if (eventoClick) {
          modalDia.textContent = eventoClick.dia;
          modalHora.textContent = eventoClick.hora;
          modalUbicacion.textContent = eventoClick.ubicacion;
          modalTitulo.textContent = `Detalles de la Actividad: ${eventoClick.tipoEvento}`;

          modalTipo.textContent = eventoClick.tipo;
          if (eventoClick.tipo === "Concierto") {
            modalBanda.textContent = eventoClick.banda; // Fill the band name
            modalBandaParrafo.style.display = "block"; // Show the paragraph
          } else {
            modalBandaParrafo.style.display = "none";
          }

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

  modalBorrarBtn.addEventListener("click", () => {});
}
