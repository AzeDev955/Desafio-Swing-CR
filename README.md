# Desafio-Swing-CR
Desafio número 1 de Cliente e interfaces
# Desafío 1: Swing CR

Este fin de semana, se celebra en Ciudad Real el **VII festival de Swing.**

Actualmente, podemos ver en su página web el programa e información de este año con las distintas actividades, elenco de profesores y bandas que tocarán en directo.

No obstante, os dejo a continuación la planificación de eventos de este año (en primer lugar, horarios de fiestas y eventos sociales y en segundo lugar horarios de clases).

Pensando en la organización de este tipo de eventos, vamos a hacer una pequeña aproximación que permita el **registro de actividades y clases** en una aplicación web y genere el programa/planificación correspondiente.

- Desarrolla una aplicación web que permita **registrar actividades y clases para el VIII festival de Swing Ciudad Real (2026).**
- Los distintos tipos de actividades serán:
    - Clases, pudiendo éstas tener: profesores/as, estilo (Lindy Hop, Shag, Solo Jazz…) y nivel (básico, intermedio, avanzado…)
    - Actividades: teniendo como información:
        - Tipo: Taster, social, concierto, mix & match
        - Banda: si toca banda en directo
        - Profesores/as: si hay profesores/as implicados/as
        - Estilo: lindy hop, shag, sólo jazz…
        - Descripción: todo aquello que se quiera añadir como información de la actividad
- Todo se llevará a cabo en un fin de semana, **comenzando el viernes a las 20 horas y finalizando el domingo a las 20 horas**.
- Las clases se llevarán a cabo en tres salas: **Be Hopper, New Orleans y Savoy.** No podrán coincidir.
- El resto de actividades podrán realizarse en: **Antiguo Casino de Ciudad Real, Parque de Gasset, Prado** o en las salas mencionadas anteriormente **siempre que no haya clases en ellas.**
- Cuando se quiera registrar una actividad o clase:
    - El formulario pedirá en primer lugar el día y la hora.
    - Mostrará las salas libres o ubicaciones disponibles y si es viable el registro o un mensaje en caso contrario para cambiar la fecha.
    - Cada vez que registremos una clase o actividad, debe aparecer automáticamente en la **tabla que crearás para el programa.**
- **Tabla del programa:**
    - Cuando se registra una actividad o clase, aparecerá la tarjeta correspondiente en el día y hora correspondiente, indicando **nombre de la actividad y ubicación.**
    - Si pincho en la tarjeta, se abrirá un modal con toda la información correspondiente al evento.
    - Podrás cambiar haciendo **drag and drop** la fecha y hora de una tarjeta, siempre que la ubicación esté disponible (la ubicación que está establecida previamente no se podrá cambiar por simplificación del desafío).

# Requisitos de Diseño de Interfaces Web

Deberemos diseñar una interfaz atractiva intuitiva y responsive. La navegación debe ser fluida. Se debe prestar especial atención a la experiencia de usuario, priorizando la usabilidad y la estética coherente con la temática.

- Diseño de mockups y wireframes para cada pantalla.
- Uso de una paleta de colores coherente con la temática.
- Diseño responsive que funcione en diferentes dispositivos.
- Maquetación usando HTML5 y CSS3 con grid/flexbox.

# Requisitos de Desarrollo Web en Entorno Cliente

- Generación de código utilizando POO.
- Utilización correcta de funciones.
- Utilización correcta de las estructuras de almacenamiento en JS.
- Utilización correcta de los métodos de almacenamiento en el navegador del cliente.
- Estructuración del proyecto en distintos módulos e importaciones optimizadas.
- Gestión correcta de eventos.
- Implementación y validación correcta de formularios.
- Generación de un proyecto utilizando `Vite`.
- Iniciación a la metodología **agile SCRUM:**
    - Planificación de tareas por unidades funcionales completas. Coherencia.
    - Sprints desarrollando lo planificado.
    - Proyecto sincronizado con un repositorio en Github que se envía al profesor para su seguimiento.
