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
//$notesId=$data['notesUpdate'][0]['notesId'];
$notesTitle=$data['notesAdd'][0]['notesTitle'];
$notes=$data['notesAdd'][0]['notes'];
$createdOn=date('Y-m-d h:i:s', time());

$addNotesQuery="insert into visitorNotes (notesTitle,notes,createdOn,modifiedOn)  values('$notesTitle','$notes','$createdOn','$createdOn')";
$addNotes=mysql_query($addNotesQuery,$conn) or die(mysql_error());

	
$jsonresponse=$notesTitle;			
deliver_response(200,"note Added","notesAdd",$jsonresponse);


 
	
?>