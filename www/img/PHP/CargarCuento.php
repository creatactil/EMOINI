<?php

include "conexion.php";
mysql_set_charset('utf8');

$id = $_GET["ID"];

$sql = "SELECT * FROM Cuentos C, Paginas P WHERE C.ID_Cuentos = P.ID_Cuentos AND C.ID_Cuentos = $id ORDER BY P.ID_Paginas ASC";
$result = mysql_query($sql) or die ("Query error: " . mysql_error());

$fila = mysql_num_rows($result);

while($row = mysql_fetch_assoc($result)) {
	$records[] = array_map('utf8_encode',$row);
	
}

echo $_GET['jsoncallback'] . '(' . json_encode( $records) . ');';
mysql_close($con);

?>