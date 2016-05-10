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
	$selectDoctorQuery = "select * from doctormobilenumber where mobileNumber='$mobileNo' OR alterMobile1='$mobileNo' OR alterMobile2='$mobileNo'";
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
					
					$jsonresponse['OTP']=$random_number;
					$jsonresponse['doctorId']=$doctorId;
					$a=array($random_number,$doctorId);
					
					
					 		   
	$headers = array(
				 'Content-Type: application/json'
			);
			$msg=urlencode("Your OTP for login into the application is:");
			$msg2=urlencode(" Thank You, JJC North East.");
			$msg1=$msg.$random_number;
			$mobilNo1="91".$mobileNo;
		//Your authentication key
		$authKey = "4309A2r1KPffqUc569f2120";

//Multiple mobiles numbers separated by comma
$mobileNumber = $mobilNo1;

//Sender ID,While using route4 sender id should be 6 characters long.
$senderId="ESNDSH";

//Your message to send, Add URL encoding here.
$message = $msg1;

//Define route 
$route = "default";
//Prepare you post parameters
$postData = array(
    'authkey' => $authKey,
    'mobiles' => $mobileNumber,
    'message' => $message,
    'sender' => $senderId,
    'route' => $route
);

//API URL
$url="http://54.254.130.116/api/sendhttp.php";

// init the resource
$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $postData
    //,CURLOPT_FOLLOWLOCATION => true
));


//Ignore SSL certificate verification
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);


//get response
$output = curl_exec($ch);

//Print error if any
if(curl_errno($ch))
{
    //echo 'error:' . curl_error($