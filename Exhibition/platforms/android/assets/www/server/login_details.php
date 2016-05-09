<?php
date_default_timezone_set("Asia/Kolkata");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';
//$josn = '{"login":[{"mobileNo":789456124}]}'; 
$josn = file_get_contents("php://input");
$data = json_decode($josn, true);
$jsonresponse =	"";
$mobileNo=$data['login'][0]['mobileNo'];
$createdOn=date('Y-m-d h:i:s', time());


			//Insert mobileNo into loginDetails table
			$insertLoginQuery="insert into loginDetails (mobileNo,createdOn)  values('$mobileNo','$createdOn')";
			$insertLogin=mysql_query($insertLoginQuery,$conn) or die(mysql_error());
			
		
			$jsonresponse="Login Successful";
			json_encode($jsonresponse);
			deliver_response(200,"Successful Login","login",$jsonresponse);

?>