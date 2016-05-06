<?php
header('Access-Control-Allow-Origin: *');
include 'config.php';
date_default_timezone_set("Asia/Kolkata");
//$cars = array();
$cars =@$_POST['type'];
$createdOn=date('Y-m-d h:i:s', time());
//$arrlength = count($cars);

//$devID=$cars[$x];	
	
	
	$updateQuery="UPDATE doctormobilenumber SET flag=1,statusDate='$createdOn' where doctorId='$cars'";
	$updateRun=mysql_query($updateQuery,$conn);


/* for($x =0; $x <$arrlength; $x++)
{  
	$devID=$cars[$x];	
	
	
	$updateQuery="UPDATE servertransactions SET flag=1 where pt_transaction='$devID'";
	$updateRun=mysql_query($updateQuery,$conn);
	
} */
?>