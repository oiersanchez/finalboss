let comentariosCreados = 0;
let comentariosPositivos = 0;
let comentariosNegativos = 0;

let actualizarMarcadores = () => {
    let positivos = 0;
    let negativos = 0;
    let total = $(".comentario").length;


    $(".comentario").each(function() {
        let votos = parseInt($(this).attr("data-votos"));
        if (votos > 0) positivos++;
        if (votos < 0) negativos++;
    });
    comentariosCreados = total;
    comentariosPositivos = positivos;
    comentariosNegativos = negativos;

    $("#totalComentarios").text(comentariosCreados);
    $("#comentariosPositivos").text(comentariosPositivos);
    $("#comentariosNegativos").text(comentariosNegativos);
};

//funciones globales
let eliminarComentario = (comentarioFull) => {
    $(comentarioFull).fadeOut(300, function () {
        $(this).remove();
        actualizarMarcadores(); 
    });
};

let aumentarVoto = (comentarioFull) => {
    let votosActuales = parseInt(comentarioFull.attr("data-votos"));
    votosActuales++;
    comentarioFull.attr("data-votos", votosActuales);
    comentarioFull.find(".contador-votos").text(votosActuales);
    actualizarMarcadores(); 
};

let disminuirVoto = (comentarioFull) => {
    let votosActuales = parseInt(comentarioFull.attr("data-votos"));
    votosActuales--;
    comentarioFull.attr("data-votos", votosActuales);
    comentarioFull.find(".contador-votos").text(votosActuales);
    actualizarMarcadores(); 
};


//esto es para ubicarme mejor------------------------------------------------------------------------------------------------------------------------------------------ 
$(document).ready(function () {
    $("button:nth-child(1)").click(() => {
        fetch("data/comentarios.json")
            .then((response) => {
                return response.json();
            }).then((comentarios) => {
                comentarios.forEach((comentario) => {
                    comentariosCreados++;

                    let comentarioFull = $(`
                        <div class="comentario" data-id="${comentario.id}" data-votos="${comentario.votos}">
                            <div class="comentario-header">
                                <span class="comentario-autor">${comentario.autor}</span>
                                <span class="comentario-fecha">${comentario.fecha}</span>
                            </div>
                            
                            <div class="comentario-texto">
                                ${comentario.texto}
                            </div>
                            
                            <div class="comentario-acciones">
                                <div class="votos">
                                    <button class="btn-voto upvote">▲</button>
                                    <span class="contador-votos">${comentario.votos}</span>
                                    <button class="btn-voto downvote">▼</button>
                                </div>
                                
                                <button class="btn-editar">Editar</button>
                                <button class="btn-eliminar">Eliminar</button>
                            </div>
                        </div>
                    `);

                    $("#listaComentarios").append(comentarioFull);

                    $("#totalComentarios").text(comentariosCreados);

                    actualizarMarcadores();
                });
            });
    });

    $("button:nth-child(2)").click(() => {

        let autor = prompt("Nombre de Usuario:")
        let votos = 0;

        //Sacar la fecha actual
        let ahora = new Date();
        let año = ahora.getFullYear();
        let mes = ahora.getMonth() + 1;
        let dia = ahora.getDate();
        let hora = ahora.getHours();
        let minutos = ahora.getMinutes();
        //Formatear con ceros a la izquierda si es necesario (lo saque de stackoverflow ante la duda, ni idea de esto)
        let mesFormateado = String(mes).padStart(2, '0');
        let diaFormateado = String(dia).padStart(2, '0');
        let horaFormateada = String(hora).padStart(2, '0');
        let minutosFormateados = String(minutos).padStart(2, '0');

        //Construir la fecha completa
        let fecha = año + "-" + mesFormateado + "-" + diaFormateado + " " + horaFormateada + ":" + minutosFormateados;
        let texto = prompt("Escribe tu comentario");


        if (texto !== null && texto !== "" && autor !== null && autor) {

            comentariosCreados++;

            let comentarioFull = $(`
                        <div class="comentario" data-id="${comentariosCreados}" data-votos="${votos}">
                            <div class="comentario-header">
                                <span class="comentario-autor">${autor}</span>
                                <span class="comentario-fecha">${fecha}</span>
                            </div>
                            
                            <div class="comentario-texto">
                                ${texto}
                            </div>
                            
                            <div class="comentario-acciones">
                                <div class="votos">
                                    <button class="btn-voto upvote">▲</button>
                                    <span class="contador-votos">${votos}</span>
                                    <button class="btn-voto downvote">▼</button>
                                </div>
                                
                                <button class="btn-editar">Editar</button>
                                <button class="btn-eliminar">Eliminar</button>
                            </div>
                        </div>
                    `);


            $("#listaComentarios").append(comentarioFull);
            $("#totalComentarios").text(comentariosCreados);
        }

    });

//eventos dentro del DOM----------------------------------------------------------------------------------------------------------------------------------------------------
    $("#listaComentarios").on("click", ".upvote", function() {
        let comentario = $(this).closest(".comentario");
        aumentarVoto(comentario);
    });

        $("#listaComentarios").on("click", ".downvote", function() {
        let comentario = $(this).closest(".comentario");
        disminuirVoto(comentario);
    });

    $("#listaComentarios").on("click", ".btn-eliminar", function() {
        let comentario = $(this).closest(".comentario");
        eliminarComentario(comentario);
    });


});