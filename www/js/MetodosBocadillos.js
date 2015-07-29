/**
 * Created by alejandro on 17/04/15.
 */

function AddTextoNarracion(){

    var id = $(".ElemActual")[0].id;
    var texto = $("#Texto").val();
	
	$("#" + id + " .TextNarracionSelect").removeClass("TextNarracionSelect").addClass("TextNarracion");
    $("#" + id + " .TextNarracion").val(texto);
	console.log(texto.length);
	if(texto.length > 4){
    	$("#" + id + " .TextNarracion").attr('size',texto.length-4);
		
	}
	else{
		$("#" + id + " .TextNarracion").attr('size',1);
	}


    $('#' + id).show();
}


function AddTextoBocadillo() {
    var id = $(".ElemActual")[0].id;
    var texto = $("#Texto").val();

    $("#" + id + " div.polaroid div.bubble").text(texto);
}

function ReproducirAudioBocadillo(){
    var id = $(".ElemActual")[0].id;
    var text = $("#" + id + " div.polaroid div.bubble").text();
    responsiveVoice.speak(text,'Spanish Female');
}

function ReproducirAudioNarracion(){
    var id = $(".ElemActual")[0].id;
    var text =  $('#' + id +" div.polaroid input.TextNarracion").val();
    responsiveVoice.speak(text,'Spanish Female');
}