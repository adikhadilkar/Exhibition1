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
@$selectExhibitorsQuery="select a.id,a.logoMediaId,a.primEmail,a.secEmail,a.primContact,a.secContact,a.about,b.companyName,c.address1,c.address2,c.pincode,c.maplink,d.`link` from exhibitorProfile a, exhibitor b, exhibitorAddress c,media d where a.createdBy=b.id and c.createdBy=b.id and  d.id=a.logoMediaId";
@$selectExhibitors=mysql_query($selectExhibitorsQuery,$conn) or die(mysql_error());
@$exhibitorRows=mysql_num_rows($selectExhibitors);

while($exhibitors=mysql_fetch_array($selectExhibitors))
{

		$response['id'] = $exhibitors['id'];
		$response['companyName'] = $exhibitors['companyName'];
		$response['primEmail'] = $exhibitors['primEmail'];
		$response['secEmail'] = $exhibitors['secEmail'];
		$response['primContact'] = $exhibitors['primContact'];
		$response['secContact'] = $exhibitors['secContact'];
		$response['image link'] = $exhibitors['link'];
		$response['about'] = $exhibitors['about'];
		$response['address1'] = $exhibitors['address1'];
		$response['address2'] = $exhibitors['address2'];
		$response['pincode'] = $exhibitors['pincode'];
		$response['maplink'] = $exhibitors['maplink'];
		
		array_push($data,$response);	
} 


  $json= json_encode($data,JSON_NUMERIC_CHECK);     
deliver_response(200,"exhibitors","exhibitorsDetails",$data);

?>