<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';
//$josn = '{"news":[{"id":1}]}';  
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse=array();
$notesId=$data['notes'][0]['notesId'];

	//select news information
	$selectNotesQuery1 = "select notesTitle,notes from visitorNotes where id='$notesId'";
	$selectNotes1 = mysql_query($selectNotesQuery1,$conn) or die(mysql_error());
	$selectNotesRows1 = mysql_num_rows($selectNotes1);
	
	if($selectNotesRows1 > 0)
	{
			$selectNotesResult=mysql_fetch_assoc($selectNotes1);
			
			$notesTitle=urldecode($selectNotesResult['notesTitle']);
			$jsonresponse['notesTitle']=$notesTitle;
			
			
			$notes=urldecode($selectNotesResult['notes']);	
			$jsonresponse['notes']=$notes;			
			json_encode($jsonresponse);
			deliver_response(200,"Notes Information","notes",$jsonresponse);
	}
	else
	{
		deliver_response(201,"Notes Information","notes",$jsonresponse);
	}

	
?>