let tareasCreadas = 0;

let editarTarea = (fila) => {
    let nuevaDescripcion = prompt("Nueva descripción:", fila.find("td:nth-child(2)").text());
    let nuevoEstado = prompt("Nuevo estado (Sin empezar, Empezada, Terminada):", fila.find("td:nth-child(3)").text());
    let nuevaPrioridad = prompt("Nueva prioridad (Alta, Media, Baja):", fila.find("td:nth-child(4)").text());
    if (nuevaDescripcion && nuevoEstado && nuevaPrioridad) {
        fila.find("td:nth-child(2)").text(nuevaDescripcion);
        fila.find("td:nth-child(3)").text(nuevoEstado);
        fila.find("td:nth-child(4)").text(nuevaPrioridad);
    } else {
        alert("Todos los campos son obligatorios");
    }
};

let eliminarTarea = (fila) => {
    $(fila).fadeOut(300, function () {
        $(this).remove();
        tareasCreadas--;
    });
};

$(document).ready(function () {

    $("button:nth-child(1)").click(() => {

        fetch("data/tareas.json")
            .then((response) => {
                return response.json();
            }).then((tareas) => {
                tareas.forEach((tarea) => {
                    tareasCreadas++;
                    let fila = $('<tr id="tarea-' + tareasCreadas + '">' +
                        '<td>' + tarea.id + '</td>' +
                        '<td>' + tarea.descripcion + '</td>' +
                        '<td>' + tarea.estado + '</td>' +
                        '<td>' + tarea.prioridad + '</td>' +
                        '<td><button class="eliminar">Eliminar</button> <button class="editar">Editar</button></td>' +
                        '</tr>');


                    $("#listaTareas").sortable({
                        placeholder: "fila-placeholder", 
                        helper: fixWidthHelper
                    }).disableSelection();

                    function fixWidthHelper(e, ui) {
                        ui.children().each(function () {
                            $(this).width($(this).width());
                        });
                        return ui;
                    }

                    fila.find(".editar").click(function () {
                        editarTarea(fila);
                    });
                    fila.find(".eliminar").click(function () {
                        eliminarTarea(fila);
                    });
                    $("#listaTareas").append(fila);
                });
            });
    });

    $("button:nth-child(2)").click(() => {

        let id = prompt("ID de la tarea:");
        let descripcion = prompt("Descripción de la tarea:");
        let estado = prompt("Estado de la tarea (Sin empezar, Empezada, Terminada):");
        let prioridad = prompt("Prioridad de la tarea (Alta, Media, Baja):");

        if (id && descripcion && estado && prioridad) {
            tareasCreadas++;

            let fila = $('<tr id="tarea-' + tareasCreadas + '">' +
                '<td>' + id + '</td>' +
                '<td>' + descripcion + '</td>' +
                '<td>' + estado + '</td>' +
                '<td>' + prioridad + '</td>' +
                '<td><button class="eliminar">Eliminar</button> <button class="editar">Editar</button></td>' +
                '</tr>');

                $("#listaTareas").sortable({
                        placeholder: "fila-placeholder",
                        helper: fixWidthHelper
                    }).disableSelection();

                    function fixWidthHelper(e, ui) {
                        ui.children().each(function () {
                            $(this).width($(this).width());
                        });
                        return ui;
                    }

            fila.find(".editar").click(function () {
                editarTarea(fila);
            });
            fila.find(".eliminar").click(function () {
                eliminarTarea(fila);
            });

            $("#listaTareas").append(fila);
        } else {
            alert("Todos los campos son obligatorios");
        }

    });
    /*
        $("#filtrarEstado").change(function () {
            let estado = $(this).val(); // obtenemos el estado seleccionado

            $("#listaTareas tr").each(function () {
                let estadoFila = $(this).find("td:nth-child(3)").text(); // columna estado

                if (estado === "Todos" || estadoFila === estado) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });

        $("#filtrarPrioridad").change(function () {
            let prioridad = $(this).val(); // obtenemos el estado seleccionado

            $("#listaTareas tr").each(function () {
                let prioridadFila = $(this).find("td:nth-child(4)").text(); // columna estado

                if (prioridad === "Todos" || prioridadFila === prioridad) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    */

    function filtrarTareas() {
        let estadoSeleccionado = $("#filtrarEstado").val();
        let prioridadSeleccionada = $("#filtrarPrioridad").val();

        $("#listaTareas tr").each(function () {
            let estadoFila = $(this).find("td:nth-child(3)").text();
            let prioridadFila = $(this).find("td:nth-child(4)").text();

            //solo funciona si cumpletodo
            if ((estadoSeleccionado === "Todos" || estadoFila === estadoSeleccionado) &&
                (prioridadSeleccionada === "Todos" || prioridadFila === prioridadSeleccionada)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
 
    $("#filtrarEstado, #filtrarPrioridad").change(filtrarTareas);

    $("#buscarDescripcion").keyup(function () {
        let valor = $(this).val().toLowerCase();

        $("#listaTareas tr").each(function () {
            let descripcion = $(this).find("td").eq(1).text().toLowerCase();
            if (descripcion.includes(valor)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $("#tablaTareas th").click(function () {
        let index = $(this).index(); 
        let filas = $("#listaTareas tr").get();

        filas.sort((a, b) => {
            let valA = $(a).children("td").eq(index).text().toUpperCase();
            let valB = $(b).children("td").eq(index).text().toUpperCase();

            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        });

        $.each(filas, function (idx, fila) {
            $("#listaTareas").append(fila);
        });
    });

   

    $("#listaTareas").on("click", "tr", function (e) {
        if ($(e.target).is("button")) return; 

        let estadoCelda = $(this).find("td").eq(2);
        if (estadoCelda.text() !== "Terminada") {
            estadoCelda.text("Terminada");
            $(this).css("background-color", "#d4edda"); 
        }
    });

});