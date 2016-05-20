<?php
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
$data1=array();
$data2=array();
$data3=array();
$response=array();
$response1=array();
$response2=array();

//select event title & description 
@$selectExhibitorsQuery="select a.id, a.companyName,b.logoMediaId,b.`sectorId`,c.link,d.sectorName, d.description from exhibitor a , exhibitorProfile b,media c,exhibitionSector d where b.createdBy=a.id and c.id=b.`logoMediaId` and d.id=b.`sectorId`";
@$selectExhibitors=mysql_query($selectExhibitorsQuery,$conn) or die(mysql_error());
@$exhibitorRows=mysql_num_rows($selectExhibitors);

while($exhibitors=mysql_fetch_array($selectExhibitors))
{

		$response['id'] = $exhibitors['id'];
		$response['companyName'] = $exhibitors['companyName'];
		$response['logoMediaId'] = $exhibitors['logoMediaId'];
		$response['link'] = $exhibitors['link'];
		$response['sectorName'] = $exhibitors['sectorName'];
		$response['description'] = $exhibitors['description'];
		
		array_push($data,$response);	
} 


  $json= json_encode($data,JSON_NUMERIC_CHECK);     
deliver_response(200,"exhibitors","exhibitorsInformation",$data);

?>