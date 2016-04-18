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
$response=array();

//select event title & description 
@$selectEventsQuery="SELECT id,exhibitionId,eventTitle,description FROM exhibitionEvents";
@$selectEvents=mysql_query($selectEventsQuery,$conn) or die(mysql_error());
@$eventRows=mysql_num_rows($selectEvents);

while($events=mysql_fetch_array($selectEvents))
{
		$id=$events['id'];
		$exhibitionId=$events['exhibitionId'];
		$eventTitle=$events['eventTitle'];
		$description=$events['description'];
		
		$response['id'] = $id;
		$response['exhibitionId'] = $exhibitionId;
		$response['eventTitle']=$eventTitle;
		$response['description']=$description;
		
		//array_push($data,$response);	
}

//select event date, starttime & endtime 
@$selectEventsQuery1="SELECT id,exhibitionEventsId,date,starttime,endtime FROM exhibitionEventsDetail";
@$selectEvents1=mysql_query($selectEventsQuery1,$conn) or die(mysql_error());
@$eventRows1=mysql_num_rows($selectEvents1);

while($events1=mysql_fetch_array($selectEvents1))
{
		$id1=$events1['id'];
		$exhibitionEventsId=$events1['exhibitionEventsId'];
		$starttime=$events1['starttime'];
		$endtime=$events1['endtime'];

		$date= $events1['date'];
		$newDate = date("d-m-Y", strtotime($date));
		
		
		$response['id1'] = $id1;
		$response['exhibitionEventsId'] = $exhibitionEventsId;
		$response['starttime']=$starttime;
		$response['endtime']=$endtime;
		$response['date']=$newDate;
		//array_push($data,$response);	
}

//exhibition venue
@$selectEventsQuery2="SELECT venueName FROM exhibitionEventVenue";
@$selectEvents2=mysql_query($selectEventsQuery2,$conn) or die(mysql_error());
@$eventRows2=mysql_num_rows($selectEvents2);

while($events2=mysql_fetch_array($selectEvents2))
{
		$venueName=$events2['venueName'];
		
		$response['venueName'] = $venueName;
		
		array_push($data,$response);	
}


    $json= json_encode($data,JSON_NUMERIC_CHECK);     
deliver_response(200,"events","eventsInformation",$data);

?>