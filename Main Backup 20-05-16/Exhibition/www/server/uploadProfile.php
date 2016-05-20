<?php
//move_uploaded_file($_FILES["file"]["tmp_name"], 'http://exhibition.tekticks.co.in/application/uploads/');

$dirname = "application/uploads/"; 
 // If uploading file
 if ($_FILES) {
   print_r($_FILES);
   mkdir ($dirname, 0777, true);
   move_uploaded_file($_FILES["file"]["tmp_name"],$dirname."/".$_FILES["file"]["name"]);
 }

?>