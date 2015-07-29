/**
 * Created by alejandro on 14/04/15.
 */

function VolverPaginacero(){
	var tam = Paginas.indexOf($('.actual')[0].id);
	for(var i = 0; i<tam; i++){
		slideder();
	}
}

//Desliza las páginas a la izquierda (para el usuario este movimiento es a la derecha).
function slideizq() {
	var PagIndex = $(".PaginaCuento").length;
    var Actual = $('.actual')[0].id;
    var index = jQuery.inArray( Actual, Paginas );
    var num = parseInt($('.actual')[0].id.split('_')[1])+1;
    var Siguiente;
    OcultarElmentos(Actual);

    if(index+1 < Paginas.length) {
        Siguiente = Paginas[index+1];
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
    UltimaPaginaModificada();
};

//Desliza las páginas a la derecha (para el usuario este movimiento es a la izquirda).
function slideder(){

    var Actual = $('.actual')[0].id;
    var num = parseInt($('.actual')[0].id.split('_')[1])-1;
    var index = jQuery.inArray( Actual, Paginas );
    var Siguiente;         
    OcultarElmentos(Actual);


    if(index-1 >= 0) {
        Siguiente = Paginas[index-1];

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
    MostrarElementos($('.actual')[0].id);
    UltimaPaginaModificada();
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
}

//Añade páginas al slide
function addPage(){
    var num = parseInt(Paginas[Paginas.length-1].split("_")[1])+1;
    $("#TabsCuento").append('<div id="pag_'+num+ '" class="PaginaCuento izquierda '+ CuentoActual.ID +'"></div>');
    Paginas.push("pag_"+num);
    CuentoActual.N_Pag +=1;
    GuardarPagina(num);
}

//Elimina la página actual del slide
function removePage(){
    var PagIndex = $(".PaginaCuento").length;
    //var indexfinal = PagIndex-1;
    var Actual = $('.actual')[0].id;
    var index = jQuery.inArray( Actual, Paginas );

    var HojaFinal = Paginas[Paginas.length-1];
    var num = parseInt($('.actual')[0].id.split('_')[1]);
    var Siguiente;

    console.log(index);

    BorrarElementoPagina(Actual);

    if(Paginas.length == 1)
        alert("¡No puede borrar la única página del cuento que queda!");

    if(Actual == Paginas[0]){
        EliminarPagina();
        Siguiente = Paginas[1];

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
        $(Paginas[0]).remove();
        Paginas.splice(index,1);

        MostrarElementos(Siguiente);

    }

    else if(Actual != Paginas[0] && Actual != HojaFinal){
        EliminarPagina();

        Siguiente = Paginas[index-1];


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
        Paginas.splice(index,1);


        //Renombramos Paginas.

 /*       var idreal;
        console.log(num);
        for(var i=num; i<PagIndex; i++){
            idreal = i+1;
            $("#pag_" + idreal).attr('id', "pag_"+i);
        } */

        MostrarElementos(Siguiente);

    }

    else{
        EliminarPagina();

        Siguiente = Paginas[index-1];


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
        Paginas.splice(index,1);

        MostrarElementos(Siguiente);

      }
    CuentoActual.N_Pag -=1;
}

//Borras las Hojas del libro (todas) se utiliza al cambiar de cuento.
function BorrarPaginasCuento() {
    $('.PaginaCuento').each(function () {
        $(this).remove();
    });
    Paginas = [];
}
