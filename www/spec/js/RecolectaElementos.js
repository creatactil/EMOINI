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
    //console.log($('#'+idpagina));
    var ListaClases = $('#'+idpagina)[0].classList;

    for(var i=0; i<ListaClases.length; i++)
        if(ListaClases[i].match(RE))
            return ListaClases[i];

    return "Fondo_-1";
}

function gettipo(element){
    console.log(element[0]);
    var RE = /tipo_\d+/i;
    var ListaClases = element[0].classList;

    for(var i = 0; i<ListaClases.length; i++)
        if(ListaClases[i].match(RE))
            return ListaClases[i];

}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function getTransformation(id){
    if(localStorage.getItem(id+"_trans") != null)
        return JSON.parse(localStorage[id+"_trans"]);
    return [-1,-1];
}

//Devuelve un array con los objetos de una pagina
function getObjetos(idpag){
    console.log("Entrogetobj");
    var Objetos = new Array();
    //var idpag = idpagina.split('_')[1];
    var i = 0;

    var objetos = new Array();

    $(".Objeto.Elempag_" + idpag).each(function () {
        var position = getPosition($(this)[0]);
        var trans = getTransformation($(this)[0].id);
        alert("Chivato getObjetos: "+$(this)[0].id+" "+position.x +" "+ position.y+" "+ trans[0] +" "+trans[1] );
        objetos[i] = { id: $(this)[0].id.split('_')[1] ,x:position.x, y:position.y, zoom: trans[0], angulo:trans[1] ,tipo:gettipo($(this)).split('_')[1],idpag:idpag};
        i++;
    });

    return objetos;
}