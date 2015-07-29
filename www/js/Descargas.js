function DescargarFicheros(data) {

	var Data = data;
	var DatosDescarga = [];
	var server = [];
	var filename = [];
	var Directorio = [];
	var uri = [];
	var FicheroTipo = ["Bocadillos", "Personajes", "Objetos", "Fondos"];

	//Crear estructura de directorios.
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onErrorCallback);

	//Crea la estructura de directorios.
	function onFileSystemSuccess(fileSystem) {

		fileSystem.root.getDirectory('Emoapp', {
			create : true
		}, function(){}, onErrorCallback);

		fileSystem.root.getDirectory('Emoapp/Colecciones/', {
			create : true
		}, function(){}, onErrorCallback);

		for (var i = 0; i < Data.length; i++) {
			fileSystem.root.getDirectory('Emoapp/Colecciones/' + Data[i].Nombre + "/", {
				create : true
			}, function(){}, onErrorCallback);

			for (var j = 0; j < FicheroTipo.length; j++) {
				fileSystem.root.getDirectory('Emoapp/Colecciones/' + Data[i].Nombre + "/" + FicheroTipo[j] + "/", {
					create : true
				}, function(){}, onErrorCallback);
			}
		}

		for (var i = 0; i < data.length; i++) {
			coleccion = data[i].Nombre;
			
			for (var j = 0; j < FicheroTipo.length; j++) {
				tipo = FicheroTipo[j];
				var numficheros;
				switch(tipo) {
				case "Bocadillos":
					numficheros = data[i].Bocadillos;
					break;
				case "Personajes":
					numficheros = data[i].Personajes;
					break;
				case "Objetos":
					numficheros = data[i].Objetos;
					break;
				case "Fondos":
					numficheros = data[i].Fondos;
					break;
				}

				Directorio.push("Emoapp/Colecciones/" + coleccion + "/" + tipo + "/");
				DatosDescarga["Emoapp/Colecciones/" + coleccion + "/" + tipo + "/"] = {
					Directorio : "Emoapp/Colecciones/" + coleccion + "/" + tipo + "/",
					ID_Coleccion : data[i].ID_Colecciones,
					Tipo : tipo,
					Server : "http://dentef.com/emoapp/Colecciones/" + coleccion + "/" + tipo + "/",
					NumeroFicheros : numficheros,
				};

			}
		}

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess1, onErrorCallback);

	}

	function onFileSystemSuccess1(fileSystem) {

		for (var z = 0; z < Directorio.length; z++) {
			fileSystem.root.getDirectory(Directorio[z], {
				create : true
			}, transferFile, onErrorCallback);
		}
	}



	function transferFile(dir) {


		var dir_actual = dir.toURL().split('/0/')[1];
		var j;


		for (var i = 0; i < DatosDescarga[dir_actual].NumeroFicheros; i++) {
			var filename = i + ".png";

			var uri = DatosDescarga[dir_actual].Server + filename;
			path = dir.toURL() + '/' + filename;

			InsertTablasTipo(i, path, DatosDescarga[dir_actual].Tipo, DatosDescarga[dir_actual].ID_Coleccion);

			var fileTransfer = new FileTransfer();

			fileTransfer.download(uri, path, function(entry) {
				//alert("download complete: " + entry.toURL());

			}, function(error) {
				alert("download error source " + error.source);
				 alert("download error target " + error.target);
				 alert("upload error code " + error.code);
			});
		}

	}

	// a generic error callback function
	function onErrorCallback(error) {
		alert("ErroralcrearFichero!" + error.code);
	}

}

function InsertTablasTipo(ID, URL, tipo, ID_coleccion) {
	var tabla;
	var IDtipo;

	switch(tipo) {
	case "Bocadillos":
		tabla = "TipoBocadillo";
		IDtipo = "IDTipo_Bocadillos";
		break;
	case "Personajes":
		tabla = "TipoPersonajes";
		IDtipo = "IDTipo_Personajes";
		break;
	case "Objetos":
		tabla = "TipoObjetos";
		IDtipo = "IDTipo_Objetos";
		break;
	case "Fondos":
		tabla = "TipoFondo";
		IDtipo = "IDTipo_Fondos";
		break;
	}

	db.transaction(InsertTipo, errorCB, successCB);

	//LLena la tabla local de colecciones.
	function InsertTipo(tx) {

		var sql = "INSERT OR REPLACE INTO " + tabla + " (" + IDtipo + ", URL, ID_Colecciones)";
		sql += " VALUES (" + ID + ",'" + URL + "'," + ID_coleccion + ")";
		
		tx.executeSql(sql);
	}

	function errorCB(tx, err) {
		alert("Error al insertar en tabla: " + tabla + ". " + err);
	}

	function successCB() {
		//alert("Éxito al insertar en tabla: " + tabla + ". ");
	}

}



