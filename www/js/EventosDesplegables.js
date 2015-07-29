/**
 * Created by alejandro on 10/04/15.
 */

//Eventos de botones desplegables del primer y segundo cuadrante superior.
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
        $(this).css('background-position', 'center center');
        $(this).css('background-repeat' , 'no-repeat');
        $(this).css('background-attachment', 'fixed');
        $(this).css('background-size','cover');
    });
    
   GuardarFondoPagina();
}

/*Añadir Elemento. Se le pasa el img que es la dirección de la imagen a insertar y el type que determina si es un objeto
o un fondo ect*/

function addElemento(img,typeelem,tipoimg,num){

    var id;
    var clase;
    var clasepag;

    switch(typeelem) {
        case 'Personaje':
            id = "Personaje_" + num;
            clase = "Personaje";
            break;
        case 'Objeto':
            id = "Objeto_" + num;
            clase = "Objeto";
            break;
        case 'Bocadillo':
            id = "Bocadillo_" + num;
            clase = "Bocadillo";
            break;
        case 'Narracion':
            id = "Narracion_" + num;
            clase = "Narracion";
            break;
    }

    clasepag = 'Elem' + $('.actual')[0].id;

    if(clase != "Narracion") {
        $('.actual').each(function () {
            $(this).append('<div id="' + id + '" class="zoomProps ' + clase + ' ' + clasepag + ' ' + tipoimg + ' ' + CuentoActual.ID +' draggable"><div class="polaroid"><IMG SRC="' + img + '"></div></div>');

            new ZoomView('#' + id, '#' + id  + ' :first',-1);
        });
    }

    else{
        $('.actual').each(function () {
            $(this).append('<div id="' + id + '" class="zoomProps ' + clase + ' ' + tipoimg + ' ' + clasepag + ' ' + CuentoActual.ID +' draggable"><div class="polaroid"><input class="TextNarracionSelect" type="text" size="5" readonly="readonly"></div></div>');

            $('#' + id).on("doubletap",function(){
                if(!GetModo()){
                    Selectelement(this);
                    AbrirpopupTexto();
                }
            });

           new ZoomView('#' + id, '#' + id + ' :first',-1);

        });
    }
    GuardarObjectPagina();
    GuardarPersonajesPagina();
    GuardarNarracionesPagina();
    GuardarBocadillosPagina();

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

function addText(){

    if($(".ElemActual")[0].classList.contains("Narracion"))
        AddTextoNarracion();
    else if ($(".ElemActual")[0].classList.contains("Bocadillo"))
        AddTextoBocadillo();
}

function MostrarMenu(){
    $('#PrimerCuadrante').toggle();
    $('#SegundoCuadrante').toggle();
    $('#PrimerCuadranteBajo').toggle();
    $('#SegundoCuadranteBajo').toggle();
    $('#BarraSlide').toggle();
}

//Metodos para los popups.
//Metodo Objetos.
function Addobjetopopup(){
	var sql = "SELECT * FROM TipoObjetos WHERE ID_Colecciones = " + CuentoActual.Coleccion;
	
    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        var len = results.rows.length;
        $('#ContentPopupobj').empty();

        for (var i = 0; i < len; i++) {
        	var url = results.rows.item(i).URL;
            	
        	var insert = '<input type=image id="input_'+ i +'" src="'+ results.rows.item(i).URL +'" width="60" height="60"';
        	insert += ' onclick = "getidElementos(\''+results.rows.item(i).URL+'\', \'Objeto\',\'tipo_'+results.rows.item(i).IDTipo_Objetos+'\')" >';
        	        	
        	$('#ContentPopupobj').append(insert);
        }
    }


    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    db.transaction(queryDB, errorCB);
}

//Metodo para añadir los Personajes.
function AddPersonajepopup(){
	var sql = "SELECT * FROM TipoPersonajes WHERE ID_Colecciones = " + CuentoActual.Coleccion;
	
		    
    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        var len = results.rows.length;
        $('#ContentPopuppj').empty();

        for (var i = 0; i < len; i++) {
        	var url = results.rows.item(i).URL;
            	
        	var insert = '<input type=image id="input_'+ i +'" src="'+ results.rows.item(i).URL +'" width="60" height="60"';
        	insert += ' onclick = "getidElementos(\''+results.rows.item(i).URL+'\', \'Personaje\',\'tipo_'+results.rows.item(i).IDTipo_Personajes +'\')" >';
        	
        	//alert(insert);
        	        	
        	$('#ContentPopuppj').append(insert);
        }
    }


    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    db.transaction(queryDB, errorCB);
}

//Metodo para añadir bocadillos al popup.

function AddBocadillospopup(){
	var sql = "SELECT * FROM TipoBocadillo WHERE ID_Colecciones = " + CuentoActual.Coleccion;
	    
    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        var len = results.rows.length;
        $('#ContentPopupBoca').empty();

        for (var i = 0; i < len; i++) {
	       	var url = results.rows.item(i).URL;
            	
        	var insert = '<input type=image id="input_'+ i +'" src="'+ results.rows.item(i).URL +'" width="60" height="60"';
        	insert += ' onclick = "getidElementos(\''+results.rows.item(i).URL+'\', \'Bocadillo\',\'tipo_'+results.rows.item(i).IDTipo_Bocadillos+'\')" >';

        	$('#ContentPopupBoca').append(insert);
        }
    }


    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    db.transaction(queryDB, errorCB);
}

//Metodo para añadir fondos al popup.

function AddFondospopup(){
	var sql = "SELECT * FROM TipoFondo WHERE ID_Colecciones = " + CuentoActual.Coleccion;

	    
    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        var len = results.rows.length;
        $('#ContentPopupFondo').empty();

        for (var i = 0; i < len; i++) {
        	var url = results.rows.item(i).URL;
            	
        	var insert = '<input type=image id="input_'+ i +'" src="'+ results.rows.item(i).URL +'" width="60" height="60"';
        	insert += ' onclick = "addFondo(\''+results.rows.item(i).URL+'\', \'Fondo_'+results.rows.item(i).IDTipo_Fondos+'\')" >';
        	
        	$('#ContentPopupFondo').append(insert);
        }
    }


    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    db.transaction(queryDB, errorCB);
}


function PoupCuentos(){
    CargarCuentos();
    $("#Cuentos").show();
    $("#CrearCuento").hide();
    $("#EliminarCuento").hide();

}

function PopupCrearCuento(){
    $("#Cuentos").hide();
    $("#EliminarCuento").hide();
    $("#CrearCuento").show();
}

function PopupEliminarCuento(){
    $("#Cuentos").hide();
    $("#CrearCuento").hide();
    $("#EliminarCuento").show();
}

function AbrirpopupTexto(){
    $( "#popupTexto" ).popup();
    $( "#popupTexto" ).popup( "open");
}

function CerrarpopupTexto(){
    $( "#popupTexto" ).popup( "close" );
}