function ComprobacionLogin() {

	if ($("#usuario").val() != '' || $("#clave").val() != '') {

		var Usuario = {
			Nombre : $("#usuario").val(),
			Clave : $("#clave").val()
		};

		$.ajax({
			url : 'http://dentef.com/emoapp/PHP/Login.php',
			data : Usuario,
			type : 'POST',
			dataType : 'jsonp',
			jsonp : 'jsoncallback',
			timeout : 10000,
			error : function() {
				//navigator.notification.alert("Ha surgido un error.\nPor favor compruebe su conexión a internet o el correo y la contraseña.");
				alert("Ha surgido un error.\nPor favor compruebe su conexión a internet o el correo y la contraseña.");
			},
			success : function(data, response) {
				ComprobarDispositivo(Usuario.Nombre);
			}
		});
	} else
		alert("Introduzca sus datos para logearse");

}

function Registro() {
	if ($("#usuarior").val() == '')
		alert("Your username is missing!");
	else if ($("#claver").val() == '')
		alert("Your password is missing!");
	else if ($("#correo").val() == '')
		alert("Your e-mail is missing!");
	else if ($("#nombre").val() == '')
		alert("Your name is missing!");
	else if ($("#apellido").val() == '')
		alert("Your surname is missing!");
	else {

		var Usuario = {
			User : $("#usuarior").val(),
			Pass : $("#claver").val(),
			Email : $("#correo").val(),
			Name : $("#nombre").val(),
			Surname : $("#apellido").val()
		};

		$.ajax({
			url : 'http://dentef.com/emoapp/PHP/Registro.php',
			data : Usuario,
			type : 'POST',
			dataType : 'jsonp',
			jsonp : 'jsoncallback',
			timeout : 10000,
			error : function() {
				//navigator.notification.alert("Ha surgido un error.\nPor favor compruebe su conexión a internet o el correo y la contraseña.");
				alert("Ha surgido un error.\nPor favor compruebe su conexión a internet o el correo y la contraseña.");
			},
			success : function(data, response) {
				RegistrarDispositivo(Usuario.User);
			}
		});

	}

}

function RegistrarDispositivo(user) {

	var Dispositivo = {
		Dispo : device.uuid,
		User : user,
	};
	$.ajax({
		url : 'http://www.dentef.com/emoapp/PHP/ResgistroDispo.php',
		data : Dispositivo,
		type : 'POST',
		dataType : 'jsonp',
		jsonp : 'jsoncallback',
		timeout : 10000,
		error : function() {
			alert("Error al crear dispositivo. Dispositivo ya existente.");
		},
		success : function(data, response) {
			$.mobile.changePage("#Emoapp");
			window.localStorage.setItem("Usuario", Dispositivo.User);
			GetColecciones();
		}
	});

}


function SetDescargado(Dispositivo) {
	$.ajax({
		url : 'http://dentef.com/emoapp/PHP/SetDescarga.php',
		data : Dispositivo,
		type : 'POST',
		dataType : 'jsonp',
		jsonp : 'jsoncallback',
		timeout : 10000,
		error : function() {
			alert("Error activar descargado");
		}
	});
}


function ComprobarDispositivo(user) {
	var Dispositivo = {
		User : user,
		Dispo : device.uuid,
	};
	$.ajax({
		url : 'http://dentef.com/emoapp/PHP/ComprobarDispositivo.php',
		data : Dispositivo,
		type : 'POST',
		dataType : 'jsonp',
		jsonp : 'jsoncallback',
		timeout : 10000,
		error : function() {
			alert("Dispositivo no Existente. Registrando...");
			RegistrarDispositivo(user);
		},
		success : function(data, response) {
			//alert("Éxito al comprobar dispositivo.");
			if (data[0].Descarga == 0){
				SetDescargado(Dispositivo);
				GetColecciones();
			}

			$.mobile.changePage("#Emoapp");
			window.localStorage.setItem("Usuario", user);

		}
	});
}

//Busca las colecciones en el servidor.

function GetColecciones() {
	$.ajax({
		url : 'http://dentef.com/emoapp/PHP/CargarIDCollect.php',
		type : 'POST',
		dataType : 'jsonp',
		jsonp : 'jsoncallback',
		timeout : 10000,
		error : function() {
			alert("Error al cargar las colecciones");
		},
		success : function(data, response) {

			db.transaction(InsertColecciones, errorCB, successCB);

			//LLena la tabla local de colecciones.
			function InsertColecciones(tx) {
				for (var i = 0; i < data.length; i++) {
					var sql = "INSERT OR REPLACE INTO `Colecciones` (`ID_Colecciones`, `Nombre`, `Fondos`, `Personajes`, `Objetos`, `Bocadillos`)";
					sql += " VALUES (" + data[i].ID_Colecciones + ",'" + data[i].Nombre + "'," + data[i].Fondos + "," + data[i].Personajes + "," + data[i].Objetos + "," + data[i].Bocadillos + ")" ;
					tx.executeSql(sql);
				}

			}

			function errorCB(tx, err) {
				alert("Error al insertar colecciones: " + err);
			}

			function successCB() {
				//alert("Colecciones insertadas");
			}
			
			CargarColletIDs();
			DescargarFicheros(data);
		}
	});
}

function ControlAcceso() {
	if (window.localStorage.getItem("Usuario") == null)
		$.mobile.changePage("#Login");
	else {
		ComprobarDispositivo(window.localStorage.getItem("Usuario"));
		$.mobile.changePage("#Emoapp");
	
	}
}

function Deslogear() {
	localStorage.removeItem("Usuario");
	$.mobile.changePage("#Login");
	$(".Pagina").each(function() {
		$(this).hide();
	});
}