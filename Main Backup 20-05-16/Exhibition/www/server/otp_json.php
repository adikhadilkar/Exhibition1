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
//$josn = '{"otp":[{"mobileNo":9870025736,}]}';
 
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse =	"";
$mobileNo=$data['otp'][0]['mobileNumber'];

//Check For blank information
if($mobileNo=='')
{
	deliver_response(201,"Missing Information","otp",$jsonresponse);
}
else  
	{
		$selectDoctor="select * from serverdoctors where mobileNumber=$mobileNo";
		$resDoctor=mysql_fetch_array($selectDoctor,$conn);
		$doctorId= $resDoctor['doctorId'];
		if(mobileNo)
		
		
		if($doctorId)
		{
			$digits_needed=4;
			$random_number=''; // set up a blank string
			$count=0;
			while ($count < $digits_needed ) 
			{
				$random_digit = mt_rand(0, 3);
				$random_number .= $random_digit;
				$count++;
			}
		}
	}
?>