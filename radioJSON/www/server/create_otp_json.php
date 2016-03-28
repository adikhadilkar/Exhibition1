<?php
//Access Control Headers
date_default_timezone_set("Asia/Kolkata");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

//Include Files
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';

//Fetch and decode JSON
//$josn = '{"otp":[{"mobileNo":789456124}]}'; 
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse =	"";
$mobileNo=$data['otp'][0]['mobileNo'];
/*$latitude=$data['otp'][0]['latitude'];
$longitude=$data['otp'][0]['longitude'];
$uuid=$data['otp'][0]['uuid'];*/

	/*$insertDeviceId="insert into serverlocation(locationId,deviceId,latitude,longitude) values('','$uuid','$latitude','$longitude')";
	$resDeviceId=mysql_query($insertDeviceId,$conn)or die(mysql_error());*/
	
	
	
	//Check if Mobile Number exists
	$selectDoctorQuery = "select * from doctormobilenumber where mobileNumber='$mobileNo'";
	$selectDoctor = mysql_query($selectDoctorQuery,$conn) or die(mysql_error());
	$selectDoctorRows = mysql_num_rows($selectDoctor);
	if($selectDoctorRows>0)
	{
		$rows = mysql_fetch_array($selectDoctor);
		$doctorId=$rows['doctorId'];
			if($selectDoctor)
			{	
					//Create OTP
					$digits_needed=4;
					$random_number=''; // set up a blank string
					$count=0;
					while ($count < $digits_needed ) 
					{
						$random_digit = mt_rand(0, 3);
						$random_number .= $random_digit;
						$count++;
					}
					$jsonresponse=$random_number;
					//$jsonresponse="1234"; //Hardcoded for Testing, Remove Later
					json_encode($jsonresponse);
					deliver_response(200,"OTP Created","otp",$jsonresponse);
			}
	}
	else 
	{
		deliver_response(201,"Not a Registered Doctor","otp",$jsonresponse);
	}

?>