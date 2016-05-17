<?php
date_default_timezone_set("Asia/Kolkata");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php'; 
$json = file_get_contents("php://input");
$data1=array();
//$data = json_decode($json, true);
$selectedExhibitors=array();
$jsonresponse=array();
$sectorId=$data['sectors'][0]['sectorId'];
$response=array();


	//select sectors exhibitors
	$selectSectorsQuery1 = "select  a.id, a.companyName, c.link from exhibitor a , exhibitorProfile b,media c where b.sectorId='$sectorId' and b.createdBy=a.id and c.id=b.`logoMediaId`";
	$selectSectors1 = mysql_query($selectSectorsQuery1,$conn) or die(mysql_error());
	@$sectorRows1=mysql_num_rows($selectSectors1);
	while($sectors1=mysql_fetch_array($selectSectors1))
	{
		$response['id'] = $sectors1['id'];
		$response['companyName'] = $sectors1['companyName'];
		$response['link'] = $sectors1['link'];
		array_push($data,$response); 
	}	
	
			$json= json_encode($data,JSON_NUMERIC_CHECK);  
			deliver_response(200,"secExhibitor Information","secExhibitor",$data);

?>