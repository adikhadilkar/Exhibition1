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
//$josn = '{"password":[{"visitorId":visitorId,"password":abc12234,"newPassword":"abcdghgf","confirmPassword":"abcdghgf"}]}'; 
$json = file_get_contents("php://input");
$data = json_decode($json, true);	
$jsonresponse =	"";
@$visitorId=$data['password'][0]['visitorId'];
@$password=$data['password'][0]['password'];
@$newPassword=$data['password'][0]['newPassword'];
@$confirmPassword=$data['password'][0]['confirmPassword'];

		$selectVisitorQuery2="select * from visitor where password='$password'";
		$selectVisitor2=mysql_query($selectVisitorQuery2,$conn) or die(mysql_error());
		$selectVisitorRows2=mysql_num_rows($selectVisitor2);
		if($selectVisitorRows2==0)
		{
			deliver_response(203,"Account With This Password Does Not Exist","visitor",$jsonresponse);
		}
		else
		{
		if($newPassword=="" || $confirmPassword=="")
		{
			deliver_response(202,"Please Enter Password","otp",$jsonresponse);
		}
		else if($newPassword!=$confirmPassword)
		{
				deliver_response(202,"Passwords Does Not Match!","otp",$jsonresponse);
		}
		else
		{
				$updateVisitorQuery="update visitor
				set password='$newPassword'	
				where id='$visitorId'";	
				mysql_query($updateVisitorQuery,$conn); 
	
				$jsonresponse=$visitorId;			
				deliver_response(200,"visitor profile updated","visitor",$jsonresponse);
		}	
			
		}
?>