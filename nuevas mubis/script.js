$(document).ready(function() {

  let tareas = [];

  // Cargar tareas desde el JSON
  fetch("tareas.json")
    .then(response => response.json())
    .then(tareasJSON => {
      tareas = tareasJSON;

      tareas.forEach(tarea => {
        pintarTarea(tarea);
      });
    });

  // FUNCIÓN PARA PINTAR UNA TAREA 
function pintarTarea(tarea) {
  let elemento = $(`
    <li class="bg-white p-2 rounded flex justify-between items-center" data-id="${tarea.id}">
      <span class="texto">${tarea.descripcion}</span>
      <div>
        <button class="bg-yellow-400 text-white px-2 py-1 rounded btnEditar">
          Editar
        </button>
        <button class="bg-red-500 text-white px-2 py-1 rounded btnEliminar ml-2">
          X
        </button>
      </div>
    </li>
  `);

  $("#listaTareas").append(elemento);
}

  // Añadir nueva tarea
  $("#btnAgregar").click(function() {

    let descripcionNueva = $("#nuevaTarea").val();

    if (descripcionNueva === "") {
      return;
    }

    let nuevaTarea = {
      id: (tareas.length + 1).toString(),
      descripcion: descripcionNueva,
      estado: "Sin empezar",
      prioridad: "Media"
    };

    tareas.push(nuevaTarea);
    pintarTarea(nuevaTarea);

    $("#nuevaTarea").val("");
  });


$("#listaTareas").on("click", ".btnEliminar", function() {

  let li = $(this).closest("li");
  let id = li.data("id");

  // Eliminar del array
  tareas = tareas.filter(tarea => tarea.id != id);

  // Eliminar del DOM
  li.remove();
});


$("#listaTareas").on("click", ".btnEditar", function() {

  let li = $(this).closest("li");
  let id = li.data("id");

  let tarea = tareas.find(t => t.id == id);

  let nuevoTexto = prompt("Editar tarea:", tarea.descripcion);

  if (nuevoTexto === null || nuevoTexto === "") {
    return;
  }

  // Actualizar datos
  tarea.descripcion = nuevoTexto;

  // Actualizar DOM
  li.find(".texto").text(nuevoTexto);
});



});
