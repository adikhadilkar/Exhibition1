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
//$josn = '{"signIn":[{"emailId":ak@gmail.com,"password":"abc"}]}'; 
$json = file_get_contents("php://input");
$data = json_decode($json, true);	
$jsonresponse =	"";
@$emailId=$data['signIn'][0]['emailId'];
@$password=$data['signIn'][0]['password'];

if($emailId=='' or $password=='')
{
	deliver_response(203,"Missing Information","visitor",$jsonresponse);
}
else
{
	//Cheking visitor entry in Visitor table
	$selectVisitorQuery="select id,emailId,password from visitor where emailId='$emailId'";
	$selectVisitor=mysql_query($selectVisitorQuery,$conn)or die(mysql_error());
	$selectVisitorResult=mysql_fetch_assoc($selectVisitor);
	$visitorEmailId=$selectVisitorResult['emailId'];
	$visitorPassword=$selectVisitorResult['password'];	
	$visitorResultRows=mysql_num_rows($selectVisitor);
	
	if($visitorResultRows>0)
	{
			if($password==$visitorPassword)
			{	
				$jsonresponse=$selectVisitorResult['id'];
				json_encode($jsonresponse);
				deliver_response(200,"Valid Credentials","visitorId",$jsonresponse);
			}
	
			else
			{
				deliver_response(202,"Invalid Credentials","visitorId",$jsonresponse);
			}
		}
		else
		{ 	
				deliver_response(203,"Invalid Credentials","visitorId",$jsonresponse);
		}
	
}
?>