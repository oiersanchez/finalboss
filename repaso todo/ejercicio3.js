$(document).ready(function () {

    $("#anyadir").click(() => {
        let texto = prompt("Introduce un nuevo elemento:");
            $("ul").append("<li>" + texto + "</li>");      
    });

    $("#borrarPrimero").click(() => {
        $("ul li:first-child").remove();
    });

    $("#borrarUltimo").click(() => {
        $("ul li:last-child").remove();
    });

    $("#saludar").click(() => {
        let nombre = $("#nombre").val();
        let anio = $("#fechanac").val();
        let edad = 2025 - anio;
        if (edad >= 18){
            $("#salida").text("Hola " + nombre + " se te ve mayor");
        }else{
            $("#salida").text("Hola " + nombre + " se te ve menor");
        }
    });

    $("#generarClave").click(() => {
        let nombre = $("#nomUsu").val();
    });

});