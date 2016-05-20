<?php
header('Access-Control-Allow-Origin: *');
include 'config.php';
date_default_timezone_set("Asia/Kolkata");
//$cars = array();
$cars =@$_POST['type1'];
$createdOn=date('Y-m-d h:i:s', time());

	$updateQuery="UPDATE doctormobilenumber SET flag=2,statusDate='$createdOn' where doctorId='$cars'";
	$updateRun=mysql_query($updateQuery,$conn);
/* $arrlength = count($cars);
for($x =0; $x <$arrlength; $x++)
{  
	$devID=$cars[$x];	
	$updateQuery="UPDATE servertransactions SET flag=2 where pt_transaction='$devID'";
	$res=mysql_query($updateQuery,$conn);
	
}
 */?>