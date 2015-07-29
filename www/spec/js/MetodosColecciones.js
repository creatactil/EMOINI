/**
 * Created by alejandro on 30/04/15.
 */

function CargarColletIDs(){
    $.ajax({
        url: 'http://dentef.com/emoapp/PHP/CargarIDCollect.php',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data){
            for(var i = 0; i<data.length; i++)
               $('#SelectorColecciones').append('<option value="' + data[i].ID + '">' + data[i].Nombre + '</option>');
        }
    });
}