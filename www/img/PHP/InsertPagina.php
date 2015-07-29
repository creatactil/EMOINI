<?php

include "conexion.php";
mysql_set_charset('utf8'); 

$id = $_GET["ID"];
$N_pag = $_GET["N_Pag"];

$sql = "INSERT INTO Paginas (ID_Paginas,ID_Cuentos) ";
$sql .= "VALUES ('$N_pag', '$id')";
mysql_query($sql, $con);

echo "ok";

mysql_close($con);
?>