<?php
include "conexion.php";
mysql_set_charset('utf8'); 

$ID= $_GET["Dispo"];
$Usuario = $_GET["User"];

$sql = "INSERT INTO `Dispositivos`(`ID`, `Usuario`, `Descarga`) ";
$sql .= "VALUES ('$ID','$Usuario',1) ";
$sql .="ON DUPLICATE KEY UPDATE ID='$ID', Usuario='$usuario', Descarga=1";


$result = mysql_query($sql) or die ("Query error: " . mysql_error());

mysql_close($con);

echo $_GET['jsoncallback'] . '(' . json_encode("OK") . ');';

?>