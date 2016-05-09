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
//$json ='{"file":[{"deviceId":"iPhone 6s"}]}';
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse = array();
$deviceId=$data['file'][0]['deviceId'];
//$username=$data['file'][0]['username'];

	//Insert new device Id in database
	
	
	if($deviceId=='')
	{
		deliver_response(203,"Missing Information","file",$jsonresponse);
	}
	else
	{
		$selectData="select * from csvfile where deviceId=$deviceId AND status='0'";
		$resData=mysql_query($selectData,$conn)or die(mysql_error());
		while($rows=mysql_fetch_array($resData))
		{
			$jsonresponse[]=$rows['pt_transaction'];
			$jsonresponse[]=$rows['radioPatientRptDate'];
			$jsonresponse[]=$rows['radioPatientsName'];
			$jsonresponse[]=$rows['radioPatientsId'];
			$jsonresponse[]=$rows['radioDoctorId'];
			$jsonresponse[]=$rows['radioName'];
			$jsonresponse[]=$rows['cut'];
			$jsonresponse[]=$rows['invest'];
			$jsonresponse[]=$rows['cut'];
			$jsonresponse[]=$rows['deviceId'];
			$jsonresponse[]=$rows['userName'];
			$jsonresponse[]=$rows['status'];
			 //$jsonresponse1[]=array_push($jsonresponse); 
		}
		
		json_encode($jsonresponse);
		deliver_response(200,"New Records Found","file",$jsonresponse);

	}
			
	
?>