<?php
    header("refresh:5;");
?>
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
//$json = '{"location":[{"uuid":uuid,"latitude":lat,"longitude":lon}]}'; 
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse=array();
$locationId=$data['loc'][0]['locationId'];
/*$latitude=$data['location'][0]['latitude'];
$longitude=$data['location'][0]['longitude']; */

	//Insert new device Id in database
	/* if($deviceId=='' or $latitude=='' or $longitude =='')
	{
		deliver_response(203,"Missing Information","location",$jsonresponse);
	}
	else
	{ */
		$selectQuery="select * from serverlocation where locationId=33";
		$result=mysql_query($selectQuery,$conn);
		$rows=mysql_fetch_array($result);
		$jsonresponse['locationId']=$rows['locationId'];
		$jsonresponse['deviceId']=$rows['deviceId'];
		$jsonresponse['latitude']=$rows['latitude'];
		$jsonresponse['longitude']=$rows['longitude'];
		
		
		json_encode($jsonresponse);
		deliver_response(200,"New Location created","location",$jsonresponse);

	/* } */
			
	
?>