/**
 * Created by alejandro on 17/04/15.
 */

function AddTextoNarracion(){
    var id = $(".ElemActual")[0].id;

    var PagActual = $('.actual')[0].id;
    $('#' + id +" div.polaroid input.TextNarracion").removeClass("TextNarracion").addClass("TextNarracionSelect");

    $('#' + PagActual).append('<input id="TextNarracionTemp" type="text" value="" onblur="EliminarTempNarracion()">');
    var Position = $("#" + id + " div.polaroid input.TextNarracionSelect").offset();

    $('#' + id).hide();

    $('#TextNarracionTemp').offset({ top: Position.top, left: Position.left });
}

function EliminarTempNarracion(){

    var Texto =  $('#TextNarracionTemp').val();
    var id = $(".ElemActual")[0].id;


    $("#" + id + " div.polaroid input.TextNarracionSelect").val(Texto);

    $("#" + id + " div.polaroid input.TextNarracionSelect").removeClass("TextNarracionSelect").addClass("TextNarracion");
    $('#' + id).show();

    $('#TextNarracionTemp').remove();
}

function AddTextoBocadillo(){
    var id = $(".ElemActual")[0].id;
    var PagActual = $('.actual')[0].id;

    //$('#' + id +" div.polaroid p.TextBocadillo").removeClass("TextBocadillo").addClass("TextBocadilloSelect");

    $('#' + PagActual).append('<input id="TextBocadilloTemp" type="text" value="" onblur="EliminarTempBocadillo()">');
    var Position = $("#" + id + " div.polaroid div.bubble").offset();

    //$("#" + id + " div.polaroid p.TextBocadilloSelect").hide();

    $('#TextBocadilloTemp').offset({ top: Position.top, left: Position.left });
}

function EliminarTempBocadillo(){
    var Texto =  $('#TextBocadilloTemp').val();
    var id = $(".ElemActual")[0].id;

    console.log(Texto);

    $("#" + id + " div.polaroid div.bubble").text(Texto);

    $('#TextBocadilloTemp').remove();
}

function ReproducirAudioBocadillo(){
    var id = $(".ElemActual")[0].id;
    var text = $("#" + id + " div.polaroid div.bubble").text()
    responsiveVoice.speak(text,'Spanish Female');
}

function ReproducirAudioNarracion(){
    var id = $(".ElemActual")[0].id;
    var text =  $('#' + id +" div.polaroid input.TextNarracion").val();
    responsiveVoice.speak(text,'Spanish Female');
}