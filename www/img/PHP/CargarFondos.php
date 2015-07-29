<?php

include "conexion.php";
mysql_set_charset('utf8');

$ID_Cuento = $_GET['Paginas'][0]['ID_Cuentos'];
$Array_Tipos_Fondo = array(); 

$max = sizeof($_GET['Paginas']);

for($i = 0; $i < $max; $i++){

  $ID_Pagina = $_GET['Paginas'][$i]['ID_Paginas'];
 
  
  $sql = "SELECT `Tipo_Fondo` FROM `Fondos` WHERE `ID_Cuento`= '$ID_Cuento' AND `ID_Pagina`='$ID_Pagina'"; 
  
  $result = mysql_query($sql) or die ("Query error: " . mysql_error());
  
  $fila = mysql_fetch_assoc($result);
  $Tipo_Fondo = $fila["Tipo_Fondo"];

  $Array_Tipos_Fondo[$i] = $Tipo_Fondo; 
  

}

$Array_URL_Fondo = array(); 
  
$max = sizeof($Array_Tipos_Fondo);

for($i = 0; $i < $max; $i++){

   $ID_Colecciones = $_GET['Paginas'][$i]['ID_Colecciones'];
   
  if($Array_Tipos_Fondo[$i] != NULL && $Array_Tipos_Fondo[$i] != -1){
  
  $sql1 = "SELECT * FROM `TipoFondo` WHERE `ID_Fondos`='$Array_Tipos_Fondo[$i]' AND `ID_Colecciones`='$ID_Colecciones'";
  $result1 = mysql_query($sql1) or die ("Query error: " . mysql_error());
  $fila1 = mysql_fetch_assoc($result1); 
  $Array_URL_Fondo[$i] = $fila1;
  
  }
  
  else{
    $Array_URL_Fondo[$i] = '-1';
    
  }
}

  
//var_dump($Array_URL_Fondo);

echo $_GET['jsoncallback'] . '(' . json_encode( $Array_URL_Fondo) . ');';

mysql_close($con);

?>