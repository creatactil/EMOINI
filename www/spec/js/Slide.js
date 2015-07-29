/**
 * Created by alejandro on 14/04/15.
 */

//Desliza las páginas a la izquierda (para el usuario este movimiento es a la derecha).
function slideizq() {
    var PagIndex = $(".PaginaCuento").length;
    var Actual = $('.actual')[0].id;
    var num = parseInt($('.actual')[0].id.split('_')[1])+1;
    var Siguiente;
    GuardarFondoPagina();
    GuardarObjectPagina();
    OcultarElmentos(Actual);

    if(num < PagIndex) {
        Siguiente = 'pag_' + num;
        $('.PaginaCuento').each(function () {

            if ($(this)[0].id == Siguiente) {
                $("#" + Siguiente).animate({
                    left: '0%'
                }, 500);

                $("#" + Siguiente).addClass("actual");
            }


            if ($(this)[0].id == Actual) {

                $("#" + Actual).animate({
                    left: '-200%'
                }, 500);

                $("#" + Actual).removeClass("actual");
            }


        });
    }
    MostrarElementos($('.actual')[0].id);
    console.log('\n');
};

//Desliza las páginas a la derecha (para el usuario este movimiento es a la izquirda).
function slideder(){

    var PagIndex = $(".PaginaCuento").length;
    var Actual = $('.actual')[0].id;
    var Anterior = $('.actual')[0].id;
    var num = parseInt($('.actual')[0].id.split('_')[1])-1;
    var Siguiente;
    GuardarFondoPagina();
    GuardarObjectPagina();
    OcultarElmentos(Actual);


    if(num >= 0) {
        Siguiente = "pag_" + num;

        $('.PaginaCuento').each(function () {

            if ($(this)[0].id == Siguiente) {

                $("#" + Siguiente).animate({
                    left: '0%'
                }, 500);

                $("#" + Siguiente).addClass("actual");
            }

            if ($(this)[0].id == Actual) {

                $("#" + Actual).animate({
                    left: '200%'
                }, 500);

                $("#" + Actual).removeClass("actual");
            }


        });
    }
 //   OcultarElmentos(Anterior);
    MostrarElementos($('.actual')[0].id);
};

//Oculta los elementos de la página actual al pasar la página.
function OcultarElmentos(Actual){
    var clase = 'Elem' + Actual;

    $("." + clase).each(function() {
        $(this).hide();
    });
}

//Vuelve a mostrar los elementos de la página.
function MostrarElementos(Actual){
    var clase = 'Elem' + Actual;

    $("." + clase).each(function() {
        $(this).show();
    });
}

//Borra los elementos
function BorrarElementoPagina(Actual){
    var clase = 'Elem' + Actual;
    var PagIndex = $(".PaginaCuento").length;
    var Elementosize = $(".zoomProps").length;
    var num = parseInt($('.actual')[0].id.split('_')[1]);

    $("." + clase).each(function() {
        $(this).remove();
    });
    //attr('id', "pag_"+i);
    if(num < PagIndex) {
        var idreal;
        for (var i = num; i < Elementosize; i++) {
            idreal = i + 1;
            $("#Elempag_" + idreal).attr('id', "Elempag_" + i);
        }
    }

}

//Añade páginas al slide
function addPage(){
    var PagIndex = $(".PaginaCuento").length;
    $("#TabsCuento").append('<div id="pag_'+PagIndex+ '" class="PaginaCuento izquierda '+ CuentoActual.ID +'"></div>');
    CuentoActual.N_Pag +=1;
    GuardarPagina();
}

//Elimina la página actual del slide
function removePage(){
    var PagIndex = $(".PaginaCuento").length;
    var indexfinal = PagIndex-1;
    var Actual = $('.actual')[0].id;
    var HojaFinal = $('#pag_'+indexfinal)[0].id;
    var num = parseInt($('.actual')[0].id.split('_')[1]);
    var Siguiente;

    BorrarElementoPagina(Actual);

    if(Actual == "pag_0"){
        num++;
        Siguiente = 'pag_' + num;

        //Pasamos hoja

        $("#" + Siguiente).animate({
            left: '0%'
        }, 500);

        $("#" + Siguiente).addClass("actual");


        $("#" + Actual).animate({
            left: '-200%'
        }, 500);

        $("#" + Actual).removeClass("actual");

        // Eliminamos la pagina.
        $("#pag_0").remove();
        PagIndex--;

        //Renombramos el resto de páginas.
        var idreal;
        for(var i=0; i<PagIndex; i++){
            idreal = i+1;
            $("#pag_" + idreal).attr('id', "pag_"+i);
        }

        MostrarElementos(Siguiente);

    }

    else if(Actual != "pag_0" && Actual != HojaFinal){
        num--;
        Siguiente = 'pag_' + num;


        //Pasamos hoja

        $("#" + Siguiente).animate({
            left: '0%'
        }, 500);

        $("#" + Siguiente).addClass("actual");


        $("#" + Actual).animate({
            left: '200%'
        }, 500);

        $("#" + Actual).removeClass("actual");

        // Eliminamos la pagina.
        num = parseInt($('.actual')[0].id.split('_')[1]);
        $("#" + Actual).remove();
        PagIndex--;

        //Renombramos Paginas.
        var idreal;
        console.log(num);
        for(var i=num; i<PagIndex; i++){
            idreal = i+1;
            $("#pag_" + idreal).attr('id', "pag_"+i);
        }
        MostrarElementos(Siguiente);

    }

    else{
        num--;
        Siguiente = 'pag_' + num;


        //Pasamos hoja.

        $("#" + Siguiente).animate({
            left: '0%'
        }, 500);

        $("#" + Siguiente).addClass("actual");

        $("#" + Actual).animate({
            left: '200%'
        }, 500);

        $("#" + Actual).removeClass("actual");

        //Eliminamos hoja.
        $("#" + Actual).remove();
        PagIndex--;

        MostrarElementos(Siguiente);

      }
    CuentoActual.N_Pag -=1;
}

//Borras las Hojas del libro (todas) se utiliza al cambiar de cuento.
function BorrarPaginasCuento() {
    $('.PaginaCuento').each(function () {
        $(this).remove();
    });
}
