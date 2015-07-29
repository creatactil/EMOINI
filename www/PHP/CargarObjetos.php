<?php

include "conexion.php";
mysql_set_charset('utf8');

$ID_Cuento = $_GET['Cuento'];
$Array_Tipos_Objetos = array();
$Array_Paginas = array();

//var_dump($_GET);
$max = sizeof($_GET['Paginas']);

//var_dump($_GET);
foreach ($_GET['Paginas'] as $valor3){


    $sql = "SELECT * FROM Objetos O,TipoObjetos T  WHERE O.ID_Cuento = $ID_Cuento AND O.ID_Paginas = $valor3 AND T.IDTipo_Objetos = O.ID_Tipo";

  
    $result = mysql_query($sql) or die ("Query error: " . mysql_error());
    
    	while($row =  mysql_fetch_assoc ( $result))
	{
	
			
			$Array_Paginas[]=$row;
	
	}   

 }




echo $_GET['jsoncallback'] . '(' . json_encode( $Array_Paginas) . ');';
mysql_close($con);

?>

