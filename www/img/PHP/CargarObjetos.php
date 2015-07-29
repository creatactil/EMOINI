<?php

include "conexion.php";
mysql_set_charset('utf8');

$ID_Cuento = $_GET['Paginas'][0]['ID_Cuentos'];
$Array_Tipos_Objetos = array();
$Array_Paginas = array();

//var_dump($_GET);
$max = sizeof($_GET['Paginas']);
  for($j = 0; $j < $max; $j++){
    
    $Pagina = $_GET['Paginas'][$j]['ID_Paginas'];

    $sql = "SELECT * FROM Objetos  WHERE ID_Cuento = $ID_Cuento AND ID_Paginas = $Pagina";

  
    $result = mysql_query($sql) or die ("Query error: " . mysql_error());
  
    $i = 0;
    while ($Array_Tipos_Objetos[$i] = mysql_fetch_assoc($result)) {
	  $i++;
    }
  
    $Array_Paginas[$j] = $Array_Tipos_Objetos;
    echo "chacho";

 }
 
// var_dump( $Array_Paginas);
/*
 $Array_Paginas_Final = array();
 
 for($j = 0; $j < $max; $j++){
     $maxi = sizeof($Array_Paginas[$j])
     for($i = 0; $i< $maxi; $i++){  
	$sql = "SELECT URL FROM Objetos O,TipoObjetos T WHERE O.ID_Tipo = T.IDTipo_Objetos AND O.ID_TIPO =$Array_Paginas[$j][$i]['ID_Tipo']  AND O.ID_Cuento = $ID_Cuento"; 
	$result = mysql_query($sql) or die ("Query error: " . mysql_error());
  
	$fila = mysql_fetch_assoc($result);
	$Array_Paginas_Final = $fila;
	var_dump($Array_Paginas_Final);
  }
 }
  
  
  /*
  
  $ID_Pagina = $_GET['Paginas'][$i]['ID_Paginas']; 
  $sql = "SELECT * FROM Objetos O,TipoObjetos T WHERE O.ID_Tipo = T.IDTipo_Objetos AND O.ID_TIPO =  AND O.ID_Cuento = 70"; 
  
  $result = mysql_query($sql) or die ("Query error: " . mysql_error());
  
  $fila = mysql_fetch_assoc($result);
  $Tipo_Fondo = $fila;

  $Array_Tipos_Fondo[$i] = $Tipo_Fondo; 
*/
//}

//echo $_GET['jsoncallback'] . '(' . json_encode( $records) . ');';
mysql_close($con);

?>