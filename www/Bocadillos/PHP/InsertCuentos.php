<?php

include "conexion.php";
mysql_set_charset('utf8'); 

$id = $_GET["id"];
$nombre = $_GET["Nombre"];
$coleccion = $_GET["Coleccion"];

$sql = "INSERT INTO Cuentos (ID_Cuentos,NombreCuento,ID_Colecciones) ";
$sql .= "VALUES ('$id', '$nombre', '$coleccion') ON DUPLICATE KEY UPDATE  ID_Cuentos='$id', NombreCuento='$nombre', ID_Colecciones='$coleccion'";
mysql_query($sql, $con);

echo "ok";

mysql_close($con);
?>