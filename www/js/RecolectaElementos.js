/**
 * Created by alejandro on 6/05/15.
 */
/*
Metodos utilizados para conseguir los elementos de cada una de las paginas para guardarlas en la
base de datos.
 */


//Consigue el fondo de una pagina.
function getFondo(idpagina){
    var RE = /Fondo_\d+/i;
    var ListaClases = $('#'+idpagina)[0].classList;

    for(var i=0; i<ListaClases.length; i++)
        if(ListaClases[i].match(RE))
            return ListaClases[i];

    return "Fondo_-1";
}

function gettipo(element){
    var RE = /tipo_\d+/i;
    var ListaClases = element[0].classList;

    for(var i = 0; i<ListaClases.length; i++)
        if(ListaClases[i].match(RE))
            return ListaClases[i];

}

function getPosition(element) {

    var xCompleto = $(document).width();
    var yCompleto = $(document).height();

    var rect = $('#'+element).offset();
    return { x:(rect.left/xCompleto) , y: (rect.top/yCompleto) };
}

function getTransformation(id){
    if(localStorage.getItem(id+"_trans") != null)
        return JSON.parse(localStorage[id+"_trans"]);
    return [1,0];
}

//Devuelve un array con los objetos de una pagina
function getObjetos(idpag){
    var i = 0;

    var objetos = new Array();

    $(".Objeto.Elempag_" + idpag).each(function () {
        var position = getPosition($(this)[0].id);
        var trans = getTransformation($(this)[0].id);
        objetos[i] = { id: $(this)[0].id.split('_')[1] ,x:position.x, y:position.y, zoom: trans[0], angulo:trans[1] ,tipo:gettipo($(this)).split('_')[1],idpag:idpag};
        i++;
    });

    return objetos;
}

function getPersonajes(idpag){
    var i = 0;

    var Personajes = new Array();

    $(".Personaje.Elempag_" + idpag).each(function () {
        var position = getPosition($(this)[0].id);
        var trans = getTransformation($(this)[0].id);
        Personajes[i] = { id: $(this)[0].id.split('_')[1] ,x:position.x, y:position.y, zoom: trans[0], angulo:trans[1] ,tipo:gettipo($(this)).split('_')[1],idpag:idpag};
        i++;
    });

    return Personajes;
}

function getNarraciones(idpag){
    var i = 0;

    var Narraciones = new Array();


    $(".Narracion.Elempag_" + idpag).each(function () {
        var position = getPosition($(this)[0].id);
        var trans = getTransformation($(this)[0].id);
        var texto = $("#"+$(this)[0].id+" .TextNarracion").val();
        Narraciones[i] = { id: $(this)[0].id.split('_')[1] ,x:position.x, y:position.y, zoom: trans[0], angulo:trans[1] ,texto:texto ,idpag:idpag};
        i++;
    });

    return Narraciones;
}

function getBocadillos(idpag){
    var i = 0;

    var Bocadillos = new Array();

    $(".Bocadillo.Elempag_" + idpag).each(function () {
        var position = getPosition($(this)[0].id);
        var trans = getTransformation($(this)[0].id);
        Bocadillos[i] = { id: $(this)[0].id.split('_')[1] ,x:position.x, y:position.y, zoom: trans[0], angulo:trans[1] ,tipo:gettipo($(this)).split('_')[1],idpag:idpag};
        i++;
    });

    return Bocadillos;
}


