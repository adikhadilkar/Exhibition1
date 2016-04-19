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
@$selectEventsQuery="SELECT m.id, m.exhibitionId, m.eventTitle, m.description, v.id, v.exhibitionEventsId, v.date, v.starttime, v.endtime, z.venueName
FROM exhibitionEvents m, exhibitionEventsDetail v, exhibitionEventVenue z
WHERE m.exhibitionId = v.exhibitionEventsId
AND v.exhibitionEventsId = z.exhibitionId";
@$selectEvents=mysql_query($selectEventsQuery,$conn) or die(mysql_error());
@$eventRows=mysql_num_rows($selectEvents);

while($events=mysql_fetch_array($selectEvents))
{
		$id=$events['id'];
		$exhibitionId=$events['exhibitionId'];
		$eventTitle=$events['eventTitle'];
		$description=$events['description'];
		$id1=$events['id'];
		$exhibitionEventsId=$events['exhibitionEventsId'];
		$starttime=$events['starttime'];
		$endtime=$events['endtime'];

		$date= $events['date'];
		$newDate = date("d-m-Y", strtotime($date));
		$venueName=$events['venueName'];
		
		$response['id'] = $id;
		$response['exhibitionId'] = $exhibitionId;
		$response['eventTitle']=$eventTitle;
		$response['description']=$description;
		$response['id1'] = $id1;
		$response['exhibitionEventsId'] = $exhibitionEventsId;
		$response['starttime']=$starttime;
		$response['endtime']=$endtime;
		$response['date']=$newDate;
		$response['venueName'] = $venueName;
		
		array_push($data,$response);	
} 


/* //select event date, starttime & endtime 
@$selectEventsQuery1="SELECT v.id,v.exhibitionEventsId,date,starttime,endtime FROM exhibitionEventsDetail";
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
		
		array_push($data,$response);
}

//exhibition venue
@$selectEventsQuery2="SELECT venueName FROM exhibitionEventVenue";
@$selectEvents2=mysql_query($selectEventsQuery2,$conn) or die(mysql_error());
@$eventRows2=mysql_num_rows($selectEvents2);

while($events2=mysql_fetch_array($selectEvents2))
{
		$venueName=$events2['venueName'];
		$response['venueName'] = $venueName;
		//array_push($data,$response); 
			
} 
 */



  $json= json_encode($data,JSON_NUMERIC_CHECK);     
deliver_response(200,"events","eventsInformation",$data);

?>