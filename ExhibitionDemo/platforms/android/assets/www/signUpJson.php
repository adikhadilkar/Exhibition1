<?php
//include 'json_format.php';
//include 'config.php';

		$josn = file_get_contents("php://input");
		$data = json_decode($josn, true);
		print_r($data);
?>