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
//select exhibitor details
@$selectExhibitorsQuery="SELECT id, companyName FROM `exhibitor`";
@$selectExhibitors=mysql_query($selectExhibitorsQuery,$conn) or die(mysql_error());
@$ExhibitorsRows=mysql_num_rows($selectExhibitors);
  while($exhibitors=mysql_fetch_array($selectExhibitors))
  {
		$response['id'] = $exhibitors['id'];
		$response['companyName'] = $exhibitors['companyName'];
		 
		array_push($data,$response);
		
}
    $json= json_encode($data,JSON_NUMERIC_CHECK);     
	deliver_response(200,"exhibitors","exhibitorsInformation",$data);

?>