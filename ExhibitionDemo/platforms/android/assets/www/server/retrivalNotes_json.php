<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';

$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse="";
$notesId1=$data['notes'][0]['notesId'];

	
	$selectNotesQuery="select notesTitle,notes from visitorNotes where id='$notesId1'";
	
	$selectNotes=mysql_query($selectNotesQuery,$conn)or die(mysql_error());
	
	$notesResultRows=mysql_num_rows($selectNotes);
	
	
	if($notesResultRows>0)
	{
		while($selectNotesResult=mysql_fetch_assoc($selectNotes))
		{
				
				$jsonresponse[] = $selectNotesResult;
				
			
		}
			
			json_encode($jsonresponse);
			deliver_response(200,"Record found","notes",$jsonresponse);
	}
		else
		{ 	
				deliver_response(203,"No data found","notes",$jsonresponse);
		}
	
	

?>