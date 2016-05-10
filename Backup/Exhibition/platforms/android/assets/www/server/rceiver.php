<?php
include('config.php');
$deviceId=$_POST['deviceId'];

$insertQuery="insert into serverlocation(deviceId,latitude,longitude)values('$deviceId','0','0')";

?>