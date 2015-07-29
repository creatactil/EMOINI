/**
 * Created by alejandro on 24/04/15.
 */

function GetModo(){
    if($('.MVisualizacion').length) {
        return true;
    }
    return false;
}

function VisualizacionOn(){
   // Setslide();
    $('#BotonCambiarModo').show();
    $('#BotonDerechatab').show();
    $('#BotonIzquierdatab').show();
    $('#BotonAmpliarMenu').hide();
    $('#PrimerCuadrante').hide();
    $('#SegundoCuadrante').hide();
    $('#PrimerCuadranteBajo').hide();
    $('#SegundoCuadranteBajo').hide();
    $('#BarraSlide').hide();
    $('#TabsCuento').removeClass("MEdicion").addClass("MVisualizacion");
}

function VisualizacionOff() {
   // Quitslide();
    $('#BotonCambiarModo').hide();
    $('#BotonDerechatab').hide();
    $('#BotonIzquierdatab').hide();
    $('#BotonAmpliarMenu').show();
    $('#PrimerCuadrante').show();
    $('#SegundoCuadrante').show();
    $('#PrimerCuadranteBajo').show();
    $('#SegundoCuadranteBajo').show();
    $('#BarraSlide').show();
    $('#TabsCuento').removeClass("MVisualizacion").addClass("MEdicion");
}
