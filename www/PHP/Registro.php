<?php
include "conexion.php";
mysql_set_charset('utf8'); 

$user = $_GET["User"];
$pass = $_GET["Pass"];
$email = $_GET["Email"];
$name = $_GET["Name"];
$surname = $_GET["Surname"];

$sql = "INSERT INTO `Usuarios`(`Usuario`, `Pass`, `Nombre`, `Apellido`, `Correo`, `PD`, `Conectado`)";
$sql .=" VALUES ('$user','$pass','$name','$surname','$email',0,0)";
$result = mysql_query($sql) or die ("Query error: " . mysql_error());

mysql_close($con);

echo $_GET['jsoncallback'] . '(' . json_encode("OK") . ');';

?>

