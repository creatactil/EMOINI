/*
 * Created by alejandro on 29/04/15.
 */

function SeleccionarCuento(id,nombre){
  //cargarCuento.
}

//Creamos un nuevo Cuento
function CrearCuento(){
    SeleccionLibro();
    BorrarPaginasCuento();

    var Cuento = {Nombre:$('#InputNombre').val(),id:0,Coleccion:$('#SelectorColecciones').val()};
    alert("EntroCrearCuento");
    InsertarCuentos(Cuento);
    alert("SalgoCrearCuento");
    CargarCuentos();
}

//Guarda los cuentos nuevos en la base de datos
function InsertarCuentos(Cuentos){
    var Resultado;
    $.ajax({
        url: 'http://dentef.com/emoapp/PHP/InsertCuentos.php',
        data: Cuentos,
        dataType: 'text',
        timeout: 5000,
        success: function(data){
            if(data == "ok") {
                alert("InsertCuentoSucess");
                GetIDCuento(Cuentos);
            }

            else
                alert("No se ha guardado el cuento correctamente");
        }
    });
}

//Carga los cuentos de la base de datos en el selectable
function CargarCuentos(){
    $('#ContentPopup').empty();
    $.ajax({
        url: 'http://dentef.com/emoapp/PHP/CargarCuentos.php',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data){
            $('a.BotonCuento').remove();
            for(var i=0; i<data.length;i++)

                $('#ContentPopup').append('<button id="Cuento_' + data[i].ID_Cuentos + '" class="BotonCuento ui-btn" data-inline="true" data-mini="true" onclick="CargarCuento('+ data[i].ID_Cuentos +')">' + data[i].NombreCuento + '</button>');
        }
    });
}

//Cargar Un cuento especifico
function CargarCuento(Cuento){
    var cuento = {ID:Cuento}
    $.ajax({
        url: 'http://dentef.com/emoapp/PHP/CargarCuento.php',
        dataType: 'jsonp',
        data: cuento,
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data){
            BorrarPaginasCuento();
            SeleccionLibro();
            CuentoActual = {ID:"Cuento_" + data[0].ID_Cuentos,Nombre:data[0].NombreCuento,N_Pag: parseInt(data[data.length-1].ID_Paginas)};
            for(var i=0; i<data.length;i++) {
                // <div id="pag_0" class="PaginaCuento actual '+ CuentoActual.ID +'" ></div>'
                if(i == 0)
                    $("#TabsCuento").append('<div id="pag_' + data[i].ID_Paginas + '" class="PaginaCuento actual Cuento_' + data[i].ID_Cuentos + '"></div>');
                else
                    $("#TabsCuento").append('<div id="pag_' + data[i].ID_Paginas + '" class="PaginaCuento izquierda Cuento_' + data[i].ID_Cuentos + '"></div>');
            }

            CargarFondoPaginas(data);
        }
    });
}

//Consigue la ID de un cuento concreto
function GetIDCuento(Cuento){
    $.ajax({
        url: 'http://dentef.com/emoapp/PHP/GetIDCuento.php',
        dataType: 'jsonp',
        data: Cuento,
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data){
            CuentoActual = {ID:"Cuento_" + data[0].ID_Cuentos,Nombre:Cuento.Nombre,N_Pag: 0};
            console.log("AntesGuardarPagina");
            GuardarPagina();
            console.log("DespuesGuardarPagina");
            $('#TabsCuento').append('<div id="pag_0" class="PaginaCuento actual '+ CuentoActual.ID +'" ></div>');

        }
    });
}

//Guarda las paginas de un cuento.
function GuardarPagina(){
    var Cuento = {ID:CuentoActual.ID.split('_')[1],N_Pag:parseInt(CuentoActual.N_Pag)}
    console.log("GuardoPagina");
    console.log(Cuento);
    $.ajax({
        url: 'http://dentef.com/emoapp/PHP/InsertPagina.php',
        data: Cuento,
        type: 'GET',
        dataType: 'text',
        success: function(data){
            alert("Pagina Guardada");
        }
    });

}

//Guarda el fondo de una pagina.
function GuardarFondoPagina(){
    var Pagina;

    $('.actual').each(function () {
        var id = $(this)[0].id.split('_')[1];
        Pagina = {ID:parseInt($(this)[0].id.split('_')[1]),CuentoID:parseInt(CuentoActual.ID.split('_')[1]), Fondo:parseInt(getFondo($(this)[0].id).split('_')[1])};
        console.log(Pagina);
    });

    $.ajax({
        url: 'http://dentef.com/emoapp/PHP/InsertFondos.php',
        data: Pagina,
        type: 'GET',
        dataType: 'text',
        success: function(data){
           // alert("Pagina Guardada");
        }
    });

}

//Carga Los fondos de las páginas.
function CargarFondoPaginas(Paginas){

    alert("Entro en cargar");
    var Cuento = {Paginas:Paginas};
    $.ajax({
        url: 'http://dentef.com/emoapp/PHP/CargarFondos.php',
        dataType: 'jsonp',
        data: Cuento,
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data){
            alert("Entro success");
            console.log(data);
            for(var i=0; i<data.length; i++){
               if(parseInt(data[i])!=-1) {
                   console.log(data[i]);
                   $('#pag_' + i).css("background-image", data[i]);
               }
            }


        }
    });
}


//objetos[i] = { id: $(this)[0].id.split('_')[1] ,x:position.x, y:position.y, zoom: trans[0], angulo:trans[1] ,tipo:gettipo($(this)).split('_')[1],idpag:idpag};

//Guarda los objetos de una pagina.
function GuardarObjectPagina(){
    var Objetos;

    $('.actual').each(function () {
        var id = $(this)[0].id.split('_')[1];
        Objetos = getObjetos(id);

        Objetos = {
                PaginaID: parseInt($(this)[0].id.split('_')[1]),
                CuentoID: parseInt(CuentoActual.ID.split('_')[1]),
                Objetos:Objetos
        };
        console.log(Objetos);
    });

    $.ajax({
        url: 'http://dentef.com/emoapp/PHP/InsertObjetos.php',
        data: Objetos,
        type: 'GET',
        dataType: 'text',
        success: function(data){
            // alert("Pagina Guardada");
        }
    });
}




function PoupCuentos(){
    CargarCuentos();
    $("#Cuentos").show();
    $("#CrearCuento").hide();

}

function PopupCrearCuento(){
    $("#Cuentos").hide();
    $("#CrearCuento").show();
}