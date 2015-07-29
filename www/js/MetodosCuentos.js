/*
 * Created by alejandro on 29/04/15.
 */

function SeleccionarCuento(id,nombre){
    //cargarCuento.
}

//Guarda la última página modificada por el usuario.
function UltimaPaginaModificada(){
	localStorage.setItem("ID_PaginaUltima", Paginas.indexOf($('.actual')[0].id));
}


//Carga las Colecciones en el seectable de creacacion de cuento.
function CargarColletIDs(){

    var sql = "SELECT ID_Colecciones,Nombre FROM Colecciones";

    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        var len = results.rows.length;
        for (var i=0; i<len; i++)
            $('#SelectorColecciones').append('<option value="' + results.rows.item(i).ID_Colecciones  + '">' + results.rows.item(i).Nombre + '</option>');

    }

    function errorCB(err) {
        alert("Error al rellenar selector de coleciones: "+err.code);
    }

    db.transaction(queryDB, errorCB);

}

//Creamos un nuevo Cuento
function CrearCuento(){
    SeleccionLibro();
    BorrarPaginasCuento();

    var Cuento = {Nombre:$('#InputNombre').val(),Coleccion:$('#SelectorColecciones').val()};
    InsertarCuentos(Cuento);
    GetIDCuento(Cuento);
    CargarCuentos();
}

function EliminarCuentos(){
	var Tablas=["Bocadillos","Objetos","Fondos","Narraciones","Personajes","Paginas"];
	var Cuentos = $('#SelectEliminarCuento').val();
	
	db.transaction(DeleteCuentos, errorDeleteCuentos, successDeleteCuentos);
	

	
	function DeleteCuentos(tx) {
		for (var i = 0; i < Cuentos.length; i++) {
			for (var j = 0; j < Tablas.length; j++) {
				var sql = "DELETE FROM " + Tablas[j] + " WHERE ID_Cuento = " + Cuentos[i];
							
				tx.executeSql(sql);
			}

			if(CuentoActual.ID.split('_')[1] == Cuentos[i]){
				BorrarPaginasCuento();
			}
			
			var sql = "DELETE FROM Cuentos WHERE rowid = " + Cuentos[i];
			tx.executeSql(sql);
			
		}
	}


    function errorDeleteCuentos(tx, err) {
        alert("Error al eliminar el cuento: " + err);
    }

    function successDeleteCuentos() {
       // alert("Cuento eliminado con éxito");
    }
}

//Guarda los cuentos nuevos en la base de datos
function InsertarCuentos(Cuentos) {

    db.transaction(InsertCuentos, errorinsertCuentos, successinsertCuentos);

    var sql = "INSERT OR REPLACE INTO Cuentos (NombreCuento,ID_Colecciones) ";
    sql += "VALUES ('" + Cuentos.Nombre + "', '" + Cuentos.Coleccion + "')";
    function InsertCuentos(tx) {
        tx.executeSql(sql);
    }

    function errorinsertCuentos(tx, err) {
        alert("Error al Insertar cuentos: " + err);
    }

    function successinsertCuentos() {
       // alert("success_hecho!");
    }

}

//Carga los cuentos de la base de datos en el selectable
function CargarCuentos(){

    $('#ContentPopup').empty();
    $('#SelectEliminarCuento').empty();
    var sql = "SELECT rowid,NombreCuento FROM Cuentos";

    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        var len = results.rows.length;
        for (var i=0; i<len; i++) {
            $('#ContentPopup').append('<button id="Cuento_' + results.rows.item(i).rowid + '" class="BotonCuento ui-btn" data-inline="true" data-mini="true" onclick="CargarCuento(' + results.rows.item(i).rowid + ')">' + results.rows.item(i).NombreCuento + '</button>');
            $('#SelectEliminarCuento').append('<option value="'+ results.rows.item(i).rowid +'">'+ results.rows.item(i).NombreCuento +'</option>');           
        }
        
        $('#SelectEliminarCuento').selectmenu( "refresh" );
    }

    function errorCB(err) {
        alert("Error al cargar cuentos: "+err.code);
    }
	
    db.transaction(queryDB, errorCB);

}

//Cargar Un cuento especifico
function CargarCuento(Cuento){
    var cuento = {ID:Cuento};
    var sql = "SELECT * FROM Cuentos C, Paginas P WHERE C.rowid = P.ID_Cuento AND C.rowid ="+ Cuento +" ORDER BY P.ID_Paginas ASC";

    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        BorrarPaginasCuento();
        SeleccionLibro();
    	var len = results.rows.length;
        CuentoActual = {ID:"Cuento_" + results.rows.item(0).ID_Cuento,Nombre:results.rows.item(0).NombreCuento,N_Pag: parseInt(results.rows.item(len-1).ID_Paginas),Coleccion:results.rows.item(0).ID_Colecciones};
        for (var i=0; i<len; i++) {
            Paginas[i] = "pag_" + results.rows.item(i).ID_Paginas;
            if(i == localStorage.ID_PaginaUltima)
                $("#TabsCuento").append('<div id="pag_' +results.rows.item(i).ID_Paginas + '" class="PaginaCuento actual Cuento_' + results.rows.item(i).ID_Cuento + '"></div>');
            else
                $("#TabsCuento").append('<div id="pag_' + results.rows.item(i).ID_Paginas + '" class="PaginaCuento izquierda Cuento_' + results.rows.item(i).ID_Cuento + '"></div>');
        }
		
		CargarBocadillosPaginas(results.rows.item(0).ID_Cuento);
        CargarFondoPaginas(results.rows.item(0).ID_Cuento);
        CargarObjetosPaginas(results.rows.item(0).ID_Cuento);
        CargarPersonajesPaginas(results.rows.item(0).ID_Cuento);
        CargarNarracionesPaginas(results.rows.item(0).ID_Cuento);
        Addobjetopopup();
        AddPersonajepopup();
        AddBocadillospopup();
        AddFondospopup();
        localStorage.setItem("ID_CuentoUltimo", CuentoActual.ID.split("_")[1]);  
    }

    function errorCB(err) {
        alert("Error al cargar cuento: "+err.code);
    }

    db.transaction(queryDB, errorCB);
    
}

//Consigue la ID de un cuento concreto al crearse.
function GetIDCuento(Cuento){

    var sql = "SELECT rowid,ID_Colecciones FROM Cuentos WHERE NombreCuento = '"+Cuento.Nombre +"'";

    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }


	function querySuccess(tx, results) {
		var len = results.rows.length;
		CuentoActual = {
			ID : "Cuento_" + results.rows.item(0).rowid,
			Nombre : Cuento.Nombre,
			N_Pag : 0,
			Coleccion : results.rows.item(0).ID_Colecciones
		};
		GuardarPagina(0);
		$('#TabsCuento').append('<div id="pag_0" class="PaginaCuento actual ' + CuentoActual.ID + '" ></div>');
		Paginas[0] = "pag_0";
		
		localStorage.setItem("ID_CuentoUltimo", CuentoActual.ID.split("_")[1]);  
		UltimaPaginaModificada();
		Addobjetopopup();
		AddPersonajepopup();
		AddBocadillospopup();
		AddFondospopup();
}


    function errorCB(err) {
        alert("Error en getidcuento: "+err.code);
    }

    db.transaction(queryDB, errorCB);
}

//Guarda las paginas de un cuento.
function GuardarPagina(numpage){

    db.transaction(InsertPage,errorinsertPage, successinsertPage);

    var sql = "INSERT INTO Paginas (ID_Paginas,ID_Cuento) ";
    sql += "VALUES ('"+ numpage +"', '"+ CuentoActual.ID.split('_')[1] +"')";
    function InsertPage(tx) {
        tx.executeSql(sql);
    }

    function errorinsertPage(tx, err) {
        alert("Error al guardar página: "+err);
    }

    function successinsertPage() {
    }
}

//elimina una pagina de la base de datos
function EliminarPagina(){
    var idPagina;
    var idCuento;

    $('.actual').each(function () {
        idPagina= $(this)[0].id.split('_')[1];
        idCuento= CuentoActual.ID.split('_')[1];
    });



    db.transaction(deletePage,errordeletePage, successdeletePage);

    function deletePage(tx) {
        var Tablas = ["Paginas","Objetos","Personajes","Narraciones","Bocadillos","Fondos"];
        var index = Tablas.length;



        for(var i=0; i<index; i++){
            var sql = "DELETE FROM " + Tablas[i] + " WHERE ID_Paginas=" + idPagina + " AND ID_Cuento=" + idCuento;
            console.log(sql);
            tx.executeSql(sql);
        }
    }

    function errordeletePage(tx, err) {
        alert("Error al eliminar página: "+err);
    }

    function successdeletePage() {
    }

}

//Guarda el fondo de una pagina.
function GuardarFondoPagina(){

    var Pagina;

    $('.actual').each(function () {
        var id = $(this)[0].id.split('_')[1];
        Pagina = {ID:parseInt($(this)[0].id.split('_')[1]),CuentoID:parseInt(CuentoActual.ID.split('_')[1]), Fondo:parseInt(getFondo($(this)[0].id).split('_')[1])};
    });

    db.transaction(InsertFondo,errorinsertFondo, successinsertFondo);

    var sql = "INSERT OR REPLACE INTO `Fondos`(`ID_Cuento`, `ID_Paginas`, `Tipo_Fondo`)";
    sql += " VALUES (" + Pagina.CuentoID + "," + Pagina.ID + "," + Pagina.Fondo + ") ";
    
    function InsertFondo(tx) {
        tx.executeSql(sql);
    }

    function errorinsertFondo(tx, err) {
        alert("Error al guardar fondo: "+err);
    }

    function successinsertFondo() {
    }
}

//Carga Los fondos de las páginas.
function CargarFondoPaginas(ID_Cuento){

    var sql = "SELECT * FROM Fondos,TipoFondo WHERE Tipo_Fondo = IDTipo_Fondos AND ID_Cuento = "+ ID_Cuento + " AND ID_Colecciones =" + CuentoActual.Coleccion;


    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        var len = results.rows.length;

        for (var i = 0; i < len; i++) {
            $('#pag_' + results.rows.item(i).ID_Paginas).addClass('Fondo_' + results.rows.item(i).ID_Fondos);
            $('#pag_' + results.rows.item(i).ID_Paginas).css('background-image', 'url(' + results.rows.item(i).URL + ')');
            $('#pag_' + results.rows.item(i).ID_Paginas).css('background-position', 'center center');
            $('#pag_' + results.rows.item(i).ID_Paginas).css('background-repeat', 'no-repeat');
            $('#pag_' + results.rows.item(i).ID_Paginas).css('background-attachment', 'fixed');
            $('#pag_' + results.rows.item(i).ID_Paginas).css('background-size', 'cover');

        }
    }


    function errorCB(err) {
        alert("Error al cargar fondo de paginas: "+err.code);
    }

    db.transaction(queryDB, errorCB);
}

 //Carga los objetos de la base de datos dentro del cuento.
function CargarObjetosPaginas(ID_Cuento){
	
    var sql = "SELECT * FROM Objetos,TipoObjetos WHERE ID_Tipo=IDTipo_Objetos AND ID_Cuento = "+ ID_Cuento + " AND ID_Colecciones =" + CuentoActual.Coleccion ;

    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        var len = results.rows.length;

        for (var i = 0; i < len; i++) {
            var clasepag = 'Elempag_' + results.rows.item(i).ID_Paginas;
            var id = 'Objeto_' +results.rows.item(i).ID;
            $('#pag_'+results.rows.item(i).ID_Paginas).append('<div id="' + id + '" class="zoomProps Objeto ' + clasepag + ' tipo_' + results.rows.item(i).ID_Tipo + ' ' + CuentoActual.ID +' draggable"><div class="polaroid"><IMG SRC="' + results.rows.item(i).URL + '"></div></div>');

            if(results.rows.item(i).ID_Paginas != localStorage.ID_PaginaUltima)
                $("#"+id).hide();

            //Transformarciones.
            //x e y.
            var xCompleto = $(document).width();
            var yCompleto = $(document).height();


            $( "#"+id).offset({ top: results.rows.item(i).Posy*yCompleto , left: results.rows.item(i).Posx*xCompleto  });

            new ZoomView('#' + id, '#' + id  + ' :first',{escala:results.rows.item(i).Zoom,angulo:results.rows.item(i).Angulo,nombre:id});

        }
    }


    function errorCB(err) {
        alert("Error al cargar objetos de paginas: "+err.code);
    }

    db.transaction(queryDB, errorCB);
}

//Carga los personajes de la base de datos en el cuento.
function CargarPersonajesPaginas(ID_Cuento){

    var sql = "SELECT * FROM Personajes,TipoPersonajes WHERE ID_Tipo=IDTipo_Personajes AND ID_Cuento = "+ ID_Cuento + " AND ID_Colecciones =" + CuentoActual.Coleccion ;

    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        var len = results.rows.length;


        for (var i = 0; i < len; i++) {
            var clasepag = 'Elempag_' + results.rows.item(i).ID_Paginas;
            var id = 'Personaje_' +results.rows.item(i).ID;

            $('#pag_'+results.rows.item(i).ID_Paginas).append('<div id="' + id + '" class="zoomProps Personaje ' + clasepag + ' tipo_' + results.rows.item(i).ID_Tipo + ' ' + CuentoActual.ID +' draggable"><div class="polaroid"><IMG SRC="' + results.rows.item(i).URL + '"></div></div>');

            if(results.rows.item(i).ID_Paginas != localStorage.ID_PaginaUltima)
                $("#"+id).hide();

            //Transformarciones.
            //x e y.
            var xCompleto = $(document).width();
            var yCompleto = $(document).height();


            $( "#"+id).offset({ top: results.rows.item(i).Posy*yCompleto , left: results.rows.item(i).Posx*xCompleto  });

            new ZoomView('#' + id, '#' + id  + ' :first',{escala:results.rows.item(i).Zoom,angulo:results.rows.item(i).Angulo,nombre:id});

        }
    }


    function errorCB(err) {
        alert("Error cargar personajes. processing SQL: "+err.code);
    }

    db.transaction(queryDB, errorCB);

 }

//Carga las narraciones de la base de datos al cuento.
function CargarNarracionesPaginas(ID_Cuento){

    var sql = "SELECT * FROM Narraciones WHERE ID_Cuento = "+ ID_Cuento;

    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        var len = results.rows.length;


        for (var i = 0; i < len; i++) {
            var clasepag = 'Elempag_' + results.rows.item(i).ID_Paginas;
            var id = 'Narracion_' +results.rows.item(i).ID;
            $('#pag_'+results.rows.item(i).ID_Paginas).append('<div id="' + id + '" class="zoomProps Narracion ' + clasepag + ' tipo_' + -1 + ' ' + CuentoActual.ID +' draggable"><div class="polaroid"><input class="TextNarracion" type="text" readonly="readonly"></div></div>');

            $("#"+id+" .TextNarracion").val(results.rows.item(i).Texto);
			if(results.rows.item(i).Texto.length > 4)
    			$("#" + id + " .TextNarracion").attr('size',results.rows.item(i).Texto.length-4);
			else
				$("#" + id + " .TextNarracion").attr('size',1);
			


            if(results.rows.item(i).ID_Paginas != localStorage.ID_PaginaUltima)
                $("#"+id).hide();

            $('#' + id).on("doubletap",function(){
                if(!GetModo()){
                    Selectelement(this);
                    AbrirpopupTexto();
                }
            });

            //Transformarciones.
            //x e y.
            var xCompleto = $(document).width();
            var yCompleto = $(document).height();


            $( "#"+id).offset({ top: results.rows.item(i).Posy*yCompleto , left: results.rows.item(i).Posx*xCompleto  });

            new ZoomView('#' + id, '#' + id  + ' :first',{escala:results.rows.item(i).Zoom,angulo:results.rows.item(i).Angulo,nombre:id});

        }
    }


    function errorCB(err) {
        alert("Error cargar Narraciones. processing SQL: "+err.code);
    }

    db.transaction(queryDB, errorCB);

}

//Carga los Bocadillos de la base de datos.
function CargarBocadillosPaginas(ID_Cuento){

    var sql = "SELECT * FROM Bocadillos,TipoBocadillo WHERE ID_Tipo=IDTipo_Bocadillos AND ID_Cuento="+ ID_Cuento + " AND ID_Colecciones =" + CuentoActual.Coleccion ;

    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
       var len = results.rows.length;


        for (var i = 0; i < len; i++) {
            var clasepag = 'Elempag_' + results.rows.item(i).ID_Paginas;
            var id = 'Bocadillo_' +results.rows.item(i).ID;
            $('#pag_'+results.rows.item(i).ID_Paginas).append('<div id="' + id + '" class="zoomProps Bocadillo ' + clasepag + ' tipo_' + results.rows.item(i).ID_Tipo + ' ' + CuentoActual.ID +' draggable"><div class="polaroid"><IMG SRC="' + results.rows.item(i).URL + '"></div></div>');

            if(results.rows.item(i).ID_Paginas != localStorage.ID_PaginaUltima)
                $("#"+id).hide();

            //Transformarciones.
            //x e y.
            var xCompleto = $(document).width();
            var yCompleto = $(document).height();


            $( "#"+id).offset({ top: results.rows.item(i).Posy*yCompleto , left: results.rows.item(i).Posx*xCompleto  });

            new ZoomView('#' + id, '#' + id  + ' :first',{escala:results.rows.item(i).Zoom,angulo:results.rows.item(i).Angulo,nombre:id});

        }
    }


    function errorCB(err) {
        alert("Error cargar Bocadillos. processing SQL: "+err.code);
    }

    db.transaction(queryDB, errorCB);

}



//Guarda los objetos de una pagina.
function GuardarObjectPagina(){
    var Objetos;
    var PaginaID;
    var CuentoID;
	
    $('.actual').each(function () {
        var id = $(this)[0].id.split('_')[1];
        Objetos = getObjetos(id);
        
        PaginaID= parseInt($(this)[0].id.split('_')[1]);
        CuentoID= parseInt(CuentoActual.ID.split('_')[1]);

    });

    db.transaction(InsertObject, errorinsertObject, successinsertObject);

    function InsertObject(tx) {
        for(var i = 0; i < Objetos.length; i++) {
            var sql = "INSERT OR REPLACE INTO `Objetos`(`ID`, `Posx`, `Posy`, `Zoom`, `Angulo`, `ID_Paginas`, `ID_Tipo`, `ID_Cuento`)";
            sql += " VALUES ("+Objetos[i].id+","+Objetos[i].x+","+Objetos[i].y+","+Objetos[i].zoom+","+Objetos[i].angulo+","+PaginaID+","+Objetos[i].tipo+","+CuentoID+")";
            tx.executeSql(sql);
        }
    }

    function errorinsertObject(tx, err) {
        alert("Error al guardar objeto de pagina: "+err);
    }

    function successinsertObject() {
    	//alert("Guardo el Objeto bien");
    }


}

//Guarda los personajes de una pagina.
function GuardarPersonajesPagina(){
    var Personajes;
    var PaginaID;
    var CuentoID;

    $('.actual').each(function () {
        var id = $(this)[0].id.split('_')[1];
        Personajes = getPersonajes(id);

        PaginaID= parseInt($(this)[0].id.split('_')[1]);
        CuentoID= parseInt(CuentoActual.ID.split('_')[1]);

    });

    db.transaction(InsertPersonajes, errorinsertPersonajes, successinsertPersonajes);


    function InsertPersonajes(tx) {
        for(var i = 0; i < Personajes.length; i++) {
            var sql = "INSERT OR REPLACE INTO `Personajes`(`ID`, `Posx`, `Posy`, `Zoom`, `Angulo`, `ID_Paginas`, `ID_Tipo`, `ID_Cuento`)";
            sql += " VALUES ("+Personajes[i].id+","+Personajes[i].x+","+Personajes[i].y+","+Personajes[i].zoom+","+Personajes[i].angulo+","+PaginaID+","+Personajes[i].tipo+","+CuentoID+")";
            tx.executeSql(sql);
        }
    }

    function errorinsertPersonajes(tx, err) {
        alert("Error en guardar personaje processing SQL: "+err);
    }

    function successinsertPersonajes() {
    }
}

//Guarda en la base de datos las narraciones
function GuardarNarracionesPagina(){
    var Narraciones;
    var PaginaID;
    var CuentoID;

    $('.actual').each(function () {
        var id = $(this)[0].id.split('_')[1];
        Narraciones = getNarraciones(id);

        PaginaID= parseInt($(this)[0].id.split('_')[1]);
        CuentoID= parseInt(CuentoActual.ID.split('_')[1]);

    });

    db.transaction(InsertNarraciones, errorinsertNarraciones, successinsertNarraciones);


    function InsertNarraciones(tx) {
        for(var i = 0; i < Narraciones.length; i++) {
            var sql = "INSERT OR REPLACE INTO `Narraciones`(`ID`, `Posx`, `Posy`, `Zoom`, `Angulo`,`Color_Texto`,`Color_Fondo`,`Texto`, `ID_Paginas`, `ID_Cuento`)";
            sql += " VALUES ("+Narraciones[i].id+","+Narraciones[i].x+","+Narraciones[i].y+","+Narraciones[i].zoom+","+Narraciones[i].angulo+","+-1+","+-1+",'"+Narraciones[i].texto+"',"+PaginaID+","+CuentoID+")";
            console.log(sql);
            tx.executeSql(sql);
        }
    }

    function errorinsertNarraciones(tx, err) {
        alert("Error en guardar narraciones processing SQL: "+err);
    }

    function successinsertNarraciones() {
    }
}

//Guarda en la base de datos de los Bocadillos.
function GuardarBocadillosPagina(){
    var Bocadillos;
    var PaginaID;
    var CuentoID;

    $('.actual').each(function () {
        var id = $(this)[0].id.split('_')[1];
        Bocadillos = getBocadillos(id);
        console.log(Bocadillos);

        PaginaID= parseInt($(this)[0].id.split('_')[1]);
        CuentoID= parseInt(CuentoActual.ID.split('_')[1]);

    });

    db.transaction(InsertBocadillos, errorinsertBocadillos, successinsertBocadillos);


    function InsertBocadillos(tx) {
        for(var i = 0; i < Bocadillos.length; i++) {
            var sql = "INSERT OR REPLACE INTO `Bocadillos`(`ID`, `Posx`, `Posy`, `Zoom`, `Angulo`, `ID_Paginas`, `ID_Tipo`, `ID_Cuento`)";
            sql += " VALUES ("+Bocadillos[i].id+","+Bocadillos[i].x+","+Bocadillos[i].y+","+Bocadillos[i].zoom+","+Bocadillos[i].angulo+","+PaginaID+","+Bocadillos[i].tipo+","+CuentoID+")";
            tx.executeSql(sql);
        }
    }

    function errorinsertBocadillos(tx, err) {
        alert("Error en guardar Bocadillos processing SQL: "+err);
    }

    function successinsertBocadillos() {
    }
}

function EliminarElemento(id){

    var idPagina;
    var idCuento;
    var tabla;


    $('.actual').each(function () {
        idPagina= $(this)[0].id.split('_')[1];
        idCuento= CuentoActual.ID.split('_')[1];
    });


    switch (id.split('_')[0]){
        case 'Personaje':
            tabla = 'Personajes';
            break;
        case 'Objeto':
            tabla = 'Objetos';
            break;
        case 'Bocadillo':
            tabla = 'Bocadillos';
            break;
        case 'Narracion':
            tabla = 'Narraciones';
            break;
    }

    var sql = 'DELETE FROM ' + tabla + ' WHERE ID_Paginas=' + idPagina + ' AND ID_Cuento=' + idCuento +" AND ID= " + id.split('_')[1];

    db.transaction(deleteElement,errordElement, successElement);

    function deleteElement(tx) {
            tx.executeSql(sql);
    }

    function errordElement(tx, err) {
        alert("Error al eliminar elemento: "+err);
    }

    function successElement() {
    }


}

//Obtenemos el id del ultimo elemento creado para crear uno nuevo.
function getidElementos(img,typeelem,tipoimg){
    var tabla;
    var idCuento;
    var idelemento;

    idCuento= CuentoActual.ID.split('_')[1];

    switch (typeelem){
        case 'Personaje':
            tabla = 'Personajes';
            break;
        case 'Objeto':
            tabla = 'Objetos';
            break;
        case 'Bocadillo':
            tabla = 'Bocadillos';
            break;
        case 'Narracion':
            tabla = 'Narraciones';
            break;
    }
	
	var sql = "SELECT ID FROM "+ tabla +" WHERE ID_Cuento="+ idCuento +" ORDER BY ID DESC";

    function queryDB(tx) {
        tx.executeSql(sql, [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        if(results.rows.length == 0) {
            addElemento(img, typeelem, tipoimg, 0);

        }
        else
            addElemento(img,typeelem,tipoimg, results.rows.item(0).ID + 1);
    }


    function errorCB(err) {
        alert("Error al crear elemento. processing SQL: "+err.code);
    }

    db.transaction(queryDB, errorCB);
}

