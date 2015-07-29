<?php

include "conexion.php";
mysql_set_charset('utf8'); 

$CuentoID = $_GET["CuentoID"];
$ID_Pagina = $_GET["ID"];
$N_pag = $_GET["N_Pag"];
$Fondo = $_GET["Fondo"];
$Objetos = $_GET["Objetos"];

//Insercion de Fondo.

$sql = "INSERT INTO `Fondos`(`ID_Cuento`, `ID_Pagina`, `Tipo_Fondo`)"; 
$sql .= "VALUES ($CuentoID,$ID_Pagina,$Fondo)";
$sql .="ON DUPLICATE KEY UPDATE  ID_Cuento='$CuentoID', ID_Pagina='$ID_Pagina', Tipo_Fondo='$Fondo'";
mysql_query($sql, $con);


echo "ok";

mysql_close($con);
?>