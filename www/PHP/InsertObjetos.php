<?php

include "conexion.php";
mysql_set_charset('utf8'); 

$CuentoID = $_GET["CuentoID"];
$ID_Pagina = $_GET["PaginaID"];
$Objetos = $_GET["Objetos"];

$max = sizeof($Objetos);
for($i = 0; $i < $max;$i++){
  $idObjeto = $Objetos[$i]['id'];
  $angulo = $Objetos[$i]['angulo'];
  $tipo = $Objetos[$i]["tipo"];
  $zoom = $Objetos[$i]["zoom"];
  $y = $Objetos[$i]['y'];
  $x = $Objetos[$i]['x'];
  $idpag = $Objetos[$i]['idpag'];
  
  $sql = "INSERT INTO `Objetos`(`ID`, `Posx`, `Posy`, `Zoom`, `Angulo`, `ID_Paginas`, `ID_Tipo`, `ID_Cuento`)";
  $sql .=" VALUES ($idObjeto,$x,$y,$zoom,$angulo,$ID_Pagina,$tipo,$CuentoID)";
  $sql .="ON DUPLICATE KEY UPDATE  ID='$idObjeto', Posx='$x', Posy='$y', Zoom='$zoom', Angulo='$angulo',ID_Paginas='$ID_Pagina',ID_Tipo='$tipo',ID_Cuento='$CuentoID'";
  
  mysql_query($sql, $con);

  
}

mysql_close($con);
?>