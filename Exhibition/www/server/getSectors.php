<?php
date_default_timezone_set("Asia/Kolkata");
header("Content-Type: text/html; charset=utf-8");
//Access Control Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
//Include Files
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';
$data=array();
$response=array();
//select Sector details
@$selectSectorsQuery="SELECT id, sectorName, description FROM `exhibitionSector`";
@$selectSectors=mysql_query($selectSectorsQuery,$conn) or die(mysql_error());
@$SectorsRows=mysql_num_rows($selectSectors);
  while($sectors=mysql_fetch_array($selectSectors))
  {
		$response['id'] = $sectors['id'];
		$response['sectorName'] = $sectors['sectorName'];
		$response['description'] = $sectors['description'];
		 
		array_push($data,$response);
		
	}
    $json= json_encode($data,JSON_NUMERIC_CHECK);     
	deliver_response(200,"sectors","sectorsInformation",$data);

?>