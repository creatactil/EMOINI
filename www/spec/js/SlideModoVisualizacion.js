/**
 * Created by alejandro on 27/04/15.
 */

function Setslide(){

    $( "#TabsCuento" ).on( "swipeleft", swipeleftHandler );
    $( "#TabsCuento"  ).on( "swiperight", swiperightHandler );
    $.event.special.swipe.verticalDistanceThreshold = 800;

    // Callback function references the event target and adds the 'swiperight' class to it
    function swiperightHandler( event ){
        slideder();
    }
    // Callback function references the event target and adds the 'swipeleft' class to it
    function swipeleftHandler( event ){
        slideizq();
    }
}

function Quitslide(){
    $( "#TabsCuento" ).unbind( "swipeleft" );
    $( "#TabsCuento" ).unbind( "swiperight" );
}