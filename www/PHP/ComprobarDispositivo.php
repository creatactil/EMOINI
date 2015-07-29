<?php
include "conexion.php";
mysql_set_charset('utf8'); 


$ID = $_GET["Dispo"];

$sql = "SELECT * FROM  `Dispositivos` WHERE `ID` = '$ID' ";
$result = mysql_query($sql) or die ("Query error: " . mysql_error());

$num = mysql_num_rows($result);

if ($num == 0){
  $res = ("error");
  echo  json_encode($res) ;
}

else{
    $resultado = array();
    while($row = mysql_fetch_assoc($result)) {
		$resultado[] = array_map('utf8_encode',$row);
    }
}


mysql_close($con);

echo $_GET['jsoncallback'] . '(' . json_encode($resultado) . ');';

?>

