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


			
		//Cheking visitor entry in Visitor table
	
	
	//$selectVisitorQuery="select name,mobileNo,emailId from visitor where id='$visitorid1'";
	//$selectVisitorQuery="select vp.name,vp.gender,vp.dob,vp.city,vp.photoLink,v.mobileNumber,v.email from visitorprofile vp,visitor v where vp.createdBy='$visitorid1' and vp.createdBy=v.id";
	
	
	$selectVisitorQuery="select v.name,v.mobileNo,v.emailId,vp.dateOfBirth,vp.gender,vp.education,vp.profession from visitorProfile vp,visitor v where vp.createdBy='$visitorid1' and vp.createdBy=v.id";
	
	
	//$selectVisitorQuery="select name,mobileNo,emailId from visitor where id='$visitorid1'";
	
	$selectVisitor=mysql_query($selectVisitorQuery,$conn)or die(mysql_error());
	
	$visitorResultRows=mysql_num_rows($selectVisitor);
	
	
	if($visitorResultRows>0)
	{
		while($selectVisitorResult=mysql_fetch_assoc($selectVisitor))
		{
				
				$jsonresponse[] = $selectVisitorResult;
				
			
		}

			json_encode($jsonresponse);
			deliver_response(200,"Record found","visitor",$jsonresponse);
	}
		else
		{ 	
				deliver_response(203,"No data found","visitor",$jsonresponse);
		}
	
	

?>