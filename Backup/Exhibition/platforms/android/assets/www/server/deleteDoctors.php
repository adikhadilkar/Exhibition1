<?php
header('Access-Control-Allow-Origin: *');
include 'config.php';

$drId = array();
$drId =json_decode(@$_POST['DrId']);
$arrlength = count($drId);
for($x =0; $x <$arrlength; $x++)
{  	
	$updateQuery="delete from doctormobilenumber where doctorId='$drId[$x]'";
	$res=mysql_query($updateQuery,$conn);
}
?>