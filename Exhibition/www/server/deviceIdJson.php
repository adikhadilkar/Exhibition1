<?php
   // header("refresh:40;");
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
$jsonresponse =array();
/* $deviceId=$data['location'][0]['uuid'];
$latitude=$data['location'][0]['latitude'];
$longitude=$data['location'][0]['longitude']; */

	//Insert new device Id in database
	/* if($deviceId=='' or $latitude=='' or $longitude =='')
	{
		deliver_response(203,"Missing Information","location",$jsonresponse);
	}
	else
	{ */
		$selectQuery="select * from serverlocation ";
		$result=mysql_query($selectQuery,$conn);
		$rows=mysql_num_rows($result);
		
		$rows1=mysql_fetch_array($result);
		while($rows1)
		{
			$deviceId=$rows1['deviceId'];
			$jsonresponse[]=$deviceId;
		}
		
		json_encode($jsonresponse);
		deliver_response(200,"New Device Found","location",$jsonresponse);

	/* } */
			
	
?>