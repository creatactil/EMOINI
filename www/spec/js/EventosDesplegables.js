/**
 * Created by alejandro on 10/04/15.
 */

//Eventos de botones desplegables del primer y segundo cuadrante superior.
function DesplegarCuentos(){
    $("#PrimerCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $("#SegundoCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $('#PrimerCuadranteBajo .ui-block-a').removeClass("hidden").addClass("shown");
    $("#PrimerCuadranteBajo").css('z-index', '3')
    $("#SegundoCuadranteBajo").css('z-index', '3');
}

function DesplegarCollects(){
    $("#PrimerCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $("#SegundoCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $('#PrimerCuadranteBajo .ui-block-b').removeClass("hidden").addClass("shown");
    $("#PrimerCuadranteBajo").css('z-index', '3')
    $("#SegundoCuadranteBajo").css('z-index', '3');

}

function DesplegarFondos(){
    $("#PrimerCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $("#SegundoCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $('#PrimerCuadranteBajo .ui-block-c').removeClass("hidden").addClass("shown");
    $("#PrimerCuadranteBajo").css('z-index', '3')
    $("#SegundoCuadranteBajo").css('z-index', '3');
}

function DesplegarPersonajes(){
    $("#PrimerCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $("#SegundoCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $('#PrimerCuadranteBajo .ui-block-d').removeClass("hidden").addClass("shown");
    $("#PrimerCuadranteBajo").css('z-index', '3')
    $("#SegundoCuadranteBajo").css('z-index', '3');
}

function DesplegarObjetos(){
    $("#PrimerCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $("#SegundoCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $('#PrimerCuadranteBajo .ui-block-e').removeClass("hidden").addClass("shown");
    $("#PrimerCuadranteBajo").css('z-index', '3')
    $("#SegundoCuadranteBajo").css('z-index', '3');
}

function DesplegarBocadillos(){
    $("#PrimerCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $("#SegundoCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $('#SegundoCuadranteBajo .ui-block-a').removeClass("hidden").addClass("shown");
    $("#PrimerCuadranteBajo").css('z-index', '3')
    $("#SegundoCuadranteBajo").css('z-index', '3');
}

//Para ocultar los desplegables una vez se pulsa otro elemento o cuando se seecciona un objeto.
function OcultarDesplegables(){
    $("#PrimerCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $("#SegundoCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $("#PrimerCuadranteBajo").css('z-index', '-1')
    $("#SegundoCuadranteBajo").css('z-index', '-1');
}

//Eventos de desplegables de cuadrantes inferiores.
//Evento Seleccion de Cuento (faltan cosas)
function SeleccionLibro(){
    $("#BarraSlide").show();
    $("#PrimerCuadranteBajo").children().removeClass("shown").addClass("hidden");
    $('#PrimerCuadrante .ui-block-b').removeClass("hidden").addClass("shown");
    $('#PrimerCuadrante .ui-block-c').removeClass("hidden").addClass("shown");
    $('#PrimerCuadrante .ui-block-d').removeClass("hidden").addClass("shown");
    $('#PrimerCuadrante .ui-block-e').removeClass("hidden").addClass("shown");
    $('#SegundoCuadrante .ui-block-a').removeClass("hidden").addClass("shown");
}

//elimina el fondo actual de la pagina si lo hubiese
function rmFondo(){
    var RE = /Fondo_\d+/i;
    var ListaClases = $('.actual')[0].classList;
    for(var i=0; i<ListaClases.length; i++)
        if(ListaClases[i].match(RE)) {
            $('.actual').each(function() {
                $(this).removeClass(ListaClases[i]);
            });
        }
}

//Añadir Fondo
function addFondo(fondo,nombrefondo){
    rmFondo();
    $('.actual').each(function() {
        $(this).addClass(nombrefondo);
        $(this).css('background-image', 'url('+ fondo +')');
        $(this).css('background-position', 'center center')
        $(this).css('background-repeat' , 'no-repeat');
        $(this).css('background-attachment', 'fixed');
        $(this).css('background-size','cover');
    });

    OcultarDesplegables();
}

/*Añadir Elemento. Se le pasa el img que es la dirección de la imagen a insertar y el type que determina si es un objeto
o un fondo ect*/

function addElemento(img,typeelem,tipoimg){

    var num;
    var id;
    var clase;
    var clasepag;

    switch(typeelem) {
        case 'Personaje':
            num = $('.Personaje').length;
            id = "Personaje_" + num;
            clase = "Personaje";
            break;
        case 'Objeto':
            num = $('.Objeto').length;
            id = "Objeto_" + num;
            clase = "Objeto";
            break;
        case 'Bocadillo':
            num = $('.Bocadillo').length;
            id = "Bocadillo_" + num;
            clase = "Bocadillo";
            break;
        case 'Narracion':
            num = $('.Narracion').length;
            id = "Narracion_" + num;
            clase = "Narracion";
            break;
    }

    clasepag = 'Elem' + $('.actual')[0].id;

    if(clase != "Narracion" && clase != "Bocadillo") {
        $('.actual').each(function () {
            $(this).append('<div id="' + id + '" class="zoomProps ' + clase + ' ' + clasepag + ' ' + tipoimg + ' ' + CuentoActual.id +' draggable"><div class="polaroid"><IMG SRC="' + img + '"></div></div>');

            new ZoomView('#' + id, '#' + id  + ' :first');
        });
    }

    else if(clase == "Bocadillo"){
        $('.actual').each(function () {
            var idTextoBocadillo = id + "Texto";
            var idDivBocadillo = id + "DivBocadillo";
            var idDivTrasparente = id +"DivTrasparente"
            $(this).append('<div id="' + id + '" class="zoomProps ' + clase + ' ' + clasepag + ' ' + tipoimg + ' ' + CuentoActual.id +' draggable"><div class="polaroid"><div id ="' + idDivBocadillo + '"class = "bubble"></div></div></div>');

            var alto = $('#' + idDivBocadillo).height()-20;
            var largo = $('#' + idDivBocadillo).width()-20;

            //$('#' + idTextoBocadillo).height(alto);
            //$('#' + idTextoBocadillo).width(largo);

            /*var Position = $('#' + idTextoBocadillo).offset();   <p id ="' + idTextoBocadillo + '" class ="TextBocadillo"></p>
             $('#DivTrasparente').offset({ top: Position.top, left: Position.left });*/


            $('#' + id).on("doubletap",function(){
                if(GetModo()) {
                    Selectelement(this);
                    ReproducirAudioBocadillo();
                }

                else {
                    Selectelement(this);
                    AddTextoBocadillo();
                }
            });



           new ZoomView('#' + id, '#' + id + ' :first');
        });
    }

    else{
        $('.actual').each(function () {
            $(this).append('<div id="' + id + '" class="zoomProps ' + clase + ' ' + tipoimg + ' ' + clasepag + ' ' + CuentoActual.id +' draggable"><div class="polaroid"><input class="TextNarracionSelect" type="text" readonly="readonly"></div></div>');

            $('#' + id +" div.polaroid input.TextNarracionSelect").width()
          var width = $('#' + id +" div.polaroid input.TextNarracionSelect").width();
          var height = $('#' + id +" div.polaroid input.TextNarracionSelect").height();

          $("#" + id).width(width);
          $("#" + id).height(height);

            $('#' + id).on("doubletap",function(){
                if(GetModo()){
                    Selectelement(this);
                    ReproducirAudioNarracion();
                }

                else {
                    Selectelement(this);
                    AddTextoNarracion();
                }
            });

           new ZoomView('#' + id, '#' + id + ' :first');

        });
    }
   OcultarDesplegables();

}

//Determina que Elemento esta seleccionado en cada momento.
function Selectelement(namec){
    var ElementoActual;
    var name = namec.id;

    if($(".ElemActual").length > 0) {
        ElementoActual = $('.ElemActual')[0].id;
        $("#" + ElementoActual).removeClass("ElemActual");
    }
    $("#" + name).addClass("ElemActual");
}

function addText(namec){
    console.log(""+namec);
    if($("" + namec).classList.contains("Narracion"))
        AddTextoNarracion(namec);
    else if ($(""+ namec).classList.contains("Bocadillo"))
        AddTextoBocadillo(namec);
}

function MostrarMenu(){
    $('#PrimerCuadrante').toggle();
    $('#SegundoCuadrante').toggle();
    $('#PrimerCuadranteBajo').toggle();
    $('#SegundoCuadranteBajo').toggle();
    $('#BarraSlide').toggle();
}