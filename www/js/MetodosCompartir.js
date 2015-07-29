function Compartir() {
	alert("Entro");
	var doc = new jsPDF();
	VolverPaginacero();
	alert("Creando PDF de Cuento...");
	CrearDirectorios();
	setTimeout(function() {
		htmltoimage($('.actual')[0], 0, doc,0);
	}, 500);
}


function CrearEmail() {
	alert("Entro Crear email.");
	cordova.plugins.email.open({
		subject : 'Look my fantastic emoapp story! ',
		body : 'My new story called ' + CuentoActual.Nombre + "edited with Emoapp." ,
		attachments: 'file:///storage/emulated/0/Emoapp/Cuentos/' + CuentoActual.ID + '/'+ CuentoActual.ID + ".pdf"
	});
}


function GuardarPDF(doc) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

	function gotFS(fileSystem) {
		fileSystem.root.getFile('Emoapp/Cuentos/' + CuentoActual.ID + '/'+ CuentoActual.ID + ".pdf", {
			create : true,
			exclusive : false
		}, gotFileEntry, fail);
	}

	function gotFileEntry(fileEntry) {
		fileEntry.createWriter(gotFileWriter, fail);
	}

	function gotFileWriter(writer) {
		var data = doc.output();
		var buffer = new ArrayBuffer(data.length);
		var array = new Uint8Array(buffer);
		for (var i = 0; i < data.length; i++) {
			array[i] = data.charCodeAt(i);
		}
		writer.write(buffer);
	}

	function fail() {
		alert("Error al guardar pdf");
	}
}

function htmltoimage(IDPag, i, doc,cont) {
	var newcont;
	html2canvas(IDPag, {
		onrendered : function(canvas) {
			document.body.appendChild(canvas);
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			if(cont == 0){
				doc.addImage(imgData, 'JPEG', 0, 0, 210, 120);
				newcont = 1;
			}
			else if (cont == 1){			
				doc.addImage(imgData, 'JPEG', 0, 150, 210, 120);
				newcont = 0;
				doc.addPage();
			}
			window.canvas2ImagePlugin.saveImageDataToLibrary(function(msg) {
				renameFile(msg.split('0/')[1], 'Emoapp/Cuentos/' + CuentoActual.ID + '/', Paginas[i] + ".png", renameSuccess);
		
				if (i + 1 == Paginas.length) {
					alert("Imágenes Creadas");
					GuardarPDF(doc);
					CrearEmail();
					VolverPaginacero();
					return;
				} else {
					slideizq();

					setTimeout(function() {
						var j = i + 1;
						htmltoimage($('.actual')[0], j, doc,newcont);
					}, 500);
				}
			}, function(err) {
				alert(err);
			}, canvas);

			document.body.removeChild(canvas);
		}
	});
}

function CrearDirectorios() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onErrorCallback);

	//Crea la estructura de directorios.
	function onFileSystemSuccess(fileSystem) {

		fileSystem.root.getDirectory('Emoapp', {
			create : true
		}, function() {

		}, onErrorCallback);

		fileSystem.root.getDirectory('Emoapp/Cuentos/', {
			create : true
		}, function() {

		}, onErrorCallback);

		fileSystem.root.getDirectory('Emoapp/Cuentos/' + CuentoActual.ID + '/', {
			create : true
		}, function() {

		}, onErrorCallback);
	}

	function onErrorCallback(error) {
		alert("ErroralcrearFichero!" + error.code);
	}

}


function DeleteFile(File) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		fileSystem.root.getFile(File, null, function(fileEntry) {
			fileEntry.remove(function() {
				alert("Borrado");
			}, removeFail);
		}, removeFail);
	}, removeFail);
}

function renameFile(currentName, currentDir, newName, renameSuccess) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		fileSystem.root.getFile(currentName, {create: false, exclusive: false}, function(fileEntry) {
			fileSystem.root.getDirectory(currentDir, {
				create : true
			}, function(dirEntry) {
				parentEntry = new DirectoryEntry(currentName, currentDir + currentName);

				fileEntry.moveTo(dirEntry, newName, function() {
										
				}, renameFail);
				
			}, renameFail);
		}, renameFail);

	}, renameFail);
}



//and the sample success function
function renameSuccess() {
	alert('renamed!');
}

function removeFail() {
	alert('Error al eliminar foto');
}

//and the sample fail function
function renameFail() {
	alert('failed');
}

