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
//$josn = '{"otp":[{"mobileNo":789456124,"emailId":"abc@gmail.com"}]}'; 
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse =	"";
$mobileNo=$data['otp'][0]['mobileNo'];
$email=$data['otp'][0]['emailId'];

//Check for blank information
if($mobileNo=='' or $email=='')
{
	deliver_response(203,"Missing Information..Please Enter All The Information!!","otp",$jsonresponse);
}
else
{
	//Check if Mobile Number exists
	$selectVisitorQuery1 = "select * from visitor where mobileNo='$mobileNo'";
	$selectVisitor1 = mysql_query($selectVisitorQuery1,$conn) or die(mysql_error());
	$selectVisitorRows1 = mysql_num_rows($selectVisitor1);
	if($selectVisitorRows1 > 0)
	{
		deliver_response(203,"An Account With This Mobile Number Already Exists","otp",$jsonresponse);
	}
	else
	{
		//Check if Email Id exists
		$selectVisitorQuery2="select * from visitor where emailId='$email'";
		$selectVisitor2=mysql_query($selectVisitorQuery2,$conn) or die(mysql_error());
		$selectVisitorRows2=mysql_num_rows($selectVisitor2);
		if($selectVisitorRows2 > 0)
		{
			deliver_response(203,"An Account With This Email Id Already Exists","otp",$jsonresponse);
		}
		else
		{
			//Create OTP
			/*$digits_needed=4;
			$random_number=''; // set up a blank string
			$count=0;
			while ($count < $digits_needed ) 
			{
				$random_digit = mt_rand(0, 3);
				$random_number .= $random_digit;
				$count++;
			}*/
			//$jsonresponse=$random_number;
			$jsonresponse="1234"; //Hardcoded for Testing, Remove Later
			json_encode($jsonresponse);
			deliver_response(200,"OTP Created","otp",$jsonresponse);
		}
	}
}
?>