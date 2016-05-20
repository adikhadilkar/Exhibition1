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
//select news details
@$selectNewsQuery="SELECT * FROM `news`";
@$selectNews=mysql_query($selectNewsQuery,$conn) or die(mysql_error());
@$newsRows=mysql_num_rows($selectNews);
  while($news=mysql_fetch_array($selectNews))
  {
		//$createdOn=$news['createdOn'];
		//$date = date("d/m/Y", strtotime($createdOn));
		
		/* $date= $selectNewsResult['createdOn'];
		$newDate = date("d-m-Y", strtotime($date)); */
		
		$date= $selectNewsResult['createdOn'];
		$newDate = date("F j, Y, g:i a", strtotime($date));
		
		$response['id'] = $news['id'];
		$response['tagLine'] = $news['tagline'];
		$response['newsTitle']=$news['title'];
		$response['imageLink']=$news['imageLink'];
		$response['description']=$news['description'];
		$response['author']=$news['author'];
		$response['date']=$newDate;
		$response['source']=$news['source'];
		 
		array_push($data,$response);
		
}
    $json= json_encode($data,JSON_NUMERIC_CHECK);     
	deliver_response(200,"news","newsInformation",$data);

?>