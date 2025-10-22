export function iniciarTablas(horasClase, horasActividades, dias) {
  const tablaClases = document.getElementById("tabla-clases");
  const tablaActividades = document.getElementById("tabla-actividades");
  const cuerpoClase = tablaClases.querySelector("tbody");
  const cuerpoActividades = tablaActividades.querySelector("tbody");
  horasClase.forEach((hora) => {
    let nuevaFila = document.createElement("tr");
    let nuevoTh = document.createElement("th");
    nuevoTh.textContent = hora;
    nuevaFila.appendChild(nuevoTh);
    for (let i = 0; i < 3; i++) {
      let nuevoTd = document.createElement("td");
      nuevoTd.dataset.dia = dias[i];
      nuevoTd.dataset.hora = hora;
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
      const dias = ["Viernes", "Sábado", "Domingo"];
      let nuevoTd = document.createElement("td");
      nuevoTd.dataset.dia = dias[i];
      nuevoTd.dataset.hora = hora;
      nuevaFila.appendChild(nuevoTd);
    }
    cuerpoActividades.appendChild(nuevaFila);
  });
}

export function cargarTarjetas(listaEventos) {
  const tablaClases = document.getElementById("tabla-clases");
  const tablaActividades = document.getElementById("tabla-actividades");
  const cuerpoClase = tablaClases.querySelector("tbody");
  const cuerpoActividades = tablaActividades.querySelector("tbody");
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
      (row) => row.querySelector("th")?.textContent.trim() === clase.hora
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
      tarjeta.dataset.tipo = "clase";
      tarjeta.dataset.ubicacion = clase.ubicacion;

      tarjeta.appendChild(tituloTarjeta);
      tarjeta.appendChild(ubicacionTarjeta);
      tarjeta.appendChild(nivelTarjeta);

      tarjeta.setAttribute("draggable", "true");
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
      tarjeta.dataset.tipo = "actividad";
      tarjeta.dataset.ubicacion = actividad.ubicacion;

      tarjeta.appendChild(tituloTarjeta);
      tarjeta.appendChild(ubicacionTarjeta);
      tarjeta.appendChild(bandaTarjeta);

      tarjeta.setAttribute("draggable", "true");
      const celdaUbicacion = celdas[columna];
      celdaUbicacion.appendChild(tarjeta);
    }
  });
}
