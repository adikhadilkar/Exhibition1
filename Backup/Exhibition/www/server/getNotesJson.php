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
//select notes details
$selectNotesQuery="SELECT id,notesTitle,notes FROM visitorNotes";
$selectNotes=mysql_query($selectNotesQuery,$conn) or die(mysql_error());
$notesRows=mysql_num_rows($selectNotes);
  while($notes=mysql_fetch_array($selectNotes))
  {
		//$createdOn=$news['createdOn'];
		//$date = date("d/m/Y", strtotime($createdOn));
		
		//$notesTitle=urldecode($notes['notesTitle']);
		//$notesTitle =$info = mb_convert_encoding($notesTitle, "HTML-ENTITIES", "UTF-8");
		
		//$notes=urldecode($notes['notes']);
		//$notes =$info = mb_convert_encoding($notes, "HTML-ENTITIES", "UTF-8");
		
		//$id=$notes['id'];
		$id=$notes['id'];
		$notesTitle=$notes['notesTitle'];
		$notes=$notes['notes'];
		//$id =$info = mb_convert_encoding($id, "HTML-ENTITIES", "UTF-8");
		
		
		
		$response['id'] = $id;
		$response['notesTitle']=$notesTitle;
		$response['notes']=$notes;
		 
		array_push($data,$response);
		
}
    //$json= json_encode($data,JSON_NUMERIC_CHECK);     
	deliver_response(200,"notes","notesInformation",$data);

?>