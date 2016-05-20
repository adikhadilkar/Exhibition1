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
$json = file_get_contents("php://input");
$data1=array();
$data = json_decode($json, true);
$selectedExhibitors=array();
$jsonresponse=array();
$exhibitorId=$data['exhibitor'][0]['exhibitorId'];
$data2=array();
$data3=array();
$response=array();

//select event title & description 
@$ExhibitorsQuery="select a.id,a.logoMediaId,a.about,a.primEmail,a.secEmail,a.primContact,a.secContact,a.website,b.companyName,b.mobileNo,c.address1,c.address2,c.landmark,c.pincode,c.maplink,d.`link` from exhibitorProfile a, exhibitor b, exhibitorAddress c,media d where a.createdBy=b.id and c.createdBy=b.id and  d.id=a.logoMediaId and a.id='$exhibitorId'";
@$selectExhibitorsDetails=mysql_query($ExhibitorsQuery,$conn) or die(mysql_error());
@$exhibitorDetailsRows=mysql_num_rows($selectExhibitorsDetails);

while($exhibitors=mysql_fetch_array($selectExhibitorsDetails))
{

		$response['id'] = $exhibitors['id'];
		$response['about'] = $exhibitors['about'];
		$response['primEmail'] = $exhibitors['primEmail'];
		$response['secEmail'] = $exhibitors['secEmail'];
		$response['primContact'] = $exhibitors['primContact'];
		$response['secContact'] = $exhibitors['secContact'];
		$response['website'] = $exhibitors['website'];
		$response['companyName'] = $exhibitors['companyName'];
		$response['mobileNo'] = $exhibitors['mobileNo'];
		$response['address1'] = $exhibitors['address1'];
		$response['address2'] = $exhibitors['address2'];
		$response['landmark'] = $exhibitors['landmark'];
		$response['pincode'] = $exhibitors['pincode'];
		$response['maplink'] = $exhibitors['maplink'];
		$response['link'] = $exhibitors['link'];
		array_push($data,$response);	
} 


  $json= json_encode($data,JSON_NUMERIC_CHECK);     
deliver_response(200,"exhibitors","exhibitorsDetails",$data);

?>