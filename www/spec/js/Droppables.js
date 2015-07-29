function drop(){

    var offsetPapelera = $("#Papelera").offset();
    var offsetElemento = $("#" + $('.ElemActual')[0].id).offset();



    //calculamos el recinto de la papelera.
    var Px0 = offsetPapelera.left;
    var Py0 = offsetPapelera.top;
    var Px1 =  Px0 + 60;
    var Py1 =  Py0 + $("#Papelera").height();

    //calculamos el reciento del elemento.
    var Ox0 = offsetElemento.left;
    var Oy0 = offsetElemento.top;
    var Ox1 = offsetElemento.left + $("#" + $('.ElemActual')[0].id).width();
    var Oy1 = offsetElemento.top + $("#" + $('.ElemActual')[0].id).height();

    console.log(Px0 +' '+ Py0 + ' ' + Px1 + ' ' + Py1);
    console.log(Ox0 +' '+ Oy0 + ' ' + Ox1 + ' ' + Oy1);

    //Miramos si el elemento esta dentro de la papelera
    if ((Py0 < Oy0 && Py1 > Oy0) && (Px0 < Ox0 && Px1 > Ox0) || (Py0 < Oy0 && Py1 > Oy0) && (Px0 < Ox1 && Px1 > Ox1)
    || (Py0 < Oy1 && Py1 > Oy1) && (Px0 < Ox0 && Px1 > Ox0) || (Py0 < Oy1 && Py1 > Oy1) && (Px0 < Ox1 && Px1 > Ox1) ||
    (Ox0 < Px0 && Oy0 < Py0 && Ox1 > Px1 && Oy1 > Py1) || (Ox0 > Px0 && Oy0 > Py0 && Ox1 < Px1 && Oy1 < Py1)) {
        $("#" + $('.ElemActual')[0].id).remove();
    }

}