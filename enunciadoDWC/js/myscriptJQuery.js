let preguntasAcertadas = 0;


let seleccionarOpcion = (boton) => { //es boton porque en el elemento que he creado abajo hay muchos botones(uno por cada opcion que loco) y en este caso no hay que coger todo el bloke
    $(boton).siblings().removeClass("seleccionada"); //el siblings es para que no se puedan marcar las 4 a la vez 
    $(boton).addClass("seleccionada");
};


//para guiarme-------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    $(".boton-iniciar").click(() => {

        $("#pantalla-inicio").addClass("oculto");//no sabia que esto iba aqui en el exam que rayada nen
        $("#pantalla-quiz").removeClass("oculto");

        fetch("files/PreguntasST.json")
            .then((response) => {
                return response.json();
            }).then((preguntas) => {
                preguntas.forEach((pregunta) => {

                    let bloquePregunta = $(`
                        <div class="bloque-pregunta" data-correcta="${pregunta.correcta}"> 
                            <div class="titulo-pregunta">
                                <span class="numero-pregunta">Pregunta ${pregunta.id}:</span> ${pregunta.pregunta}
                            </div>
                            <div class="opciones">
                                <button class="boton-opcion" data-opcion="0">${pregunta.opciones[0]}</button>
                                <button class="boton-opcion" data-opcion="1">${pregunta.opciones[1]}</button>
                                <button class="boton-opcion" data-opcion="2">${pregunta.opciones[2]}</button>
                                <button class="boton-opcion" data-opcion="3">${pregunta.opciones[3]}</button>
                            </div>
                        </div>
                    `);//el ${pregunta.correcta} es mio que ha sido la unica solucion viable a la comprobación de preguntas
                    $("#todas-preguntas").append(bloquePregunta);

                });
            });
    });

    $("#todas-preguntas").on("click", ".boton-opcion", function () {
        seleccionarOpcion(this);
    });

    $(".boton-enviar").click(() => {
        preguntasAcertadas = 0;
        let listaDePreguntas = $(".bloque-pregunta");
        listaDePreguntas.each(function () {
            let bloque = $(this);
            let respuestaCorrecta = bloque.data("correcta");
            let botonPulsado = bloque.find(".boton-opcion.seleccionada");
            let respuestaUsuario = botonPulsado.data("opcion");
            if (respuestaUsuario == respuestaCorrecta) {
                preguntasAcertadas++;
            } else {
                $(botonPulsado).addClass("incorrecta");
            };
        });
        Swal.fire({
            title: '¡Quiz Terminado!',
            text: `Has acertado ${preguntasAcertadas} de 10 preguntas.`,
            icon: preguntasAcertadas >= 5 ? 'success' : 'error',
            confirmButtonText: 'Aceptar'
        });
    });
});