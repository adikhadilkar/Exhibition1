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
$notesId=$data['notesUpdate'][0]['notesId'];
$notesTitle=$data['notesUpdate'][0]['notesTitle'];
$notes=$data['notesUpdate'][0]['notes'];

			
$updateNotesQuery="update visitorNotes
set notesTitle='$notesTitle',
notes='$notes'
where id='$notesId'";	
mysql_query($updateNotesQuery,$conn);
	
$jsonresponse=$notesId;			
deliver_response(200,"note updated","notesUpdate",$jsonresponse);


 
	
?>