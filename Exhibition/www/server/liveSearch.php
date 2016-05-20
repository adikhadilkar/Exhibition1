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
$json = file_get_contents("php://input");
$data = json_decode($json, true);	
$jsonresponse =	"";
$data1=array();
@$keyword=$data['search'][0]['keyword'];

$searchQuery="select a.id, a.companyName,b.logoMediaId,b.`sectorId`,c.link,d.sectorName, d.description from exhibitor a , exhibitorProfile b,media c,exhibitionSector d where b.createdBy=a.id and c.id=b.`logoMediaId` and d.id=b.`sectorId` and a.companyName like '%$keyword%'";
$searchElement=mysql_query($searchQuery,$conn)or die(mysql_error());
@$searchRows=mysql_num_rows($searchElement);

while($searchedKeyword=mysql_fetch_array($searchElement))
{

		$response['id'] = $searchedKeyword['id'];
		$response['companyName'] = $searchedKeyword['companyName'];
		$response['logoMediaId'] = $searchedKeyword['logoMediaId'];
		$response['link'] = $searchedKeyword['link'];
		$response['sectorName'] = $searchedKeyword['sectorName'];
		$response['description'] = $searchedKeyword['description'];
		
		array_push($data1,$response);	
} 


  $json= json_encode($data,JSON_NUMERIC_CHECK);     
deliver_response(200,"search","searchedInformation",$data1);


?>