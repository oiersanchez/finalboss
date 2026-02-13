let deseosCreados = 0;
let deseosCumplidos = 0;

let colores= ["#007D85","#009783" ,"#054C82" ,"#009385"];

let cumplirDeseo = (mensaje) => {
    $(mensaje).fadeOut(300, function () {
        $(this).remove();
        deseosCreados--;
        deseosCumplidos++; 
        //ke no se me olvide actualizarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr siempre jiji
        $("span:nth-child(1)").text(deseosCreados);
        $("span:nth-child(2)").text(deseosCumplidos);
    });
};

//esto es para ubicarme----------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    $("button:nth-child(1)").click(() => {
        fetch("data/deseos.json")
            .then((response) => {
                return response.json();
            }).then((deseos) => {
                deseos.forEach((deseo) => {
                    deseosCreados++;

                    let mensaje = $(`<div class="mensaje" id="${deseosCreados}"><p> ${deseo.texto}  </p></div>`);

                    mensaje.css("background-color", deseo.color);

                    $("#panelDeseos").append(mensaje);

                    $("span:nth-child(1)").text(deseosCreados);

                });
            });
    });


    $("button:nth-child(2)").click(() => {
        let deseoTexto = prompt ("Cual es tu deseo?");

        if (deseoTexto !== null && deseoTexto){
                let random = Math.floor((Math.random() * 4) );
                let colorAleatorio= colores[random];
                deseosCreados++;

                    let mensaje = $(`<div class="mensaje" id="${deseosCreados}"><p> ${deseoTexto}  </p></div>`);


                     mensaje.css("background-color", colorAleatorio);

                    $("#panelDeseos").append(mensaje);

                    $("span:nth-child(1)").text(deseosCreados);
        };
    });

       $("#panelDeseos").on("click", ".mensaje", function() {
        let deseo = $(this).closest(".mensaje");//closest se utiliza para que cliques donde clique recoja la accion, si no fuese un div con movidas y fuese un boton no haria falta
        cumplirDeseo(deseo);                    //asi resumidito, toque lo que toque en este caso va a ir hasta el padre que es .mensaje (el div principal vaya).
    });
});


        
                  