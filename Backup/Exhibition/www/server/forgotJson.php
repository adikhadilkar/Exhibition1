<?php
//Access Control Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

//Include Files
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';

//Fetch and decode JSON
//$josn = '{"password":[{"mobileNo":6767543423,"newPassword":"abcdghgf","confirmPassword":"abcdegfh"}]}'; 
$json = file_get_contents("php://input");
$data = json_decode($json, true);	
$jsonresponse =	"";
@$pOtp=$data['password'][0]['pOtp'];
@$nOtp=$data['password'][0]['nOtp'];
@$mobileNo=$data['password'][0]['mobileNo'];
@$newPassword=$data['password'][0]['newPassword'];
@$confirmPassword=$data['password'][0]['confirmPassword'];

if($pOtp!=$nOtp)
{
	deliver_response(202,"Otp Does Not Match!","otp",$jsonresponse);
}	
else if($newPassword!=$confirmPassword)
{
	deliver_response(203,"Passwords Does Not Match!","otp",$jsonresponse);
}
else
{
	$updateVisitorQuery="update visitor
	set password='$newPassword'	
	where mobileNo='$mobileNo'";	
	mysql_query($updateVisitorQuery,$conn); 
	
	$jsonresponse=$mobileNo;			
	deliver_response(200,"visitor profile updated","visitor",$jsonresponse);
}	


?>