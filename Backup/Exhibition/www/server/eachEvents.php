<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php'; 
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse=array();
$id=$data['events'][0]['id'];

	//select event title and description
	$selectEventsQuery = "select eventTitle,description from exhibitionEvents where id='$id'";
	$selectEvents = mysql_query($selectEventsQuery,$conn) or die(mysql_error());
	$selectEventsRows = mysql_num_rows($selectEvents);
	
	//select event starttime and endtime
	$selectEventsQuery1 = "select date,starttime,endtime from exhibitionEventsDetail where id='$id'";
	$selectEvents1 = mysql_query($selectEventsQuery1,$conn) or die(mysql_error());
	$selectEventsRows1 = mysql_num_rows($selectEvents1);
	
	//select event venue
	$selectEventsQuery2 = "select venueName from exhibitionEventVenue where id='$id'";
	$selectEvents2 = mysql_query($selectEventsQuery2,$conn) or die(mysql_error());
	$selectEventsRows2 = mysql_num_rows($selectEvents2);
	
	if($selectEventsRows > 0 and $selectEventsRows1 > 0 and $selectEventsRows2 > 0 )
	{
			$selectEventsResult=mysql_fetch_assoc($selectEvents);
			$selectEventsResult1=mysql_fetch_assoc($selectEvents1);
			$selectEventsResult2=mysql_fetch_assoc($selectEvents2);
			
			$date= $selectEventsResult['createdOn'];
			$newDate = date("d-m-Y", strtotime($date));
			
			$eventTitle=urldecode($selectEventsResult['eventTitle']);
			//$newsTitle =$info = mb_convert_encoding($newsTitle, "HTML-ENTITIES", "UTF-8");
			$jsonresponse['eventTitle']=$eventTitle;
			
			$description=urldecode($selectEventsResult['description']);	
			//$description =$info = mb_convert_encoding($description, "HTML-ENTITIES", "UTF-8");
			$jsonresponse['description']=$description;	
			
			$jsonresponse['starttime']=urldecode($selectEventsResult1['starttime']);
			$jsonresponse['endtime']=urldecode($selectEventsResult1['endtime']);
			$jsonresponse['venueName']=urldecode($selectEventsResult2['venueName']);
			$jsonresponse['date']=$newDate;
			
			json_encode($jsonresponse);
			deliver_response(200,"Events Information","events",$jsonresponse);
	}
	else
	{
		deliver_response(201,"Events Information","events",$jsonresponse);
	}

	
?>