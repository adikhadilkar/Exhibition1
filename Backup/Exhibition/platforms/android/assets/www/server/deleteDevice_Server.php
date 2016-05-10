<?php
header('Access-Control-Allow-Origin: *');
include 'config.php';

$getDeviceID = array();
$getDeviceID =json_decode(@$_POST['SendDevId']);
$deviceLength = count($getDeviceID);
for($x =0; $x <$deviceLength; $x++)
{  	
	$DeleteQuery="delete from serverlocation where deviceId='$getDeviceID[$x]'";
	$res=mysql_query($DeleteQuery,$conn);
}
?>