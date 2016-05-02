<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';
//$josn = '{"signUp":[{"name":"abc","password":"abc","mobileNo":789456124,"emailId":"abc@gmail.com"}]}'; 
//var data = {"profile":[{"visitorId":visitorId}]};
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse="";
$visitorid1=$data['profile'][0]['visitorId'];
if($visitorid1=="")
{
	deliver_response(201,"Missing Information","profile",$jsonresponse);
}
else

{			
		//Cheking visitor entry in Visitor table
	$selectVisitorQuery="select name,image from visitorProfile where createdBy='$visitorid1'";
	$selectVisitor=mysql_query($selectVisitorQuery,$conn)or die(mysql_error());
	$selectVisitorResult=mysql_fetch_assoc($selectVisitor);
	$visitorResultRows=mysql_num_rows($selectVisitor);
	
	if($visitorResultRows>0)
	{
		$jsonresponse['name']=$selectVisitorResult['name'];
		$jsonresponse['image']=$selectVisitorResult['image'];
		json_encode($jsonresponse);
		deliver_response(200,"Record found","visitor",$jsonresponse);
			
	
			
	}
	else
	{ 	
		deliver_response(203,"No data found","visitor",$jsonresponse);
	}
	
}

?>