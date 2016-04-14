<?php
date_default_timezone_set("Asia/Kolkata");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';
 
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse=array();
$notesId=$data['notes'][0]['notesId'];
			
$deleteNotesQuery="delete from visitorNotes
where id='$notesId'";	
mysql_query($deleteNotesQuery,$conn);
	
$jsonresponse=$notesId;			
deliver_response(200,"note deleted","notesDelete",$jsonresponse);
	
?>